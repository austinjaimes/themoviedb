
    let favoritesMovies = JSON.parse(localStorage.getItem('productosFavoritos')) || [];

function addMovieToFavorites(event) {
    const movieId = parseInt(event.target.dataset.id);
    const movie = movie.find(p => p.id === movieId)
    console.log(movie);

    if (movie) {
        if (!favoritesMovies.some(p => p.id === movieId)) {
            favoritesMovies.push(movie)
        }
    }
    renderizarFavoritos()
}

async function renderizarFavoritos(id) {
    const { data: movie } = await api('movie/' + id);
    console.log({data: movie});
    headerContainer.innerHTML = `
    <div class="div-details">
    <h1 class="title-score">Score: ${movie.vote_average}</h1>
    <h1 class="title-description">Description: ${movie.overview}</h1>
    <h1 class="title-title">Title: ${movie.title}</h1>
    <h1 class="title-genres">Genres: ${movie.genres.map(genre => {
        return genre.name
    })}</h1>
    <h1 class="title-date">Release date: ${movie.release_date}</h1>
    </div>
    `
}