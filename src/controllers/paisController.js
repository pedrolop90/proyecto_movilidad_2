const controller={};
controller.listar=(req,res)=>{
 req.getConnection((err,conn)=>{
   conn.query('select p.nombre as nombrePais,u.nombre as nombreUniversidad,pu.id_pais_universidad as id'+
   ' from pais_universidad pu join universidad u on pu.id_universidad=u.id_universidad '+
   ' join pais p on p.id_pais=pu.id_pais ',(err,rows)=>{
     if(err){
       res.json(err)
     }
     res.json(rows);
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
 req.getConnection((err,conn)=>{
   conn.query('insert into experiencia set ?',[datos],(err,rows)=>{
     if(err){
       res.json(err)
     }

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
         res.end("1");
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
	req.getConnection((err,conn)=>{
		conn.query('delete from experiencia where id_experiencia=?',[req.query.id],(err,rows)=>{
			if(err){
				res.json(err)
			}
			res.redirect("/admin/experiencias");
		});
	});
}



module.exports=controller;
