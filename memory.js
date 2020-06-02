const playButton = document.querySelector('.playButton');

document.querySelector('.page1').style.display = '';
document.querySelector('.page2').style.display = 'none';
document.querySelector('.page3').style.display = 'none';
document.querySelector('.page4').style.display = 'none';

playButton.addEventListener('click', () => {
  document.querySelector('.page1').style.display = 'none';
  document.querySelector('.page2').style.display = '';
});

let draw = () => {
  let arrRandom1 = [];
  let arrRandom2 = [];
  let getRandomInt = (max) => {
    return Math.floor(Math.random() * Math.floor(max));
  };
  while (arrRandom1.length < 10) {
    let addNum1 = getRandomInt(10);
    if (!arrRandom1.includes(addNum1)) {
      arrRandom1.push(addNum1);
    }
  }
  while (arrRandom2.length < 10) {
    let addNum2 = getRandomInt(10);
    if (!arrRandom2.includes(addNum2)) {
      arrRandom2.push(addNum2);
    }
  }
  let arrRandomAll = arrRandom1.concat(arrRandom2);
  for (let y = 0; y < 20; ++y) {
    document.querySelector(
      `.square${y} .airlinePic`
    ).style.backgroundImage = `url("${arrRandomAll[y]}.JPG")`;
  }
};

draw();
let stayShown = [];
let arrInspect = [];
let arrBlock = [];
let currentPoint = 0;

let arrInspectNext = () => {
  if (arrInspect[0] === arrInspect[1]) {
    document.querySelector('.page3').style.display = 'flex';
    document.querySelector('.page2').style.display = 'none';
    currentPoint += 5;
    document.querySelector(`.page3 .boxInBox .guessPic`).style.backgroundImage =
      arrInspect[0];
    giveAnswer();
    let dividePics = () => {
      document.querySelectorAll('.square').forEach((elem1) => {
        if (
          elem1.querySelector('.airlinePic').style.backgroundImage ===
          arrInspect[0]
        ) {
          stayShown.push(elem1);
        } 
      });
    };
    dividePics();
  } else {
    document.querySelectorAll('.airlinePic').forEach((elem) => {
      elem.style.display = 'none';
    });
    document.querySelectorAll('.coverPic').forEach((elem) => {
      elem.style.display = 'block';
    });
    stayShown.forEach((elem) => {
      elem.querySelector('.airlinePic').style.display = 'block';
      elem.querySelector('.coverPic').style.display = 'none';
    });
    currentPoint -= 1;
  }
  document.querySelectorAll('.points')[0].innerText = currentPoint;
  arrInspect = [];
  arrBlock = [];
};

document.querySelectorAll('.square').forEach((element) => {
  element.addEventListener('click', () => {
    if (arrBlock[0] !== undefined && arrBlock[0] === element) return;
    if (arrInspect.length === 2) return;
    if (element.querySelector('.coverPic').style.display !== 'none') {
      element.querySelector('.coverPic').style.display = 'none';
      element.querySelector('.airlinePic').style.display = 'block';
    }
    arrInspect.push(element.querySelector('.airlinePic').style.backgroundImage);
    arrBlock.push(element);
    if (arrInspect.length === 2) {
      setTimeout(arrInspectNext, 600);
    }
  });
});

let answerBank = {
  'url("0.JPG")': 'Emirates',
  'url("1.JPG")': 'Etihad',
  'url("2.JPG")': 'Hawaiian',
  'url("3.JPG")': 'Thai Airways',
  'url("4.JPG")': 'Alitalia',
  'url("5.JPG")': 'Quantas',
  'url("6.JPG")': 'Aeroflot',
  'url("7.JPG")': 'British Airways',
  'url("8.JPG")': 'Air Tahiti',
  'url("9.JPG")': 'Hainan',
};

let answerRandom = [
  'American',
  'Wizzair',
  'Ryanair',
  'Qatar',
  'Lufthansa',
  'Turkish',
  'United',
  'Virgin',
  'Flydubai',
  'Austrian',
  'Air France',
  'Iberia',
  'Gulf Air',
  'Air Canada',
  'Kenya Airways',
  'Air New Zealand',
  'South African',
  'Tap Portugal',
  'Air Arabia',
  'Eurowings',
  'Easyjet',
  'Lauda',
  'LOT',
  'Norwegian',
  'Spicejet',
];

let giveAnswer = () => {
  let answerArray = [];
  answerArray.push(answerBank[arrInspect[0]]);
  let goodAnswer = answerBank[arrInspect[0]];
  let getRandomInt = (max) => {
    return Math.floor(Math.random() * Math.floor(max));
  };

  answerArray.push(answerRandom[`${getRandomInt(answerRandom.length)}`]);
  let scndRandom = () => {
    let secondRandom = answerRandom[`${getRandomInt(answerRandom.length)}`];
    if (answerArray.includes(secondRandom)) {
      return scndRandom();
    } else {
      answerArray.push(secondRandom);
    }
  };
  scndRandom();

  function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  }
  shuffleArray(answerArray);

  Array.from(document.getElementsByTagName('label')).forEach((element, i) => {
    element.innerText = answerArray[i];
  });
  let changeScreen = () => {
    document.querySelectorAll('.select').forEach((element) => {
      element.classList.remove('good');
      element.classList.remove('wrong');
    });

    document.querySelector('.page3').style.display = 'none';
    document.querySelector('.page2').style.display = '';
  };
  let loadFinalScreen = () => {
    document.querySelector('.page3').style.display = 'none';
    document.querySelector('.page2').style.display = '';
    document.querySelector('.page4').style.display = '';
    document.querySelectorAll('.points')[1].innerText = currentPoint;
  };

  Array.from(document.querySelectorAll('.select')).forEach((element) => {
    let answerCSS = (event) => {
      document.querySelectorAll('.select').forEach((elem) => {
        if (elem.querySelector('label').innerText === goodAnswer) {
          elem.classList.add('good');
          elem.classList.remove('wrong');
        } else {
          elem.classList.add('wrong');
        }
      });
      if (element.querySelector('label').innerText === goodAnswer) {
        currentPoint += 5;
        document.querySelectorAll('.points')[0].innerText = currentPoint;
      }
      if (stayShown.length < 20) {
        setTimeout(changeScreen, 1500);
      } else {
        setTimeout(loadFinalScreen, 1000);
      }
    };
    element.removeEventListener('click', answerCSS);
    element.addEventListener('click', answerCSS);
  });
};

document.querySelector('.againButton').addEventListener('click', () => {
  location.reload();
});
