window.addEventListener("load",()=>{

	$("#enviar").on("click",()=>{

                            var formData = new FormData(document.getElementById("formulario"));
                             $.ajax({
                                url: "/admin/agregarVideo",
                                 type: 'POST',
                                dataType: "html",
                                data: formData,
                                cache: false,
                                contentType: false,
                                processData: false,
                                 xhr: function (a) {
                                    var xhr = new window.XMLHttpRequest();
                                    xhr.upload.addEventListener("progress", function (evt) {
                                            let por=((evt.loaded/evt.total)*100).toFixed(2)
                                            crearBarra(por-1,'danger');
                                    }, false);
                                    return xhr;
                                }
                            })
                             .done(function(res){
                                 crearBarra(100,'success');
																 console.log(res);
																 $.ajax({
																		url: "/admin/agregarExperiencia",
																		type: 'POST',
																		dataType: "text",
																		data: "id_universidad="+document.querySelector("#id_universidad").value+"&url_video="+res,
																		success:function(res2){
																			window.location.href="/admin/experiencias";
																		}
																})
                            });

    	});

    function crearBarra(por,color){
    var div=document.createElement("div");
    div.setAttribute("class","progress");
    var div2=document.createElement("div");
    div2.setAttribute("class","progress-bar progress-bar-"+color);
    div2.setAttribute("role","progressbar");
    div2.setAttribute("aria-valuenow","70");
    div2.setAttribute("aria-valuemin","0");
    div2.setAttribute("aria-valuemax","100");
    div2.setAttribute("style","width:"+por+"%");
    var span=document.createElement("span");
    span.setAttribute("class","sr-only");
    var text=document.createTextNode(por+"%");
    span.appendChild(text);
    div2.appendChild(text);
    div.appendChild(div2);
    document.querySelector("#porcentaje").innerHTML="";
    document.querySelector("#porcentaje").appendChild(div);
    }

});
