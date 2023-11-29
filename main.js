const api = axios.create({
    baseURL: "https://api.themoviedb.org/3/",
    headers: {
        'Content-Type': 'application/json;charset=utf-8',
    },
    params: {
        'api_key': API_KEY
    },
});

function createMovie(movies, container) {
    container.innerHTML = "";
    movies.forEach(movie => {
        const movieContainer = document.createElement('div');
        movieContainer.classList.add('movies-container');

        movieContainer.addEventListener('click', () => {
            location.hash = '#movie=' + movie.id
        })

        const movieImg = document.createElement('img');
        movieImg.classList.add('movie-img');
        movieImg.setAttribute('alt', movie.title);
        movieImg.setAttribute(
            'src',
            'https://image.tmdb.org/t/p/w300' + movie.poster_path,
        )
        movieContainer.appendChild(movieImg);
        container.appendChild(movieContainer)
    });
}

function createCategory(categories, container) {
    container.innerHTML = '';
    categories.forEach(category => {

        const categoryContainer = document.createElement('div');
        categoryContainer.classList.add('category-container');
        const categoryTitle = document.createElement('h3');
        categoryTitle.classList.add('category-title');
        categoryTitle.setAttribute('id', 'id' + category.id);
        categoryTitle.addEventListener('click', () => {
            location.hash = `#category=${category.id}-${category.name}`;
    });
        const categoryTitleText = document.createTextNode(category.name);
        categoryTitle.appendChild(categoryTitleText);
        categoryContainer.appendChild(categoryTitle)
        container.appendChild(categoryContainer)
    })
}




async function getTrendingMovies() {
    const { data } = await api('trending/movie/week?')
    const movies = data.results;
    console.log(data);
    console.log(movies);
    createMovie(movies, moviesContainer)
}

getTrendingMovies()


async function getCategoriesMain() {
    const { data } = await api('genre/movie/list')
    const categories = data.genres;
    console.log(categories);

    createCategory(categories, viewCategories)
}

async function getMoviesByCategory(id) {
    const { data } = await api('discover/movie', {
        params: {
            with_genres: id,
        }
    })
    const movies = data.results;
    console.log(movies);

   createMovie(movies, moviesContainer)
}

async function getMoviesBySearch(query) {
    const { data } = await api('search/movie', {
        params: {
            query,
        }
    })
    const movies = data.results;
    createMovie(movies, moviesContainer)
}


async function getMovieById(id) {
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

     const divImg = document.createElement('div');
     divImg.classList.add('div-img')
     const imgCard = document.createElement('img')
     const imgUrl = 'https://image.tmdb.org/t/p/w300' + movie.poster_path
     imgCard.setAttribute('src', imgUrl)
     divImg.appendChild(imgCard)
     headerContainer.appendChild(divImg)
     getRecommendationsMovies(movie.id)
}


async function getRecommendationsMovies(id) {
    const { data } = await api(`movie/${id}/recommendations`, {
        params: {
            movie_id: id,
        }
    });
    const movies = data.results

    console.log(movies);

    createMovie(movies, spaceCategories)
}


