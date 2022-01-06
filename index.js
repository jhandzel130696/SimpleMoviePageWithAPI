const API_URL = 'https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=d2263c6e6176a857011041337c709c41&page=1'
const IMG_PATH = 'https://image.tmdb.org/t/p/w1280'
const search = document.getElementById('search');
const form =document.getElementById('form');
const main =document.getElementById('main');
const btnBack = document.querySelector('.backBtn');
function showMovies(movies){
    main.innerHTML='';

    movies.forEach(p=>{
        console.log(p);
        const {title,poster_path,vote_average,overview}=p;
        const movieEl=document.createElement('div');
        movieEl.classList.add('movie');
        movieEl.innerHTML = ` 
                     
                   <img src="${IMG_PATH + poster_path}" alt="${title}">
            
                   <div class="movie-info">
                       <h3>${title}</h3>
                        <span class=${getClassByRate(vote_average)}>${vote_average}</span>\
                   </div>
                   <div class="overview">
                        <h3>Overview</h3>
                     ${overview};
                 
               </div>`

        main.appendChild(movieEl);
    })

}

async function getMovies(url){
    const res = await fetch(url);
    const data = await res.json();

    showMovies(data.results);
}

function getClassByRate(vote){
    if(vote>=8){
        return 'green'
    }
    else if( vote >=5){
        return 'orange'
    }

    else{
        return 'red'
    }
}




form.addEventListener('submit',(e)=>{
    e.preventDefault();
    const searchTerm=search.value;

    if(searchTerm && searchTerm !== ''){
        const SEARCH_URL = `https://api.themoviedb.org/3/search/movie?api_key=d2263c6e6176a857011041337c709c41&query=${searchTerm}`;
        getMovies(SEARCH_URL);
        search.value=''
    }else{
        window.location.reload();
    }
})

btnBack.addEventListener('click',()=>{
    getMovies(API_URL);
});

getMovies(API_URL);