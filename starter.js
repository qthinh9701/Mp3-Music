window.addEventListener("load", function () {
  const song = document.querySelector("#song");
  const playButton = document.querySelector(".player-play");
  const prevButton = document.querySelector(".player-prev");
  const nextButton = document.querySelector(".player-next");
  const durationText = document.querySelector(".player-duration");
  const remaining = document.querySelector(".player-remaining");
  const progressBar = document.querySelector("#progress-bar");
  const playerImage = document.querySelector(".player-image");
  const list = [
    "Cưới Thôi.mp3",
    "holo.mp3",
    "Lặng Lẻ Tổn Thương.mp3",
    "Sài Gòn Đau Lòng Quá.mp3",
    "spark.mp3",
    "summer.mp3",
    "Thế Thái.mp3",
    "Thức Giấc.mp3",
  ];
  let playing = true;
  let songIndex = 0;
  playButton.addEventListener("click", handlePlayMusic);
  nextButton.addEventListener("click", function () {
    handleChangeMusic(1);
  });
  prevButton.addEventListener("click", function () {
    handleChangeMusic(-1);
  });
  song.addEventListener("ended", function () {
    handleChangeMusic(1);
  });
  function handleChangeMusic(dir) {
    if (dir == 1) {
      //   next music
      songIndex++;
      if (songIndex > list.length - 1) {
        songIndex = 0;
      }
      song.setAttribute("src", `./files/${list[songIndex]}`);
      playing = true;
      handlePlayMusic();
    } else if (dir == -1) {
      //   prev music
      songIndex--;
      if (songIndex < 0) {
        songIndex = list.length - 1;
      }
      song.setAttribute("src", `./files/${list[songIndex]}`);
      playing = true;
      handlePlayMusic();
    }
  }
  playButton.addEventListener("click", handlePlayMusic);

  function handlePlayMusic() {
    if (playing) {
      song.play();
      playing = false;
      playerImage.classList.add("is-playing");
      playButton.classList.add("fa-pause");
    } else {
      song.pause();
      playing = true;
      playerImage.classList.remove("is-playing");
      playButton.classList.remove("fa-pause");
    }
  }
  function displayTime() {
    const { duration, currentTime } = song;
    progressBar.max = duration;
    progressBar.value = currentTime;
    remaining.textContent = formatTimer(currentTime);
    if (!duration) {
      durationText.textContent = "0:00:";
    } else {
      durationText.textContent = formatTimer(duration);
    }
  }
  function formatTimer(time) {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time - minutes * 60);
    return minutes + ":" + ("0" + seconds).slice(-2);
  }
  progressBar.addEventListener("change", handleChangeProgress);
  function handleChangeProgress() {
    song.currentTime = progressBar.value;
  }
  setInterval(displayTime, 500);
});
