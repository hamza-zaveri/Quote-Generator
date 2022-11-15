const quoteText = document.querySelector(".quote"),
    authorName = document.querySelector(".author .name"),
    quoteBtn = document.querySelector("button"),
    soundBtn = document.querySelector(".sound"),
    copyBtn = document.querySelector(".copy"),
    twitterBtn = document.querySelector(".twitter");

//random quote function
function randomQuote() {
    quoteBtn.classList.add("loading"); //creates a new class in button html tag with name loading
    quoteBtn.innerText = "Loading Quote... ";
    //fetching random quotes from the below site and parsing it into the javacript object
    fetch("https://free-quotes-api.herokuapp.com/")
        .then((res) => res.json())
        .then((result) => {
            //console.log(result.quote); -> main quote
            //console.log(result.author); -> author name
            quoteText.innerText = result.quote;
            authorName.innerText = result.author;
            quoteBtn.innerText = "New Quote";
            quoteBtn.classList.remove("loading");
        });
}

soundBtn.addEventListener("click", () => {
    //SpeechSynthesisUtterance is a web speech api that represents a speech request
    let utterance = new SpeechSynthesisUtterance(
        `${quoteText.innerText} by ${authorName.innerText}`
    );
    speechSynthesis.speak(utterance); //speak method of speechSynthesis speaks the utterance
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