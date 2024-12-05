const apiKey = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyNWVkNDc2ODVmOTQxZTk0NjRhNmZiMDE5N2E2ZTI5NiIsIm5iZiI6MTczMzQxMTMwNC43NjksInN1YiI6IjY3NTFjMWU4MzQ5NGNjOWJmYmM2MDJjMSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.MZ9HuqDoztAIBVljtg3EV16icjxCM6TYiuMYDD7NT04';

export function getMovies() {
    const url = 'https://api.themoviedb.org/3/movie/popular?language=en-US&page=1';
    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: 'Bearer ' + apiKey
        }
    };
    
    return fetch(url, options)
    
}
