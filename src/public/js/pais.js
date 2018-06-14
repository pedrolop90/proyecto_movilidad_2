
var id_pais
function desplegarModal(e){
  id_pais=e.getAttribute("data-id")
  $.ajax({
    url:"/Admin/buscarPais",
    data:"id="+id_pais,
    type:"post",
    dataType:"json",
    success:function(res){
    document.getElementById("codigo_modal").value=res.codigo;
    document.getElementById("nombre_modal").value=res.nombre;
    $('#myModal').modal('show')
    }
  });
}
