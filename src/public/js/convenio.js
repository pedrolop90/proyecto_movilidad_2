
var id_tipo_movilidad;


function desplegarModal(e){
  id_tipo_movilidad=e.getAttribute("data-id")
  $.ajax({
    url:"/Admin/editarMovilidad",
    data:"id="+id_tipo_movilidad,
    type:"post",
    dataType:"json",
    success:function(res){
    document.querySelector("#nombre").value=res[0].nombre;
    document.querySelector("#descripcion").value=res[0].descripcion;
    $('#myModal').modal('show')
    }
  });
}

document.querySelector('#actualizarTipoMovilidad').addEventListener("click",function(){
  $.ajax({
    url:"/Admin/actualizarTipoMovilidad",
    data:$('#formulario_piso_tipoMovilidad').serialize()+"&id_tipo_movilidad="+id_tipo_movilidad,
    type:"post",
    dataType:"text",
    success:function(res){
      window.location.href = "/Admin/tipoMovilidad";
    }

  })
});

function eliminar(e){
  
}
