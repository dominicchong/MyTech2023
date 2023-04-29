//Function for slideshow

$('.slideshow-carousel').flickity({
  // options
  cellAlign: 'left',
  wrapAround: true,
  freeScroll: true
});


// Function to show timeline
       
$(document).ready(function(){	
    $(".btn").on("click", function(e) { 

        var target = $(this).attr("href");
        $(target).slideToggle("fast");
        $(".timeline-items").not(target).hide();

        e.preventDefault();
    });
});

//Function to allow autoplay on mobile devices
 // 2. This code loads the IFrame Player API code asynchronously.
 var tag = document.createElement('script');

 tag.src = "https://www.youtube.com/iframe_api";
 var firstScriptTag = document.getElementsByTagName('script')[0];
 firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

 // 3. This function creates an <iframe> (and YouTube player)
 //    after the API code downloads.
 var player;
 function onYouTubeIframeAPIReady() {
 
   player = new YT.Player('player', {
    width: '100%',
    height: '100%',
    position: 'absolute',
     videoId: '3aXjVqc4GeE',
     events: {
       'onReady': onPlayerReady,
      //  'onStateChange': onPlayerStateChange
     }
   });
 }
 // 4. The API will call this function when the video player is ready.
 function onPlayerReady(event) {

  event.target.mute();
  event.target.playVideo();
}

// 5. The API calls this function when the player's state changes.
//    The function indicates that when playing a video (state=1),
//    the player should play for six seconds and then stop.
// var done = false;
// function onPlayerStateChange(event) {
//   if (event.data == YT.PlayerState.PLAYING && !done) {
//     //setTimeout(stopVideo, 6000);
//     done = true;
//   }
// }
// function stopVideo() {
//   player.stopVideo();
// }


