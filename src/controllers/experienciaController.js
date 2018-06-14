const controller={};

controller.listar=(req,res)=>{
 req.getConnection((err,conn)=>{
   conn.query('select u.nombre as nombre_universidad,p.nombre as nombre_pais, '+
     ' e.url_video,e.id_experiencia '+
     ' from experiencia e join universidad u on e.estado=1 and u.id_universidad=e.id_universidad '+
     ' join pais p on p.id_pais=u.id_pais ',(err,rows)=>{
     if(err){
       res.json(err)
     }
     res.render('Admin/listaExperiencias',{
       data:rows
     });
   });
 });
}

controller.eliminarExperiencia=(req,res)=>{
 req.getConnection((err,conn)=>{
   conn.query('UPDATE experiencia SET estado = 0 WHERE id_experiencia = ? ',[req.query.id],(err,rows)=>{
     if(err){
       res.json(err)
     }
     res.redirect("/admin/experiencias");
   });
 });
}

controller.registrarExperiencia=(req,res)=>{
 req.getConnection((err,conn)=>{
   conn.query('select p.nombre as pais,u.nombre as universidad,u.id_universidad '+
   ' from universidad u join pais p on u.id_pais=p.id_pais and u.estado=1 ',(err,rows)=>{
     if(err){
       res.json(err)
     }
     res.render("Admin/registrarExperiencia",{
       data:rows
     });
   });
 });
}

controller.agregarExperiencia=(req,res)=>{
 var datos=req.body
 console.log(datos);
 req.getConnection((err,conn)=>{
   conn.query('insert into experiencia set ?',[datos],(err,rows)=>{
     if(err){
       res.json(err)
     }
     res.end("1");
   });
 });
}

controller.agregarVideo=(req,res)=>{
   let formidable=require("formidable"),
   fse=require("fs-extra"),
    form=new formidable.IncomingForm(),
    time=new Date().getTime();
     form.maxFileSize=(10*1024*1024*1024*1024)
     form
     .parse(req)
     .on("end",function (fields,files){
       console.log(new Date().getTime()-time);
       let temporal=this.openedFiles[0].path,
       exten=this.openedFiles[0].name
       console.log(exten);
       console.log(exten.substring(exten.indexOf("."),exten.length));
       nombre="./src/public/videos/"+time+"_"+(new Date().getTime())+exten.substring(exten.indexOf("."),exten.length);
       fse.copy(temporal,nombre,(err)=>{
         if(err){
           res.end(err);
         }
         res.end(nombre);
       })
     })


 /*
 req.getConnection((err,conn)=>{
   conn.query('insert into persona set ?',[datos],(err,rows)=>{
     if(err){
       res.json(err)
     }
     res.redirect("/admin");
   });
 });
 */
}

controller.eliminar=(req,res)=>{
  console.log(req.query);
	req.getConnection((err,conn)=>{
		conn.query('UPDATE experiencia SET estado = 0 WHERE id_experiencia = ?' ,[req.query.id],(err,rows)=>{
			if(err){
				res.json(err)
			}
			res.redirect("/admin/experiencias");
		});
	});
}



module.exports=controller;
