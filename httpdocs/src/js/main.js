// get data from strapi backend
// backend: localhost:1337
// apikey: 59bad8f5043eebfba6246415ee2620a845d1a4a65b0a20df927d6b3f01161750e59022e17557aa534c9d9be42c1d271ccab5c7790080e036642dce10a443cc1304a7629583c51377d58664c2d4a6c0cf60a73a45582adb750a9fdae6c6bdeb69b58006dada8363e3844c6bed907c3ce91cf43bad77ce4dd4993d1db9a4a21f15
// api key is needed to access the backend
// api key is generated in the strapi backend
let artLists = {};
let artListCount;

async function getStrapiData() {
	console.log("get strapi data");

	try {
		const strapiurl = "http://localhost:1337/api/ateliers?populate=*";
		const strapiapikey = "59bad8f5043eebfba6246415ee2620a845d1a4a65b0a20df927d6b3f01161750e59022e17557aa534c9d9be42c1d271ccab5c7790080e036642dce10a443cc1304a7629583c51377d58664c2d4a6c0cf60a73a45582adb750a9fdae6c6bdeb69b58006dada8363e3844c6bed907c3ce91cf43bad77ce4dd4993d1db9a4a21f15";

		// use jquery to get the data from the backend

		const strapiData = await $.ajax({
			url: strapiurl,
			headers: {
				Authorization: `Bearer ${strapiapikey}`,
			},
		});
		delete strapiData.meta;
		console.log(strapiData);

		Object.keys(strapiData).forEach((key) => {
			let atelier = strapiData[key];
			Object.keys(strapiData[key]).forEach((key) => {
				let atelierItem = atelier[key];
				let atelierDetails = atelierItem.attributes;

				const artname = atelierDetails.artname;
				const paintingYear = atelierDetails.paintingyear.slice(0, 4);
				const pricing = atelierDetails.pricing;
				const artDescription = atelierDetails.description;
				const artImage = "http://localhost:1337" + atelierDetails.image.data.attributes.url;
				// artname without spaces and lowercase
				const artNameNoSpace = artname.replace(/\s+/g, "").toLowerCase();
				const artId = artname.replace(/\s+/g, "").toLowerCase() + atelierItem.id;
				const artIdWithHash = "#" + artId;

				atelierTemplate = `
					<div id="${artId}" class="imageWrapper shrink-0 snap-start snap-always rounded-xl relative w-[880px] h-[700px] bg-[#0D0A0D] bg-no-repeat contrast-125 bg-[length:115%]" style="background-position: -80px 0px;background-image: url('${artImage}');">
							<div class="absolute inset-0 flex p-10 leading-none rounded-xl">
								<h2 class="mt-auto text-[40px] font-bold tracking-[-2px] font-brand z-10">${artname}</h2>
								<h3 class="mt-auto ml-2 text-[32px] tracking-[-1px] leading-none opacity-50 font-brand z-10">${paintingYear}</h3>
								<div class="absolute inset-0 rounded-xl bg-gradient-to-b from-transparent via-transparent to-black/50"></div>
							</div>
						</div>
					`;

				navTemplate = `
						<li class="${artId}-item ballParent inactive">
							<div class="ball"></div>
							<p>${artname}</p>
						</li>
					`;

				// for each atelierItem create a new <div class="absolute inset-0 z-[1] bgAnim9"></div> at the end of the body
				// add the following style to the div: style="background-image: url('${artImage}');"
				// add the following class to the div: class="bgAnim${atelierItem.id}"
				bgAnimTemplate = `
						<div class="absolute inset-0 z-[1] bgAnim${atelierItem.id}" style="background-image: url('${artImage}')"></div>
					`;

				// add the bgAnimTemplate to the end of the body
				$("body").append(bgAnimTemplate);

				document.querySelector("main").insertAdjacentHTML("beforeend", atelierTemplate);
				document.querySelector("#navList").insertAdjacentHTML("beforeend", navTemplate);

				// push artNameNoSpace to artLists with value artIdWithHash
				artLists[artNameNoSpace + atelierItem.id + "-item"] = artIdWithHash;
				// bgAnimList.push key value pairs. key = bgAnim${atelierItem.id} and value = artLists[artNameNoSpace + "-item"]
				let bgAnimList = {
					[`bgAnim${atelierItem.id}`]: artLists[artNameNoSpace + "-item"],
				};


				let ballParents = document.querySelectorAll(".ballParent");

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
						console.log("ballParent: " + artList);
						let artListId = artLists[artList];
						document.querySelector(artListId).scrollIntoView({
							behavior: "smooth",
						});

						artListCount = Object.keys(artLists).length;

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
				inViewAnim(artIdWithHash);

			});
		});
	} catch (error) {
		console.log(error);
	}
}
getStrapiData();

