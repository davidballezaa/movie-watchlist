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
      document.getElementById('movies').innerHTML = ''
      for (let movie of movies) {
        fetch(`https://www.omdbapi.com/?apikey=1df1e1f3&i=${movie.imdbID}`)
          .then(res => res.json())
          .then(data => {
            document.getElementById('movies').innerHTML += `
              <div class="movie">
                <img class="movie__poster" src=${data.Poster}/>
                <div class="movie__info">
                  <h2 class="info__title">${data.Title}</h2>
                  <span class="info__rating">
                    <img src="./assets/star-icon.png" />
                    ${data.imdbRating}
                  </span>
                  <span class="info__runtime">${data.Runtime}</span>
                  <span class="info__genre">${data.Genre}</span>
                  <button class="info__add" onclick="addToWatchlist('${movie.imdbID}')" id="info__add--${movie.imdbID}">
                    <img src="./assets/add-icon.png" />
                    Add to Watchlist
                  </button>
                  <p class="info__plot">${data.Plot}</p>
                </div>
              </div>
            `
          })
      }
    })
})
