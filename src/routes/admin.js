const express=require('express'),
      router=express.Router(),
      adminController=require('../controllers/adminController'),
      experienciaController=require("../controllers/experienciaController");


router.get('/experiencias',experienciaController.listar)
router.post('/agregar',adminController.agregar)
router.get('/eliminar?:nombre',adminController.eliminar)

module.exports=router;