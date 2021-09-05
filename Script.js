//TMDB Api
$("#next").on("click", function() {
    $("body").scrollTop(0);
});
const api_key = "api_key=e296ec8b756d3d400034f9379f43d92f";
const base_url = "https://api.themoviedb.org/3";
const dicovery = "/discover/movie?sort_by=popularity.desc&";

const api_url = base_url + dicovery + api_key;

const image_base_url = "https://image.tmdb.org/t/p/w500";
const search_url = base_url + '/search/movie?' + api_key;

const info = document.querySelector(".information");

const previous = document.getElementById(`prev`);
const next = document.getElementById('next');
const current = document.getElementById(`current`);



var currentPage = 0;
var nextPage = 0;
var previousPage = 0;
var prevUrl = ``;
var totalPages = 50;

getMovies(api_url);
function getMovies(api_url) {
    prevUrl = api_url;  
        fetch(api_url)
        .then(function(response) { 
            return response.json()
        })
        .then(function (data){
            //console.log(data.results);
            if(data.results.length !== 0){
                showMovies(data.results);
                currentPage = data.page;
                //console.log(data.total_pages)
                totalPages = data.total_pages;
                nextPage = currentPage + 1;
                previousPage = currentPage - 1;          
            }else {
                info.innerHTML= `<h1 class="no-reults">No Results Found<h1>`;
            }
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
                <h1>${title}</h1>
                <br>
                <h2> Release Date:</h2>  <p>${movie.release_date}</p>
                <h2> Rating:</h2>  <p>${(vote_average).toFixed(2)}</p>
                <h2>Plot:</h2>
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


next.addEventListener('click' , () => {
    console.log("hello world");
    if(nextPage <= totalPages){
        nextPage = nextPage;
        //console.log(nextPage);
        //console.log(totalPages);

        ShowNextPage(nextPage);
        //console.log(intelement);
        
        window.scrollTo(0, 0);
    }
})

function ShowNextPage(page) {
    console.log('hello best friend')
  let urlsplit = prevUrl.split('?'); 
  let queryparams = urlsplit[1].split('&');
  let key = queryparams[queryparams.length -1].split('=');
  
  if(key[0] != 'page'){
    let newurl = prevUrl + '&page=' +page;
    console.log(newurl);
    getMovies(newurl);
  }
  else {
    key[1]= page.toString();
    let a = key.join('=');
    queryparams[queryparams.length-1] =a;
    let b = queryparams.join('&');
    let url = urlsplit[0] + '?' +b;
    getMovies(url);
  }
}
prev.addEventListener('click', () => {
    console.log('welcome to the previous page');

})
function ShowPreviousPage(page) {

}