const express=require('express'),
      router=express.Router(),
      adminController=require('../controllers/adminController'),
      experienciaController=require("../controllers/experienciaController"),
      tipoMovilidadController=require("../controllers/tipoMovilidadController"),
      convenioController=require("../controllers/convenioController"),
      requistoController=require("../controllers/requisitoController"),
      paisController=require("../controllers/paisController"),
      convenioEspecificoController=require("../controllers/convenioEspecificoController");


router.get('/experiencias',experienciaController.listar)
router.get('/RegistrarExperiencia',experienciaController.registrarExperiencia)
router.post('/agregarVideo',experienciaController.agregarVideo)
router.post('/agregarExperiencia',experienciaController.agregarExperiencia)
router.get('/eliminarExperiencia?:id',experienciaController.eliminar)



router.get('/tipoMovilidad',tipoMovilidadController.listar)
router.post('/agregarTipoMovilidad',tipoMovilidadController.agregar)
router.post('/actualizarTipoMovilidad',tipoMovilidadController.actualizarTipoMovilidad)
router.get('/eliminar_tipo_movilidad?:id',tipoMovilidadController.eliminar)
router.post("/registrarRequistoTipoMovilidad",requistoController.registrarRequistoTipoMovilidad);


router.post('/editarMovilidad',tipoMovilidadController.editar)
router.get('/agregarMovilidad',(req,res)=>{
	res.render("Admin/agregarMovilidad");
})

router.get("/eliminarConvenio?:id",convenioController.eliminarConvenio);

router.get("/eliminarExperiencia?:id",experienciaController.eliminar);
router.post("/editarConvenio",convenioController.editarConvenio);
router.get('/convenio',convenioController.listar)
router.post('/agregarConvenio',convenioController.agregarConvenio)
router.get('/RegistrarConvenio',tipoMovilidadController.listarMovilidadConvenio)


router.post("/registrarConvenioEspecifico",convenioEspecificoController.registrarConvenioEspecifico);

router.post("/listarPais",paisController.listar);

router.post("/registrarRequisitoConvenio",requistoController.registrarRequisitoConvenio);

module.exports=router;