inView.offset(500);

function isInView(el) {
	let checkIfInView = inView.is(document.querySelector(el)); // checks if element is in view. Input requires a tag, id or class
}

function inViewAnim(id) {
	let idWithHash = id;
	let idWithoutHash = id.slice(1);
	// let idNum is the number at the end of the id
	let idNum = idWithoutHash.slice(-1);
	let bgAnimItem = document.querySelector(".bgAnim" + idNum);

	console.log("idWithHash: " + idWithHash);

	console.log("idNum: " + idNum);
	isInView(idWithHash);
	if (isInView(idWithHash)) {
		bgAnimItem.classList.add("active");
		anime({
			targets: idWithHash,
			translateX: 30,
			duration: 200,
			opacity: 0.5,
			easing: "easeInOutQuad",
			delay: anime.stagger(100),
		});
		let idParent = document.querySelector("." + idWithoutHash + "-item");
		localStorage.setItem("artList", idWithoutHash + "-item");
		idParent.classList.remove("inactive");
		idParent.children[0].classList.add("active");
		let ballParents = document.querySelectorAll(".ballParent");
		ballParents.forEach((ballParent) => {
			if (ballParent !== idParent) {
				ballParent.classList.add("inactive");
				ballParent.children[0].classList.remove("active");
			}
		});
	} else {
		anime({
			targets: idWithHash,
			translateX: 0,
			duration: 200,
			opacity: 1,
			easing: "easeInOutQuad",
			delay: anime.stagger(100),
		});
	}

	inView(idWithHash).on("enter", () => {
		// set the bgAnimItem to active
		bgAnimItem.classList.add("active");
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
				delay: 600,
			});
			anime({
				targets: idWithHash + " h3",
				opacity: 0.5,
				duration: 400,
				easing: "easeInOutQuad",
				delay: 800,
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
		// set the bgAnimItem to active
		let idParent = document.querySelector("." + idWithoutHash + "-item");
		localStorage.setItem("artList", idWithoutHash + "-item");
		idParent.classList.remove("inactive");
		idParent.children[0].classList.add("active");
		let ballParents = document.querySelectorAll(".ballParent");
		ballParents.forEach((ballParent) => {
			if (ballParent !== idParent) {
				ballParent.classList.add("inactive");
				ballParent.children[0].classList.remove("active");
			}
		});
		function changeBgAnim() {
			let artList = localStorage.getItem("artList");
			// let artListCount = Object.keys(artLists).length;
			console.log("Amount of Artlist Items: " + Object.keys(artLists).length);
			artListCount = Object.keys(artLists).length;
			console.log("artListCount: " + artListCount);

			for (let i = 1; i <= artListCount; i++) {
				let bgAnim = ".bgAnim" + i;
				console.log("bgAnim: " + bgAnim);
				if (artList === Object.keys(artLists)[i - 1]) {
					document.querySelector(bgAnim).classList.add("active");
				} else {
					document.querySelector(bgAnim).classList.remove("active");
				}
			}
		}
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

// get all children of main
let mainChildren = document.querySelector("main").children;
// get all ids of children
let mainChildrenIds = [];
for (let i = 0; i < mainChildren.length; i++) {
	mainChildrenIds.push(mainChildren[i].id);
}
// do inViewAnim for all children on window onscroll event
window.onscroll = function () {
	mainChildrenIds.forEach((id) => {
		inViewAnim("#" + id);
	});
};
