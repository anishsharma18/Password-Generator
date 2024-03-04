const passwordDisplay = document.getElementById("password");
const copiedTxt = document.getElementById("copied");
const copyImg = document.getElementById("copy-img");
const passwordLength = document.getElementById("password-length-number");
const rangeMeter = document.getElementById("range");
const upperLabel = document.getElementById("uppercase");
const lowerLabel = document.getElementById("lowercase");
const numberLabel = document.getElementById("number");
const symbolsLabel = document.getElementById("symbols");
const strengthIndicator = document.getElementById("strength-indicator");
const submitBtn = document.getElementById("submit-btn");

let includeUpperCase = false;
let includeLowerCase = false;
let includeNumbers = false;
let includeSymbols = false;


const minChar = 33;
const maxChar = 122;



let rangeValue = 10;
// copyImg.addEventListener("click",function(){
   
//     passwordDisplay.select();

//     // Copy the selected text to the clipboard
//     document.execCommand('copy');

//     //change the display on click
//     copiedTxt.style.display="inline-block";
//     setTimeout(function() {
//         copiedTxt.style.display="none"; // Change this to the default display property
//       }, 1000);
// });


copyImg.addEventListener("click", function () {
    passwordDisplay.select();

    // Copy the selected text to the clipboard
    navigator.clipboard.writeText(passwordDisplay.value)
        .then(function () {
            // Change the display on click
            copiedTxt.style.display = "inline-block";
            setTimeout(function () {
                copiedTxt.style.display = "none";
                passwordDisplay.value = ""; //after copying change the input box to null
            }, 1000);

            setTimeout(resetValues,2000);
        })
        .catch(function (err) {
            console.error('Error copying to clipboard: ', err);
        });
});

rangeMeter.addEventListener("input",function(){
    let strengthColor = getColorForStrength(rangeMeter.value);
     rangeValue = rangeMeter.value;
    passwordLength.textContent = rangeValue;
    strengthIndicator.style.backgroundColor = strengthColor;
   
});




function getColorForStrength(value) {
    let hue = (value / 20) * 120; 
    return 'hsl(' + hue + ', 100%, 50%)';
}


function getRandomInteger() {
    return Math.floor(Math.random() * (maxChar - minChar + 1) ) + minChar;
}

// 33-47 58-64 91-96 123-126char 48-57 num 65-90 upper 97-122 lower

function isValid(example) {
    if (includeLowerCase === false && example >= 97 && example <= 122) {
        return false;
    }
    if (includeUpperCase === false && example >= 65 && example <= 90) {
        return false;
    }
    if (includeNumbers === false && example >= 48 && example <= 57) {
        return false;
    }
    if (includeSymbols === false && ((example >= 33 && example <= 47) || (example >= 58 && example <= 64) || (example >= 91 && example <= 96) || (example >= 123 && example <= 126))) {
        return false;
    }
    return true; // Character is valid
}


upperLabel.addEventListener("click", function () {
    includeUpperCase =  true;
});

lowerLabel.addEventListener("click", function () {
    includeLowerCase = true;
});

numberLabel.addEventListener("click", function () {
    includeNumbers = true;
});

symbolsLabel.addEventListener("change", function () {
    includeSymbols =true;
});

submitBtn.addEventListener("click",function(){
    
    // let asciiValues = [];
    // while(asciiValues.length < rangeValue){
    //     let randomInteger = getRandomInteger();
    //     if(isValid(randomInteger)){
    //         asciiValues.push(randomInteger)
    //     }
    // }

    // passwordDisplay.value = "" +String.fromCharCode.apply(null, asciiValues);

    let passwordString = "";
    while(passwordString.length < rangeValue){
        let randomInteger = getRandomInteger();
        if(isValid(randomInteger)){
            passwordString += String.fromCharCode(randomInteger)
        }
    }

    passwordDisplay.value = passwordString;

    
});

function resetValues(){
   includeUpperCase = false;
   includeLowerCase = false;
   includeNumbers = false;
   includeSymbols = false;

   upperLabel.checked = false;
   lowerLabel.checked = false;
   numberLabel.checked = false;
   symbolsLabel.checked = false;

   rangeMeter.value = 10;

   passwordLength.textContent = 10;
   
}