 const controller={};
 controller.listar=(req,res)=>{
	req.getConnection((err,conn)=>{
		conn.query('select c.nombre as nombre_convenio,u.nombre as nombre_universidad,p.nombre as nombre_pais, '+
			' tm.nombre as nombre_tipo_movilidad, e.url_video '+
			' from experiencia e join convenio c on e.id_convenio=c.id_convenio '+
			' join pais_universidad pu on pu.id_pais_universidad=c.id_pais_universidad '+
			' join universidad u on u.id_universidad=pu.id_universidad join pais p on p.id_pais=pu.id_pais '+
			' join tipo_movilidad tm on c.id_tipo_movilidad=tm.id_tipo_movilidad ',(err,rows)=>{
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