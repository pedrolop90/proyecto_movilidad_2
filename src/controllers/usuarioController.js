 const controller={};
 controller.listar=(req,res)=>{
	//res.render('customers');
	/*
	req.getConnection((err,conn)=>{
		conn.query('select * from persona',(err,rows)=>{
			if(err){
				res.json(err)
			}
			res.render('customers',{
				data:rows
			});
		});
	});
	*/
}

 controller.agregar=(req,res)=>{
	var datos=req.body;
	req.getConnection((err,conn)=>{
		conn.query('insert into persona set ?',[datos],(err,rows)=>{
			if(err){
				res.json(err)
			}
			res.redirect("/");
		});
	});
}

module.exports=controller;