var sounds={};

function initSound(){
    sounds.clickSwitch = new Audio('resources/thozi_daClick.mp3');
    sounds.background = new Audio('resources/background.mp3');
    sounds.background.addEventListener('ended', function() {
        this.currentTime = 300;
        this.play();
    }, false);
}