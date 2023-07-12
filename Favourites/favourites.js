// Getting the favorite movies stored in the local storage
var storageData = localStorage.getItem("MovieArray");
var favMovieArray = JSON.parse(storageData);

//  API Key
const API_KEY = "api_key=6181d872a08827493f18516eadb51418";

// Looping over the favorite movie array
favMovieArray.forEach(async (id) => {
  let link = `/movie/${id}?language=en-US&`;
  let url = "https://api.themoviedb.org/3" + link + API_KEY;
  await apiCall(url, id);
});

// Function to make API call
function apiCall(url, id) {
  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      favMovieData(data, id);
    })
    .catch((error) => {
      console.log(error);
    });
}

// Displaying the fav movies here
function favMovieData(jsonResp, id) {
  var individualMovie = document.createElement("div");
  individualMovie.classList.add("movie-card");
  individualMovie.innerHTML = `
        <div class="details">

            <div class="thumbnail">
                <a href="../Movies/movies.html?id=${id}">
                    <img id="movieimg" src=${
                      "https://image.tmdb.org/t/p/w300" + jsonResp.poster_path
                    } alt="Thumbnail">
                <a/>
            </div>
            <div id="details">
                <div class="title">
                <a href="movie.html?id=${id}"> ${jsonResp.title} </a> 
                </div>
            
                <div class="remove-movie" id='${id}' onclick="deleteMovie(${id})">
                <i id="removeicon" class="far fa-trash-alt"></i>
                
                </div>
            </div>
        </div>

    `;
  document.getElementById("movie-container").appendChild(individualMovie);
}

// Removing all the movies from the favourite list and clearing the local storage.
document
  .getElementById("clear-whole-list")
  .addEventListener("click", function () {
    if (window.confirm("All the favourite movies will be deleted!")) {
      localStorage.clear();
      window.location.reload();
    }
  });

// Function to delete a single movie from fav array
async function deleteMovie(id) {
  if (window.confirm("this movie will be deleted from the list")) {
    var temp = await JSON.parse(localStorage.getItem("MovieArray"));
    var i = await temp.indexOf(id.toString());
    await temp.splice(i, 1);
    await localStorage.setItem("MovieArray", JSON.stringify(temp));
    await window.location.reload();
  }
}
