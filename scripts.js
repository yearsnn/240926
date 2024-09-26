const textInput = document.getElementById('text-input');
const fontSizeInput = document.getElementById('font-size');
const letterSpacingInput = document.getElementById('letter-spacing');
const colorInput = document.getElementById('color');
const textDisplay = document.getElementById('text-display');
const nametagText = document.getElementById('nametag-text');
const nametag = document.querySelector('.nametag');

fontSizeInput.value = 105;
letterSpacingInput.min = -5;
letterSpacingInput.max = 5;
letterSpacingInput.value = 0;


function adjustFontSizeToWindow() {
    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;


    const baseFontSize = 55;  
    const sizeAdjustment = Math.min(windowWidth, windowHeight) * 0.02;  

    const fontSize = fontSizeInput.value ? parseInt(fontSizeInput.value) : baseFontSize;
    
    textDisplay.style.fontSize = `${fontSize + sizeAdjustment}px`; 
    nametagText.style.fontSize = `${(fontSize + sizeAdjustment) * 0.03}rem`; 
}

function isKorean(text) {
    const koreanRegex = /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/;
    return koreanRegex.test(text);
}

function updateTextDisplay() {
    const text = textInput.value || "Here is your text.";
    textDisplay.textContent = text;
    nametagText.textContent = text;
    
    const letterSpacing = letterSpacingInput.value;
    textDisplay.style.letterSpacing = `${letterSpacing}px`;
    nametagText.style.letterSpacing = `${letterSpacing}px`;

    const color = colorInput.value;
    textDisplay.style.color = color;
    nametagText.style.color = color;

    if (isKorean(text)) {
        textDisplay.style.fontFamily = "'Noto Sans KR', sans-serif";
        nametagText.style.fontFamily = "'Noto Sans KR', sans-serif";
        textDisplay.style.fontStyle = 'normal';
        nametagText.style.fontStyle = 'normal';
        textDisplay.style.fontWeight = '500';
        nametagText.style.fontWeight = '500';
        textDisplay.style.lineHeight = 'calc(100% + 3vh)';
    } else {
        textDisplay.style.fontFamily = "'Instrument Serif', serif";
        nametagText.style.fontFamily = "'Instrument Serif', serif";
        textDisplay.style.fontStyle = 'italic';
        nametagText.style.fontStyle = 'italic';
    }


    adjustFontSizeToWindow();
}

function handleMouseMove(event) {
    const x = (window.innerWidth / 2 - event.pageX) / 30;
    const y = (window.innerHeight / 2 - event.pageY) / 30;
    nametag.style.transform = `rotateY(${x}deg) rotateX(${-y}deg)`; 
}



textInput.addEventListener('input', updateTextDisplay);
fontSizeInput.addEventListener('input', updateTextDisplay);
letterSpacingInput.addEventListener('input', updateTextDisplay);
colorInput.addEventListener('input', updateTextDisplay);
document.addEventListener('mousemove', handleMouseMove);
window.addEventListener('resize', adjustFontSizeToWindow);


const backgroundColorInput = document.getElementById('background-color');


function updateBackgroundColor() {
    const backgroundColor = backgroundColorInput.value;
    nametag.style.backgroundColor = backgroundColor;
}


backgroundColorInput.addEventListener('input', updateBackgroundColor);

const popup = document.getElementById('popup');
const popupButton = document.getElementById('popup-button');
const closeButton = document.querySelector('.close-button');
const popupNametagText = document.getElementById('popup-nametag-text');
const popupNametag = document.querySelector('.popup-nametag');


popupButton.addEventListener('click', () => {
    popup.style.display = 'flex';


    popupNametagText.textContent = textInput.value || "Here is your text.";
    popupNametagText.style.fontSize = `${fontSizeInput.value}px`;
    popupNametagText.style.letterSpacing = `${letterSpacingInput.value}px`;
    popupNametagText.style.color = colorInput.value;
    popupNametag.style.backgroundColor = backgroundColorInput.value;

    // 
    if (isKorean(textInput.value)) {
        popupNametagText.style.fontFamily = "'Noto Sans KR', sans-serif";
        popupNametagText.style.fontStyle = 'normal';
        popupNametagText.style.fontWeight = '500';
    } else {
        popupNametagText.style.fontFamily = "'Instrument Serif', serif";
        popupNametagText.style.fontStyle = 'italic';
    }
});


closeButton.addEventListener('click', () => {
    popup.style.display = 'none';
});

window.addEventListener('click', (event) => {
    if (event.target === popup) {
        popup.style.display = 'none';
    }
});

const backgroundButton = document.getElementById('background-button');
const saveButton = document.getElementById('save-button');

const popupContent = document.querySelector('.popup-content');


const backgrounds = [
    'url(111.jpg)',
    'url(222.jpg)',
    'url(333.jpg)',
    'url(444.jpg)',
    'url(555.jpg)',
    'url(666.jpg)',
    'url(777.jpg)',
    'url(888.jpg)',
    'url(999.jpg)',
    'url(101010.jpg)'
];


function changeBackground() {
    const randomIndex = Math.floor(Math.random() * backgrounds.length);
    popupContent.style.backgroundImage = backgrounds[randomIndex];
    popupContent.style.backgroundSize = 'cover';
    popupContent.style.backgroundRepeat = 'no-repeat';
    popupContent.style.backgroundPosition = 'center'; 
}


function saveContent() {
    const popupContent = document.querySelector('.popup-content'); 

    html2canvas(popupContent).then(canvas => {
        const link = document.createElement('a');
        link.href = canvas.toDataURL();
        link.download = 'nametag.png';
        link.click();
    });
}


backgroundButton.addEventListener('click', changeBackground);
saveButton.addEventListener('click', saveContent);



updateBackgroundColor();
