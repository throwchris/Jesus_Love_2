let verses = [];
let currentIndex = 0;
let showingFront = true;

const flipCard = document.getElementById("flipCard");

const refFront = document.getElementById("referenceTextFront");
const verseFront = document.getElementById("verseTextFront");
const refBack = document.getElementById("referenceTextBack");
const verseBack = document.getElementById("verseTextBack");

fetch("identity-who-god-says-we-are.json")
  .then(response => response.json())
  .then(data => {
    verses = data;
    loadVerse();
  })
  .catch(error => console.error("JSON failed:", error));

function buildVerseHTML(segments) {
  let html = "";

  segments.forEach(segment => {
    if (segment.red) {
      html += `<span class="red-letter">${segment.text}</span>`;
    } else {
      html += segment.text;
    }
  });

  return html;
}

function loadVerse() {
  if (!verses.length) return;

  const verse = verses[currentIndex];
  const verseHTML = buildVerseHTML(verse.segments);

  if (showingFront) {
    refFront.innerText = verse.ref;
    verseFront.innerHTML = verseHTML;
  } else {
    refBack.innerText = verse.ref;
    verseBack.innerHTML = verseHTML;
  }
}

function nextVerse() {
  currentIndex = (currentIndex + 1) % verses.length;
  flip();
}

function previousVerse() {
  currentIndex = (currentIndex - 1 + verses.length) % verses.length;
  flip();
}

function flip() {
  flipCard.classList.toggle("flipped");
  showingFront = !showingFront;
  loadVerse();
}