const titleContainerTag = document.querySelector(".titleContainer");
const audioContainerTag = document.querySelector(".audioContainer");
const textTag = document.querySelector(".text");
const lineProgressTag = document.querySelector(".lineProgress");
const pauseTag = document.querySelector(".pause");
const playTag = document.querySelector(".play");
const backwardTag = document.querySelector(".backward");
const forwardTag = document.querySelector(".forward");
const songArr = [
  { songPath: "music/Di Ka Sout Ny Thu.m4a", songName: "Di Ka Sout Ny Thu" },
  { songPath: "music/Ka Na Tr.m4a", songName: "Ka Na Tr" },
  {
    songPath: "music/La Minn Nae Pin lal.m4a",
    songName: "La Minn Nae Pin lal",
  },
  { songPath: "music/Phat Htar Mll.m4a", songName: "Phat Htar Mll" },
  { songPath: "music/Bar lo Nay Thay ll.m4a", songName: "Bar lo Nay Thay ll" },
];

for (let i = 0; i < songArr.length; i++) {
  const sub = document.createElement("div");
  sub.classList.add("sub");
  sub.addEventListener("click", () => {
    const songLink = songArr[i].songPath;
    audioContainerTag.src = songLink;
    audioContainerTag.play();
    playing = true;
    pauseAndPlay();
    id = i;
  });

  const title = songArr[i].songName;
  const titleWithNum = (i + 1).toString() + ". " + title;
  sub.append(titleWithNum);
  titleContainerTag.append(sub);
}
let constantTime, duration, duration2;
audioContainerTag.addEventListener("loadeddata", () => {
  duration = Math.floor(audioContainerTag.duration);
  constantTime = commonTime(duration);
});
audioContainerTag.addEventListener("timeupdate", () => {
  duration2 = Math.floor(audioContainerTag.currentTime);
  const barTime = commonTime(duration2);
  progressBar(duration2);
  textTag.textContent = barTime + " / " + constantTime;
});
const commonTime = (com) => {
  const min = Math.floor(com / 60);
  const sec = Math.floor(com % 60);
  const newMin = min < 10 ? "0" + min.toString() : min;
  const newSec = sec < 10 ? "0" + sec.toString() : sec;
  return newMin + ":" + newSec;
};
const progressBar = (duration2) => {
  const progressWidth = (300 / duration) * duration2;
  const getWidth = progressWidth.toString() + "px";
  lineProgressTag.style.width = getWidth;
  lineProgressTag.style.height = 5;
};
let id = 0;
pauseTag.addEventListener("click", () => {
  playing = true;
  const timeCheck = Math.floor(audioContainerTag.currentTime);
  if (timeCheck === 0) {
    const playTrack = songArr[id].songPath;
    audioContainerTag.src = playTrack;
    audioContainerTag.play();
    pauseAndPlay();
  } else {
    audioContainerTag.play();
    pauseAndPlay();
  }
});
playTag.addEventListener("click", () => {
  playing = false;
  audioContainerTag.pause();
  pauseAndPlay();
});
backwardTag.addEventListener("click", () => {
  if (id === 0) {
    return;
  } else {
    id -= 1;
    forwradBackward();
  }
});
forwardTag.addEventListener("click", () => {
  if (id === songArr.length - 1) {
    return;
  } else {
    id += 1;
    forwradBackward();
  }
});
const forwradBackward = () => {
  const forForward = songArr[id].songPath;
  audioContainerTag.src = forForward;
  audioContainerTag.play();
  playing = true;
  pauseAndPlay();
};
let playing = false;
const pauseAndPlay = () => {
  if (playing) {
    pauseTag.style.display = "none";
    playTag.style.display = "block";
  } else {
    pauseTag.style.display = "block";
    playTag.style.display = "none";
  }
};
