 const controller={};
 controller.listar=(req,res)=>{
	req.getConnection((err,conn)=>{
		conn.query('select * from experiencia',(err,rows)=>{
			if(err){
				res.json(err)
			}
			res.render('Admin/listaExperiencias',{
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



module.exports=controller;