const pfauParent = document.querySelector(".pfau-item");
const flamingoParent = document.querySelector(".flamingo-item");
const grueneStilettoParent = document.querySelector(".gruene-stiletto-item");
const tulpenParent = document.querySelector(".tulpen-item");
const ballParents = document.querySelectorAll(".ballParent");

let artLists = {
	"pfau-item": "#pfau",
	"flamingo-item": "#flamingo",
	"gruene-stiletto-item": "#gruene-stiletto",
	"tulpen-item": "#tulpen",
};
let bgAnimList = {
	bgAnim1: artLists["pfau-item"],
	bgAnim2: artLists["flamingo-item"],
	bgAnim3: artLists["gruene-stiletto-item"],
	bgAnim4: artLists["tulpen-item"],
};

ballParents.forEach((ballParent) => {
	ballParent.addEventListener("click", () => {
		const clickedListItem = ballParent;
		ballParent.querySelector(".ball").classList.add("active");
		ballParent.classList.remove("inactive");
		ballParents.forEach((ballParent) => {
			if (ballParent !== clickedListItem) {
				ballParent.querySelector(".ball").classList.remove("active");
				ballParent.classList.add("inactive");
			}
		});

		let artList = ballParent.classList[0];
		let artListId = artLists[artList];
		document.querySelector(artListId).scrollIntoView({
			behavior: "smooth",
		});

		let artListCount = Object.keys(artLists).length;

		// loop through artLists and add active class to bgAnim and remove active class from all other bgAnims
		for (let i = 1; i <= artListCount; i++) {
			let bgAnim = "bgAnim" + i;
			if (artList === Object.keys(artLists)[i - 1]) {
				document.querySelector("." + bgAnim).classList.add("active");
			} else {
				document.querySelector("." + bgAnim).classList.remove("active");
			}
		}
		localStorage.setItem("artList", artList);
	});
});

function changeBgAnim() {
	let artList = localStorage.getItem("artList");
	let artListId = artLists[artList];
	let artListCount = Object.keys(artLists).length;

	for (let i = 1; i <= artListCount; i++) {
		let bgAnim = "bgAnim" + i;
		if (artList === Object.keys(artLists)[i - 1]) {
			document.querySelector("." + bgAnim).classList.add("active");
		} else {
			document.querySelector("." + bgAnim).classList.remove("active");
		}
	}
}

let imageWrappers = document.querySelectorAll(".imageWrapper");

function doParallax(className) {
	let elements = document.querySelectorAll(className);
	elements.forEach((element) => {
		window.addEventListener("scroll", () => {
			const scrollY = window.scrollY;
			element.style.backgroundPosition = `-80px -${scrollY * 0.3}px`;
		});
	});
}

doParallax(".imageWrapper");

const imageWrapper = document.querySelector(".imageWrapper");
inView.offset(550);
let isFirstInView = inView.is(document.querySelector("#pfau"));
if (isFirstInView == true) {
	anime({
		targets: "#flamingo, #gruene-stiletto, #tulpen",
		translateX: 30,
		duration: 200,
		opacity: 0.5,
		easing: "easeInOutQuad",
		delay: anime.stagger(100),
	});
	localStorage.setItem("artList", "pfau-item");
	pfauParent.classList.remove("inactive");
	pfauParent.children[0].classList.add("active");
	ballParents.forEach((ballParent) => {
		if (ballParent !== pfauParent) {
			ballParent.classList.add("inactive");
			ballParent.children[0].classList.remove("active");
		}
	});
}

// refactoring of the anime and inView function as another function by entering the either of the wanted id's
function inViewAnim(id) {
	// take the id and seperate it 2 variables, one with the # and one without
	let idWithHash = id;
	let idWithoutHash = id.slice(1);

	inView(idWithHash).on("enter", () => {
		console.log(idWithHash);
		let viewedId = 0;
		if (viewedId <= 0) {
			anime({
				targets: idWithHash,
				opacity: 1,
				translateX: 0,
				duration: 200,
				easing: "easeInOutQuad",
				delay: anime.stagger(100),
			});
			anime({
				targets: idWithHash + " h2",
				opacity: 1,
				duration: 400,
				easing: "easeInOutQuad",
				delay: 200,
			});
			anime({
				targets: idWithHash + " h3",
				opacity: 0.5,
				duration: 400,
				easing: "easeInOutQuad",
				delay: 600,
			});
			viewedId++;
		} else {
			anime({
				targets: idWithHash + " h2",
				opacity: 1,
				duration: 200,
				easing: "easeInOutQuad",
			});
			anime({
				targets: idWithHash + " h3",
				opacity: 0.5,
				duration: 200,
				easing: "easeInOutQuad",
				delay: 200,
			});
		}
		let idParent = document.querySelector( "." + idWithoutHash + "-item");
		localStorage.setItem("artList", idWithoutHash + "-item");
		idParent.classList.remove("inactive");
		idParent.children[0].classList.add("active");
		ballParents.forEach((ballParent) => {
			if (ballParent !== idParent) {
				ballParent.classList.add("inactive");
				ballParent.children[0].classList.remove("active");
			}
		});

		changeBgAnim();
	});
	inView(idWithHash).on("exit", () => {
		anime({
			targets: idWithHash,
			opacity: 0.25,
			translateX: 30,
			duration: 200,
			easing: "easeInOutQuad",
			delay: anime.stagger(100),
		});
		anime({
			targets: idWithHash + " h2, " + idWithHash + " h3",
			opacity: 0,
			duration: 400,
			easing: "easeInOutQuad",
		});
	});
}
inViewAnim("#pfau");
inViewAnim("#flamingo");
inViewAnim("#gruene-stiletto");
inViewAnim("#tulpen");
