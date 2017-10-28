var topics = ["sky scenery","ocean scenery","cloud scenery","bamboo trees scenery","forest scenery","flower sea scenery","island scenery"];

function renderButtons(){
    $("#buttons").empty();

    for (var i=0;i<topics.length;i++){
        var topic = topics[i];

        var newButton = $("<button id='topic' class='btn btn-primary'>");
        $("#buttons").append(newButton.text(topic));   
       }
}

// renderButtons();

$(document).on("click","#topic",function(){
    var topic = $(this).text();
    // console.log(this.text());
    var queryURL = "https://api.giphy.com/v1/gifs/search?q="+topic+"&api_key=dc6zaTOxFJmzC&limit=10";
    //create ajax call for the specific scenery button being clicked
    $.ajax({
        url: queryURL,
        method: "GET"
    }).done(function(response){
        console.log(response);
        console.log(response.data.length);
        
        for(var j=0;j<response.data.length;j++){

            //create div to hold image rating
            var rating= response.data[j].rating;
            //create div to hold image              
            var stillImage = response.data[j].images.fixed_height_small_still.url;
            var animatedImage = response.data[j].images.fixed_height_small.url;
            // console.log(rating);
            // console.log(stillImage);
            var imageDiv = $("<div class='imageDiv-"+j+"'>");
            $("#images").append(imageDiv);
            $(imageDiv).append("<div class='rating'>Rating: "+ rating);
            $(imageDiv).append("<img class='image' data-state='still' src='"+stillImage+"' data-still='"+stillImage+"' data-animate='"+animatedImage+"' alt='image'>");
            
        }

        // click on still picture to make it animated
        $(".image").on("click",function(){
            var thisImage = $(this);
            // console.log(thisImage);

            var state = $(this).attr("data-state");
            console.log(state);

            if(state=="still"){
                var animatedURL = $(this).attr("data-animate");
                $(this).attr("src", animatedURL);
                $(this).attr("data-state", "animate");
            } else {
                var stillURL = $(this).attr("data-still");
                $(this).attr("src", stillURL);
                $(this).attr("data-state", "still");
            }

        });        
    });

    $("#images").empty();

});

//create new button based on user input
$("#submit").on("click", function(event){
    event.preventDefault();
    if($("#searchTerm").val()!=""){
        var newSearch = $("#searchTerm").val().trim();
        console.log(newSearch);
        topics.push(newSearch);
        renderButtons();
        $("#searchTerm").val("");
    }   
});

renderButtons();
