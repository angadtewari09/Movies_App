//The Movie DB API
/*
 fetch(`https://api.themoviedb.org/3/movie/${result.id}/credits?language=en-US&api_key=e296ec8b756d3d400034f9379f43d92f`)
                    .then(response => response.json())
                    .then( (response) => { console.log(Object.values(response.cast[i++]) )     })
                    .catch(err => console.error(err)) 
*/
const genre = [ 
    { "id": 28, "name": "Action" }, 
    { "id": 12, "name": "Adventure" }, 
    { "id": 16, "name": "Animation" }, 
    { "id": 35, "name": "Comedy" }, 
    { "id": 80, "name": "Crime" }, 
    { "id": 99, "name": "Documentary" }, 
    { "id": 18, "name": "Drama" }, 
    { "id": 10751, "name": "Family" }, 
    { "id": 14, "name": "Fantasy" }, 
    { "id": 36, "name": "History" }, 
    { "id": 27, "name": "Horror" }, 
    { "id": 10402, "name": "Music" }, 
    { "id": 9648, "name": "Mystery" }, 
    { "id": 10749, "name": "Romance" }, 
    { "id": 878, "name": "Science Fiction" }, 
    { "id": 10770, "name": "TV Movie" }, 
    { "id": 53, "name": "Thriller" }, 
    { "id": 10752, "name": "War" }, 
    { "id": 37, "name": "Western" } 
]
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

const className = "buttonName"; 
const castName = "castName";
const trailer = "trailerName"


var currentPage = 0;
var nextPage = 0;
var previousPage = 0;
var prevUrl = ``;
var totalPages = 50;

getMovies(api_url);
function getMovies(api_url) {
    prevUrl = api_url;  
        fetch(api_url)
        .then(res => res.json() )
        .then( (data) => {

            if(data.results.length !== 0) {
                info.innerHTML = ``;
                data.results.forEach(movie => {
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
                            <br>
                            <h2>Genre:</h2>  <p>${ getGenreList( movie.genre_ids )}</p>
                            <br>
                            <h2> Rating:</h2>  <p>${(vote_average).toFixed(2)}</p>
                            <br>
                            <h2>Director: </h2>  <p class=${castName} id=${movie.id*10} > </p>
                            <br>
                            <h2>Producer: </h2>  <p class=${castName} id=${movie.id*100} > </p>
                            <br>
                            <h2>Cast:</h2>  <p class=${castName} id=${movie.id} > ${getCast(movie.id)} </p>
                            <br>
                            <h2>Plot:</h2>
                            <p>${movie.overview}</p>
                            <br>
                            <h2>Trailer:</h2>  <a id=${movie.vote_count} target="_blank" >${ getTrailer(movie.id , movie.vote_count) }</a>
                            <br>
                        </div>
                    `;
                    info.appendChild(movie_element);
                });

                currentPage = data.page;
                totalPages = data.total_pages;
                nextPage = currentPage + 1;
                previousPage = currentPage - 1;  
                
                if(currentPage <= 1 ) {
                    prev.classList.add('disabled');
                    next.classList.remove('disabled');
                }
                else if(currentPage>= data.totalPages) {
                    prev.classList.remove('disabled');
                    next.classList.add('disabled');
                }
                else {
                    prev.classList.remove('disabled');
                    next.classList.remove('disabled');
                }
            }else {
                info.innerHTML= `<h1 class="no-reults">No Results Found<h1>`;
            }
        })
        .catch(error => console.error(error))
}

let names;
let director;

function getCast( movie_id )
{
  fetch(`https://api.themoviedb.org/3/movie/${movie_id}/credits?language=en-US&api_key=e296ec8b756d3d400034f9379f43d92f`).then( res => res.json() )
  .then( data=>{

    let d = [];  
    data.crew.map((ele , idx ) => { 
      if( ele.department == "Directing" ) {
        d.push( ele.name )
      }
    })
    director = d.join(', ')
    document.getElementById(movie_id*10).innerHTML = `${director}.`
    
    let p = []
    data.crew.map((ele) => { 
      if( ele.department == "Production") {
        p.push( ele.name )
      }
    })
    let producer = ""; 
    p.forEach( (name , idx ) => {
      if( idx <3) {
        if( producer.length == 0 ) {
          producer = producer + name;
        }
        else {
          producer = producer + ", " + name
        }
         
      }
    })
    document.getElementById(movie_id*100).innerHTML = `${producer}.`

    if( data ) {
      if( data.cast.length > 0 ){
        var embed = []
        data.cast.forEach( (element , num ) => 
        {
            if( num < 13 )
            embed.push( element.name )
        });
        names = embed.join(', ')
        document.getElementById(movie_id).innerHTML= ` ${names}, ...and others`
      }
    }
  })
}

function getTrailer(id , vc)
{
  let trailer = `https://www.youtube.com/watch?v=`;
  
   fetch(`http://api.themoviedb.org/3/movie/${id}/videos?api_key=e296ec8b756d3d400034f9379f43d92f`)
   .then( res => res.json() )
   .then( (data) => {
    if(data) {

      if( data.results.length > 0 ) {
        let tr = []
        data.results.forEach((element , index) => {
          tr.push( element.key )
        })
        document.getElementById(vc).href =`${trailer}${tr[ 0 ]}`;
        document.getElementById(vc).innerHTML =`${trailer}${tr[0]}`
      }
    }
   })
   .catch( err => console.log( err ))
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
    
    if(nextPage <= totalPages){
        nextPage = nextPage;
        ShowNextPage(nextPage);
        window.scrollTo({
            top:400,
            behavior: 'smooth',
            color:'red'
        });
    }
})
prev.addEventListener('click', () =>{
    if( currentPage >= 1 ){
        page = previousPage;
        ShowNextPage( page );
        window.scrollTo({
            top:400,
            behavior: 'smooth',
            color:'red'
        });
    }
})


//Show the next Page.
function ShowNextPage(page) 
{   
  document.getElementById("current").innerText = page
  let urlsplit = prevUrl.split('?'); 
  let queryparams = urlsplit[1].split('&');
  let key = queryparams[queryparams.length -1].split('=');
  
  if(key[0] != 'page'){
    let newurl = prevUrl + '&page=' +page;
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

//Show the Previous Page.
function ShowPreviousPage(page) {
 
    document.getElementById("current").innerText = page
   
      let urlsplit = prevUrl.split('?'); 
      let queryparams = urlsplit[1].split('&');
      let key = queryparams[queryparams.length -1].split('=');
      
      if(key[0] != 'page'){
        let newurl = prevUrl + '&page=' +page-1;
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

function getGenreList( gen_list )
{
    let genre_array = []
    gen_list.map( (item) => {

        for (const key in genre) {
            if (genre.hasOwnProperty(key)) {
              if( genre[key].id == item ){
                genre_array.push(genre[key].name)
              }
            }
        }
    })
    
    return genre_array;
   
}

