 const controller={};
 controller.listar=(req,res)=>{
	req.getConnection((err,conn)=>{
		conn.query('SELECT * FROM tipo_movilidad where estado=1',(err,rows)=>{
			if(err){
				res.json(err)
			}
			res.render('admin/listarTipoMovilidad',{
				data:rows
			});
		});
	});
}

controller.listarMovilidadConvenio=(req,res)=>{
	req.getConnection((err,conn)=>{
		conn.query('SELECT * FROM tipo_movilidad where estado=1',(err,rows)=>{
			if(err){
				res.json(err)
			}
			res.render('admin/agregarConvenio',{
				data:rows
			});
		});
	});
}


 controller.agregar=(req,res)=>{
	var datos=req.body;
	req.getConnection((err,conn)=>{
		conn.query('insert into tipo_movilidad set ?',[datos],(err,rows)=>{
			if(err){
				res.json(err)
			}
			res.redirect("/admin/tipoMovilidad");
		});
	});
}


 controller.editar=(req,res)=>{
	var datos=req.body;
  console.log(datos);
	req.getConnection((err,conn)=>{
		conn.query('SELECT * FROM tipo_movilidad where id_tipo_movilidad = ?',[datos.id],(err,rows)=>{
			if(err){
				res.json(err)
			}
			res.json(rows);
		});
	});
}

controller.actualizarTipoMovilidad=(req,res)=>{
 var datos=req.body;
 req.getConnection((err,conn)=>{
   conn.query('UPDATE tipo_Movilidad SET ? WHERE id_tipo_movilidad = ?',
   [{
     nombre:datos.nombre,
     descripcion:datos.descripcion
   },datos.id_tipo_movilidad],(err,rows)=>{
     if(err){
       res.json(err)
     }
     res.end("1");
   });
 });
}



 controller.eliminar=(req,res)=>{
	var datos=req.query.id;

	req.getConnection((err,conn)=>{
		conn.query('UPDATE tipo_Movilidad SET estado = 0 WHERE id_tipo_movilidad = ? ',[datos],(err,rows)=>{
			if(err){
				res.json(err)
			}
			res.redirect("/Admin/tipoMovilidad");
		});
	})

}



module.exports=controller;
