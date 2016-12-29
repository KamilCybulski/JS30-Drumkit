
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

//This function enables click functionality for short sound buttons
function clickPlayEnable(){
    //Function for playing short audio file
    function playShortSound(){
        this.classList.add('pressed');
        const sound = document.querySelector('audio.' + this.classList[1]);    //Bind audio file to the proper div  
        sound.currentTime = 0;
        sound.play();
    }

    //Function to unpress the button after the mouse key is released
    function releaseBtn(){
        this.classList.remove('pressed');
    }


    const cBtns = document.querySelectorAll(".c-key");            //Select all the buttons fot the short sounds

    cBtns.forEach(function(key){                                                  
        key.addEventListener('mousedown', playShortSound);                  //Play sound on mouse down
        key.addEventListener('mouseup', releaseBtn);                        //remove class 'pressed' on mouse up
        key.addEventListener('mouseout', releaseBtn);                       //remove class 'pressed' on mouseout
    });
}


//This function enables toggling loop buttons by mouse click
function clickToggleEnable(){

    //Function that toggles playing audio file on and off, and also adds/removes 'pressed' class
    function toggleLoop(){
        const sound = document.querySelector('audio.' + this.classList[1]);
        if (this.classList.contains('pressed')){
            sound.currentTime = 0;
            sound.pause();
        } else
            {   
                sound.play();
                sound.addEventListener('ended', function(){
                    this.play();
                });
            }
        this.classList.toggle('pressed');
    }

    const lBtns = document.querySelectorAll('.l-key');
    lBtns.forEach(function(key){
        key.addEventListener('click', toggleLoop);
    });
}


window.addEventListener('keydown', playSound);
window.addEventListener('keyup', unpress);
window.addEventListener('load', clickPlayEnable);
window.addEventListener('load', clickToggleEnable);

