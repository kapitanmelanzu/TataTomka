let currentLevel = 0;

let currentString = "";

let history = [];

const expression = document.getElementById("expression");

const lettersDiv = document.getElementById("letters");

const message = document.getElementById("message");

function loadLevel(){

    const level = levels[currentLevel];

    currentString = level.start;

    history = [];

    document.getElementById("levelName").textContent = level.name;

    document.getElementById("objective").textContent = level.objective;

    document.getElementById("next").disabled = true;

    message.textContent = "";

    lettersDiv.innerHTML = "";

    level.letters.forEach(letter=>{

        const button=document.createElement("button");

        button.textContent=letter;

        button.onclick=()=>{

            history.push(currentString);

            currentString=letter+currentString;

            renderExpression();

        }

        lettersDiv.appendChild(button);

    });

    renderExpression();

}

document.getElementById("undo").onclick=()=>{

    if(history.length===0) return;

    currentString=history.pop();

    renderExpression();

}

document.getElementById("check").onclick=()=>{

    const level=levels[currentLevel];

    if(currentString===level.target){

        message.textContent="✅ Idealnie!";

        document.getElementById("next").disabled=false;

    }else{

        message.textContent="❌ No chyba nie.";

    }

}

document.getElementById("next").onclick=()=>{

    currentLevel++;

    if(currentLevel>=levels.length){

        document.body.innerHTML = `
<h1 style="text-align:center;margin-top:120px;">
    Gratulacje!
</h1>

<p style="text-align:center;font-size:20px;">
    Mam nadzieję, że gra ci się spodobała. Oczywiście gra powstała w celach humorystycznych,
    pomysł wymyśliłem randomowo i pomyślałem, że śmiesznie będzie spróbować zrobić coś takiego.
</p>
`;
        return;

    }

    loadLevel();

}

document.getElementById("startButton").onclick = () => {

    document.getElementById("startScreen").style.display = "none";

    document.getElementById("game").style.display = "block";

    loadLevel();

};

function renderExpression(){

    const level = levels[currentLevel];

    const expression = document.getElementById("expression");

    expression.innerHTML = "";

    const locked = level.start.length;

    for(let i=0;i<currentString.length;i++){

        const span = document.createElement("span");

        span.textContent = currentString[i];

        if(i >= currentString.length - locked){

            span.classList.add("locked");

        }

        expression.appendChild(span);

    }

}
