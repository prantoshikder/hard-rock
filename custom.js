const form = document.getElementById('form');
const searchInput = document.getElementById('searchInput');
const resultShow = document.getElementById('search-resultShow');

const apiURL = 'https://api.lyrics.ovh';

//Search lyrics Add Event listeners
form.addEventListener('submit', e => {
    e.preventDefault();

    const searchTerm = searchInput.value.trim();

    if (!searchTerm) {
        alert('please type in a search term');
    } else {
        searchSongs(searchTerm);
    }

});

//Search by song title or artist
async function searchSongs(songsTitle) {
    // fetch(`${apiURL}/suggest/${songsTitle}`)
    //     .then(res => res.json())
    //     .then(data => console.log(data));

    const res = await fetch(`${apiURL}/suggest/${songsTitle}`);
    const data = await res.json();
    showData(data);
}

//Show song title and artist in DOM
function showData(data) {
    let output = '';
    data.data.map((song, index) => {
        if (index <= 9) {
            output += `
        <div class="single-result row align-items-center my-3 p-3">
            <div class="col-md-9">
                <h3 class="lyrics-name">
                <strong>${song.title}</strong>
                </h3>
                <p class ="author-name">Album by
                 <span>${song.artist.name}</span>
                </p>
            </div>
            <div class="col-md-3 text-md-right text-center">    
                <button class="btn btn-success" data-artist="${song.artist.name}" data-songTitle="${song.title}">Get Lyrics</button>
            </div>
        </div>    
        `;
        }
    });
    resultShow.innerHTML = `<div class="songs">${output}</div>`;
}


//Get lyrics for song
async function getLyrics(artist, songTitle) {
    const res = await fetch(`${apiURL}/v1/${artist}/${songTitle}`);
    const data = await res.json();
    const lyrics = data.lyrics.replace(/(\r\n|\r|\n)/g, '<br>');

    resultShow.innerHTML = `<div class="col-md-8 mx-auto py-4">
                            <div class="row align-items-center my-3 p-3">
                            <h2>
                            <strong>${artist}</strong>
                            - ${songTitle}</h2>
                            <br>
                            <h5>${lyrics}</h5>
                            </div>
                        </div>    
                        `;
}

//Get lyrics button click
resultShow.addEventListener('click', e => {
    const clickedEl = e.target;
    if (clickedEl.tagName === 'BUTTON') {
        const artist = clickedEl.getAttribute('data-artist');
        const songTitle = clickedEl.getAttribute('data-songTitle');
        getLyrics(artist, songTitle);
    }
});