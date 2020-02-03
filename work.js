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

function generate(){
    var birthdate = $('#birthdate').val();
    var year = birthdate.split("-")[0];
    var month = birthdate.split("-")[1];
    var day = birthdate.split("-")[2];

    zodiacsign = getZodiacSign(day, month);
}

const Url='https://pixabay.com/api/?key='
const query = "&q=" + zodiacsign;
const categoryBG="&category=backgrounds"
const imageTypePhoto="&image_type=photo"
const imageTypeIllustration= "&image_type=illustration"

const fullUrl = Url + query;

$(document).ready(function(){
    $("#form").submit(function( event ) {
        event.preventDefault();

        generate();

        $.ajax({
            url: fullUrl,
            type: "GET",
            success: function(result){
                console.log(result)
            },
            error: function(error){
                console.log('Error ${error}')
            }
        })
    });
});
