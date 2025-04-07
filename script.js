const correctAnswers = {
    Python: ["A", "A", "A", "A", "B"],
    Java: ["A", "A", "A", "A", "B"],
    JavaScript: ["D", "A", "A", "D", "A"]
};

let currentUser = null;
let selectedLanguage = null;

// Handle login form submission
document.getElementById('login-form').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent page reload
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    if (username === 'login' && password === 'login') {
        document.getElementById('login-page').style.display = 'none';
        document.getElementById('language-page').style.display = 'block';
    } else {
        alert('Invalid data');
    }
});

function startExam() {
    selectedLanguage = document.getElementById('language').value;  // Use global selectedLanguage
    console.log("Selected Language: " + selectedLanguage);

    // Hide language page, show quiz page
    document.getElementById('language-page').style.display = 'none';
    document.getElementById('mcq-page').style.display = 'block'; // Ensure mcq-page is visible

    document.getElementById('quiz-title').textContent = `Start your ${selectedLanguage} quiz`;

    // Generate and display questions based on selected language
    const questionsContainer = document.getElementById('questions-container');
    questionsContainer.innerHTML = ''; // Clear previous questions
    const questions = generateQuestions(selectedLanguage);
    console.log(questions);

    if (Array.isArray(questions)) {
        questions.forEach((question, index) => {
            const questionElement = document.createElement("div");
            questionElement.classList.add("question");
        
            // Generate question text
            let questionHTML = `<p>${index + 1}. ${question.question}</p>`;
        
            // Generate options properly
            question.options.forEach((option, i) => {
                questionHTML += `
                    <label>
                        <input type="radio" name="q${index + 1}" value="${String.fromCharCode(65 + i)}">
                        ${option}
                    </label>
                `;
            });
        
            questionElement.innerHTML = questionHTML;
            questionsContainer.appendChild(questionElement);
        });
        
    }
}

// Function to generate questions based on the selected language
function generateQuestions(selectedLanguage) {
    const questions = {
        Python: [
            { question: "What does 'print' do in Python?", options: ["Outputs text", "Defines a function", "Declares a variable", "Imports a module"] },
            { question: "Which of the following is a valid Python list?", options: ["[1, 2, 3]", "1, 2, 3", "(1, 2, 3)", "{1, 2, 3}"] },
            { question: "What is the correct way to start a comment in Python?", options: ["#", "//", "/*", "**"] },
            { question: "Which of these is used to define a function in Python?", options: ["def", "function", "func", "defining"] },
            { question: "Which operator is used for exponentiation in Python?", options: ["^", "**", "%", "//"] }
        ],
        Java: [
            { question: "Which of the following is a valid variable declaration in Java?", options: ["int a = 10;", "var a = 10;", "let a = 10;", "a = 10;"] },
            { question: "Which keyword is used to define a class in Java?", options: ["class", "function", "define", "struct"] },
            { question: "Which of the following is used to call a method in Java?", options: ["method()", "call()", "invoke()", "run()"] },
            { question: "Which data type is used to store a single character in Java?", options: ["char", "string", "int", "float"] },
            { question: "Which method is used to print text to the console in Java?", options: ["print()", "println()", "echo()", "display()"] }
        ],
        JavaScript: [
            { question: "Which of these is used to declare a variable in JavaScript?", options: ["let", "var", "const", "all of the above"] },
            { question: "How do you create a function in JavaScript?", options: ["function()", "createFunction()", "fn()", "def()"] },
            { question: "Which of the following is used for string concatenation in JavaScript?", options: ["+", "concat", "join", "append"] },
            { question: "Which of the following is a valid condition check in JavaScript?", options: ["if (x > 10)", "when (x > 10)", "check (x > 10)", "x > 10"] },
            { question: "What does '===' represent in JavaScript?", options: ["Strict equality", "Equality", "Assignment", "Comparison"] }
        ]
    };

    return questions[selectedLanguage] || [];
}

// Handle form submission for quiz results
function showResult() {
    
    document.getElementById("mcq-form").addEventListener("submit", function(event) {
        event.preventDefault();
        let score = 0;
        const formData = new FormData(event.target);
    
        console.log("User Answers:", [...formData.entries()]); // Debugging
    
        for (let [key, value] of formData.entries()) {
            const questionIndex = parseInt(key.substring(1))-1; // Fix off-by-one issue
    
            console.log(`Checking Q${questionIndex + 1}: User Answer = "${value}" (string), Correct Answer = "${correctAnswers[selectedLanguage][questionIndex]}" (string)`);
    
            if (value === correctAnswers[selectedLanguage][questionIndex]) {
                score++;
            }
        }
    
        document.getElementById("result-message").textContent =
            score >= 3 ? `You passed with ${score}/5!` : `You failed with ${score}/5.`;
    
        document.getElementById("mcq-page").style.display = "none";
        document.getElementById("result-page").style.display = "block";
    });
}