
function playSound(e){
    const audio = document.querySelector('audio.key-' + e.keyCode);
    console.log(audio);
}

window.addEventListener('keydown', playSound);