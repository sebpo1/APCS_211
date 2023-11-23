var adWidth = 300, adHeight = 250, cta_underline_width = 69;

// LOADERS
var ftLoader = {
	toload: ["instantads", "feed", "images", "fonts", "arrow", "background", 'richload', 'richloadcb'],
	promoImagesToLoad: [],
	promoImagesSuccess: [],
	promoImagesError: [],
	loaded: [],
	ticker: setInterval(function () {
		if (
			ftLoader.toload.length !== ftLoader.loaded.length ||
			ftLoader.promoImagesToLoad.length !==
			ftLoader.promoImagesSuccess.length + ftLoader.promoImagesError.length
		)
			return;

		clearInterval(ftLoader.ticker);
		init();
	}, 500),
};
var customFont = '"VisaDialect-Medium", "VisaDialect-Bold", "VisaDialect-Semibold"'
WebFont.load({
	custom: { families: [customFont] },
	active: function () {
		ftLoader.loaded.push("fonts");
	}
});
//RL load
myFT.insertRichload({
	richload: "f4_animation",
	parent: myFT.$("#rlContainer")
});
myFT.on('instantads', function () {
	var variables = myFT.instantAds;

	headline1.innerHTML = variables.frame1_headline;
	frame1_subheadline.innerHTML = variables.frame1_subheadline;
	headline2.innerHTML = variables.frame_2_headline;
	headline3.innerHTML = variables.frame_3_headline;
	headline4.innerHTML = variables.frame_4_headline;
	endframe_Text.innerHTML = variables.endframe_headline;
	endframe_bg.style.background = variables.endframe_background_color;
	headline1.style.color = variables.frame1_headline_color;
	headline2.style.color = variables.frame2_headline_color;
	headline3.style.color = variables.frame3_headline_color;
	headline4.style.color = variables.frame4_headline_color;
	endframe_Text.style.color = variables.endframe_headline_color;
	cta.innerHTML = variables.endframe_cta;


	// myFT.$("#headline1")[0].innerHTML = myFT.instantAds.headline;
    textResize(myFT.$("#headline1"),260,50);

	// myFT.$("#frame1_subheadline")[0].innerHTML = myFT.instantAds.headline;
    textResize(myFT.$("#frame1_subheadline"),260,50);

	// myFT.$("#headline2")[0].innerHTML = myFT.instantAds.headline;
    textResize(myFT.$("#headline2"),260,50);

	// myFT.$("#headline3")[0].innerHTML = myFT.instantAds.headline;
    textResize(myFT.$("#headline3"),260,50);

	textResize(myFT.$("#headline4"),260,55);

	// myFT.$("#endframe_Text")[0].innerHTML = myFT.instantAds.headline;
    textResize(myFT.$("#endframe_Text"),260,42);


	myFT.on("richload", function () {
		dynAnim = myFT.richloads.f4_animation.frame.contentWindow;
		console.log(dynAnim);
		ftLoader.loaded.push("richload");
	});

	preloadImages(variables);
	myFT.applyClickTag(wrapper, 1, variables.dynamic_clickthrough);
});

function preloadImages(variables) {
	var imageCount = 5, imageLoaded = 0;

	frame1bg.src = variables.background_image_01;
	frame1bg.addEventListener("load", iLoad, false);

	frame3bg.src = variables.background_image_03;
	frame3bg.addEventListener("load", iLoad, false);

	overlayImg.src = variables.overlay_image;
	overlayImg.addEventListener("load", iLoad, false);

	logo1.src = variables.logo1;
	logo1.addEventListener("load", iLoad, false);

	logo2.src = variables.logo2;
	logo2.addEventListener("load", iLoad, false);

	end_frame_logo.src = variables.endframe_logo;
	end_frame_logo.addEventListener("load", iLoad, false);

	function iLoad() {
		imageLoaded++;
		if (imageLoaded == imageCount) {
			init();
		}
	}

}

