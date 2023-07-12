//Api Key and URL

const API_KEY = "6181d872a08827493f18516eadb51418";
const API_URL = `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_watch_monetization_types=flatrate`;

// Selecting required DOM elements

var container = document.getElementById("Movies-component");
var movieSearch = document.getElementById("MoviesSearch");
var prevButton = document.querySelector(".prevPage");
var nextButton = document.querySelector(".nextPage");

// Array to store fav movies
var favouriteMovies = [];
//  Array to keep track of favorite movies stored in local storage
var favouriteMovieStorage = [];

// Function to make API call
var apiCall = (url) => {
  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      container.innerHTML = "";
      const moviesArray = data.results;

      moviesArray.forEach((movie) => moviesElement(movie));
    });
};

// creating the movie-element for the home page
function moviesElement(movie) {
  var movieElement = document.createElement("div");
  movieElement.classList.add("movie-component");

  movieElement.innerHTML = `
  <a href="../Movies/movies.html?id=${movie.id}"><img src=${
    "https://image.tmdb.org/t/p/w300" + movie.poster_path
  } alt="{movie.id}"></a>
  <div class="movie-info">
    <h3>${movie.title}</h3>
    <div class="star-fab">
    <span class="icon-color"><i class="fa-solid fa-star">&nbsp;</i>${
      movie.vote_average
    }</span>
      <div class="add-movie-to-list" id="${movie.id}" onclick="addMovie(${
    movie.id
  })">
        <span class="icon-color"><i class="fas fa-heart"></i></span>
      </div>
     
    </div>
  </div>
  <div class="overview">${movie.overview}</div>
  `;
  //  appending this element to movieElement Container
  container.appendChild(movieElement);
}

// Function to add a movie to the favorites list
function addMovie(btnId) {
  document.getElementById(btnId).innerHTML =
    '<span class="icon-color"><i class="fas fa-check"></i></span>';
  // to avoid adding duplicate movies
  if (!favouriteMovies.includes(btnId.toString())) {
    favouriteMovies.push(btnId.toString());
  }
  // getting favorite movies  array from local storage
  favouriteMovieStorage = JSON.parse(localStorage.getItem("MovieArray"));
  if (favouriteMovieStorage == null) {
    //  // If the array is empty
    localStorage.setItem("MovieArray", JSON.stringify(favouriteMovies));
  } else {
    //  If the array is not empty
    favouriteMovies.forEach((item) => {
      if (!favouriteMovieStorage.includes(item)) {
        favouriteMovieStorage.push(item);
      }
    });
    // adding the movie in local storage
    localStorage.setItem("MovieArray", JSON.stringify(favouriteMovieStorage));
  }
}

// Movie search  function
movieSearch.addEventListener("keyup", function () {
  // input given by the use in the movieSearch box
  var input = movieSearch.value;
  console.log(input);
  // getting all the movies related to the input in the movieSearch option
  var inputUrl = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${input}`;

  if (input.length != 0) {
    apiCall(inputUrl);
  } else {
    window.location.reload();
  }
});

var pageNumber = 1;

nextButton.addEventListener("click", () => {
  pageNumber++;
  let tempURL = `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${pageNumber}&with_watch_monetization_types=flatrate`;
  apiCall(tempURL);

  // Enable the previous button when navigating to the next page
  prevButton.disabled = false;
});

// Event listener for the previous page button
prevButton.addEventListener("click", () => {
  if (pageNumber === 1) return;

  pageNumber--;
  // Construct the URL for the previous page
  let tempURL = `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${pageNumber}&with_watch_monetization_types=flatrate`;

  apiCall(tempURL);

  if (pageNumber === 1) {
    prevButton.disabled = true;
  }
});

//calling Api
apiCall(API_URL);
