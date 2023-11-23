// * declare ftParent shorthand to communicate with base file
var ftParent = window.parent;
// ftParent.ftLoader.loaded.push('richloadcb');
init();

function init() {
    console.log("richload firing...");
    // start();
    // ftParent.tl.to(myFT.$(myFT.$("#spriteContainer")[0]), 0.3, { opacity: 1 }, 0);
}

function start() {

    tl = new TimelineMax();

    tl.set('#container', { opacity: 1 });
    tl.to("#rightHand", 0.5, { left: 0, ease: "cubic.out" }, '+=0.5');
    tl.to("#leftHand", 0.5, { left: 0, ease: "cubic.out" }, '-=0.35');

    console.log(tl.duration());

}

function restart() {
    // anim.goToAndStop(0, true);
    tl.set('#sprite', { scale: 0.89, rotation: 10 }, "+=1");
}

// animation testing
// tl = new TimelineMax();
// tl.to("#spriteContainer", 1, { opacity: 1 }, 0);