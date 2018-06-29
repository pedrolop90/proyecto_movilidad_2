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


controller.listarPaisesConvenio=(req,res)=>{
  req.getConnection((err,conn)=>{
    conn.query(' select DISTINCT p.codigo'+
    ' from universidad u join pais p on p.id_pais=u.id_pais and u.estado=1 join convenio c on '+
    ' c.id_universidad=u.id_universidad ',(err,rows)=>{
      if(err){
        res.json(err)
      }
      res.json(rows);
    });
  });
}
controller.listarUniversidadesConvenio=(req,res)=>{
 var pais=req.query.pais;
  req.getConnection((err,conn)=>{
    conn.query(' select DISTINCT u.nombre, u.id_universidad,p.id_pais, p.nombre as nombrePais,u.imagen_universidad '+
    ' from universidad u join pais p on p.codigo=? and u.id_pais=p.id_pais and p.estado=1 and u.estado=1 join convenio c on '+
    ' c.id_universidad=u.id_universidad and c.estado=1',[pais],(err,rows)=>{
      if(err){
        res.json(err)
      }
      res.render("Usuario/universidad",{
				data:rows
			});
    });
  });
}

controller.vistaPaises=(req,res)=>{
 res.render("Usuario/convenio");
}


controller.vistaUniversidad=(req,res)=>{
 res.render("Usuario/universidad");
}

controller.vistaExperiencia=(req,res)=>{
  req.getConnection((err,conn)=>{
    conn.query('select e.url_video,u.nombre as nombreUniversidad,p.nombre as nombrePais '+
    ' from experiencia e join universidad u on e.id_universidad=u.id_universidad and e.estado=1 join pais p on '+
    ' u.id_pais=p.id_pais ',(err,rows)=>{
      if(err){
        res.json(err)
      }
     res.render("Usuario/experiencia",{
       data:rows
     });
    });
  });
}


controller.vistaContacto=(req,res)=>{
 res.render("Usuario/contacto");
}
controller.inicio=(req,res)=>{
  res.render("Usuario/que2");
}

controller.informacion=(req,res)=>{
  res.render("Usuario/que2");
}
controller.vistaConvenios=(req,res)=>{
   var id=req.query.id;
  req.getConnection((err,conn)=>{
    conn.query(' select ce.nombre,ce.id_convenio_especifico,ce.descripcion,ce.id_convenio,u.nombre as nombreUniversidad, '+
    ' c.nombre as nombreConvenio,c.descripcion as descripcionConvenio, tm.nombre as nombreTipoMovilidad, tm.descripcion as descripcionTipoMovilidad '+
    '  from convenio c join convenio_especifico ce on c.id_universidad=? and c.id_convenio=ce.id_convenio '+
    ' and c.estado=1  join universidad u on c.id_universidad=u.id_universidad  join tipo_movilidad tm on '+
    ' tm.id_tipo_movilidad=c.id_tipo_movilidad ',[id],(err,rows)=>{
      if(err){
        res.json(err)
      }
     res.render("Usuario/conveniosEspecifico",{
       data:rows
     });
    });
  });
}

controller.registrarContacto=(req,res)=>{
 var datos=req.body
 req.getConnection((err,conn)=>{
   conn.query('insert into contacto set ?',[datos],(err,rows)=>{
     if(err){
       res.json(err)
     }
     res.redirect('/paises');
   });
 });
}

controller.vistaIniciarSessionAdmin=(req,res)=>{
 res.render("Usuario/admin");
}

controller.iniciarSessionAdmin=(req,res)=>{
 var datos=req.body
 req.getConnection((err,conn)=>{
   conn.query('select * from admin where usuario=? and password=?',[datos.usuario,datos.password],(err,rows)=>{
     if(err){
       res.json(err)
     }
     if(rows.length!=0){
       req.session.id_admin=rows[0].id_admin
       res.redirect('/admin/mensajes');
     }else{
       res.redirect("/admin");
     }
   });
 });
}



module.exports=controller;
