
let userInput, userinputtext;
let button, helpButton = [];
let userLine, redSlider, greenSlider, blueSlider;
let poem = [];
let textOptions = ['Help', "I don't know what to do", 'Brain not working'];

function setup() {
  createCanvas(windowWidth, windowHeight);

  userInput = createInput();
  userInput.position(50, 120);
  button = createButton('Add to Poem');
  button.position(userInput.x, userInput.y + 21);
  button.mousePressed(newLine);

  userinputtext = createInput();
  userinputtext.position(50, 180);
  let helpButtonElement = createButton('Help');
  helpButtonElement.position(260, 180);
  helpButtonElement.mousePressed(() => {
    let r = random(textOptions);
    helpButton.push(r);
  });

  redSlider = createSlider(0, 255);
  redSlider.position(50, 20);
  redSlider.size(255);

  greenSlider = createSlider(0, 255);
  greenSlider.position(50, 50);
  greenSlider.size(255);

  blueSlider = createSlider(0, 255);
  blueSlider.position(50, 80);
  blueSlider.size(255);
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function draw() {
  let red = redSlider.value();
  let green = greenSlider.value();
  let blue = blueSlider.value();
  background(red, green, blue);

  writePoem();

  let userText = userinputtext.value();
  text(userText, 50, 230, 185);

  for (let i = 0; i < helpButton.length; i++) {
    text(helpButton[i], 260, 230 + i * 20);
  }
}

function newLine() {
  userLine = userInput.value();
  userInput.value('');
  let words = RiTa.tokenize(userLine);
  let r = floor(random(0, words.length));
  let rhymes = RiTa.rhymes(words[r]);
  if (rhymes.length === 0) {
    poem.push(userLine);
  } else {
    let changedWord = random(rhymes);
    words[r] = changedWord;
    userLine = RiTa.untokenize(words);
    poem.push(userLine);
  }
}

function writePoem() {
  for (let x = 0; x < poem.length; x++) {
    text(poem[x], 50, 260 + x * 20);
  }
}
