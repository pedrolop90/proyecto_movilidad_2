
var id_tipo_movilidad
function desplegarModal(e){
  id_tipo_movilidad=e.getAttribute("data-id")
  $.ajax({
    url:"/Admin/editarConvenio",
    data:"id="+id_tipo_movilidad,
    type:"post",
    dataType:"json",
    success:function(res){
      console.log(res);
    document.querySelector("#nombre").value=res[0].nombre;
    document.querySelector("#descripcion").value=res[0].descripcion;

    $('#myModal').modal('show')
    }
  });
}
