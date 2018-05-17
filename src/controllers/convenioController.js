 const controller={};
 controller.listar=(req,res)=>{
	req.getConnection((err,conn)=>{
		conn.query('select * from convenio',(err,rows)=>{
			if(err){
				res.json(err)
			}
			res.render('Admin/convenio',{
				data:rows
			});
		});
	});
}

controller.agregar=(req,res)=>{
	var datos=req.body;
	req.getConnection((err,conn)=>{
		conn.query('insert into convenio set ?',[datos],(err,rows)=>{
			if(err){
				res.json(err)
			}
			res.redirect("/admin/convenio");
		});
	});
}


module.exports=controller;