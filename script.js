const button = document.getElementById('button');
const audioElement = document.getElementById('audio');

// Disable/Enable Button
function toggleButton(){
    button.disabled = !button.disabled;
}

// Passing Joke to VoiceRSS API
function tellMe(joke) {
    console.log('tell me: ', joke);
    VoiceRSS.speech({
        key: '8096233d1271453daa74242ec75f1d93',
        src: joke,
        hl: 'en-us',
        v: 'Linda',
        r: 0, 
        c: 'mp3',
        f: '44khz_16bit_stereo',
        ssml: false
    });
}

// Get Jokes from Joke API
async function getJokes() {
    let joke = '';
    const apiUrl = 'https://sv443.net/jokeapi/v2/joke/Programming?blacklistFlags=nsfw,racist,sexist';
    // const apiUrl = 'https://v2.jokeapi.dev/joke/Programming?blacklistFlags=nsfw,religious,political,racist,sexist,explicit';
    
    return fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            console.log(data);
            if (data.setup) {
                joke = `${data.setup} ... ${data.delivery}`;
            } else {
                joke = data.joke;
                }
            // Text-to-Speech
            tellMe(joke);
            // Disable Button
            toggleButton();
        }).catch(err => {
            console.error('fetxh failed', err)
        })
    // try {
        // const response = await fetch(apiUrl);
        // const data = await response.json;
        // console.log(data);
        // if (data.setup) {
        //     joke = `${data.setup} ... ${data.delivery}`;
        // } else {
        //     joke = data.joke;
        // }
        // // Text-to-Speech
        // tellMe(joke);
        // // Disable Button
        // toggleButton();
    // } catch (error){
        // Catch errors here
        // console.log('whoops', error);
    // }
}



// Event Listeners
button.addEventListener('click', getJokes);
audioElement.addEventListener('ended', toggleButton);
