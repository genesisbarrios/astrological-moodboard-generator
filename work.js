const Url='https://jsonplaceholder.typicode.com/posts'
       
$(document).ready(function(){
    $.ajax({
        url: Url,
        type: "GET",
        success: function(result){
            console.log(result)
        },
        error: function(error){
            console.log('Error ${error}')
        }
    })
})