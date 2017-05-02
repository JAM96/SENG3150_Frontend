/*
var slideIndex = 1;

showDivs(slideIndex);
carousel();

function plusDivs(n) {
  showDivs(slideIndex += n);
}

function currentDiv(n) {
  showDivs(slideIndex = n);
}

function showDivs(n) {
  var i;
  var x = document.getElementsByClassName("imgslide");
  var dots = document.getElementsByClassName("demo");
  if (n > x.length) {slideIndex = 1}    
  if (n < 1) {slideIndex = x.length}
  for (i = 0; i < x.length; i++) {
     x[i].style.display = "none";  
  }
  for (i = 0; i < dots.length; i++) {
     dots[i].className = dots[i].className.replace(" w3-white", "");
  }
  x[slideIndex-1].style.display = "block";  
  dots[slideIndex-1].className += " w3-white";
}

function carousel() {
    var i;
    var x = document.getElementsByClassName("imgslide");
    for (i = 0; i < x.length; i++) {
       x[i].style.display = "none";  
    }
    slideIndex++;
    if (slideIndex > x.length) {slideIndex = 1}    
    x[slideIndex-1].style.display = "block";  
    setTimeout(carousel, 9000);    
}
*/
// var $window = $(window),
//        $stickyEl = $('.calendar'),
//        elTop = $stickyEl.offset().top;

//    $window.scroll(function() {
//         $stickyEl.toggleClass('sticky', $window.scrollTop() > elTop);
//   });

// Background
// http://vegas.jaysalvat.com
$("body").vegas({
    delay: 7000,
    timer: true,
    shuffle: false,
    firstTransition: 'fade',
    firstTransitionDuration: 1000,
    transition: 'blur2',
    transitionDuration: 7000,
    slides: [
        { src: "res/image/home-4.jpg" },
        { src: "res/image/home-2.jpg" },
        { src: "res/image/home-3.jpg" },
        { src: "res/image/home-1.jpg" }
    ]
});


$(document).bind('scroll',function(e){
  console.log('test')
    $('section').each(function(){
        if (
           $(this).offset().top < window.pageYOffset + 10
//begins before top
        && $(this).offset().top + $(this).height() > window.pageYOffset + 10
//but ends in visible area
//+ 10 allows you to change hash before it hits the top border
        ) {
            window.location.hash = $(this).attr('id');
        }
    });
});

//Navigation Buttons


var locators = ['navigation','about', 'events', null, 'activities', 'footer']
var locator = 'navigation'
var nextLocator = 'about'
var prevLocator = null;

updateLocatorPos()

function updateLocatorPos() {
  console.log('   Nav: updating location')
  var currentHash = window.location.hash.substr(1)

  for (var i = 0; i < locators.length; i++) {
    console.log("   Nav: checking i=" + i + ", current hash:" + currentHash + ", locator:" + locators[i])
    if(currentHash === locators[i]) {
      locator = currentHash;
      nextLocator = locators[i+1];
      prevLocator = locators[i-1];
    }
  }

  if(prevLocator === null || prevLocator === undefined) {
    $(".upButton").hide(); 
  } else {
    $(".upButton").show(); 
  }

  if(nextLocator === null) {
    $(".downButton").hide();
  } else {
     $(".downButton").show();
  }

  console.log('  Nav: \n   Previous Locator:' + prevLocator +
              "  Current Locator: " + locator +
              "  Next Locator: " + nextLocator
              )
}

$(".downButton").click(function() {
    if(nextLocator !== null) {
      console.log('  Nav: going to next div: ' + nextLocator)
      window.location.hash = nextLocator;

      updateLocatorPos();
    } else {
      console.log('  Nav: no more divs to go to')
    }
});

$(".upButton").click(function() {
   if(prevLocator !== null) {
      console.log('  Nav: going to next div: ' + prevLocator)
      window.location.hash = prevLocator;
      updateLocatorPos();
    } else {
      console.log('  Nav: no more divs to go to')
    }
});
