const express=require('express'),
      router=express.Router(),
      adminController=require('../controllers/adminController'),
      experienciaController=require("../controllers/experienciaController");


router.get('/experiencias',experienciaController.listar)
router.get('/inicio',(req,res)=>{
	res.render("Admin/inicio");
})
router.post('/agregar',adminController.agregar)
router.get('/eliminar?:nombre',adminController.eliminar)

module.exports=router;