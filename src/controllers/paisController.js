const controller={};

controller.paises=(req,res)=>{
  req.getConnection((err,conn)=>{
    conn.query('select * from pais where estado=1 order by nombre',(err,rows)=>{
      if(err){
        res.json(err)
      }
      res.render("Admin/listarPais",{
        data:rows
      });
    });
  });
}


controller.vistaRegistrarPais=(req,res)=>{
res.render("Admin/registrarPais")
}



controller.listar=(req,res)=>{
 req.getConnection((err,conn)=>{
   conn.query('select p.nombre as nombrePais,u.nombre as nombreUniversidad,u.id_pais as id '+
   ' from universidad u join pais p on p.id_pais=u.id_pais and u.estado=1 ',(err,rows)=>{
     if(err){
       res.json(err)
     }
     res.json(rows);
   });
 });
}

controller.registrarPais=(req,res)=>{
 var datos=req.body
 req.getConnection((err,conn)=>{
   conn.query('insert into pais set ?',[datos],(err,rows)=>{
     if(err){
       res.json(err)
     }
     res.redirect('/admin/paises');
   });
 });
}


 controller.eliminarPais=(req,res)=>{
	var datos=req.query.id;
	req.getConnection((err,conn)=>{
		conn.query('UPDATE pais SET estado = 0 WHERE id_pais = ? ',[datos],(err,rows)=>{
			if(err){
				res.json(err)
			}
			res.redirect("/Admin/paises");
		});
	})

}

controller.buscarPais=(req,res)=>{
   var datos=req.body
 req.getConnection((err,conn)=>{
   conn.query('select * from pais where id_pais=?',[datos.id],(err,rows)=>{
     if(err){
       res.json(err)
     }
     res.json(rows[0]);
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
