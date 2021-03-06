
var contador=1;
var cantidadPreguntas=0;
var numRespuestas={};

window.addEventListener("load",()=>{
  $.ajax({
    url:"/admin/listarPais",
    type:"post",
    dataType:"json",
    success:function(res){
    var sel=document.querySelector("#universidad");
    var op=document.createElement("option");
    op.setAttribute("selected","selected");
    op.setAttribute("value",res[0].id);
    var text=document.createTextNode(res[0].nombreUniversidad+" de "+res[0].nombrePais);
    op.appendChild(text);
    sel.appendChild(op);
    for (var i = 1; i < res.length; i++) {
      var op=document.createElement("option");
      op.setAttribute("value",res[i].id);
      var text=document.createTextNode(res[i].nombreUniversidad+" de "+res[i].nombrePais);
      op.appendChild(text);
      sel.appendChild(op);
    }
    }
  });
});

document.querySelector("input").focus();
$("#agregarPregunta").on("click",(e)=>{
  colapsarBox();
  var contenedor=document.querySelector("#contenedorPreguntas")
  var divCon=document.createElement("div");
  divCon.setAttribute("class","col-md-10 col-md-push-1");
  divCon.setAttribute("id","contenedor_"+contador);
  var divBox=document.createElement("div");
  divBox.setAttribute("class","box box-danger");
    var divHeader=document.createElement("div");
    divHeader.setAttribute("class","box-header with-border");
      var tittle=document.createElement("h3");
      tittle.setAttribute("class","box-title");
        var tex1=document.createTextNode("pregunta #"+contador);
      var divIcons=document.createElement("div");
      divIcons.className="box-tools pull-right";
        var button1=document.createElement("label")
        button1.setAttribute("class","btn btn-box-tool")
        button1.setAttribute("data-toggle","collapse")
        button1.setAttribute("data-target","#"+contador)
          var i1=document.createElement("i")
          i1.setAttribute("class","fa fa-minus")
        button1.appendChild(i1)
      divIcons.appendChild(button1)
      var button2=document.createElement("label")
        button2.setAttribute("class","btn btn-box-tool")
        button2.setAttribute("id","remove"+contador)
        button2.addEventListener("click",(e)=>{
          var id=e.target.id.split("remove")[1];
          if(typeof(id)=="undefined"){
            id=e.target.parentElement.id.split("remove")[1]
          }
          var aux=document.getElementById("contenedor_"+id);
          aux.parentElement.removeChild(aux);
          cantidadPreguntas--;
        });
          var i2=document.createElement("i")
          i2.setAttribute("class","fa fa-times")
        button2.appendChild(i2)
        divIcons.appendChild(button2)
      tittle.appendChild(tex1);
      divHeader.appendChild(
        regresarInput("text","pregunta_nombre_"+contador,"pregunta"+contador,"Nombre del convenio Especifico"));
      divHeader.appendChild(divIcons);
  divBox.appendChild(divHeader);
  var divBody=document.createElement("div");
  divBody.setAttribute("class","box-body collapse in")
  divBody.setAttribute("id",contador)
  divBody.appendChild(regresarTextArea("pregunta_descripcion_"+contador,"Descripcion"));
  divBody.appendChild(agregarCategorias(contador));
  var h1=document.createElement("h4");
  var text3=document.createTextNode("Requisito   ");
  h1.appendChild(text3);
  h1.appendChild(regresarBotonMas(contador));
  divBody.appendChild(h1);
  var divRes=document.createElement("div")
  divRes.setAttribute("id",contador+"_contenedor_respuestas");
  divBody.appendChild(divRes);
  divBox.appendChild(divBody);
  divCon.appendChild(divBox);
  contenedor.insertBefore(divCon,contenedor.firstChild);
  contenedor.firstChild.firstChild.firstChild.firstChild.firstChild.firstChild.focus();
  numRespuestas[contador]=1;
  cantidadPreguntas++;
  contador++;
  $('input[type="checkbox"].flat-red, input[type="radio"].flat-red').iCheck({
      checkboxClass: 'icheckbox_flat-red',
      radioClass   : 'iradio_flat-red'
  })
  $('.select2').select2()
});

