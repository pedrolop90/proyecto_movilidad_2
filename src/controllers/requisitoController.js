const controller={};


controller.registrarRequistoTipoMovilidad=(req,res)=>{
console.log(req.body);
 req.getConnection((err,conn)=>{
   conn.query('insert into requisito set ?',[{descripcion:req.body.descripcion}],(err,rows)=>{
     if(err){
       res.json(err)
     }
     req.getConnection((err,conn)=>{
       conn.query('select max(id_requisito) as max from requisito',(err,rows)=>{
         if(err){
           res.json(err)
         }
         req.getConnection((err,conn)=>{
           datos={
             id_tipo_movilidad:req.body.tipo_movilidad,
             id_requisito:rows[0].max
           }
           conn.query('insert into tipo_movilidad_requisito set ?',[datos],(err,rows)=>{
             if(err){
               res.json(err)
             }
             res.end("1");
           });
         });
       });
     });
   });
 });

}

controller.registrarRequisitoConvenio=(req,res)=>{
console.log(req.body);

 req.getConnection((err,conn)=>{
   conn.query('insert into requisito set ?',[{descripcion:req.body.descripcion}],(err,rows)=>{
     if(err){
       res.json(err)
     }
     req.getConnection((err,conn)=>{
       conn.query('select max(id_requisito) as max from requisito',(err,rows)=>{
         if(err){
           res.json(err)
         }
         var max=rows[0].max
         req.getConnection((err,conn)=>{
           conn.query('insert into convenio_especifico_requisito set ?',
           [{id_requisito:max,id_convenio_especifico:req.body.id_convenio_especifico}],(err,rows)=>{
             if(err){
               res.json(err)
             }
             res.end("1");
           });
         });
       });
     });
   });
 });

}





module.exports=controller;
