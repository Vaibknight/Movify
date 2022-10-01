// TMDBB

const API_KEY = 'api_key=1cf50e6248dc270629e802686245c2c8';
const BASE_URL = 'https://api.themoviedb.org/3';
const API_URL = BASE_URL + '/discover/movie?sort_by=popularity.desc&'+API_KEY;
const IMG_URL = 'https://image.tmdb.org/t/p/w500';
const arrows = document.querySelectorAll(".arrow");
const movieLists = document.querySelectorAll(".movie-list");
const main = document.getElementById('main');
const mainn = document.getElementById('main-2');

getMovies(API_URL);

function getMovies(url){
    fetch(url).then(res => res.json()).then(data => {
        var moviearr = data.results;
         console.log(moviearr);
         showMovies(data.results);
    
    })
}


function showMovies(data){
        var ccc = 0;
        while(ccc<10){

        const {title,poster_path,overview} = data[ccc];
        const moviel = document.createElement('div');
        moviel.classList.add('movie-list-item');
        moviel.innerHTML=`
        <div class="mx-2 relative" style="min-height: 208px;min-width: 226px;">
        <img class="movie-list-item-img w-96 h-52 rounded-xl " src="${IMG_URL+poster_path}" alt="">
        <div class="flex">
            <span class="movie-list-item-title bg-slate-600 px-1 text-2xl  top-9 left-10 z-10 absolute">${title}</span>
            <span class="rating top-9 right-2.5 z-10 absolute  bg-green-500 w-14 rounded-lg cursor-pointer">90</span>
        </div>
        <p class="featured-desc w-6/12 text-gray-300 my-2  bg-slate-600 w-9/12 top-16 left-10 absolute text-xs" >${overview.slice(0,70)}....</p>
        
        </div>
        `;

        main.appendChild(moviel);
            ccc++;
        }
        console.log("end");
    
        arrows.forEach((arrow,i)=> {
            const itemNumber = movieLists[i].querySelectorAll("img").length;
            let clickCounter = 0;
            arrow.addEventListener("click",() => {
                clickCounter++;
                if(itemNumber - (4 + clickCounter) >= 0){
                    movieLists[i].style.transform = `translateX(${
                        movieLists[i].computedStyleMap().get("transform")[0].x.value - 300
                      }px)`;
                }
                else{
                    movieLists[i].style.transform = "translateX(0)";
                    clickCounter = 0;
                }
                
            });
        });
        
}


