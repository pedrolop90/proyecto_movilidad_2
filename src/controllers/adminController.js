 const controller={};
 controller.listar=(req,res)=>{
	req.getConnection((err,conn)=>{
		conn.query('select * from persona',(err,rows)=>{
			if(err){
				res.json(err)
			}
			res.render('Admin/inicio',{
				data:rows
			});
		});
	});
}

 controller.agregar=(req,res)=>{
	var datos=req.body;
	req.getConnection((err,conn)=>{
		conn.query('insert into persona set ?',[datos],(err,rows)=>{
			if(err){
				res.json(err)
			}
			res.redirect("/admin");
		});
	});
}
controller.eliminar=(req,res)=>{
	req.getConnection((err,conn)=>{
		conn.query('delete from persona where nombre=?',[req.query.nombre],(err,rows)=>{
			if(err){
				res.json(err)
			}
			res.redirect("/admin");
		});
	});
}


module.exports=controller;