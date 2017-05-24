

// Background
// http://vegas.jaysalvat.com
// $(document).ready(function() {
//   $(".vegas-container").vegas({
//       delay: 10000,
//       timer: false,
//       shuffle: false,
//       firstTransition: 'fade',
//       firstTransitionDuration: 1000,
//       transition: 'blur2',
//       transitionDuration: 7000,
//       slides: [
//           { src: "res/image/home-4.jpg" },
//           { src: "res/image/home-2.jpg" },
//           { src: "res/image/home-3.jpg" },
//           { src: "res/image/home-1.jpg" }
//       ]
//   });
// });


//Navigation Buttons
//will be replaced with angular code (if we use angular)

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