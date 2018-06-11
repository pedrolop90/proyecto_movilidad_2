const controller={};
controller.listar=(req,res)=>{
 req.getConnection((err,conn)=>{
   conn.query('select c.nombre as nombre_convenio,u.nombre as nombre_universidad,p.nombre as nombre_pais, '+
     ' tm.nombre as nombre_tipo_movilidad, e.url_video,e.id_experiencia '+
     ' from experiencia e join convenio c on e.id_convenio=c.id_convenio and e.estado=1 '+
     ' join pais_universidad pu on pu.id_pais_universidad=c.id_pais_universidad '+
     ' join universidad u on u.id_universidad=pu.id_universidad join pais p on p.id_pais=pu.id_pais '+
     ' join tipo_movilidad tm on c.id_tipo_movilidad=tm.id_tipo_movilidad  ',(err,rows)=>{
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
   conn.query('delete from experiencia where id_experiencia=?',[req.query.id],(err,rows)=>{
     if(err){
       res.json(err)
     }
     res.redirect("/admin/experiencias");
   });
 });
}

controller.registrarExperiencia=(req,res)=>{
 req.getConnection((err,conn)=>{
   conn.query('select * from convenio',(err,rows)=>{
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
       nombre=this.openedFiles[0].name
       fse.copy(temporal,"./src/public/videos/"+nombre,(err)=>{
         if(err){
           res.end(err);
         }
         res.end("./src/public/videos/"+nombre);
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
