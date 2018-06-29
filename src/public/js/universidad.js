
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
      document.getElementById("id_universidad").value=id_universdad;
      $.ajax({
        url:"/Admin/listarTodosPaises",
        type:"post",
        dataType:"json",
        success:function(res1){
          pais=document.getElementById("seleccionar_pais");
          pais.innerHTML="";
          for (var i = 0; i < res1.length; i++) {
              var op=document.createElement("option");
              op.setAttribute("value",res1[i].id_pais);
              if(res1[i].id_pais==id_pais_encontrado){
                op.setAttribute("selected","selected");
              }
              var text=document.createTextNode(res1[i].nombre);
              op.appendChild(text);
              pais.appendChild(op);
          }
        $('#myModal').modal('show')
        }
      });

    }
  });
}
