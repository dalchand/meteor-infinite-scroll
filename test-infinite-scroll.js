Photos = new Meteor.Collection("photos");

if (Meteor.isClient) {

  var fetching = false;
  var defaultLimit = 50;

  Template.container.created = function() {
    Session.setDefault("limit", defaultLimit);
    Deps.autorun(function() {
      Meteor.subscribe("photos", {limit: Session.get("limit")}, function() {
        fetching = false;
      });
    })
  }

  Template.container.photos = function() {
    return Photos.find();
  }

  Template.container.rendered = function() {
    
  }

  Template.container.events({
    'scroll .content' : function(evt) {
      if(!fetching) {
        var el = evt.target;
        if(el.offsetHeight != el.scrollHeight) {
          if(el.scrollTop + el.offsetHeight > el.scrollHeight - 200){
            var limit = Photos.find().count() + defaultLimit;
            fetching = true;
            Session.set("limit", limit);
          }
        }
      }
    }
  })

}

if (Meteor.isServer) {
  
  Meteor.publish("photos", function(options) {
    var limit = 50;
    if(options && options.limit) {
      limit = options.limit;
    }

    return Photos.find({}, {limit: limit});

  })

  Meteor.startup(function(){
    if(!Photos.findOne()){
      var i, j,
        url = [
          "http://1.bp.blogspot.com/-R4u0gyig7ns/UTHE3T2GvhI/AAAAAAAAHLs/dKMPwLL4qw4/s400/Nature_-_Wallpaper_for_Windows_7.jpg",
          "http://3.bp.blogspot.com/-ks9nyRydars/UTHE8hvRTsI/AAAAAAAAHL0/JxNYEefDpbg/s400/Fantasy-Nature-Wallpaper.jpg",
          "http://4.bp.blogspot.com/-5NhAN8Ws4Dc/UTHE86_pS8I/AAAAAAAAHL8/vYasTV_qYas/s400/force_of_nature_33.jpg",
          "http://3.bp.blogspot.com/-oGhLs-wV_rQ/UTHFAYi4V2I/AAAAAAAAHME/KWq0aqkCPE8/s400/Nature-Wallpapers-6.jpg",
          "http://3.bp.blogspot.com/-vqgPeLOdun0/UTHFGC4tv3I/AAAAAAAAHMM/QmmtAjenFKc/s400/nature-wallpaper-28.jpg",
          "http://2.bp.blogspot.com/-8_4Ov-o-ReY/UTHFH6LUYHI/AAAAAAAAHMU/E3ql5iZG6mc/s400/nature+wallpaper_5.jpg",
          "http://3.bp.blogspot.com/-CemxqLltSOM/UTHFIm-OosI/AAAAAAAAHMc/unV72OAjVq4/s400/nature-wallpaper-217.jpg",
          "http://4.bp.blogspot.com/-athnxGsv-nk/UTHFI39DZEI/AAAAAAAAHMg/kKMMyJiGVkc/s400/nature-wallpaper-29.jpg",
          "http://1.bp.blogspot.com/-MF9hZNXQmPU/UTHFLvg8npI/AAAAAAAAHMs/b9Huo7brSNA/s400/nature-wallpaper-37.jpg",
          "http://3.bp.blogspot.com/-UBrrZzeCK4k/UTHFMGk49jI/AAAAAAAAHM0/7zJmF4W3u9A/s400/nature-wallpaper.jpg",
          "http://2.bp.blogspot.com/-vY6c8ldBKI4/UTHFQ5B0UdI/AAAAAAAAHM8/8UMwNE7NzMw/s400/nature_wallpaper_32_by_tristix-d5poeam.jpg",
          "http://2.bp.blogspot.com/-aKhX_IhG-Fg/UTHFWquFI4I/AAAAAAAAHNE/iQXjFrVSJzQ/s400/nature_wallpaper7.jpg"
        ];

      for(i = 0; i < 200; i++) {
        for(j = 0; j < url.length; j++) {
          Photos.insert({url: url[j]});
        }  
      }
    }    
  });

}
