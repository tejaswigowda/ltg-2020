function getXMLHTTPRequest()
{
    var request;
    // Lets try using ActiveX to instantiate the XMLHttpRequest object
    try{
        request = new ActiveXObject("Microsoft.XMLHTTP");
    }catch(ex1){
        try{
            request = new ActiveXObject("Msxml2.XMLHTTP");
        }catch(ex2){
            request = null;
        }
    }

    // If the previous didn't work, lets check if the browser natively support XMLHttpRequest 
    if(!request && typeof XMLHttpRequest != "undefined"){
        //The browser does, so lets instantiate the object
        request = new XMLHttpRequest();
    }

    return request;
}


function loadFile(filename, callback)
{
    var aXMLHttpRequest = getXMLHTTPRequest();
    var allData;

    if (aXMLHttpRequest)
    {
        aXMLHttpRequest.open("GET", filename, true);
        
      aXMLHttpRequest.onreadystatechange = function (aEvt) {
        if(aXMLHttpRequest.readyState == 4){
        allData = aXMLHttpRequest.responseText;
        callback(allData)
        }
      };
      
      //Lets fire off the request
        aXMLHttpRequest.send(null);
    }
    else
    {
        //Oh no, the XMLHttpRequest object couldn't be instantiated.
        alert("A problem occurred instantiating the XMLHttpRequest object.");
    }
}

function swipeDetectorInit(){
var myElement = document.getElementById("theLogo");
myElement.addEventListener("touchstart", startTouch, false);
myElement.addEventListener("touchmove", moveTouch, false);
}
 
// Swipe Up / Down / Left / Right
var initialX = null;
var initialY = null;
 
function startTouch(e) {
  initialX = e.touches[0].clientX;
  initialY = e.touches[0].clientY;
};
 
function moveTouch(e) {
 // e.preventDefault();
  if (initialX === null) {
    return;
  }
 
  if (initialY === null) {
    return;
  }
 
  var currentX = e.touches[0].clientX;
  var currentY = e.touches[0].clientY;
 
  var diffX = initialX - currentX;
  var diffY = initialY - currentY;
 

  if (Math.abs(diffX) > Math.abs(diffY)) {
    // sliding horizontally
    if (diffX > 0) {
      // swiped left
     $("#theHeader").addClass("open") 
    } else {
      // swiped right
     $("#theHeader").addClass("open") 
    }  
  } else {
    // sliding vertically
    if (diffY > 6) {
      // swiped up
      $("#theHeader").removeClass("open");
    } else if (diffY < -6){
      // swiped down
      $("#theHeader").addClass("open")
    }  
    else{
      if(document.getElementById("theHeader").className === "open"){
        goHome();
      }
      else{
        $("#theHeader").addClass("open")
      }
    }
  }
 
  initialX = null;
  initialY = null;
   
  e.preventDefault();
};
