var wordsToGuess = new Array(5);
wordsToGuess[0] = "no pain no gain";
wordsToGuess[1] = "microsoft";
wordsToGuess[2] = "sparta global";
wordsToGuess[3] = "multithreading";
wordsToGuess[4] = "object oriented programming";

var randomNumber = Math.floor(Math.random() * wordsToGuess.length);


var password = wordsToGuess[randomNumber];
password = password.toUpperCase();

var length = password.length;
var wrongCheckCounter = 1;
var hiddenPassword = "";

var right = new Audio("right.wav");
var wrong = new Audio("wrong.wav");
var win = new Audio("win.wav");
var loss = new Audio("loss.wav");

for(i=0;i<length;i++){
	if(password.charAt(i) == " ") hiddenPassword = hiddenPassword + " ";
	else hiddenPassword = hiddenPassword + "-";
}

function displayPassword(){
	document.getElementById("board").innerHTML = hiddenPassword;
}

window.onload = startAlphabet;

var letters = new Array(25);

letters[0] = "A";
letters[1] = "B";
letters[2] = "C";
letters[3] = "D";
letters[4] = "E";
letters[5] = "F";
letters[6] = "G";
letters[7] = "H";
letters[8] = "I";
letters[9] = "J";
letters[10] = "K";
letters[11] = "L";
letters[12] = "M";
letters[13] = "N";
letters[14] = "O";
letters[15] = "P";
letters[16] = "R";
letters[17] = "S";
letters[18] = "T";
letters[19] = "U";
letters[20] = "V";
letters[21] = "W";
letters[22] = "X";
letters[23] = "Y";
letters[24] = "Z";

function startAlphabet(){
	var alphabet = "";

	for(i=0;i<25;i++){
		var element = "lett" + i;
		alphabet = alphabet + '<div class="letter" id = "'+element+'" onclick="checkLetter('+i+')"> '+letters[i]+' </div>';
		if((i+1)%7 == 0) alphabet = alphabet + '<div style="clear:both;"></div>'
	}

	document.getElementById("alphabet").innerHTML = alphabet;


	displayPassword();
}

String.prototype.swapLetter = function(place,letter){
	if(place > this.length-1) return this.toString();
	else return this.substr(0,place) + letter + this.substr(place+1);
}

function checkLetter(number){

	var guessed = false;

	for(i=0; i<length;i++){
		if(password.charAt(i)==letters[number]){
			hiddenPassword = hiddenPassword.swapLetter(i,letters[number]);
			guessed = true;
		}
	}

	if(guessed == true){
		right.play();
		var element = "lett" + number;
		document.getElementById(element).style.background = "#003300";
		document.getElementById(element).style.color = "#00C000";
		document.getElementById(element).style.border = "3px solid #00C000";
		document.getElementById(element).style.cursor = "default";

		displayPassword();
	} else {
		wrong.play();
		var element = "lett" + number;
		document.getElementById(element).style.background = "#330000";
		document.getElementById(element).style.color = "#C00000";
		document.getElementById(element).style.border = "3px solid #C00000";
		document.getElementById(element).style.cursor = "default";
		document.getElementById(element).setAttribute("onclick",";");

		wrongCheckCounter++;

		var image = "img/b" + wrongCheckCounter + ".jpg";
		document.getElementById("hangman").innerHTML = '<img src ="'+image+'" alt="" />'
	}
	if(password == hiddenPassword){
		win.play();
		document.getElementById("alphabet").innerHTML = "Well done! You guessed the right answer: " +password+
	'<br /> <br /><span class="reset" onclick="location.reload()">NEW GAME?</span>';
	}

	if(wrongCheckCounter >=10){
		loss.play();
		document.getElementById("alphabet").innerHTML = "Upsss! You've used all allowed attempts. Right answer was: " +password+
	'<br /> <br /><span class="reset" onclick="location.reload()">NEW GAME?</span>';
	}
}