function init() {

	if (myFT.instantAds.f4_animation.indexOf("blank") == -1) {
		var dynAnimOn = true;
		console.log('ani true');
	} else {
		var dynAnimOn = false;
		console.log('ani true');
	}

	var delay = 0;
	tl = new TimelineMax();
	tl.set('#wrapper', { opacity: 1 });
	delay += 3;
	if (myFT.instantAds.animation_2frames.toUpperCase() == 'ON') {// 4th & 5th frame animation only
		delay = .5;
		tl.to(['#wrapper', '#headline4', '#logo1', '#logo2'], .75, { opacity: 1 });
		tl.set(['#slider_circle', '#slider_rectangle', '.overlay_blur'], { opacity: 0 });
		TweenMax.set("#frame1bg", { filter: "blur(0px)", opacity: 1 });
	} else { // all 5 frame animation
		tl.to(['#headline1', '#terms1', '#frame1_subheadline', '#logo1', '#logo2'], .75, { opacity: 1 }, 'start');
		tl.to('#slider_circle', .5, { left: 169, delay: delay }, 'start');
		tl.to('#slider_rectangle_yellow', .5, { opacity: 1, delay: delay }, 'start');
		tl.to(['#headline1', '#terms1', '#frame1_subheadline', '#slider_rectangle', '.overlay_blur'], .5, { opacity: 0, delay: delay }, 'start');
		TweenMax.to("#frame1bg", .5, { filter: "blur(0px)", opacity: 1, delay: delay }, 'start');//IE blur is not work
		tl.to(['#headline2', '#terms3'], .75, { opacity: 1, delay: 0.25 }, 'frame3');
		tl.to(['#headline2', '#terms3', '#slider_rectangle_yellow', '#slider_circle'], .5, { opacity: 0, delay: delay }, 'frame3');
		delay += .5;
	}
	tl.to('#frame3', 0.5, { opacity: 1, delay: delay }, 'frame3');
	tl.to('#headline3', .75, { opacity: 1, delay: delay }, '-=3.2');
	delay += .5;
	tl.set('#frame4', { opacity: 1 }, 'frame4');
	tl.to('#headline4', .75, { opacity: 1, delay: delay, }, 'frame4');
	tl.to('#frame4', .4, { left: 0, delay: delay, ease: "quad.out" }, 'frame4');
	if (dynAnimOn == true) {
		tl.to('#frame4', .25, {
			opacity: 1, delay: delay, onStart: function () {
				dynAnim.start();
			}
		}, 'frame4');
	}

	tl.to('#endframe_bg', .4, { left: 0, delay: delay, ease: "quad.out" }, 'endframe');
	tl.from('#end_frame_logo', .5, { left: 30, opacity: 0, delay: delay + .5, ease: "cubic.out" }, 'endframe');
	tl.to('#endframe_Text', .5, { opacity: 1, delay: delay + 1 }, 'endframe');
	tl.to('#cta', .5, { opacity: 1, delay: delay + 2 }, 'endframe');
	tl.to('.cta_line', .5, {
		width: cta_underline_width, delay: delay + 2.5, onComplete: function () {
			document
				.getElementById("wrapper")
				.addEventListener("mouseenter", mouse_over);
			document
				.getElementById("wrapper")
				.addEventListener("mouseleave", mouse_out);
		},
	}, 'endframe');
	// textResizer(myFT.$('#headline1'), 260, 78);
	// textResizer(myFT.$('#frame1_subheadline'), 260, 55);
	// textResizer(myFT.$('#headline2'), 260, 78);
	// textResizer(myFT.$('#headline3'), 260, 78);
	// textResizer(myFT.$('#endframe_Text'), 260, 42);
}

function triggerRollOver() {
	gsap.fromTo([".cta_line"], { width: 0 }, { width: cta_underline_width, duration: 0.5, ease: "out" });
}

function endRollOver() {
	gsap.set([".cta_line"], { width: cta_underline_width });
}

function mouse_over(e) {	// animate line
	triggerRollOver();
}

function mouse_out(e) {	// animate line out
	endRollOver();
}

function checkRoll() {
	if (rollable) {
		rollable = false;
	} else {
		rollable = true;
	}
}

// function textResizer(e, w, h) {
// 	e = e[0];
// 	if (e.innerHTML.indexOf('style') === -1) {
// 		var counter = 0;
// 		while (e.scrollWidth > w || e.scrollHeight > h) {
// 			// console.log(e);
// 			// console.log("scrollW: ", e.scrollWidth, "maxW: ", w, "scrollH: ", e.scrollHeight, "maxH: ", h);
// 			var fs = window.getComputedStyle(e, null).getPropertyValue('font-size');
// 			e.style.fontSize = (parseFloat(fs, 10) - 1) + 'px';
// 			if (counter === 20) return false;
// 			counter++;
// 		}
// 		return true;
// 	} else {
// 		return false;
// 	}
// }



function textResize(e, w, h) {
    e = e[0];
    if (e.innerHTML.indexOf('style') === -1) {
        var counter = 0;
        while (e.scrollWidth > w || e.scrollHeight > h) {
            // console.log(e);
            // console.log("scrollW: ", e.scrollWidth, "maxW: ", w, "scrollH: ", e.scrollHeight, "maxH: ", h);
            var fs = window.getComputedStyle(e, null).getPropertyValue('font-size');
            e.style.fontSize = (parseFloat(fs, 10) - 1) + 'px';
            if (counter === 40) return false;
            counter++;
        }
        return true;
    } else {
        return false;
    }
}
