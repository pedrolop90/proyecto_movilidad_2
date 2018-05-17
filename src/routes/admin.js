const express=require('express'),
      router=express.Router(),
      adminController=require('../controllers/adminController'),
      experienciaController=require("../controllers/experienciaController");
      tipoMovilidadController=require("../controllers/tipoMovilidadController");
      convenioController=require("../controllers/convenioController");


router.get('/experiencias',experienciaController.listar)


router.get('/tipoMovilidad',tipoMovilidadController.listar)
router.post('/agregarTipoMovilidad',tipoMovilidadController.agregar)
router.post('/actualizarTipoMovilidad',tipoMovilidadController.actualizarTipoMovilidad)
router.get('/eliminar_tipo_movilidad?:id',tipoMovilidadController.eliminar)



router.post('/editarMovilidad',tipoMovilidadController.editar)
router.get('/agregarMovilidad',(req,res)=>{
	res.render("Admin/agregarMovilidad");
})


router.get('/convenio',convenioController.listar)
router.get('/agregarConvenio',convenioController.agregar)
router.get('/agregarNuevoConvenio',tipoMovilidadController.listarMovilidadConvenio)


router.get('/inicio',(req,res)=>{
	res.render("Admin/inicio");
})


router.post('/agregar',adminController.agregar)
router.get('/eliminar?:nombre',adminController.eliminar)

module.exports=router;
