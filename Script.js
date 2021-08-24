//TMDB Api
const api_key = "api_key=e296ec8b756d3d400034f9379f43d92f";
const base_url = "https://api.themoviedb.org/3";
const dicovery = "/discover/movie?sort_by=popularity.desc&";

const api_url = base_url + dicovery + api_key;

const image_base_url = "https://image.tmdb.org/t/p/w500";
const search_url = base_url + '/search/movie?' + api_key;

const info = document.querySelector(".information");

getMovies(api_url)
function getMovies(api_url) {

    fetch(api_url)
    .then(function(response) { 
        return response.json()
    })
    .then(function (data){
        console.log(data.results);
        showMovies(data.results);
    })
    .catch(error => console.log(error))
}
/*
getMovies(api_url);
function getMovies(url) {
    fetch(url).then(response => response.json()).then(data => {
        console.log(data.results);
        showMovies(data.results);
    })
    
}*/

 function showMovies(data) {
    info.innerHTML = ``;
    data.forEach(movie => {
        const {title,poster_path,vote_average,overview} = movie;
        const movie_element = document.createElement('div');
        movie_element.classList.add('movie');
        movie_element.innerHTML = `
            <img src="${image_base_url + poster_path}" alt="${movie.title}">
            <div class="movie-info">
            
                <h3>${TitleConcatinate(title)}</h3>
                <span class="${getcolor(vote_average)}" id="green"><i class="fas fa-star"></i>${movie.vote_average}</span>
            </div>
            <div class="overview">
                <h1>Plot:</h1>
                <p>${movie.overview}</p>
            </div>
        
        `;
        
        info.appendChild(movie_element);
    });
 }

 function TitleConcatinate(title) {
   
    if(title.length >= 30) {
        return (title.substring(0,30) + "....");
    } else {
       return title;
    }
 }

 function getcolor(rating) {
     if(rating >=8 ) {
        return 'green'
     }else if(rating >=5) {
     return 'orange'
     }else {
         return 'red'
     }  
 }
 document.getElementById('form').addEventListener('submit' , (event) => {
     event.preventDefault();
     const searchItem = search.value;

     if(searchItem) {
         getMovies(search_url + '&query=' + searchItem)
     } else {
         getMovies(api_url)
     }
     
 })
 document.getElementById('search-glass').addEventListener('click' , (event) => {
    event.preventDefault();
    const searchItem = search.value;

    if(searchItem) {
        getMovies(search_url + '&query=' + searchItem)
    } else {
        getMovies(api_url)
    }
    
})

