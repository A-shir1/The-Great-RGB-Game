var numOfSquares = 6;
var colors = [];
var pickedColor;
var squares = document.querySelectorAll(".square");
var colorDisplay = document.querySelector("#colorDisplay");
var message = document.querySelector("#message")
var h1 = document.getElementsByTagName("h1");
var resetButton = document.getElementById("reset");
var modeBtn = document.querySelectorAll(".modeBtn")

init();


function init()
{
	//MODE BUTTON
	setUpModeBtn();

	//SQUARES
	setUpSquares();

	//TO RUN IT ALL INITIALLY
	reset();
}

function setUpModeBtn()
{
	for (var i = 0; i < modeBtn.length; i++)
	{
		modeBtn[i].addEventListener("click", function()
		{
			modeBtn[0].classList.remove("selected");
			modeBtn[1].classList.remove("selected");
			this.classList.add("selected");
			//figure out the number if colors
			this.textContent === "Easy" ? numOfSquares = 3: numOfSquares = 6;
			reset();
		});
	}
}

function setUpSquares()
{
	for (var i = 0; i < squares.length; i++)
	{
		//add intial colors
		squares[i].style.backgroundColor = colors[i];

		//add click event listeners
		squares[i].addEventListener("click", function()
		{
			//grabbing the color of square
			var thisColor = this.style.backgroundColor;
			//comparing it to picked color
			if(thisColor === pickedColor)
			{
				message.textContent = "Correct!";
				changeColors(thisColor);
				resetButton.textContent = "Play Again";

			}
			else
			{
				message.textContent = "Try Again";
				this.style.backgroundColor = "#232323";
			}
		});
	}
}


function reset(){
	//Run random color generator
	colors = randomColorGenerator(numOfSquares);

	//Pick color
	pickedColor = pickColor();

	//Remove background image from h1
	h1[0].style.backgroundColor = "steelblue";

	//Remove message
	message.textContent = "";

	//change button caption
	resetButton.textContent = "New Colors"; 

	//Change the content of Display Color
	colorDisplay.textContent = pickedColor;

	//Change the colors of squares
	for (var i = 0; i < squares.length; i++)
	{
		squares[i].style.backgroundColor = colors[i];
		//hide the bottom 3 squares
		if (i >= colors.length)
			squares[i].style.display = "none";
		else
			squares[i].style.display = "block"; 
	}
}


resetButton.addEventListener("click", function(){
	reset();
});

function changeColors(color)
{
	for (var j = 0; j < squares.length; j++)
		squares[j].style.backgroundColor = color;
	h1[0].style.backgroundColor = color;
}



function pickColor()
{
	//generate random number between 0 and 6 (not including 6)
	var random = Math.floor(Math.random() * colors.length);
	//return the random numberth element in the array
	return colors[random];
}

function randomColorGenerator(num)
{
	//create an array
	var arr = [];
	for(var i = 0; i < num; i++)
	{
		//get random colors and push them into array
		arr.push(randomColors());
	}
	//return array
	return arr;
}

function randomColors()
{
	//random red color between 0 - 255
	var r = Math.floor(Math.random() * 256);
	//random green color between 0 - 255
	var g = Math.floor(Math.random() * 256);
	//random blue color between 0 - 255
	var b = Math.floor(Math.random() * 256);
	return "rgb(" + r + ", " + g + ", " +b +")";
}