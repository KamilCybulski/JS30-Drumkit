
function playSound(e){
    //This binds the pressed key to the audio element and to the proper div element
    const audio = document.querySelector('audio.key-' + e.keyCode);
    const key = document.querySelector('div.key-' + e.keyCode);

    if (!audio) {return;} //Terminate the function if there is no audio file binded to the pressed key

    //Now, check if the key from the loop panel is pressed. If so, pause the audio and unpress it
    if (key.classList.contains('pressed') && key.classList.contains('l-key')) {
        audio.currentTime = 0;
        audio.pause();
        key.classList.remove('pressed');
    //If it's not a loop panel button or it is not pressed, press it and play the audio    
    } else {
        audio.currentTime = 0;
        audio.play();
        //If a loop panel button was pressed, replay the audio file after it ends (over and over again)
        //This way user can just toggle loop sound on, and have it played continously
        if (key.classList.contains('l-key')){
            audio.addEventListener('ended', function(e){
                this.play();
            });
        }

        //Add class 'pressed' to the div binded to the pressed key
        key.classList.add('pressed');
        }
}

//function for unpressing the short-sounds buttons after keyboard-key is released
function unpress(e){
    const key = document.querySelector('div.key-' + e.keyCode);
    const audio = document.querySelector('audio.key-' + e.keyCode); //By putting this here we can avoid errors when pressing keys that don't have any audio file
    if (audio && key.classList.contains('c-key')){                  //associated with them
    key.classList.remove('pressed');
    }
}

window.addEventListener('keydown', playSound);
window.addEventListener('keyup', unpress);