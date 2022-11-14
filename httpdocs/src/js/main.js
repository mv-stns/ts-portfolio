// hide all h2 & h3 elements
document.querySelectorAll('h2, h3').forEach(el => el.style.opacity = 0);
const pfauParent = document.querySelector(".pfau-item");
const flamingoParent = document.querySelector('.flamingo-item');
const grueneStilettoParent = document.querySelector('.gruene-stiletto-item');
const tulpenParent = document.querySelector('.tulpen-item');
const ballParents = document.querySelectorAll('.ballParent');

// when ballParent is clicked add active class to child ball, remove active class from all other ballParents
// check if clicked ballParent has class from artLists, if so add active class to child ball and remove inactive class from clicked ballParent
// after that scroll to the div with the id of the artList
// artLists contains of a list of all artList classes and the id of the div to scroll to (without the # and the . (dot))
let artLists = {
  'pfau-item': '#pfau',
  'flamingo-item': '#flamingo',
  'gruene-stiletto-item': '#gruene-stiletto',
  'tulpen-item': '#tulpen'
};
let bgAnimList = {
  'bgAnim1': artLists['pfau-item'],
  'bgAnim2': artLists['flamingo-item'],
  'bgAnim3': artLists['gruene-stiletto-item'],
  'bgAnim4': artLists['tulpen-item']
  };

ballParents.forEach(ballParent => {
  ballParent.addEventListener('click', () => {
    const clickedListItem = ballParent;
    console.log(ballParent.classList);
    ballParent.querySelector('.ball').classList.add('active');
    ballParent.classList.remove('inactive');
    ballParents.forEach(ballParent => {
      if (ballParent !== clickedListItem) {
        ballParent.querySelector('.ball').classList.remove('active');
        ballParent.classList.add('inactive');
      }
    });

    let artList = ballParent.classList[0];
    console.log(artList);
    let artListId = artLists[artList];
    console.log(artListId);
    document.querySelector(artListId).scrollIntoView({
      behavior: 'smooth'
    });
    // if artLists pfau-item is clicked, add active class to bgAnim1 and remove active class from all other bgAnims
    // if artLists flamingo-item is clicked, add active class to bgAnim2 and remove active class from all other bgAnims
    // if artLists gruene-stiletto-item is clicked, add active class to bgAnim3 and remove active class from all other bgAnims
    // if artLists tulpen-item is clicked, add active class to bgAnim4 and remove active class from all other bgAnims
    // console log the amount of items in artList
    let artListCount = Object.keys(artLists).length;
    console.log(artListCount);

    // loop through artLists and add active class to bgAnim and remove active class from all other bgAnims
    for (let i = 1; i <= artListCount; i++) {
      let bgAnim = 'bgAnim' + i;
      console.log(bgAnim);
      if (artList === Object.keys(artLists)[i - 1]) {
        document.querySelector('.' + bgAnim).classList.add('active');
      } else {
        document.querySelector('.' + bgAnim).classList.remove('active');
      }
    }
    // store artList in localStorage
    localStorage.setItem('artList', artList);
  });
});

// function to change bgAnim active based on artList in localStorage
function changeBgAnim() {
  let artList = localStorage.getItem('artList');
  console.log(artList);
  let artListId = artLists[artList];
  console.log(artListId);
  // if artLists pfau-item is clicked, add active class to bgAnim1 and remove active class from all other bgAnims
  // if artLists flamingo-item is clicked, add active class to bgAnim2 and remove active class from all other bgAnims
  // if artLists gruene-stiletto-item is clicked, add active class to bgAnim3 and remove active class from all other bgAnims
  // if artLists tulpen-item is clicked, add active class to bgAnim4 and remove active class from all other bgAnims
  // console log the amount of items in artList
  let artListCount = Object.keys(artLists).length;
  console.log(artListCount);

  // loop through artLists and add active class to bgAnim and remove active class from all other bgAnims
  for (let i = 1; i <= artListCount; i++) {
    let bgAnim = 'bgAnim' + i;
    console.log(bgAnim);
    if (artList === Object.keys(artLists)[i - 1]) {
      document.querySelector('.' + bgAnim).classList.add('active');
    } else {
      document.querySelector('.' + bgAnim).classList.remove('active');
    }
  }
}


