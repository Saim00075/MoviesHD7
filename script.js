const apiKey = '6d5e3a21b1a95787641bc071a2669578'; // Replace with your TMDb API key
const popularUrl = `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&language=en-US&page=1`;
const searchUrl = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&language=en-US&query=`;

const movieList = document.getElementById('movie-list');
const searchInput = document.getElementById('search-input');
const searchButton = document.getElementById('search-button');

// Function to fetch and display movies
function fetchMovies(url) {
    fetch(url)
        .then(response => response.json())
        .then(data => {
            const movies = data.results;
            movieList.innerHTML = ''; // Clear existing content

            movies.forEach(movie => {
                const movieCard = `
                    <div class="movie-card">
                        <a href="https://www.themoviedb.org/movie/${movie.id}" target="_blank">
                            <img src="https://image.tmdb.org/t/p/w200${movie.poster_path}" alt="${movie.title}">
                        </a>
                        <h3>${movie.title}</h3>
                        <p>Rating: ${movie.vote_average}/10</p>
                        <p>Release Date: ${movie.release_date}</p>
                    </div>
                `;
                movieList.innerHTML += movieCard;
            });
        })
        .catch(error => {
            console.error('Error fetching movies:', error);
            movieList.innerHTML = '<p>Failed to load movies. Please try again later.</p>';
        });
}

// Load popular movies by default
fetchMovies(popularUrl);

// Add event listener for the search button
searchButton.addEventListener('click', () => {
    const query = searchInput.value.trim();
    if (query) {
        fetchMovies(`${searchUrl}${encodeURIComponent(query)}`);
    } else {
        alert('Please enter a movie title to search.');
    }
});

// Optional: Allow pressing "Enter" to search
searchInput.addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
        searchButton.click();
    }
});