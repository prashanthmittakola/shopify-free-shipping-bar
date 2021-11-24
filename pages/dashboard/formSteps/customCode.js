const horizontalZoomCode = `<style>
#fsb_bar {
  background: black url(https://media.realitatea.net/multimedia/image/201707/full/colors_64168900.jpg);
  background-repeat: no-repeat;
  background-size: 3000px;
  animation: slider 10s infinite alternate;
}

@-webkit-keyframes slider{
  from {
    background-size: 2000px;
    background-position: left top;
  }
  to {
    background-position: right center;
    background-size: 3000px;
  }
}

@-moz-keyframes slider{
  from {
    background-size: 2000px;
    background-position: left top;
  }
  to {
    background-position: right center;
    background-size: 3000px;
  }
}

@-o-keyframes slider{
  from {
    background-size: 2000px;
    background-position: left top;
  }
  to {
    background-position: right center;
    background-size: 3000px;
  }
}

@keyframes slider{
  from {
    background-size: 2000px;
    background-position: left top;
  }
  to {
    background-position: right center;
    background-size: 3000px;
  }
}
</style>`;

const verticalScrollCode = `<style>
#fsb_bar {
  background: black url(https://s3.amazonaws.com/lastsecondcoupon/img/bar_background/custom_code_background_halloween.jpg);
  background-repeat: no-repeat;
  background-size: cover;
  animation: slider 7s infinite alternate;
}

@-webkit-keyframes slider{
  from {
    background-size: cover;
    background-position: center top;
  }
  to {
    background-size: cover;
    background-position: center bottom;
  }
}

@-moz-keyframes slider{
  from {
    background-size: cover;
    background-position: center top;
  }
  to {
    background-size: cover;
    background-position: center bottom;
  }
}

@-o-keyframes slider{
  from {
    background-size: cover;
    background-position: center top;
  }
  to {
    background-size: cover;
    background-position: center bottom;
  }
}

@keyframes slider{
  from {
    background-size: cover;
    background-position: center top;
  }
  to {
    background-size: cover;
    background-position: center bottom;
  }
}
</style>`;

const verticalScrollwhileWebsiteScrolledCode = `<script>
// Step 1: Edit 'bar_height'. This value will make the bar taller.
var bar_height = 25; // Higher = Taller.

// Step 2: Edit 'parallax_coefficient'. This value will change how fast the background image scrolls.
var parallax_coefficient = 300; // Higher = less background image scrolling.

// Step 3: Add your own image URLs for Mobile. Tablet, and Desktop. (The same image URL can be used for all 3 images)
var mobile_image_url = "https://i.imgur.com/MLghaQ5.jpg"; // Mobile Image width should be about 900px.
var tablet_image_url = "https://i.imgur.com/cM7GACX.jpg"; // Tablet Image width should be about 1000px.
var desktop_image_url = "https://i.imgur.com/rxmACtT.jpg"; // Desktop image width should be at least 1920px.

var mobile_width = 600; // Max mobile screen width in Pixels.
var tablet_width = 767; // Max tablet screen width in Pixels.
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function update(){
$("[id=fsb_bar]").css({
   'paddingBottom' : bar_height/2,
   'paddingTop' : bar_height/2,
   'background-position' : "50% "+50+"%" 
});

if($(window).width() < mobile_width ){
   $('[id=fsb_bar]').css("background-image", "url("+mobile_image_url +")");  
} else if($(window).width() > tablet_width  ) {
   $('[id=fsb_bar]').css("background-image", "url("+desktop_image_url +")");  
}else{
   $('[id=fsb_bar]').css("background-image", "url("+tablet_image_url +")");  
}
}
$( window ).scroll(function() {
$("[id=fsb_bar]").css({
   'background-position' : "50% "+(50+($("html").scrollTop() / parallax_coefficient))+"%" 
});
});
$(window).resize(function(){update();});
$(document).ready(function(){update();});
</script>
<style>
#fsb_bar {
  background-position: 50% 50%;  /*Center the image */
  background-repeat: no-repeat; /* Do not repeat the image */
  background-size: cover; /* Resize the background image to cover the entire container */
}
</style>`;

export {
  horizontalZoomCode,
  verticalScrollCode,
  verticalScrollwhileWebsiteScrolledCode,
};
