window.addEventListener('load', navigator, false)

searchButton.addEventListener('click', () => {
    location.hash = '#search=' + searchInput.value
})

viewMore.addEventListener('click', () => {
    location.hash = '#trends'
})

arrowBack.addEventListener('click', () => {
    history.back()
})

favoritesButton.addEventListener('click', () => {
    location.hash = '#favorites'
})

function navigator() {
    console.log({ location });

    if (location.hash.startsWith('#trends')){
        trendsPage(); 
    } else if (location.hash.startsWith('#search=')) {
        searchPage();
    } else if (location.hash.startsWith('#movie=')) {
        moviePage();
    } else if (location.hash.startsWith('#category=')) {
        categoryPage();
    } else if (location.hash.startsWith('#favorites')) {
        favoritesPage();
    } else {
        homePage()
    }
};

function favoritesPage() {
    trendsTitle.classList.add('inactive');
    startView.classList.add('inactive');
    startView.classList.add('display')
    viewCategories.classList.add('inactive');
    moviesContainer.classList.remove('trends-page')
    moviesContainer.classList.add('inactive')
    moviesContainer.classList.add('display')
    categoriesTitle.classList.add('inactive')
    arrowBack.classList.add('inactive')
}

function trendsPage() {
    console.log('Trends');
    trendsTitle.classList.remove('inactive');
    startView.classList.add('inactive');
    viewCategories.classList.add('inactive');
    moviesContainer.classList.remove('movies-container')
    moviesContainer.classList.add('trends-page');
    categoriesTitle.classList.add('inactive')
    favoritesButton.classList.add('no')
}

function categoryPage() {
    console.log('Category');
    startView.classList.add('inactive')
    viewCategories.classList.add('inactive');
    moviesContainer.classList.remove('movies-container')
    moviesContainer.classList.add('trends-page')
    categoriesTitle.classList.add('inactive')
    favoritesButton.classList.add('no') 

    const [_, categoryData] = location.hash.split('=');
    const [categoryId, categoryName] = categoryData.split('-');
    titleMovies.innerHTML = categoryName
    getMoviesByCategory(categoryId)
}

function homePage() {
    console.log('Home');
    prueba.classList.add('inactive');
    moviesContainer.classList.add('card-container');
    moviesContainer.classList.add('movies-container');
    arrowBack.classList.add('inactive')
    favoritesButton.classList.add('no')

    getTrendingMovies()
    getCategoriesMain()

}

function searchPage() {
    console.log('Search');
    viewMore.classList.add('inactive')
    viewTrends.classList.add('inactive')
    moviesContainer.classList.add('card-container-search')
    moviesContainer.classList.add('movies-container')
    categoriesTitle.classList.add('inactive')
    arrowBack.classList.add('arrow-back-search')
    spaceCategories.classList.add('inactive')
    spaceCategories.classList.add('no')
    relatedTitle.classList.add('inactive')
    favoritesButton.classList.add('no')

    const [_, query] = location.hash.split('=');
    getMoviesBySearch(query)
    prueba.innerHTML = `
    <h1 class="result-search">El resultado de tu busqueda fue: <i>${query}</i></h1>
    `
}

function moviePage() {
    startView.classList.add('inactive');
    categoriesTitle.classList.add('inactive')
    arrowBack.classList.add('arrow-back-search')
    moviesContainer.classList.remove('card-container-search')
    moviesContainer.classList.add('delete')
    moviesContainer.classList.remove('movies-container')
    moviesContainer.classList.add('movies-container-container')
    moviesContainer.classList.add('display')
    spaceCategories.classList.add('space-categories')
    

    const [_, movieId] = location.hash.split('=')
    getMovieById(movieId)
}

