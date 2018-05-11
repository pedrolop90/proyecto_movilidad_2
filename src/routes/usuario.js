const express=require('express'),
      router=express.Router(),
      usuarioController=require('../controllers/usuarioController')	

router.get('/',usuarioController.listar)
router.post('/agregar',usuarioController.agregar)

module.exports=router;