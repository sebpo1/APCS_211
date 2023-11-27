// * declare ftParent shorthand to communicate with base file
var ftParent = window.parent;
// ftParent.ftLoader.loaded.push('richloadcb');
init();

function init() {
    console.log("richload firing...");
    var variables = myFT.instantAds;
    myFT.applyClickTag(container, 1, variables.dynamic_clickthrough);
}

function start() {

    tl = new TimelineMax();

    tl.set('#container', { opacity: 1 });
    tl.to("#visa_logo", 0.25, { opacity: 1 }, '+=0.5');
    tl.to("#topHand", 0.5, { top: 0, ease: "cubic.out" }, '+=0.5');
    tl.to("#bottomHand", 0.5, { top: 0, ease: "cubic.out" }, '-=0.35');

    console.log(tl.duration());

}

function restart() {
    // anim.goToAndStop(0, true);
    tl.set('#sprite', { scale: 0.89, rotation: 10 }, "+=1");
}

// animation testing
// tl = new TimelineMax();
// tl.to("#spriteContainer", 1, { opacity: 1 }, 0);