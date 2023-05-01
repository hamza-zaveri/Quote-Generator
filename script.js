const quoteText = document.querySelector(".quote"),
  // authorName = document.querySelector(".author .name"),
  quoteBtn = document.querySelector("button"),
  soundBtn = document.querySelector(".sound"),
  copyBtn = document.querySelector(".copy"),
  twitterBtn = document.querySelector(".twitter");

//random quote function
function randomQuote() {
  quoteBtn.classList.add("loading"); //creates a new class in button html tag with name loading
  quoteBtn.innerText = "Loading Quote... ";
  //fetching random quotes from the below site and parsing it into the javacript object
  fetch("https://api.kanye.rest")
    .then((res) => res.json())
    .then((result) => {
      //console.log(result.quote); -> main quote
      //console.log(result.author); -> author name
      quoteText.innerText = result.quote;
      // authorName.innerText = result.author;
      quoteBtn.innerText = "New Quote";
      quoteBtn.classList.remove("loading");
    });
}

soundBtn.addEventListener("click", () => {
  //SpeechSynthesisUtterance is a web speech api that represents a speech request
  //speak method of speechSynthesis speaks the utterance

  if ("speechSynthesis" in window) {
    let utterance = new SpeechSynthesisUtterance();
    utterance.text = quoteText.innerText + " by " + authorName.innerText;
    console.log(utterance.text);
    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(utterance);
  } else {
    alert("speechSynthesis not supported");
  }
});

copyBtn.addEventListener("click", () => {
  //copying the quote text on copyBtn click, writeText() property writes the specified text string to the system clipboard.
  navigator.clipboard.writeText(
    quoteText.innerText + " ~" + authorName.innerText
  );
});
twitterBtn.addEventListener("click", () => {
  let tweetUrl = `https://twitter.com/intent/tweet?url=${quoteText.innerText} + ~+${authorName.innerText}`;
  window.open(tweetUrl, "_blank");
});

quoteBtn.addEventListener("click", randomQuote);

//script for the copied button notification success
const toast = document.querySelector(".toast");
const closeIcon = document.querySelector(".close");
const progress = document.querySelector(".progress");

copyBtn.addEventListener("click", () => {
  toast.classList.add("active");
  progress.classList.add("active");
  setTimeout(() => {
    toast.classList.remove("active");
  }, 5000);
  setTimeout(() => {
    progress.classList.remove("active");
  }, 5300);
});
closeIcon.addEventListener("click", () => {
  toast.classList.remove("active");
  setTimeout(() => {
    progress.classList.remove("active");
  }, 300);
});
