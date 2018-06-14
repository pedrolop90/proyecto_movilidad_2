
var id_universdad
function desplegarModal(e){
  id_universdad=e.getAttribute("data-id")
  $.ajax({
    url:"/Admin/buscarUniversidad",
    data:"id="+id_universdad,
    type:"post",
    dataType:"json",
    success:function(res){
      var id_pais_encontrado=res.id_pais;
      document.getElementById("nombre_modal").value=res.nombre;
      $.ajax({
        url:"/Admin/listarPais",
        type:"post",
        dataType:"json",
        success:function(res1){
          pais=document.getElementById("seleccionar_pais");
          for (var i = 0; i < res1.length; i++) {
              var op=document.createElement("option");
              op.setAttribute("value",res1[i].id);
              if(res1[i].id==id_pais_encontrado){
                op.setAttribute("selected","selected");
              }
              var text=document.createTextNode(res1[i].nombreUniversidad+" de "+res1[i].nombrePais);
              op.appendChild(text);
              pais.appendChild(op);
          }
        $('#myModal').modal('show')
        }
      });

    }
  });
}
