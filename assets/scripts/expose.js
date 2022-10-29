// expose.js

window.addEventListener("DOMContentLoaded", init);

function init() {
  // TODO
  const hornVar = document.getElementById("horn-select");
  const aud = document.querySelector("audio");
  let img = document.images;
  let volControls = document.getElementById("volume");
  const button = document.querySelector("button");
  const jsConfetti = new JSConfetti();

  hornVar.addEventListener("change", (event) => {
    let hornVarVal = hornVar.value;
    img[0].src = "assets/images/" + hornVarVal + ".svg";
    aud.src = "assets/audio/" + hornVarVal + ".mp3";
  });

  volControls.addEventListener("change", (event) => {
    let vol = volControls.value;
    if (vol == 0) {
      img[1].src = "assets/icons/volume-level-0.svg";
    } else if (vol < 33) {
      img[1].src = "assets/icons/volume-level-1.svg";
    } else if (vol < 67) {
      img[1].src = "assets/icons/volume-level-2.svg";
    } else {
      img[1].src = "assets/icons/volume-level-3.svg";
    }
    aud.volume = vol / 100;
  });

  button.addEventListener("click", (event) => {
    let hornVarVal = hornVar.value;
    if (hornVarVal == "party-horn") {
      jsConfetti.addConfetti();
    }
    aud.play();
  });
}
