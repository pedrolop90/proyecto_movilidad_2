window.addEventListener("load",()=>{
  var valores={};

  $(function(){

  $.ajax({
    url:"/listarPaisesConvenio",
    type:"post",
    dataType:"json",
    success:function(res){
      for (var i = 0; i < res.length; i++) {
        valores[res[i].codigo]=2;
      }
      $('#world-map').vectorMap({
        map: 'world_mill_en',
        series: {
          regions: [{
            scale: ['#b43432'],
            attribute: 'fill',
            values: valores
          }]
        },
        onRegionClick:function(e,code){
          if(typeof(valores[code])!='undefined'){
          window.location.href="/universidades?pais="+code;
          }
        }
      });
    }
  });


  });

});
