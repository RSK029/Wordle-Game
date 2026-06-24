function isLetter(letter) {
  return /^[a-zA-Z]$/.test(letter);
}

let letterInputs = document.querySelectorAll('.letter');
let currentRow = 0;
let currentAllowedIndex = 0;


letterInputs.forEach((input, index) => {
    input.addEventListener("keyup", function(event) {

        if (event.key === "Backspace") {
            if(currentAllowedIndex > 0) { 
                console.log(currentAllowedIndex);
                currentAllowedIndex--;
                console.log(currentAllowedIndex);
                board[currentRow].pop();
                letterInputs[currentAllowedIndex].value = "";
                letterInputs[currentAllowedIndex].focus();
            }
            return;
               
        }

        if (event.key === "Enter") {
            if (board[currentRow].length === 5) {
                checkWord();

                currentRow++;  
                let nextRow = letterInputs[currentRow * 5];  
                if (nextRow) {
                    nextRow.focus();
                }
            }
            return;
        }

        if (isLetter(event.target.value) ) {  
                    
            if(currentAllowedIndex === index) {
                
                if (board[currentRow].length < 5) {
                    board[currentRow].push(event.target.value.toUpperCase());
                    currentAllowedIndex++;
                
                
                    let nextInput = event.target.nextElementSibling;
                    if (nextInput) {
                        nextInput.focus();
                    }
                }

            }  
            else {
                // console.log("valid letter but index mismatch.");
                // event.target.value = "";
                // letterInputs[currentAllowedIndex].focus();
            }  
        }
        else {
            
            event.target.value = "";
            if(!currentAllowedIndex === index) {
                letterInputs[currentAllowedIndex].focus();
            } 
        }

        
    });
});


let board = [
    [],
    [],
    [],
    [],
    [],
    [],
    
];

//adding api
const apiurl = "https://words.dev-apis.com/word-of-the-day";

const getWordOfTheDay = async () => {
    try {
        const response = await fetch(apiurl);
        const data = await response.json();
        const word = data.word.toUpperCase();
        
        return word;
    }
    catch (error) {
        console.error("Error fetching word of the day:", error);
    }
}

let wordOfTheDay;

async function init() {
    wordOfTheDay = await getWordOfTheDay();
    console.log(wordOfTheDay);
}

init();


function checkWord() {
    
    const currentGuess = board[currentRow].join("");
    console.log("Word of the day:", wordOfTheDay);
    wordArray = wordOfTheDay.split("");
    console.log("wordArray before marking letters as used:", wordArray);
    for (let i = 0; i < currentGuess.length; i++) {
        
        const guess = currentGuess[i];
        const correct = wordOfTheDay[i]; 
        const word = "word" + `${currentRow}`;
        const letter = "l" + `${i}`;
        const input = document.querySelector(`.${word} .${letter}`);

        if (guess === correct && wordArray.includes(guess)) {  
            wordArray[i] = null; // Mark the letter as used
            input.style.backgroundColor = "green";   
            console.log(`wordArray after marking ${guess} as used:`, wordArray); 
        }

        else if (wordArray.includes(guess)) {
            wordArray[wordArray.indexOf(guess)] = null; // Mark the letter as used
            input.style.backgroundColor = "yellow";    
            console.log(`wordArray after marking ${guess} as used:`, wordArray);
        }
        else if (!wordArray.includes(guess)) {
            wordArray[wordArray.indexOf(guess)] = null; // Mark the letter as used
            input.style.backgroundColor = "gray";    
            console.log(`wordArray after marking ${guess} as used:`, wordArray);
        }
    }       
}