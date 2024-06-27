document.getElementById('mute-button').addEventListener('click', function() {
    var audio = document.getElementById('background-audio');
    if (audio.muted) {
      audio.muted = false;
      this.textContent = 'Mute';
    } else {
      audio.muted = true;
      this.textContent = 'Unmute';
    }
  });
  