var id_tipo_movilidad;
var contador=0;

function desplegarModal(e){
  id_tipo_movilidad=e.getAttribute("data-id")
  $.ajax({
    url:"/Admin/editarMovilidad",
    data:"id="+id_tipo_movilidad,
    type:"post",
    dataType:"json",
    success:function(res){
    document.getElementById("nombre").value=res[0].nombre;
    document.getElementById("descripcion").value=res[0].descripcionTM;
    var contenedor=document.querySelector("#contenedorRequisitos");
    contenedor.innerHTML=""
    for (var i = 0; i < res.length; i++) {
      console.log(res[i].id_requisito);
      contenedor.insertBefore(regresarInput("text","requisito_"+res[i].id_requisito,"requisito_"+res[i].id_requisito,
      "Requisito ",regresarBotonQuitar(contador),res[i].descripcionR),contenedor.firstChild);
    }
    contador=res[res.length-1];
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
      var datos=$("#formulario_piso_tipoMovilidad").serializeArray().reduce(function(m,o){ m[o.name] = o.value; return m;}, {});
      for (var i in datos) {
        var sp=i.split("_");
        if(sp[0]=="requisito"){
          $.ajax({
            url:'/admin/registrarRequistoTipoMovilidad',
            data:"descripcion="+datos[i]+"&tipo_movilidad="+id_tipo_movilidad,
            type: 'POST',
            async:false
          });
        }
      }
      window.location.href = "/Admin/tipoMovilidad";
    }
  })
});