function regresarTextArea(name,place){
  var div=document.createElement("div");
  div.setAttribute("class","form-group");
  var divSe=document.createElement("div");
      divSe.setAttribute("class","col-sm-12");
        var aux=document.createElement("textArea");
        aux.setAttribute("class","form-control");
        aux.setAttribute("name",name);
        aux.setAttribute("placeholder",place);
      divSe.appendChild(aux);
  div.appendChild(divSe);
  return div;
}

function agregarOpcion(e){
  var id=e.target.id.split("p")[1];
  if(typeof(id)=="undefined"){
    id=e.target.parentElement.id.split("p")[1]
  }
  var contenedor=document.getElementById(id+"_contenedor_respuestas");
  contenedor.insertBefore(regresarInput("text","pregunta_"+id+"_respuesta_"+numRespuestas[id],
    id+"_"+numRespuestas[id],"Requisito",
    regresarBotonQuitar(id+"_"+numRespuestas[id]))
    ,contenedor.firstChild);
    contenedor.firstChild.lastChild.firstChild.focus()
    numRespuestas[id]++;

}

function Arespuestas(id){
  var contenedor=document.getElementById(id+"_contenedor_respuestas");
  contenedor.insertBefore(regresarInput("text","pregunta_"+id+"_respuesta_"+numRespuestas[id],
    id+"_"+numRespuestas[id],"Respuesta",regresarBotonVal(id,numRespuestas[id]))
    ,contenedor.firstChild);
    contenedor.firstChild.lastChild.firstChild.focus()
}

function quitarOpcion(e){
  var id=e.target.id.split("_");
  if(id.length!=3){
    id=e.target.parentElement.id.split("_")
  }
  numRespuestas[id]--;
  var aux=document.getElementById(id[1]+"_"+id[2]);
  aux.parentElement.removeChild(document.getElementById(id[1]+"_"+id[2]))
}

function regresarBotonMas(p1){
  var label=document.createElement("label");
  label.setAttribute("class","btn btn-default");
  label.setAttribute("id","p"+p1);
  label.addEventListener("click",agregarOpcion);
  var span=document.createElement("span");
  span.setAttribute("class","glyphicon glyphicon-plus");
  label.appendChild(span);
  return label;
}

