// const scroll = new LocomotiveScroll({
// 	el: document.querySelector("#main"),
// 	smooth: true,
// });
function init() {
	gsap.registerPlugin(ScrollTrigger);

	// Using Locomotive Scroll from Locomotive https://github.com/locomotivemtl/locomotive-scroll

	const locoScroll = new LocomotiveScroll({
		el: document.querySelector("#main"),
		smooth: true,
	});
	// each time Locomotive Scroll updates, tell ScrollTrigger to update too (sync positioning)
	locoScroll.on("scroll", ScrollTrigger.update);

	// tell ScrollTrigger to use these proxy methods for the "#main" element since Locomotive Scroll is hijacking things
	ScrollTrigger.scrollerProxy("#main", {
		scrollTop(value) {
			return arguments.length
				? locoScroll.scrollTo(value, 0, 0)
				: locoScroll.scroll.instance.scroll.y;
		}, // we don't have to define a scrollLeft because we're only scrolling vertically.
		getBoundingClientRect() {
			return {
				top: 0,
				left: 0,
				width: window.innerWidth,
				height: window.innerHeight,
			};
		},
		// LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the container at all! So to get the correct behavior and avoid jitters, we should pin things with position: fixed on mobile. We sense it by checking to see if there's a transform applied to the container (the LocomotiveScroll-controlled element).
		pinType: document.querySelector("#main").style.transform
			? "transform"
			: "fixed",
	});
	// each time the window updates, we should refresh ScrollTrigger and then update LocomotiveScroll.
	ScrollTrigger.addEventListener("refresh", () => locoScroll.update());

	// after everything is set up, refresh() ScrollTrigger and update LocomotiveScroll because padding may have been added for pinning, etc.
	ScrollTrigger.refresh();
}
init();

// !main cursor code
// var crsr = document.querySelector(".cursor");

// var main = document.querySelector("#main");
// main?.addEventListener("mousemove", function (dets) {
// 	crsr.style.left = dets.x + "px";
// 	crsr.style.top = dets.y + "px";
// });

// todo cursor
// JavaScript code
// JavaScript code
var crsr = document.querySelector(".cursor");
var trailContainer = document.createElement("div");
trailContainer.classList.add("trail-container");
document.body.appendChild(trailContainer);

var main = document.querySelector("#main");

main?.addEventListener("mousemove", function (dets) {
	// Move the cursor dot to the new position
	crsr.style.transform = `translate(${dets.x - 10}px, ${dets.y - 10}px)`;

	// Create a trail dot
	var trailDot = document.createElement("div");
	trailDot.classList.add("trail");
	trailDot.style.transform = `translate(${dets.x - 4}px, ${dets.y - 4}px)`;
	trailContainer.appendChild(trailDot);

	// Create a trail dot
	var trailDot = document.createElement("div");
	trailDot.classList.add("trail");
	trailDot.style.left = dets.x - 3 + "px";
	trailDot.style.top = dets.y - 3 + "px";
	trailContainer.appendChild(trailDot);

	// After a short delay, fade out and remove the trail dot
	setTimeout(function () {
		trailDot.style.opacity = "0";
		setTimeout(function () {
			trailContainer.removeChild(trailDot);
		}, 300); // Adjust the fading duration (in milliseconds) to your preference
	}, 100); // Adjust the delay before fading out (in milliseconds) to your preference
});

// video cursor animation
var video = document.querySelector("video");
video.addEventListener("mouseenter", function () {
	// Show the sound on text with a round cursor animation when the cursor enters the video area
	crsr.style.width = "40px";
	crsr.style.height = "40px";
	crsr.style.borderRadius = "50%";
	crsr.style.backgroundColor = "rgba(237, 191, 255, 0.5)";
});

video.addEventListener("mouseleave", function () {
	// Restore the default cursor animation when the cursor leaves the video area
	crsr.style.width = "20px";
	crsr.style.height = "20px";
	crsr.style.borderRadius = "50%";
	crsr.style.backgroundColor = "#edbfff";
});
let tl = gsap.timeline({
	scrollTrigger: {
		trigger: "#page1 h1",
		scroller: "#main",
		// markers: true,
		start: "top 27%",
		end: "top 0",
		scrub: 3,
	},
});

tl.to(
	"#page1 h1",
	{
		x: -100,
		// duration: 1,
	},
	"anim"
);
tl.to(
	"#page1 h2",
	{
		x: 100,
	},
	"anim"
);

tl.to(
	"#page1 video",
	{
		width: "90%",
	},
	"anim"
);
let tl2 = gsap.timeline({
	scrollTrigger: {
		trigger: "#page1 h1",
		scroller: "#main",
		// markers: true,
		start: "top -115%",
		end: "top -120%",
		scrub: 3,
	},
});
tl2.to("#main", {
	backgroundColor: "#fff",
});

let tl3 = gsap.timeline({
	scrollTrigger: {
		trigger: "#page1 h1",
		scroller: "#main",
		// markers: true,
		start: "top -500%",
		end: "top -540%",
		scrub: 3,
	},
});
tl3.to("#main", {
	backgroundColor: "#0f0d0d",
});
