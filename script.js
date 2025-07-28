let username = "";
let currentMemeIndex = 0;
let memes = [
  "meme1.jpg",
  "meme2.jpg",
  "meme3.jpg"
];

function joinGame() {
  username = document.getElementById("username").value.trim();
  if (!username) return alert("Adını yazman gerekiyor!");
  
  document.getElementById("welcome-screen").style.display = "none";
  document.getElementById("game-screen").style.display = "block";

  showMeme();
}

function showMeme() {
  const memeImage = document.getElementById("meme-image");
  memeImage.src = memes[currentMemeIndex];
  document.getElementById("meme-text").value = "";
}

function submitMeme() {
  const text = document.getElementById("meme-text").value.trim();
  if (!text) return alert("Bir şey yazmalısın!");

  const memeData = {
    user: username,
    text: text,
    meme: memes[currentMemeIndex],
    votes: { up: 0, meh: 0, down: 0 }
  };

  const key = db.ref("memes").push().key;
  db.ref("memes/" + key).set(memeData);

  document.getElementById("game-screen").style.display = "none";
  waitForVoting(key);
}

function waitForVoting(submittedKey) {
  db.ref("memes").once("value", (snapshot) => {
    const memesData = snapshot.val();
    const entries = Object.entries(memesData || {});
    
    let votingQueue = entries.filter(([key, val]) => key !== submittedKey);

    if (votingQueue.length === 0) {
      alert("Oylanacak başka meme henüz yok. Lütfen bekle...");
      return;
    }

    let i = 0;
    document.getElementById("voting-screen").style.display = "block";

    function showNextVote() {
      if (i >= votingQueue.length) {
        alert("Oylama bitti. 10 saniye sonra yeni tur başlıyor ! ");
        document.getElementById("voting-screen").style.display = "none";
        return;
      }

      // 10 saniye sonra yeni meme ile oyun başlasın
setTimeout(() => {
  currentMemeIndex++;

  // Eğer meme bitmişse başa dön
  if (currentMemeIndex >= memes.length) {
    currentMemeIndex = 0;
  }

  document.getElementById("game-screen").style.display = "block";
  showMeme();
}, 10000); // 10000 ms = 10 saniye
