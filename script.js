const musicContainer = document.getElementById('music-container');

const playBtn = document.getElementById('play');
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');

const audio = document.getElementById('audio');
const progress = document.getElementById('progress');
const progressContainer = document.getElementById('progress-container');

const title = document.getElementById('title');
const cover = document.getElementById('cover');


// Song titles
const songs = ['All time Low', 'Alone', 'Bailando', 'Con Calma', 'Diamonds', 'Faded', 'Girls like you', 'Hymn For TheWeekend', 'Maps', 'Starving', 'Wolves'];

// Keep track of song
let songIndex = 2;

// Initially load song details into dom
loadSong(songs[songIndex]);


// Update song details
function loadSong(song) {
    title.innerText = song;
    audio.src = `music/${song}.mp3`;
    cover.src = `images/${song}.jpg`;
}

// Play song
function playSong() {
    musicContainer.classList.add('play');
    playBtn.querySelector('i.fa').classList.remove('fa-play');
    playBtn.querySelector('i.fa').classList.add('fa-pause');

    audio.play();
}

// Pause song
function pauseSong() {
    musicContainer.classList.remove('play');
    playBtn.querySelector('i.fa').classList.add('fa-play');
    playBtn.querySelector('i.fa').classList.remove('fa-pause');

    // cover.style.animationPlayState = 'initial';
    // cover.src = `images/${song}.jpg`;

    audio.pause();
}

function prevSong() {
    songIndex--;
    if (songIndex < 0) {
        songIndex = songs.length-1;
    }

    loadSong(songs[songIndex]);

    playSong();
}

function prevSong() {
    songIndex--;
    if (songIndex < 0) {
        songIndex = songs.length-1;
    }
    loadSong(songs[songIndex]);
    playSong();
}


function nextSong() {
    songIndex == songs.length-1 ? songIndex = 0 : songIndex++;

    loadSong(songs[songIndex]);
    playSong();
}

// Update Progress bar
function updateProgress(e) {
    const { duration, currentTime } = e.srcElement;
    const progressPercent = (currentTime / duration)*100;
    progress.style.width = `${progressPercent}%`;
}

// Sets progress bar on click
function setProgress(e) {
    const totalWidthOfProgressBar = this.clientWidth;
    const clickX = e.offsetX;
    const duration = audio.duration;

    audio.currentTime = ( clickX / totalWidthOfProgressBar ) * duration;
}



// Event Listeners
playBtn.addEventListener('click', () => {
    const isPlaying = musicContainer.classList.contains('play');

    if (isPlaying) {
        pauseSong();
    } else {
        playSong();
    }
});

// Change song
prevBtn.addEventListener('click', prevSong);
nextBtn.addEventListener('click', nextSong);

// Time/song update event
audio.addEventListener('timeupdate', updateProgress);

// click on progress bar
progressContainer.addEventListener('click', setProgress);


// Song ends
audio.addEventListener('ended', nextSong);