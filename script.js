let memes = ["meme1.jpg", "meme2.jpg", "meme3.jpg"];
let currentMemeIndex = 0;
let allCaptions = [];
let allVotes = [];
let playersFinished = 0;

const totalPlayers = 3;

function showMeme() {
  document.getElementById("game-screen").style.display = "block";
  document.getElementById("voting-screen").style.display = "none";
  document.getElementById("meme-image").src = "memes/" + memes[currentMemeIndex];
  document.getElementById("caption").value = "";
  playersFinished = 0;
  allCaptions = [];
  allVotes = [];
}

function submitCaption() {
  const caption = document.getElementById("caption").value.trim();
  if (caption === "") return alert("Boş yazı yazamazsın!");

  allCaptions.push({ meme: memes[currentMemeIndex], caption });
  playersFinished++;

  if (playersFinished >= totalPlayers) {
    startVotingPhase();
  } else {
    document.getElementById("game-screen").style.display = "none";
    document.getElementById("waiting-message").style.display = "block";
  }
}

function startVotingPhase() {
  document.getElementById("waiting-message").style.display = "none";
  document.getElementById("voting-screen").style.display = "block";
  showNextCaption(0);
}

let currentCaptionIndex = 0;

function showNextCaption(index) {
  if (index >= allCaptions.length) {
    endVoting();
    return;
  }

  const item = allCaptions[index];
  document.getElementById("voting-meme").src = "memes/" + item.meme;
  document.getElementById("voting-caption").innerText = item.caption;
  currentCaptionIndex = index;
}

function vote(type) {
  allVotes.push({ index: currentCaptionIndex, vote: type });
  showNextCaption(currentCaptionIndex + 1);
}

function endVoting() {
  document.getElementById("voting-screen").style.display = "none";
  alert("Oylama bitti. 10 saniye sonra yeni tur başlayacak...");

  setTimeout(() => {
    currentMemeIndex++;
    if (currentMemeIndex >= memes.length) {
      currentMemeIndex = 0;
    }
    showMeme();
  }, 10000);
}

// Başlangıçta sadece giriş ekranı görünür
window.onload = () => {
  document.getElementById("start-screen").style.display = "block";
  document.getElementById("game-screen").style.display = "none";
  document.getElementById("waiting-message").style.display = "none";
  document.getElementById("voting-screen").style.display = "none";
};

// Oyuna katıl tuşuna basıldığında
function startGame() {
  document.getElementById("start-screen").style.display = "none";
  showMeme();
}
