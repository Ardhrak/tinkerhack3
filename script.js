const gameData = {
    easy: [
        
            { 
                imageUrl: "easy1.jpg", // Replace with actual image URL
                answer: "GODHA",
                
            },
            {
                imageUrl: "easy2.jpg", // Replace with actual image URL
                answer: "PUNYALAN AGARBATTIS",
            },
            {
                imageUrl: "easy3.jpg", // Replace with actual image URL
                answer: "AADU 2",
            },
            {
                imageUrl: "easy4.jpg", // Replace with actual image URL
                answer: "DEVASURAM",
            },
            {
                imageUrl: "easy5.jpg", // Replace with actual image URL
                answer: "HONEY BEE",
            },
    
    ],

medium : [
    {
        imageUrl: "med1.jpg", // Replace with actual image URL
        answer: "CHARLIE",
    },
    {
        imageUrl: "med2.jpg", // Replace with actual image URL
        answer: "KATTAPPANAYILE RITHWIK ROSHAN",
    },
    {
        imageUrl: "med3.jpg", // Replace with actual image URL
        answer: "MEESHA MADHAVAN",
    },
    {
        imageUrl: "med4.jpg", // Replace with actual image URL
        answer: "THATTATHIN MARAYATH",
    },
    {
        imageUrl: "med5.jpg", // Replace with actual image URL
        answer: "NEELAKASHAM PACHAKADAL CHUVANNA BHOOMI",
    },
    
],
hard :[
    {
        imageUrl: "hard2.jpg", // Replace with actual image URL
        answer: "NJAN PRAKASHAN",
    },
    {
        imageUrl: "hard3.jpg", // Replace with actual image URL
        answer: "RAJAVINTE MAKAN",
    },
    {
        imageUrl: "hard1.jpg", // Replace with actual image URL
        answer: "YODDHA",
    },
    {
        imageUrl:"hard4.jpg",
        answer:"SANDESHAM",

    },
{
        imageUrl:"hard5.jpg",
        answer:"LUCIFER",
        
    }
]
};
let currentLevel = '';
let currentQuoteIndex = 0;
let score = 0;
let attempts = 0;
const maxAttempts = 1;

function showSection(sectionId) {
    document.querySelectorAll('section').forEach(section => {
        section.classList.remove('home');
    });
    document.getElementById(sectionId).classList.add('home');
}

function setLevel(level) {
    currentLevel = level;
    currentQuoteIndex = 0;
    score = 0;
    attempts = 0;
    document.getElementById('gameArea').style.display = 'block';
    document.getElementById('score').textContent = `Score: ${score}`;
    showNextQuote();
}
function showNextQuote() {
    const quoteObj = gameData[currentLevel][currentQuoteIndex];
    const quoteImage = document.getElementById('quoteImage');
    
    // Show loading state
    quoteImage.classList.add('loading');
    quoteImage.style.display = 'block';
    
    // Load new image
    quoteImage.src = quoteObj.imageUrl;
    quoteImage.onload = () => {
        quoteImage.classList.remove('loading');
    };

    // Reset input and feedback
    document.getElementById('guess').value = '';
    document.getElementById('feedback').textContent = '';
    document.getElementById('feedback').className = 'feedback';
}

function checkAnswer() {
    const guess = document.getElementById('guess').value.trim().toLowerCase();
    const correctAnswer = gameData[currentLevel][currentQuoteIndex].answer.toLowerCase();
    const feedback = document.getElementById('feedback');

    if (guess === correctAnswer) {
        // Handle correct answer
        score += 10;
        feedback.textContent = 'Correct! Well done!';
        currentQuoteIndex++;
        // Check if game is complete
        if (currentQuoteIndex >= gameData[currentLevel].length) {
            feedback.textContent = `Game Complete! Final Score: ${score}`;
            return;
        }
        
        setTimeout(showNextQuote, 1500);
    } else {
        // Handle wrong answer
        attempts++;
        if (attempts < maxAttempts) {
            // Show hint if attempts remain
            const hint = gameData[currentLevel][currentQuoteIndex].hint;
            feedback.textContent = `Wrong answer. Hint: ${hint}. Attempts left: ${maxAttempts - attempts}`;
        }     
         else {
            // Move to next question if max attempts reached
            feedback.textContent = `Wrong! The correct answer was: ${gameData[currentLevel][currentQuoteIndex].answer}`;
            currentQuoteIndex++;
            attempts = 0;
            // Check if game is complete
            if (currentQuoteIndex >= gameData[currentLevel].length) {
                feedback.textContent += `\nGame Complete! Final Score: ${score}`;
                return;
            }
            setTimeout(showNextQuote, 2000);
        }
    }
    
    // Update score display
    document.getElementById('score').textContent = `Score: ${score}`;
}
