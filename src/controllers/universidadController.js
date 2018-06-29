const controller={};

controller.universidades=(req,res)=>{
 req.getConnection((err,conn)=>{
   conn.query('select u.nombre as universidad, p.nombre as pais, u.id_universidad'+
   ' from universidad u join pais p on u.id_pais=p.id_pais and u.estado=1 ',(err,rows)=>{
     if(err){
       res.json(err)
     }
     res.render('Admin/listarUniversidad',{
       data:rows
     });
   });
 });
}

controller.vistaRegistrarUniversidad=(req,res)=>{
 var datos=req.query.id;
 req.getConnection((err,conn)=>{
   conn.query('select * from pais order by nombre',[datos],(err,rows)=>{
     if(err){
       res.json(err)
     }
     res.render('Admin/registrarUniversidad',{
       data:rows
     });
   });
 });
}

controller.registrarUniverisdad=(req,res)=>{
 var datos=req.body
 req.getConnection((err,conn)=>{
   conn.query('insert into universidad set ?',[datos],(err,rows)=>{
     if(err){
       res.json(err)
     }
     res.redirect('/admin/universidades');
   });
 });
}

controller.eliminarUniversidad=(req,res)=>{
 var datos=req.query.id;
 req.getConnection((err,conn)=>{
   conn.query('UPDATE universidad SET estado = 0 WHERE id_universidad = ? ',[datos],(err,rows)=>{
     if(err){
       res.json(err)
     }
     res.redirect("/Admin/universidades");
   });
 })

}

controller.buscarUniversidad=(req,res)=>{
  var datos=req.body
 req.getConnection((err,conn)=>{
   conn.query('select * from universidad where id_universidad=?',[datos.id],(err,rows)=>{
     if(err){
       res.json(err)
     }
     res.json(rows[0]);
   });
 });
}

controller.editarUniversidad=(req,res)=>{
 var datos=req.body
 req.getConnection((err,conn)=>{
   conn.query('UPDATE universidad SET ? WHERE id_universidad = ?',
   [{
     nombre:datos.nombre,
     id_pais:datos.pais
   },datos.id_universidad],(err,rows)=>{
     if(err){
       res.json(err)
     }
     res.redirect("/admin/universidades");
   });
 });
}




module.exports=controller;
