let watchListData = JSON.parse(localStorage.getItem('watchlist')) || []

function addToWatchlist(id) {
  watchListData.push(id)
  localStorage.setItem('watchlist', JSON.stringify(watchListData))
  document.getElementById(`info__add--${id}`).innerText = 'Added'
  document.getElementById(`info__add--${id}`).disabled = true
}

document.getElementById('form').addEventListener('submit', event => {
  event.preventDefault()
  const query = event.target.query.value

  fetch(`https://www.omdbapi.com/?apikey=1df1e1f3&type=movie&s=${query}`)
    .then(res => res.json())
    .then(data => {
      const movies = data.Search
      if (!movies) {
        document.getElementById('movies').innerHTML =
          '<p class="message">Unable to find what you’re looking for. Please try another search.</p>'
        return
      }
      document.getElementById('movies').innerHTML = ''
      for (let movie of movies) {
        fetch(`https://www.omdbapi.com/?apikey=1df1e1f3&i=${movie.imdbID}`)
          .then(res => res.json())
          .then(data => {
            document.getElementById('movies').innerHTML += `
              <div class="movie">
                <img class="movie__poster" src=${data.Poster}/>
                <div class="movie__info">
                  <div  class="info__title">
                    <h2>
                      ${data.Title}
                    </h2>
                    <span class="info__rating">
                      <img src="./assets/star-icon.png" />
                      ${data.imdbRating}
                    </span>
                  </div>
                  <div class="info__stats">
                    <span class="info__runtime">${data.Runtime}</span>
                    <span class="info__genre">${data.Genre}</span>
                    ${
                      watchListData.indexOf(movie.imdbID) == -1
                        ? `<button class="info__add" onclick="addToWatchlist('${movie.imdbID}')"     id="info__add--${movie.imdbID}">
                        <img src="./assets/add-icon.png" />
                        Add to Watchlist
                      </button>`
                        : `<button class="info__add" id="info__add--${movie.imdbID}" disabled>
                        Added 
                      </button>`
                    }
                  </div>
                  <p class="info__plot">${data.Plot}</p>
                </div>
              </div>
            `
          })
      }
    })
})
