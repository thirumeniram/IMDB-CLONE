const API_KEY = "6181d872a08827493f18516eadb51418";

// Extracting the 'id' from the URL query parameters
var id = "";
const urlParams = new URLSearchParams(location.search);

for (const [key, value] of urlParams) {
  id = value;
}

// Constructing the API URL for retrieving movie details and videos
var link = `/movie/${id}?language=en-US&append_to_response=videos&`;
var find_url = "https://api.themoviedb.org/3" + link + "api_key=" + API_KEY;

// Function to make the API call
function apiCall(url) {
  console.log(url);

  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      // Clearing the movie display container
      document.getElementById("movie-display").innerHTML = "";
      getMovies(data);
    })
    .catch((err) => {
      window.alert("Cannot get movie details.");
    });
}

// Function to filter videos in the API response
function filtervideo(obj) {
  var vtitle = obj.name;
  if (vtitle.includes("Official Trailer")) {
    return obj;
  }
}

// Function to display the movie details
function getMovies(myJson) {
  // Filtering the videos to find the official trailer
  var MovieTrailer = myJson.videos.results.filter(filtervideo);

  var moviesDiv = document.createElement("div");
  moviesDiv.classList.add("each-movie-page");

  // Setting the YouTube URL for the trailer
  var youtubeURL;
  if (MovieTrailer.length === 0) {
    if (myJson.videos.results.length === 0) {
      youtubeURL = "";
    } else {
      youtubeURL = `https://www.youtube.com/embed/${myJson.videos.results[0].key}`;
    }
  } else {
    youtubeURL = `https://www.youtube.com/embed/${MovieTrailer[0].key}`;
  }

  // HTML for displaying the movie details
  moviesDiv.innerHTML = `
        <div class="movie-poster">
            <img src=${
              "https://image.tmdb.org/t/p/w500" + myJson.poster_path
            } alt="Poster">
        </div>
        <div class="movie-specific-details">
            <div class="title">
                ${myJson.title}
            </div>

            <div class="trailer-div" id="trailer-btn">
                <span class="trailer"><i class="fab fa-youtube"></i>Trailer</span>
            </div>
            <span><iframe width="460" height="250" src=${youtubeURL} title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe></span>
            <div style="display: flex;">
                <div class="duration">
                    <b><i class="fas fa-play-circle"></i></b> ${
                      myJson.runtime
                    } mins
                </div>
                <div class="rating">
                    <b>Rating</b>: ${myJson.vote_average}
                </div>
            </div>
            <div class="plot-description">
                ${myJson.overview}
            </div>
        </div>
    `;

  // Appending the HTML to the movie display container
  document.getElementById("movie-display").appendChild(moviesDiv);
}

// Making the API call
apiCall(find_url);
