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
                  <span class="info__rating">${data.imdbRating}</span>
                  <span class="info__runtime">${data.Runtime}</span>
                  <span class="info__genre">${data.Genre}</span>
                  <p class="info__plot">${data.Plot}</p>
                </div>
              </div>
            `
          })
      }
    })

  // title, year, poster, type, imdbID
})
