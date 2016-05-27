$(() => {
    var allElements = $(".domino-fade-in > *");
    var currI = 0;
    function activateNext(){
        if(currI < allElements.length){
            allElements[currI].style.visibility = "visible";
            allElements[currI].style.animationPlayState = "running";

            currI++;
            setTimeout(activateNext, 100);
        }
    }

    setTimeout(activateNext, 500)
})
