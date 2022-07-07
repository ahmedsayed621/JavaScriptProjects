let apiQuotes = [];
const quoteGenerator = document.getElementById('quote-container')
const quoteText = document.getElementById('quote')
const authorText = document.getElementById('Author')
const twitterBtn = document.getElementById('twitter')
const quoteBtn = document.getElementById('new-quote')

//show new quote 
function newQuote() {
    //pick a rondom quote from api array
    const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)]

    //check if author is blank and replace with unkonwn
    if (!quote.author) {
        authorText.textContent = 'UnKnown'
    }
    else {
        authorText.textContent = quote.author;
    }
    //check quote length to detrimine style
    if (quote.text.length > 50) {
        quoteText.classList.add('long-quote')
    }
    else {
        quoteText.classList.remove('long-quote')
    }

    quoteText.textContent = quote.text
}

async function getQuotes() {
    const apiUrl = 'https://type.fit/api/quotes';

    try {

        const response = await fetch(apiUrl);
        apiQuotes = await response.json();
        newQuote();
    }
    catch (error) {

    }


}

//tweetQuote
function tweetQuote() {
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
    window.open(twitterUrl, '_blank')
}
quoteBtn.addEventListener('click', newQuote);
twitterBtn.addEventListener('click', tweetQuote);

//onLoad 
getQuotes();