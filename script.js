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
                
                currentRow++;  
                let nextRow = letterInputs[currentRow * 5];  
                if (nextRow) {
                    nextRow.focus();
                }
            }
            return;
        }

        if (isLetter(event.target.value) ) {  
            console.log("Valid input: " + event.target.value);         
            if(currentAllowedIndex === index) {
                console.log("valid letter and index match.");
                if (board[currentRow].length < 5) {
                    board[currentRow].push(event.target.value);
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
            console.log("Invalid input. Please enter a letter.");
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