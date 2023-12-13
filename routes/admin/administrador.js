var express = require("express");
var router = express.Router();
var preciosModel = require("../../models/preciosModel");
var util = require("util");
var cloudinary = require("cloudinary").v2;
const uploader = util.promisify(cloudinary.uploader.upload);
const destroy = util.promisify(cloudinary.uploader.destroy);

/* GET home page. */
router.get("/", async function (req, res, next) {
  var precios = await preciosModel.getPrecios();

    precios = precios.map(precio =>{
    if(precio.img_id){
      const imagen = cloudinary.image(precio.img_id, {
        width:80,
        height:80,
        crop:'fill'

      });
      return{
        ...precio,
        imagen
      }
    }else{
      return{
        ...precio,
        imagen:''
      }
    }
    
  })

  res.render("admin/administrador", {
    layout: "admin/layout",
    usuario: req.session.nombre,
    precios,
  });
});



router.get("/agregar", (req, res, next) => {
  res.render("admin/agregar", {
    layout: "admin/layout",
  });
});

router.post("/agregar", async (req, res, next) => {
  try {
    var img_id = "";
    if (req.files && Object.keys(req.files).length > 0) {
      imagen = req.files.imagen;
      img_id = (await uploader(imagen.tempFilePath)).public_id;
    }

    if (
      req.body.precio != " " &&
      req.body.nombre != ""
    ) {
      await preciosModel.insertPrecios({ ...req.body, img_id });
      res.redirect("/admin/administrador");
    } else {
      res.render("admin/agregar", {
        layout: "admin/layout",
        error: true,
        message: "Todos los campos requeridos!!!!!",
      });
    }
  } catch (error) {
    console.log(error);
    res.render("admin/agregar", {
      layout: "admin/layout",
      error: true,
      message: "Error no cargo el cliente",
    });
  }
});

router.get("/eliminar/:ID", async (req, res, next) => {
  var ID = req.params.ID;

  let precio = await preciosModel.getPrecioById((ID));
  if(precio[0].img_id){
    await (destroy(precio[0].img_id));
  }


  await preciosModel.deletePrecioById(ID);
  res.redirect("/admin/administrador");
});

router.get("/modificar/:ID", async (req, res, next) => {
  var ID = req.params.ID;
 
  var precio = await preciosModel.updatePreciosById(ID);
  res.render("admin/modificar", {
    layout: "admin/layout",
    precio,
  });
});

router.post("/modificar", async (req, res, next) => {
  try {
    let img_id = req.body.img_original;
    let borrar_img_vieja= false;

    if(req.body.img_delete === '1'){
      img_id = null;
      borrar_img_vieja =true;
    }else{
      if (req.files && Object.keys(req.files).length>0){
        imagen = req.files.imagen;
        img_id = (await uploader(imagen.tempFilePath)).public_id;
        borrar_img_vieja = true;
      }
    }
    if(borrar_img_vieja  && req.body.img_original){
      console.log('Borramos la imagen');
      await(destroy(req.body.img_original));
    }

    var obj = {
      precio: req.body.precio,
      nombre: req.body.nombre,
      img_id
    };
    await preciosModel.modPreciosById(obj, req.body.ID);
    res.redirect("/admin/administrador");
  } catch (error) {
    console.log(error);
    res.render("admin/modificar", {
      layout: "admin/layout",
      error: true,
      message: "No se modifico el precio o promoción!!",
    });
  }
});

module.exports = router;
