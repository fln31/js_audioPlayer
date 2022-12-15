const musicsData = [
  { title: "Solar", artist: "Betical", id: 1 },
  { title: "Electric-Feel", artist: "TEEMID", id: 2 },
  { title: "Aurora", artist: "SLUMB", id: 3 },
  { title: "Lost-Colours", artist: "Fakear", id: 4 },
];
let shuffledMusicsData = []

const musicTitle = document.querySelector('.music-title')
const artistName = document.querySelector('.artist-name')
const currentIndex = document.querySelector('.current-index')
const btnPlay = document.querySelector('.play-btn')
const btnNext = document.querySelector('.next-btn')
const btnPrev = document.querySelector('.prev-btn')
const btnShuffle = document.querySelector('.shuffle')
const currentTime = document.querySelector('.current-time')
const durationTime = document.querySelector('.duration-time')
const audioIn = document.querySelector('audio')
let audio = ''
let playOn = false
let shuffleOn = false
let i = 0;

// currentTime.textContent = audio.currentTime()
const displaySong = () => {
  let musics = []
  if (shuffleOn) {
    musics = shuffledMusicsData
  } else {
    musics = musicsData
  }

  musicTitle.textContent = musics[i].title
  artistName.textContent = musics[i].artist
  currentIndex.textContent = musics[i].id + '/' + musics.length
  audioIn.src = `ressources/music/${musics[i].title}.mp3`
  audio = new Audio(audioIn.src);
  handleTime()
  audio.addEventListener('loadedmetadata', () =>
  durationTime.textContent = formatSecondsAsTime(Math.floor(audio.duration))
  )
  audio.addEventListener('timeupdate', handleTime)
  console.log(shuffleOn, shuffledMusicsData, musics)
}

const handleTime = () => {
  currentTime.textContent = formatSecondsAsTime(Math.floor(audio.currentTime))
}

const formatSecondsAsTime = (secs) => {
  var hr  = Math.floor(secs / 3600);
  var min = Math.floor((secs - (hr * 3600))/60);
  var sec = Math.floor(secs - (hr * 3600) -  (min * 60));
  if (min < 10){
    min = "0" + min;
  }
  if (sec < 10){
    sec = "0" + sec;
  }
  return min + ':' + sec;
}

const handlePlayPause = (e) => {
  e.preventDefault();
  if (!playOn) {
    playOn = true;
    audio.play();
    btnPlay.querySelector('img').src = `ressources/icons/pause-icon.svg`
  } else {
    playOn = false;
    audio.pause()
    btnPlay.querySelector('img').src = `ressources/icons/play-icon.svg`
  }
}

const handleNext = (e) => {
  e.preventDefault();
  audio.pause();
  btnPlay.querySelector('img').src = `ressources/icons/play-icon.svg`
  audio = null
  if (i < musicsData.length - 1) {
    i++
  } else {
    i = 0
  }
  displaySong()
  audio.play()
  btnPlay.querySelector('img').src = `ressources/icons/pause-icon.svg`
}

const handlePrev = (e) => {
  e.preventDefault();
  audio.pause();
  btnPlay.querySelector('img').src = `ressources/icons/play-icon.svg`
  audio = null
  if (i < 1) {
    i = musicsData.length - 1
  } else {
    i--
  }
  displaySong()
  audio.play()
  btnPlay.querySelector('img').src = `ressources/icons/pause-icon.svg`
}

const handleShuffle = (e) => {
  e.preventDefault();
  if (!shuffleOn) {
    shuffleOn = true
    shuffledMusicsData = musicsData.slice().sort((a, b) => 0.5 - Math.random());
    btnShuffle.classList.add('active')
  } else {
    shuffleOn = false;
    shuffledMusicsData = null
    btnShuffle.classList.remove('active')
  }

}


displaySong();

btnPlay.addEventListener('click', handlePlayPause)
btnNext.addEventListener('click', handleNext)
btnPrev.addEventListener('click', handlePrev)
btnShuffle.addEventListener('click', handleShuffle)