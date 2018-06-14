const controller={};

controller.mensajes=(req,res)=>{
 req.getConnection((err,conn)=>{
   conn.query('select * from mensaje order by fecha_enviado desc',(err,rows)=>{
     if(err){
       res.json(err)
     }
     res.render('Admin/listarMensaje',{
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
   id_pais_universidad: datos.pais,
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

controller.eliminarMensaje=(req,res)=>{
req.getConnection((err,conn)=>{
  conn.query('UPDATE mensaje SET estado = 0 WHERE id_mensaje = ? ',[req.query.id],(err,rows)=>{
    if(err){
      res.json(err)
    }
    res.redirect("/admin/mensajes");
  });
});
}





module.exports=controller;
