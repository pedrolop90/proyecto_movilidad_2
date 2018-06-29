 const controller={};
 controller.listar=(req,res)=>{
	req.getConnection((err,conn)=>{
		conn.query('select * from convenio where estado=1',(err,rows)=>{
			if(err){
				res.json(err)
			}
			res.render('Admin/convenio',{
				data:rows
			});
		});
	});
}

controller.agregarConvenio=(req,res)=>{
	var datos=req.body;
	datos={
		nombre: datos.nombre,
		descripcion: datos.descripcion,
		id_tipo_movilidad:datos.tipo_movilidad,
		id_universidad: datos.universidad,
	}
	req.getConnection((err,conn)=>{
		conn.query('insert into convenio set ?',[datos],(err,rows)=>{
			if(err){
				res.json(err)
			}
      req.getConnection((err,conn)=>{
    		conn.query(' select max(id_convenio) as max from convenio ',(err,rows)=>{
    			if(err){
    				res.json(err)
    			}
          res.json(rows[0].max);
    		});
    	});
		});
	});

}

controller.editarConvenio=(req,res)=>{
 req.getConnection((err,conn)=>{
   conn.query('select * from convenio where id_convenio=?',[req.body.id],(err,rows)=>{
     if(err){
       res.json(err)
     }
     res.json(rows)
   });
 });
}

controller.eliminarConvenio=(req,res)=>{
 req.getConnection((err,conn)=>{
   conn.query('UPDATE convenio SET estado = 0 WHERE id_convenio = ? ',[req.query.id],(err,rows)=>{
     if(err){
       res.json(err)
     }
     res.redirect("/admin/convenio");
   });
 });
}





module.exports=controller;
