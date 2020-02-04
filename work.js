var zodiacsign = "";

var element ={
    'capricorn':   'earth',
    'aquarius':    'air',
    'pisces':      'water',
    'aries':       'fire',
    'taurus':      'earth',
    'gemini':      'air',
    'cancer':      'water',
    'leo':         'fire',
    'virgo':       'earth',
    'libra':       'air',
    'scorpio':     'water',
    'sagittarius': 'fire'
}

var symbol = {
    'capricorn':   'sea goat',
    'aquarius':    'water bearer',
    'pisces':      'fish',
    'aries':       'ram', 
    'taurus':      'bull', 
    'gemini':      'twins', 
    'cancer':      'crab', 
    'leo':         'lion', 
    'virgo':       'maiden',
    'libra':       'scale', 
    'scorpio':     'scorpion',
    'sagittarius': 'centaur'
  };

var colors = {
    'capricorn':   ['brown', 'gray', 'dark green', 'waters'],
    'aquarius':    ['electric blue', 'turquoise'],
    'pisces':      ['sea green', 'light purple'],
    'aries':       ['red'],
    'taurus':      ['pale blue', 'green'],
    'gemini':      ['yellow', 'light orange', 'light pink', 'pastels'],
    'cancer':      ['silver', 'light blue'],
    'leo':         ['orange', 'yellow', 'red', 'gold'],
    'virgo':       ['green', 'dark brown'],
    'libra':       ['pink', 'pastel blue'],
    'scorpio':     ['deep red', 'maroon', 'black'],
    'sagittarius': ['dark purple', 'dark blue']
}

var keywords = {
    'capricorn':   ['goat', 'statues', 'chandelier'],
    'aquarius':    ['sage', 'moon', 'stars', 'pastel', 'sky'],
    'pisces':      ['dreamy', 'water plant'],
    'aries':       ['fireworks', 'smoke', 'dark'],
    'taurus':      ['mountain', 'coffee'],
    'gemini':      ['silk', 'flowers'],
    'cancer':      ['flowers', 'ocean', 'cute'],
    'leo':         ['sun', 'butterfly', 'strong'],
    'virgo':       ['ring', 'notebook', 'castle'],
    'libra':       ['light', 'balance', 'lana del rey', 'angel', 'shiny', 'soft'],
    'scorpio':     ['dark', 'skull', 'book', 'rainy', 'forest', 'snake'],
    'sagittarius': ['chaos', 'bookshelves', 'sun']
}

var BaseUrl = 'https://pixabay.com/api/?key=&per_page=200';
var UrlZodiac ='';
var UrlSymbol = '';
var UrlColor = '';
const categoryBG="&category=backgrounds"
const imageTypePhoto="&image_type=photo"
const imageTypeIllustration= "&image_type=illustration"


//ajax api calls
function generateBG(){
    var birthdate = $('#birthdate').val();
    var year = birthdate.split("-")[0];
    var month = birthdate.split("-")[1];
    var day = birthdate.split("-")[2];

    zodiacsign = getZodiacSign(day, month);

    $.ajax({
        url: buildUrlZodiacSign(),
        type: "GET",
        success: function(result){
            applyImageZodiac(result);
        },
        error: function(error){
            console.log('Error ${error}')
        }
    })
}

function generateColorImg(){
    $.ajax({
        url: buildUrlColor(),
        type: "GET",
        success: function(result){
            applyImageColor(result);
        },
        error: function(error){
            console.log('Error ${error}')
        }
    })
}


//build url functions
function buildUrlZodiacSign(){
    var Url = BaseUrl;
    Url += "&q=" + zodiacsign;
    return Url
}

function buildUrlSymbol(){
    var Url = BaseUrl;
    Url += "&q=" + symbol[zodiacsign];
    return Url
}

function buildUrlColor(){
    var Url = BaseUrl;
    Url += "&q=" + colors[zodiacsign][randomNumber(0, Object.keys(colors[zodiacsign]).length)];
    return Url
}

//apply zodiac image to canvas
function applyImageZodiac(result){
    var img = result.hits[randomNumber(0, result.hits.length)]
    
    var imageurl = img.largeImageURL;
    var canvas = document.getElementById('viewport'),
    context = canvas.getContext('2d');

    var bg = new Image();
    bg.src = imageurl;

    bg.onload = function(){
        fitImageOn(canvas, bg);
    }
}

//fit image to canvas
var fitImageOn = function(canvas, img) {
    context = canvas.getContext('2d');

	var imgAspectRatio = img.width / img.height;
	var canvasAspectRatio = canvas.width / canvas.height;
	var height, width, x, y;

	//fit on height - centered horizontally
	if(imgAspectRatio > canvasAspectRatio) {
		height = canvas.height;
		width = img.width * (height / img.height);
		x = (canvas.width - width) / 2;
		y = 0;
	}

	//fit on width - centered vertically
	else if(imgAspectRatio < canvasAspectRatio) {
		width = canvas.width
		height = img.height * (width / img.width);
		x = 0;
		y = (canvas.height - height) / 2;
	}

	//keep aspect ratio
	else {
		height = canvas.height;
		width = canvas.width;
		x = 0;
		y = 0;
    }
    context.drawImage(img, x, y, width, height);
};

//apply color image to canvas
function applyImageColor(result){
    var img = result.hits[randomNumber(0, result.hits.length)]
    
    var imageurl = img.largeImageURL;
    var canvas = document.getElementById('viewport'),
    context = canvas.getContext('2d');

    var bg = new Image();
    bg.src = imageurl;
    bg.onload = function(){
        if(bg.width < bg.height){
            context.drawImage(bg, randomNumber(0,150), randomNumber(0,150), randomNumber(100,150), randomNumber(150,200));
        }else if(bg.height > bg.width){
            context.drawImage(bg, randomNumber(0,150), randomNumber(0,150), randomNumber(150,200), randomNumber(100,150),);
        }else{
            context.drawImage(bg, randomNumber(0,150), randomNumber(0,150), 100, 100);
        }
    }
}

//helper functions
function randomNumber(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
  }

$(document).ready(function(){
    $("#form").submit(function( event ) {
        event.preventDefault();

        var generatebg = new Promise((resolve, reject) => generateBG());
        
        generatebg.then(generateColorImg(), null);

    });
});