function regresarBotonVal(id,res){
  var label=document.createElement("label");
  label.setAttribute("class","btn btn-danger");
  label.setAttribute("id","pregunta_"+id+"_respuesta_"+res+"_res_boton");
  label.setAttribute("data-pregunta",id);
  label.setAttribute("data-respuesta",res);
  label.addEventListener("click",(e)=>{
    var cam=e.target
    if(cam.className.includes("glyphicon")){
      cam=e.target.parentElement;
    }
    var data={
      pregunta:cam.getAttribute("data-pregunta"),
      respuesta:cam.getAttribute("data-respuesta")
    }
    var val="input[name='pregunta_"+data.pregunta+"_respuesta_"+data.respuesta+"_estado']";
    var temp=document.querySelector(val)
    if(cam.firstChild.getAttribute("class")=="glyphicon glyphicon-ok"){
      cam.firstChild.setAttribute("class","glyphicon glyphicon-remove");
      cam.setAttribute("class","btn btn-danger")
      temp.setAttribute("value",0)
    }else{
      cam.firstChild.setAttribute("class","glyphicon glyphicon-ok");
      cam.setAttribute("class","btn btn-success")
      temp.setAttribute("value",1)
    }
  });
  var span=document.createElement("span");
  span.setAttribute("class","glyphicon glyphicon-remove");
  label.appendChild(span);
  var input=document.createElement("input");
  input.setAttribute("data-pregunta",id)
  input.setAttribute("data-respuesta",res)
  input.setAttribute("value",0)
  input.setAttribute("form","formulario_registrar_prueba");
  input.setAttribute("name","pregunta_"+id+"_respuesta_"+res+"_estado");
  input.setAttribute("style","display:none;")

  document.body.appendChild(input);
  return label;
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

function agregarCategorias(cont){
  var div=document.createElement("div");
  div.setAttribute("class","form-group");
  var divSe=document.createElement("div");
      divSe.setAttribute("class","col-sm-12");
      /*
      var select=document.createElement("select");
      select.setAttribute("class","form-control");
      select.setAttribute("name","pregunta_tema_"+cont);
      var option=document.createElement("option");
        option.setAttribute("value",temas[0].id_tema);
        option.setAttribute("selected","selected");
        var text2=document.createTextNode(temas[0].nombre);
        option.appendChild(text2);
        select.appendChild(option);
      for (var i = 1; i < temas.length; i++) {
        var option1=document.createElement("option");
        option1.setAttribute("value",temas[i].id_tema);
        var text1=document.createTextNode(temas[i].nombre);
        option1.appendChild(text1);
        select.appendChild(option1);
      }
      divSe.appendChild(select);
      */
  div.appendChild(divSe);
  return div;
}

function regresarInput(tipo,name,id,place,boton,boton2){
  var div=document.createElement("div");
  div.setAttribute("class","form-group");
  div.setAttribute("id",id);
  if(typeof(boton2)!='undefined'){
    div.appendChild(boton2);
  }
  if(typeof(boton)!='undefined'){
  div.appendChild(boton);
  }
  var divSe=document.createElement("div");
      divSe.setAttribute("class","col-sm-11");
        var aux=document.createElement("input");
        aux.setAttribute("class","form-control");
        aux.setAttribute("type",tipo);
        aux.setAttribute("name",name);
        aux.setAttribute("placeholder",place);
        aux.setAttribute("required","true");
      divSe.appendChild(aux);
  div.appendChild(divSe);
  return div;
}


 document.getElementById("boton_enviar").addEventListener("click",()=>{
  console.log($('#formulario_registrar_convenio').serialize())
  $.ajax({
    url: '/admin/agregarConvenio',
    data: $('#formulario_registrar_convenio').serialize(),
    type : 'POST',
    async:false,
    dataType : 'json',
    success: function(res) {
      console.log(res);
      var datos=$("#formulario_registrar_convenio").serializeArray().reduce(function(m,o){ m[o.name] = o.value; return m;}, {});
      var aux=0;
      for (var i in datos) {
        if(i.indexOf("pregunta")==0){
          var sp=i.split("_");
          if(i.indexOf("respuesta")==-1&&sp[2]!=aux){
            aux=sp[2];
          $.ajax({
            url:'/admin/registrarConvenioEspecifico',
            data:"nombre="+datos["pregunta_nombre_"+aux]+
            "&descripcion="+datos["pregunta_descripcion_"+aux]+"&id_convenio="+res,
            type: 'POST',
            async:false,
            dataType: 'json',
            success: function(res2) {
              console.log(res2);
              segundo(res2,aux);
            }
          });
          }
        }
      }
      window.location.href ="/admin/convenio";
    }
  });


})


function segundo(maximo,aux){
  var datos=$("#formulario_registrar_convenio").serializeArray();
  for (var i = datos.length - 1; i >= 0; i--) {
    var sp=datos[i].name.split("_");
     if(datos[i].name.indexOf("pregunta")==0&&datos[i].name.indexOf("respuesta")!=-1&&sp[1]==aux){
          $.ajax({
            url: '/admin/registrarRequisitoConvenio',
            data: "descripcion="+datos[i].value+"&id_convenio_especifico="+maximo,
            type : 'POST',
            async:false
          });
        }
  }
  document.getElementById("boton_enviar").parentElement.parentElement.appendChild(regresarBanner())
}


function regresarBanner(){
  var div=document.createElement("div");
  div.setAttribute("class","alert alert-success");
  var a=document.createElement("a");
  a.setAttribute("href","#");
  a.setAttribute("class","close");
  a.setAttribute("data-dismiss","alert");
  a.setAttribute("aria-label","close");
  var text3=document.createTextNode("X");
  a.appendChild(text3);
  div.appendChild(a);
  var strong=document.createElement("strong");
  var text1=document.createTextNode("Registro ");
  strong.appendChild(text1);
  var text2=document.createTextNode(" Exitoso");
  div.appendChild(strong);
  div.appendChild(text2);
  return div;
}

function colapsarBox(){
var cajas=document.querySelectorAll("#contenedorPreguntas .box");
  for (var i = 0; i < cajas.length; i++) {
    if(cajas[i].className.search("collapse")==-1){
          cajas[i].childNodes[1].className="box-body collapse";
    }
  }
}
