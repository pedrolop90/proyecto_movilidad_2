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
	var datos={
    nombre:req.body.nombre,
    descripcion:req.body.descripcion
  };
	req.getConnection((err,conn)=>{
		conn.query('insert into tipo_movilidad set ?',[datos],(err,rows)=>{
			if(err){
				res.json(err)
			}
      req.getConnection((err,conn)=>{
        conn.query('select max(id_tipo_movilidad) as max from tipo_movilidad',(err,rows)=>{
          if(err){
            res.json(err)
          }
          res.json(rows[0].max);
        });
      });
		});
	});
}


 controller.editar=(req,res)=>{
	var datos=req.body;
  console.log(datos);
	req.getConnection((err,conn)=>{
		conn.query('SELECT tm.nombre,tm.descripcion,r.descripcion FROM tipo_movilidad tm join tipo_movilidad_requisito tmr on '+
    ' tm.id_tipo_movilidad = ? and tmr.id_tipo_movilidad=tm.id_tipo_movilidad join requisito r on '+
    ' tmr.id_requisito=r.id_requisito ',[datos.id],(err,rows)=>{
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
