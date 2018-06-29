
var contador=0;

document.querySelector("#agregarRequisito").addEventListener("click",()=>{
  var contenedor=document.querySelector("#contenedorRequisitos");
  contenedor.insertBefore(regresarInput("text","requisito_"+contador,"requisito_"+contador,"Requisito ",
    regresarBotonQuitar(contador)),contenedor.firstChild);
    contenedor.firstChild.focus();
    contador++;
});

function quitarOpcion(e){
  var id=e.target.id.split("_");
  if(id[0]!="requisito"){
    id=e.target.parentElement.id.split("_")
    if(id[0]!="requisito"){
      id=e.target.parentElement.parentElement.id.split("_")
    }
  }
  var aux=document.getElementById("requisito_"+id[1]);
  aux.parentElement.removeChild(document.getElementById("requisito_"+id[1]))
}


function regresarBotonQuitar(p1){
  var label=document.createElement("label");
  label.setAttribute("class","btn btn-danger");
  label.setAttribute("id","l_"+p1);
  label.addEventListener("click",quitarOpcion);
  var span=document.createElement("span");
  span.setAttribute("class","glyphicon glyphicon-minus");
  label.appendChild(span);
  return label;
}

function regresarInput(tipo,name,id,place,boton,value){
  var div=document.createElement("div");
  div.setAttribute("class","form-group");
  div.setAttribute("id",id);
  div.appendChild(boton);
  var divSe=document.createElement("div");
      divSe.setAttribute("class","col-sm-11");
        var aux=document.createElement("input");
        aux.setAttribute("class","form-control");
        aux.setAttribute("type",tipo);
        aux.setAttribute("name",name);
        aux.setAttribute("value",value||'');
        aux.setAttribute("placeholder",place);
        aux.setAttribute("required","true");
      divSe.appendChild(aux);
  div.appendChild(divSe);
  return div;
}

document.querySelector("#botonEnviar").addEventListener("click",()=>{
  $.ajax({
    url:"/admin/agregarTipoMovilidad",
    type:"post",
    data:$('#formulario_tipo_movilidad').serialize(),
    dataType:"json",
    success:function(res){
      var datos=$("#formulario_tipo_movilidad").serializeArray().reduce(function(m,o){ m[o.name] = o.value; return m;}, {});
      for (var i in datos) {
        var sp=i.split("_");
        if(i.indexOf("requisito_")!=-1){
          $.ajax({
            url:'/admin/registrarRequistoTipoMovilidad',
            data:"descripcion="+datos[i]+"&tipo_movilidad="+res,
            type: 'POST',
            async:false,
            dataType: 'text',
            success: function(res2) {
              console.log(res2);
            }
          });
        }
      }
        window.location.href = "/admin/tipoMovilidad";
    }
  });
});
