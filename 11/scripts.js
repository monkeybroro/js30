const player = document.querySelector('.player');
const video = document.querySelector('.player__video');
const play_button = document.querySelector('.player__button');
const progress = player.querySelector('.progress');
const progressBar = player.querySelector('.progress__filled');
const skipButtons = player.querySelector('[data-skip]');
const sliders = player.querySelectorAll('.player__slider');
let dragBegin = false;

function togglePlay() {
    if (video.paused) video.play();
    else video.pause();
}
function updatePlayIcon() {
    if (this.paused) play_button.innerHTML = '►';
    else play_button.innerHTML = '||';
}
function skip() {
    video.currentTime += parseFloat(this.dataset.skip);
}

function handleSliderChange() {
    video[this.name] = this.value;
}
function handleProgress() {
    const progress = video.currentTime / video.duration * 100;
    progressBar.style.flexBasis = `${progress}%`;
}
function playToCertain(e) {
    const toTime = e.offsetX / progress.offsetWidth * video.duration;
    video.currentTime = toTime;
}

function mouseUp(e) {
    if (dragBegin) {
        playToCertain(e);
        dragBegin = false;
    }
}
play_button.addEventListener('click', togglePlay);
video.addEventListener('click', togglePlay);
video.addEventListener('play', updatePlayIcon);
video.addEventListener('pause', updatePlayIcon);
video.addEventListener('timeupdate', handleProgress);
skipButtons.addEventListener('click', skip);
sliders.forEach(slider => slider.addEventListener('change', handleSliderChange));
progress.addEventListener('click', playToCertain);
progress.addEventListener('mousedown', () => dragBegin = true);
progress.addEventListener('mouseup', () => dragBegin = false);
progress.addEventListener('mousemove', (e) => dragBegin && playToCertain(e));