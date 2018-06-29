window.addEventListener("load",()=>{
  var ele;
  $(".contenedor_universidad").on("mouseover",(e)=>{
    ele=e.target;
    if(ele.className=="imagen_universidad"){
      ele=ele.parentElement.childNodes[1];
    }else if(ele.className.indexOf("contenedor_universidad")!=-1){
      ele=ele.childNodes[1];
    }
    ele.style.display="none";
  })

  $(".contenedor_universidad").on("mouseout",()=>{
    ele.style.display="inline";
  })
});