// parallax effect on all imageWrapper with background-position y value
const imageWrappers = document.querySelectorAll('.imageWrapper');
imageWrappers.forEach(imageWrapper => {
  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    imageWrapper.style.backgroundPosition = `0px -${scrollY * 0.2}px`;
  })
})
// if imageWrapper is completely in viewport add "transform: translateX(30px)" to all other imageWrappers. Do the animation with anime.js an inView.js
const imageWrapper = document.querySelector('.imageWrapper');
inView.offset(550);
let isFirstInView = inView.is(document.querySelector('#pfau'));
if(isFirstInView == true) {
  anime({
    targets: '#flamingo, #gruene-stiletto, #tulpen',
    translateX: 30,
    duration: 200,
    opacity: 0.5,
    easing: 'easeInOutQuad',
    delay: anime.stagger(100)
  })
  localStorage.setItem('artList', 'pfau-item');
  // add class active to ballParent
  pfauParent.classList.remove('inactive');
  pfauParent.children[0].classList.add('active');
  // remove all other classes from parents
  ballParents.forEach(ballParent => {
    if (ballParent !== pfauParent) {
      ballParent.classList.add('inactive');
      ballParent.children[0].classList.remove('active');
    }
  });

}
inView('#pfau').on('enter', () => {
  let viewedPfau = 0;
  if (viewedPfau <= 0) {
    anime({
      targets: '#pfau',
      opacity: 1,
      translateX: 0,
      duration: 200,
      easing: 'easeInOutQuad',
      delay: anime.stagger(100)
    })
    anime({
      targets: '#pfau h2',
      opacity: 1,
      duration: 400,
      easing: 'easeInOutQuad',
      delay: 1200
    })
    anime({
      targets: '#pfau h3',
      opacity: 0.5,
      duration: 400,
      easing: 'easeInOutQuad',
      delay: 1400
    })
    viewedPfau++;
  } else {
    anime({
      targets: '#pfau h2',
      opacity: 1,
      duration: 200,
      easing: 'easeInOutQuad',
    })
    anime({
      targets: '#pfau h3',
      opacity: 0.5,
      duration: 200,
      easing: 'easeInOutQuad',
      delay: 200
    })
    console.log("viewedPfau: " +viewedPfau)
  }
  localStorage.setItem('artList', 'pfau-item');
  pfauParent.classList.remove('inactive');
  pfauParent.children[0].classList.add('active');
  ballParents.forEach(ballParent => {
    if (ballParent !== pfauParent) {
      ballParent.classList.add('inactive');
      ballParent.children[0].classList.remove('active');
    }
  //add class active to bgAnim1 and remove active class from all other bgAnims
    if (bgAnimList['bgAnim1'] === '#pfau') {
      document.querySelector('.bgAnim1').classList.add('active');
    } else {
      document.querySelector('.bgAnim1').classList.remove('active');
    }
  });
  changeBgAnim();
})
inView('#pfau').on('exit', () => {
  anime({
    targets: '#pfau',
    opacity: 0.25,
    translateX: 30,
    duration: 200,
    easing: 'easeInOutQuad',
    delay: anime.stagger(100)
  })
  anime({
    targets: '.imageWrapper h2',
    opacity: 0.25,
    duration: 200,
    easing: 'easeInOutQuad',
  })
  anime({
    targets: '.imageWrapper h3',
    opacity: 0.25,
    duration: 200,
    easing: 'easeInOutQuad',
  })
})
inView('#flamingo').on('enter', () => {
  let viewedFlamingo = 0;
  if (viewedFlamingo <= 0) {
    anime({
      targets: '#flamingo',
      opacity: 1,
      translateX: 0,
      duration: 200,
      easing: 'easeInOutQuad',
      delay: anime.stagger(100)
    })
    anime({
      targets: '#flamingo h2',
      opacity: 1,
      duration: 400,
      easing: 'easeInOutQuad',
      delay: 1200
    })
    anime({
      targets: '#flamingo h3',
      opacity: 0.5,
      duration: 400,
      easing: 'easeInOutQuad',
      delay: 1400
    })
    viewedFlamingo++;
  } else {
    anime({
      targets: '#flamingo h2',
      opacity: 1,
      duration: 200,
      easing: 'easeInOutQuad',
    })
    anime({
      targets: '#flamingo h3',
      opacity: 0.5,
      duration: 200,
      easing: 'easeInOutQuad',
      delay: 200
    })
    console.log("viewedFlamingo: " +viewedFlamingo)
  }
  localStorage.setItem('artList', 'flamingo-item');
  // add class active to ballParent
  flamingoParent.classList.remove('inactive');
  flamingoParent.children[0].classList.add('active');
  // remove all other classes from parents
  ballParents.forEach(ballParent => {
    if (ballParent !== flamingoParent) {
      ballParent.classList.add('inactive');
      ballParent.children[0].classList.remove('active');
    }
  });

    changeBgAnim();
})
inView('#flamingo').on('exit', () => {
  anime({
    targets: '#flamingo',
    opacity: 0.25,
    translateX: 30,
    duration: 200,
    easing: 'easeInOutQuad',
    delay: anime.stagger(100)
  })
})
inView('#gruene-stiletto').on('enter', () => {
  let viewedGrueneStiletto = 0;
  if (viewedGrueneStiletto <= 0) {
    anime({
      targets: '#gruene-stiletto',
      opacity: 1,
      translateX: 0,
      duration: 200,
      easing: 'easeInOutQuad',
      delay: anime.stagger(100)
    })
    anime({
      targets: '#gruene-stiletto h2',
      opacity: 1,
      duration: 400,
      easing: 'easeInOutQuad',
      delay: 1200
    })
    anime({
      targets: '#gruene-stiletto h3',
      opacity: 0.5,
      duration: 400,
      easing: 'easeInOutQuad',
      delay: 1400
    })
    viewedGrueneStiletto++;
  } else {
    anime({
      targets: '#gruene-stiletto h2',
      opacity: 1,
      duration: 200,
      easing: 'easeInOutQuad',
    })
    anime({
      targets: '#gruene-stiletto h3',
      opacity: 0.5,
      duration: 200,
      easing: 'easeInOutQuad',
      delay: 200
    })
    console.log("viewedGrueneStiletto: " +viewedGrueneStiletto)
  }
  localStorage.setItem('artList', 'gruene-stiletto-item');
  grueneStilettoParent.classList.remove('inactive');
  grueneStilettoParent.children[0].classList.add('active');
  ballParents.forEach(ballParent => {
    if (ballParent !== grueneStilettoParent) {
      ballParent.classList.add('inactive');
      ballParent.children[0].classList.remove('active');
    }
  });

    changeBgAnim();
})
inView('#gruene-stiletto').on('exit', () => {
  anime({
    targets: '#gruene-stiletto',
    opacity: 0.25,
    translateX: 30,
    duration: 200,
    easing: 'easeInOutQuad',
    delay: anime.stagger(100)
  })
})
inView('#tulpen').on('enter', () => {
  let viewedTulpen = 0;
  if (viewedTulpen <= 0) {
    anime({
      targets: '#tulpen',
      opacity: 1,
      translateX: 0,
      duration: 200,
      easing: 'easeInOutQuad',
      delay: anime.stagger(100)
    })
    anime({
      targets: '#tulpen h2',
      opacity: 1,
      duration: 400,
      easing: 'easeInOutQuad',
      delay: 1200
    })
    anime({
      targets: '#tulpen h3',
      opacity: 0.5,
      duration: 400,
      easing: 'easeInOutQuad',
      delay: 1400
    })
    viewedTulpen++;
  } else {
    anime({
      targets: '#tulpen h2',
      opacity: 1,
      duration: 200,
      easing: 'easeInOutQuad',
    })
    anime({
      targets: '#tulpen h3',
      opacity: 0.5,
      duration: 200,
      easing: 'easeInOutQuad',
      delay: 200
    })
    console.log("viewedTulpen: " +viewedTulpen)
  }
  localStorage.setItem('artList', 'tulpen-item');
  tulpenParent.classList.remove('inactive');
  tulpenParent.children[0].classList.add('active');
  ballParents.forEach(ballParent => {
    if (ballParent !== tulpenParent) {
      ballParent.classList.add('inactive');
      ballParent.children[0].classList.remove('active');
    }
  });

    changeBgAnim();
})
inView('#tulpen').on('exit', () => {
  anime({
    targets: '#tulpen',
    opacity: 0.25,
    translateX: 30,
    duration: 200,
    easing: 'easeInOutQuad',
    delay: anime.stagger(100)
  })
})
