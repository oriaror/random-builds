"use strict";

const url = "https://api.opendota.com/api/heroes";
let filter = [];
const backdrop = document.getElementById("backdrop");
function generateHero(name, atribute) {
  const heroes = document.querySelector(".heroes");
  const heroDiv = document.createElement("div");
  const img = document.createElement("img");
  const heroP = document.createElement("p");
  heroDiv.onclick = (event) => {
    backdropStyle();
    generateModal(event);
  };
  img.setAttribute("src", getHeroImgPath(name));
  img.classList.add("img");
  heroDiv.appendChild(img);
  heroDiv.appendChild(heroP);
  heroes.appendChild(heroDiv);
  heroP.innerHTML = name;
  heroDiv.classList.add("hero_container");
  heroDiv.classList.add(atribute);
  heroDiv.classList.add("box");
  heroP.classList.add("hero_name");
}

function backdropStyle() {
  document.body.style.overflow = "hidden";
  backdrop.style.display = "block";
}

function generateModal(event) {
  const modalName = document.querySelector(".modal_name");
  modalName.innerHTML = event.currentTarget.children[1].innerText;
}

function getHeroImgPath(name) {
  return "img/" + name.toLowerCase().replace(/[^a-z]/gi, "") + ".png";
}

let request = async function (url) {
  const response = await fetch(url)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      data.forEach((hero) => {
        generateHero(hero.localized_name, hero.primary_attr);
      });
    })
    .then(() => {
      filter = document.querySelectorAll(".box");
    });
  return response;
};
request(url);

function changeFilterValue(event) {
  let filterClass = event.currentTarget.dataset.f;
  filter.forEach((elem) => {
    elem.classList.remove("hide");
    if (!elem.classList.contains(filterClass) && filterClass !== "uni") {
      elem.classList.add("hide");
    }
  });
}

function closeModal() {
  backdrop.style.display = "none";
  document.body.style.overflow = "auto";
  const slots = document.getElementsByClassName("column");
  Array.from(slots).forEach((element) => {
    element.innerHTML = null;
  });
  const buildDesc = document.querySelector(".build_name");
  buildDesc.innerHTML = null;
}

function fillSlots() {
  const buildDesc = document.querySelector(".build_name");
  buildDesc.innerHTML = null;
  buildDesc.innerHTML += " через" + buildName();
  getImgId(61).forEach((el, index) => {
    document.getElementById(`item${index + 1}`).innerHTML = el;
  });
}

function randomNumber(max) {
  let set = new Set();
  for (let i = 0; i < max; i++) {
    set.add(Math.floor(Math.random() * max));
  }
  return Array.from(set).slice(0, 6);
}

function getImgId(max) {
  let arr = randomNumber(max);
  let srcArr = [];
  for (let i = 0; i < arr.length; i++) {
    const id = `<img src = 'artifacts/${arr[i]}.webp'>`;
    srcArr.push(id);
  }
  return srcArr;
}

function buildName() {
  const arr1 = [
    " адский",
    " ржавый",
    " черный",
    " секретный",
    " потный",
    " лютый",
    " угарный",
    " бесконечный",
    " быстрый",
    " тактический",
    " пивной",
    " ZXC",
    " терпильный",
    " хардкорный",
  ];
  const arr2 = [
    " запой",
    " мангус",
    " юмор",
    " айтем билд",
    " позор",
    " фид",
    " снос трона",
    " сон",
    " стон",
    " радик?",
    " пулемет",
    " алкоголь",
    " кач",
    " скам",
    " тролл фейс",
    " рейдж",
    " фарм",
    " импакт",
    " интеллект",
  ];
  let str = [];

  for (let i = 0; i < arr1.length; i++) {
    let first = Math.floor(Math.random() * arr1.length);
    str.push(arr1[first]);
    break;
  }

  for (let i = 0; i < arr2.length; i++) {
    let second = Math.floor(Math.random() * arr1.length);
    str.push(arr2[second]);
    break;
  }

  return str.join("");
}

///////first try//////

// const request = async () => {
//   try {
//     fetch(url).then(response => response.json()).then(item => {
//       item.forEach(hero => {
//         generateHero(hero.localized_name)
//       });
//     })
//   }
//   catch (er) {
//     console.log('er')
//   }
// }

// request()

//////second try///////

// const request = fetch(url);
// request.then(response => { return response.json() }).then(data => {
//   data.forEach(item => {
//     generateHero(item.localized_name, item.primary_attr)
//   });
// })

//////third try//////

// const promise = new Promise((resolve, reject) => {
//   try {
//     fetch(url).then(response => response.json()).then(data => {
//       data.forEach(hero => {
//         resolve(generateHero(hero.localized_name, hero.primary_attr))
//       });
//     })
//   }
//   catch (error) {
//     reject(console.log('error'))
//   }
// })
