{
  showasum : false,
  init: function(){
    gmap.src = "https://www.google.com/maps/d/embed?mid=1G3r4YasG_jszglS-WOS4VpgmWaDQQcAq&hl=en&zoom=5"
  },
  active: function(){
    if(App.maps.showasum){
      gmap.src = "https://gis.m.asu.edu/asucampus/"
    }
    else{
      gmap.src = "https://www.google.com/maps/d/embed?mid=1G3r4YasG_jszglS-WOS4VpgmWaDQQcAq&hl=en&zoom=5"
    }
  },
  inactive: function(){
  }
}
