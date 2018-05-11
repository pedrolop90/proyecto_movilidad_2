const express=require('express'),
      router=express.Router(),
      adminController=require('../controllers/adminController'),
      experienciaController=require("../controllers/experienciaController");


router.get('/experiencias',experienciaController.listar)
router.post('/RegistrarExperiencia',experienciaController.agregar)
router.get('/eliminar?:nombre',adminController.eliminar)

module.exports=router;