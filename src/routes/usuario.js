const express=require('express'),
      router=express.Router(),
      usuarioController=require('../controllers/usuarioController')

router.get('/',usuarioController.inicio)
router.get('/informacion',usuarioController.informacion)
router.post('/agregar',usuarioController.agregar)
router.get("/paises",usuarioController.vistaPaises);
router.get("/admin",usuarioController.vistaIniciarSessionAdmin);
router.post("/listarPaisesConvenio",usuarioController.listarPaisesConvenio);
router.get("/universidades?:pais",usuarioController.listarUniversidadesConvenio);
router.get("/experiencias",usuarioController.vistaExperiencia);
router.get("/contacto",usuarioController.vistaContacto);
router.get("/registrarContacto",usuarioController.registrarContacto);
router.post("/iniciarSessionAdmin",usuarioController.iniciarSessionAdmin);
router.get("/convenios?:id",usuarioController.vistaConvenios);
module.exports=router;
