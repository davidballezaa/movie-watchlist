let myWatchList = JSON.parse(localStorage.getItem('watchlist')) || []

function removeFromWatchlist(id) {
  myWatchList = myWatchList.filter(movieID => movieID != id)
  localStorage.setItem('watchlist', JSON.stringify(myWatchList))
  document.location.reload(true)
}

if (myWatchList.length > 0) {
  document.getElementById('movies').innerHTML = ''
  for (let movieID of myWatchList) {
    fetch(`https://www.omdbapi.com/?apikey=1df1e1f3&i=${movieID}`)
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
                    <button class="info__remove" onclick="removeFromWatchlist('${movieID}')" id="info__remove--${movieID}">
                      <img src="./assets/remove-icon.png" />
                      Remove 
                    </button>
                  </div>
                  <p class="info__plot">${data.Plot}</p>
                </div>
              </div>
            `
      })
  }
}
