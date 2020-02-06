{
  init: function(){
  },
  active: function(){
      swipe.right("crudtagWrapper");
      swipe.center("listtagWrapper");
    $("#backButton").fadeOut(0);
    $("#addButton").fadeIn();
    this.loadall();
  },
  inactive: function(){
    document.getElementById("tagList").innerHTML = "";
  },
  currID :null,
  list:[],
  setAC: function(){
    var list = this.list;
    var data = [];
    for(var i = 0; i < list.length; i++){
      var x = list[i].thumb100||"";
      var y = list[i].name || "no title";
      if(y){
        data.push({value: y, data: list[i].id, imageUrl:x});
      }
    }

    try{
    $('#tagSearch').devbridgeAutocomplete("dispose");
    }
    catch{noop;}
    $('#tagSearch').devbridgeAutocomplete({
      lookup: data,
      minChars: 0,
      showNoSuggestionNotice: true,
      formatResult: function (suggestion) {
        var ret = '<div><img width=50 height=50 style="border-radius:50%; vertical-align:middle; margin-right:10px" src="' + suggestion.imageUrl+'" /> '  + suggestion.value + '</div>';
        return ret
      },
      onSelect: function (suggestion) {
          App.tags.selected(suggestion.data);
          document.getElementById("tagSearch").value = "";
          $('#tagSearch').devbridgeAutocomplete("hide");
      }
    });

  },
  loadall: function()
  {
    $("#backButton").fadeOut(0);
    $("#addButton").fadeIn();
    loadFile("tags/all", function(data){
      var tags = JSON.parse(data);
      App.tags.list = JSON.parse(data);
      if(tags.length == 0){
        document.getElementById("tagList").innerHTML = "<h4 style='opacity:.5' class='textcenter'> No tags yet <br> </h4>"
        return;
      }
      tags = App.tags.list = sortByKey(App.tags.list, "name");
      document.getElementById("tagList").innerHTML = acMU;
      var markup = "";
      for(var i = 0; i < tags.length; i++){
        markup += getLImarkup(tags[i], "App.tags.selected('"+tags[i].id+"')");
      }
      document.getElementById("tagList").innerHTML = markup;
      App.tags.setAC();
    });
  },
  selected: function(id)
  {
    this.isNew = false;
     this.currID = id;
      document.getElementById("tagThumb").dataset.targetname = this.currID;
      document.getElementById("tagThumb").name = getUniqueID();
     $("#tags ."+this.currID).addClass("selected");
     loadFile("tags/get?id="+ this.currID,function(data){
      var data = JSON.parse(data);
      var name = data.name || "Untitled"
      var desc = data.desc || ""
      var thumb = data.thumb100 || "res/images/icon.png"
      $("#newPHeading").html("<br>");
      $("#tagTitle").val(name);
      $("#tagDesc").val(desc);
      document.getElementById("tagThumb").style.backgroundImage = "url(" + thumb + ")";
      $("label[for='tagTitle']").addClass("active");
      if(desc.length > 0)
        $("label[for='tagDesc']").addClass("active");
      swipe.center("crudtagWrapper");
      swipe.left("listtagWrapper");
    $("#addButton").fadeOut(0);
    $("#backButton").fadeIn();
      $("#deletetagButton").fadeIn(0);
     });
  },
  deleteNow:function(){
     loadFile("tags/delete?id="+ App.tags.currID,function(data){
       modal.hide();
       App.tags.goBack();
       $("#tags li.selected").hide("slow");
       if(App.tags.list.length == 1)
        this.loadall();
     });
  },
  delete:function(){
    modal.show("Delete?", "Are you sure?", "modal.hide", 
      "App.tags.deleteNow", "No", "Yes"
    ); 
  },
  isNew: false,
  addNew: function()
  {
    this.isNew = true;
      swipe.center("crudtagWrapper");
      swipe.left("listtagWrapper");
    $("#addButton").fadeOut(0);
    $("#backButton").fadeIn();
      $("#deletetagButton").fadeOut(0);
      this.currID = getUniqueID();
      document.getElementById("tagThumb").dataset.targetname = this.currID;
      document.getElementById("tagThumb").name = getUniqueID();
      document.getElementById("tagThumb").style.backgroundImage = "url(res/images/icon.png)"
      $("#newPHeading").html("New tag");
      $("#tagTitle").val("");
      $("#tagDesc").val("");
      $("label[for='tagTitle']").removeClass("active");
      $("label[for='tagDesc']").removeClass("active");
  },
  goBack: function()
  {
      swipe.right("crudtagWrapper");
      swipe.center("listtagWrapper");
    $("#backButton").fadeOut(0);
    $("#addButton").fadeIn();
    var x = function(){$("#tags .list li").removeClass("selected")}
    setTimeout(x, 500);
    if(this.isNew)
      this.loadall();
  }, 
  thumbChanged: function(url){
    loadFile("tags/edit?id="+ App.tags.currID
       + "&userID="+ userObj
       + "&thumb="+ url
       , function(data){
        App.tags.loadall();
        var x = document.getElementById("tagThumb");
        var y = x.innerHTML;
        x.innerHTML = y;
    });
  },
  thumbChanged100: function(url){
    loadFile("tags/edit?id="+ App.tags.currID
       + "&userID="+ userObj
       + "&thumb100="+ url
       , function(data){
         document.getElementById("tagThumb").style.backgroundImage = "url(" + url + "?"+ new Date().getTime() + ")";
    });
  },
  updatetag: function(e){
    loadFile("tags/edit?id="+ App.tags.currID 
       + "&userID="+ userObj
       + "&"+ e.target.dataset.key 
       + "=" + e.target.value, function(data){
      //  App.tags.loadall();
    });
  }
}


