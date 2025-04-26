// audioplayer.js

class AudioPlayer extends HTMLElement {
  audio = null;
  play = null;
  elapsed = null;
  total = null;
  scrubber = null;
  volume = null;
  muteButton = null;
  premuteVolume = 100;
  menu = null;
  notebook = null;
  
  constructor() {
    super();
    
    this.audio = this.querySelector('audio');
    console.log(this.querySelector('audio'));
    
    this.appendChild(document.getElementById('audio-player').content);
    
    this.play = this.querySelector('#audioplayer-play');
    this.elapsed = this.querySelector('#audioplayer-time-elapsed');
    this.total = this.querySelector('#audioplayer-time-total');
    this.scrubber = this.querySelector('#audioplayer-scrubber');
    this.volume = this.querySelector('#audioplayer-volume-control');
    this.muteButton = this.querySelector('#audioplayer-volume-mute');
    this.menu = this.querySelector('#audioplayer-menu');
    this.notebook = this.querySelector('#notebook');
    
    this.audio.addEventListener('pause', this.handlePause.bind(this));    
    this.audio.addEventListener('play', this.handlePlay.bind(this));
    this.audio.addEventListener('timeupdate', this.handleTimeupdate.bind(this));
    this.audio.addEventListener('canplay', this.handleCanplay.bind(this));
    this.audio.addEventListener('canplaythrough', this.handleCanplaythrough.bind(this));
    this.audio.addEventListener('loadedmetadata', this.handleLoadedmetadata.bind(this));
    this.audio.addEventListener('volumechange', this.handleVolumechange.bind(this));
    
    this.play.addEventListener('click', this.handlePlayClick.bind(this));
    
    this.scrubber.addEventListener('change', this.handleScrubberChange.bind(this));
    this.scrubber.addEventListener('input', this.handleScrubberInput.bind(this));
    
    this.volume.addEventListener('change', this.handleUIVolumeChange.bind(this));
    this.volume.addEventListener('input', this.handleUIVolumeInput.bind(this));
    
    this.muteButton.addEventListener('click', this.handleMuteClick.bind(this));
    
    this.menu.addEventListener('click', this.handleMenuClick.bind(this));
    
    this.notebook.addEventListener('click', this.handleNotebookClick.bind(this));
  }
  
  handleMenuClick(e) {
    document.getElementById('menu-dialog').showModal();
  }
  
  handleNotebookClick(e) {
    document.getElementById('notebook-dialog').showModal();
  }
  
  handleMuteClick(e) {
    this.toggleMute();
  }
  
  mute() {
    this.premuteVolume = this.audio.volume;
    this.audio.volume = 0;
    
    this.setAttribute('muted', '');
  }
  
  unmute() {
    this.audio.volume = this.premuteVolume;
    
    this.removeAttribute('muted');
  }
  
  toggleMute() {
    let v = this.volume.value;
    
    if (v == 0) {
      this.unmute();
      return;
    }
    
    this.mute();
  }
  
  handleUIVolumeChange(e) {
    this.audio.volume = e.target.value / 100;
  }
  
  handleUIVolumeInput(e) {
    this.audio.volume = e.target.value / 100;
  }
  
  handleVolumechange(e) {
    this.updateVolume();
    
    if (this.audio.volume <= 0)
    {
      this.setAttribute('muted','');
      return;
    }
    
    this.removeAttribute('muted');
  }
  
  handleScrubberInput(e) {
    this.audio.currentTime = e.target.value;
  }
  
  handleScrubberChange(e) {
    this.audio.currentTime = e.target.value;
  }
  
  handleLoadedmetadata(e) {
    console.log('loadedmetadata');
    this.updateTimeElapsed();
    this.updateTimeTotal();
    this.updateScrubber();
    this.updateVolume();
  }
  
  handleCanplay(e) {
    console.log('canplay');
    this.updateTimeElapsed();
  }
  
  handleCanplaythrough(e) {
    console.log('canplaythrough');
    this.updateTimeElapsed();
    this.updateTimeTotal();
    this.updateScrubber();
  }
  
  handleTimeupdate(e) {
    this.updateTimeElapsed();
    this.updateScrubber();
  }
  
  handlePause(e) {
    this.play.textContent = "Play";
    this.removeAttribute('paused');
  }
  
  handlePlay(e) {
    this.play.textContent = "Pause";
    this.setAttribute('paused', '');
  }
  
  _formatTime(totalSeconds) {
    if (typeof(totalSeconds) == 'undefined' || totalSeconds == null) {
      return "-:--";
    }
    
    let minutes = 0;
    let seconds = 0;
    
    if (totalSeconds >= 60) {
      minutes = Math.floor(totalSeconds / 60);
    }
    
    seconds = Math.floor(totalSeconds - (minutes * 60));
    
    if (seconds < 10) {
      seconds = "0" + seconds;
    }
    
    
    return `${minutes}:${seconds}`;
  }
  
  updateTimeTotal() {
    let duration = this.audio.duration;
    console.log('updateTimeTotal', duration);
    
    this.total.textContent = this._formatTime(this.audio.duration);
  }
  
  updateTimeElapsed() {
    let currentTime = this.audio.currentTime;
    
    this.elapsed.textContent = this._formatTime(this.audio.currentTime);
  }
  
  updateScrubber() {
    this.scrubber.max = this.audio.duration;
    this.scrubber.value = this.audio.currentTime;
  }
  
  updateVolume() {
    console.log('audio', this.audio.volume);
    this.volume.max = 1 * 100;
    this.volume.value = this.audio.volume * 100;
  }
  
  togglePlay() {
    if (this.audio.paused) {
      this.audio.play();
      return;
    }
    
    this.audio.pause();
  }
  
  handlePlayClick(e) {
    this.togglePlay();
  }
  
  connectedCallback() {
    console.log('connected');
    console.log(this.audio.readyState);
    
    switch(this.audio.readyState) {
      case 1:
        this.handleLoadedmetadata();
        break;
      case 2:
      case 3:
      case 4:
        this.handleLoadedmetadata();
        this.handleCanplay();
        break;
      default:
        break;
    }
  }
}

customElements.define("audio-player", AudioPlayer);
