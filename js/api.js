// TMDBB

const API_KEY = 'api_key=3a87516f4062d620354be39de766e08b';
const BASE_URL = 'https://api.themoviedb.org/3';
const API_URL = BASE_URL + '/discover/movie?sort_by=popularity.desc&'+API_KEY;
const IMG_URL = 'https://image.tmdb.org/t/p/w500';

const searchURL = BASE_URL + '/search/movie?'+API_KEY;

// Main accerssing innerhtml
const main = document.getElementById('main');
const form = document.getElementById('form');
const search = document.getElementById('search');

const genres = [
    {
      "id": 28,
      "name": "Action"
    },
    {
      "id": 12,
      "name": "Adventure"
    },
    {
      "id": 16,
      "name": "Animation"
    },
    {
      "id": 35,
      "name": "Comedy"
    },
    {
      "id": 80,
      "name": "Crime"
    },
    {
      "id": 99,
      "name": "Documentary"
    },
    {
      "id": 18,
      "name": "Drama"
    },
    {
      "id": 10751,
      "name": "Family"
    },
    {
      "id": 14,
      "name": "Fantasy"
    },
    {
      "id": 36,
      "name": "History"
    },
    {
      "id": 27,
      "name": "Horror"
    },
    {
      "id": 10402,
      "name": "Music"
    },
    {
      "id": 9648,
      "name": "Mystery"
    },
    {
      "id": 10749,
      "name": "Romance"
    },
    {
      "id": 878,
      "name": "Science Fiction"
    },
    {
      "id": 10770,
      "name": "TV Movie"
    },
    {
      "id": 53,
      "name": "Thriller"
    },
    {
      "id": 10752,
      "name": "War"
    },
    {
      "id": 37,
      "name": "Western"
    }
  ];

  const tags1 = document.querySelector('.tags');

  var selectGenre = []

  setGenre();


// functioning for genre filter
  function setGenre () {
    tags1.innerHTML = ``;
    genres.forEach(genre => {
        const t = document.createElement('div');
        t.classList.add('tag');
        t.id =genre.id;
        t.innerText = genre.name;
        t.addEventListener('click', () => {
          // if genre is empty push genre
          if(selectGenre.length == 0){
            selectGenre.push(genre.id);
          }
          // if genre is there then we have to pop
          else{
            if(selectGenre.includes(genre.id)){
                selectGenre.forEach((id,idx) => {
                  // if there is a matching it removes the matching genre
                  if(id == genre.id){
                    selectGenre.splice(idx,1);
                  }
                })
            }
            else{
              selectGenre.push(genre.id);
            }
          }
          console.log(selectGenre," dsv");
          // join helps to join array by , & it also converts arrays into strings

          getMovies(API_URL + '&with_genres='+encodeURI(selectGenre.join(',')));
          highlightSelection()
        })
        tags1.append(t);
    })
  }

  function highlightSelection() {
    const tags = document.querySelectorAll('.tag');
    tags.forEach(tag => {
        tag.classList.remove('highlight')
    })
    clearBtn()
    if(selectGenre.length !=0){   
        selectGenre.forEach(id => {
            const hightlightedTag = document.getElementById(id);
            hightlightedTag.classList.add('highlight');
        })
    }

}

function clearBtn(){

 let clearBtn = document.getElementById('clear');
  if(clearBtn){
    clearBtn.classList.add('highlight');
  }else{
    let clear = document.createElement('div');
  clear.classList.add('tag','highlight')
  clear.id = 'clear';
  clear.innerText = 'Clear x';

  clear.addEventListener('click',()=> {
    selectGenre = [];
    setGenre();
    getMovies(API_URL);
  })
  tags1.append(clear);
  }
  
}



// Api functioning for JSON
getMovies(API_URL);

function getMovies(url){
    fetch(url).then(res => res.json()).then(data => {
        // var moviearr = data.results;
        // console.log(moviearr);
        //  console.log(moviearr);
        console.log(data.results);
         

         if(data.results.length != 0){
          showMovies(data.results);
         }else{
              main.innerHTML= `<h1 class="no-results">No results Found</h1>`
         }

         console.log(url);
         
        //  console.log(showMovies(data.results));
    
    })
}

// Api functioning calling for html part
function showMovies(data){
 
  
        
        data.forEach(movie => {
        const {title,poster_path,overview,vote_average} = movie;
        const moviel = document.createElement('div');
        moviel.classList.add('movie-list-item');
        moviel.innerHTML=`
        <div class="mx-4 my-4 " data-aos="fade-down">
        <img class="movie-list-item-img w-96 h-52 rounded-xl " src="${poster_path? IMG_URL+poster_path: "http://via.placeholder.com/1080x1580"}" alt="">
        <div class="flex">
            <span class="movie-list-item-title bg-slate-600 px-1 text-xl  top-9 left-10 z-10 absolute">${title}</span>
            <span class="rating top-3 right-2.5 z-10 absolute  bg-green-500 w-14 rounded-lg cursor-pointer text-center justify-center ${getColor(vote_average)}">
            ${vote_average}
            
            </span>
            <div class="overview">
        <p class="featured-desc w-6/12 text-gray-300 my-4  w-9/12   text-xs " >${overview.slice(0,70)}....</p>
          <h1>KNOW MORE</h1>
        </div>
        </div>
        
        
        

        
        </div>
        `;

        main.appendChild(moviel);
            
        })
    

    // data.forEach(movie => {
    //     const {title,poster_path,overview} = movie;
    //     const moviel = document.createElement('div');
    //     moviel.classList.add('movie-list-item');
    //     moviel.innerHTML=`
    //     <img class="movie-list-item-img w-96 h-52 rounded-xl" src="${IMG_URL+poster_path}" alt="">
    //     <span class="movie-list-item-title bg-slate-600 px-1 text-2xl  top-9 left-10 z-10 absolute">${title}</span>
    //     <p class="featured-desc w-6/12 text-gray-300 my-2  bg-slate-600 w-10/12 top-16 left-10 absolute">${overview}</p>
    //     <button class="movie-list-item-button bg-green-500 w-14 rounded-lg cursor-pointer absolute bottom-5 left-10">Watch</button>
    //     `;

    //     main.appendChild(moviel);
    // });

    // Animation of image
    AOS.init({
      duration: 1200,
  });
}

function getColor(vote){
    if(vote >= 8){
        return 'green';
    }
    else if(vote >= 5){
        return 'orange';
    }
    else{
        return 'red';
    }
}


form.addEventListener('submit', (e) => {
  e.preventDefault();

  const searchTerm = search.value;
  selectGenre=[];
  setGenre();
  if(searchTerm) {
      getMovies(searchURL+'&query='+searchTerm)
  }else{
      getMovies(API_URL);
  }

})

        

