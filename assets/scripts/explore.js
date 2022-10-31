// explore.js

window.addEventListener("DOMContentLoaded", init);

function init() {
  // TODO
  let voiceSelect = document.getElementById("voice-select");
  const button = document.querySelector("button");
  let userInput = document.getElementById("text-to-speak");
  let img = document.images;
  let voices = [];

  function populateVoiceList() {
    voices = speechSynthesis.getVoices();
    for (let i = 0; i < voices.length; i++) {
      const option = document.createElement("option");
      option.textContent = `${voices[i].name} (${voices[i].lang})`;
      if (voices[i].default) {
        option.textContent += " — DEFAULT";
      }
      option.setAttribute("data-lang", voices[i].lang);
      option.setAttribute("data-name", voices[i].name);
      voiceSelect.appendChild(option);
    }
  }
  populateVoiceList();

  if (speechSynthesis.onvoiceschanged !== undefined) {
    speechSynthesis.onvoiceschanged = populateVoiceList;
  }

  button.addEventListener("click", (event) => {
    event.preventDefault();
    img[0].src = "assets/images/smiling-open.png";
    const utterThis = new SpeechSynthesisUtterance(userInput.value);
    const selectedOption =
      voiceSelect.selectedOptions[0].getAttribute("data-name");
    for (let i = 0; i < voices.length; i++) {
      if (voices[i].name === selectedOption) {
        utterThis.voice = voices[i];
      }
    }
    speechSynthesis.speak(utterThis);
    let intervalVar = setInterval(function isSpeaking() {
      if (!speechSynthesis.speaking) {
        clearInterval(intervalVar);
        img[0].src = "assets/images/smiling.png";
      }
    }, 1000);
    userInput.blur();
  });
}
