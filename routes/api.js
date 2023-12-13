var express = require("express");
var router = express.Router();
var preciosModel = require("../models/preciosModel");
var cloudinary = require("cloudinary").v2;
var nodemailer = require("nodemailer");

router.get("/administrador", async function (req, res, next) {
  let precios = await preciosModel.getPrecios();

  precios = precios.map((precios) => {
    if (precios.img_id) {
      const imagen = cloudinary.url(precios.img_id, {
        width: 200,
        height: 200,
        crop: "fill",
      });
      return {
        ...precios,
        imagen,
      };
    } else {
      return {
        ...precios,
        imagen: "",
      };
    }
  });

  res.json(precios);
});

router.post("/contacto", async (req, res) => {
  const mail = {
    to: "piovesanmatias@gmail.com",
    subject: "Contacto web - solicitud de turno",
    // html: `${req.body.nombre} se contacto a traves de la web, su correo es: ${req.body.email} <br> y su numero de telefono es: ${req.body.telefono}. <br> SOLICITA TURNO. <br> El mensaje que te dejo es: ${req.body.mensaje}`,
    html:` <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="preconnect" href="https://fonts.googleapis.com">
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
        <link href="https://fonts.googleapis.com/css2?family=Anton&family=Roboto:ital,wght@0,100;0,300;0,400;0,500;1,100;1,300;1,400&display=swap" rel="stylesheet">
        <style>
            :root{
                --color-uno:rgba(245,213,91,255);
                --color-dos:rgba(64,62,65,255);
                --color-tres:rgba(65,53,29,255);
            }
            *{
    
                font-family: 'Roboto', sans-serif;
            }
            body{
               box-sizing: content-box;
               padding: 0;
               margin: 0;
               display: flex;
               justify-content: center;
            }
            table{
                max-width: 600px;
                height: 100%;
                border-spacing: 0;
                min-width: 200px
            }
            .contenedor-titulo{
                width: 100%;
                height: 280px;
                display: flex;
                justify-content: center;
                background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' version='1.1' xmlns:xlink='http://www.w3.org/1999/xlink' xmlns:svgjs='http://svgjs.com/svgjs' width='1444' height='584' preserveAspectRatio='none' viewBox='0 0 1444 584'%3e%3cg mask='url(%26quot%3b%23SvgjsMask1864%26quot%3b)' fill='none'%3e%3crect width='1444' height='584' x='0' y='0' fill='url(%23SvgjsLinearGradient1865)'%3e%3c/rect%3e%3cpath d='M1444 0L745.38 0L1444 267.82z' fill='rgba(255%2c 255%2c 255%2c .1)'%3e%3c/path%3e%3cpath d='M745.38 0L1444 267.82L1444 327.7L661.91 0z' fill='rgba(255%2c 255%2c 255%2c .075)'%3e%3c/path%3e%3cpath d='M661.91 0L1444 327.7L1444 406.76L319.45 0z' fill='rgba(255%2c 255%2c 255%2c .05)'%3e%3c/path%3e%3cpath d='M319.45000000000005 0L1444 406.76L1444 446.81L190.34000000000003 0z' fill='rgba(255%2c 255%2c 255%2c .025)'%3e%3c/path%3e%3cpath d='M0 584L541.33 584L0 299.71z' fill='rgba(0%2c 0%2c 0%2c .1)'%3e%3c/path%3e%3cpath d='M0 299.71L541.33 584L923.71 584L0 200.03999999999996z' fill='rgba(0%2c 0%2c 0%2c .075)'%3e%3c/path%3e%3cpath d='M0 200.03999999999996L923.71 584L1025.56 584L0 160.27999999999997z' fill='rgba(0%2c 0%2c 0%2c .05)'%3e%3c/path%3e%3cpath d='M0 160.27999999999997L1025.56 584L1083.6 584L0 135.92999999999998z' fill='rgba(0%2c 0%2c 0%2c .025)'%3e%3c/path%3e%3c/g%3e%3cdefs%3e%3cmask id='SvgjsMask1864'%3e%3crect width='1444' height='584' fill='white'%3e%3c/rect%3e%3c/mask%3e%3clinearGradient x1='14.89%25' y1='-36.82%25' x2='85.11%25' y2='136.82%25' gradientUnits='userSpaceOnUse' id='SvgjsLinearGradient1865'%3e%3cstop stop-color='rgba(14%2c 42%2c 71%2c 1)' offset='0'%3e%3c/stop%3e%3cstop stop-color='rgba(245%2c 213%2c 91%2c 1)' offset='0'%3e%3c/stop%3e%3c/linearGradient%3e%3c/defs%3e%3c/svg%3e");
                flex-direction: row-reverse;
            }
            .contenedor-textos{
                height: 100%;
                width: 100%;
                padding-right: 10px;
            }
            .contenedor-textos h1{
                font-family: 'Roboto', sans-serif;;
                font-weight: 900;
                color: var(--color-dos);
                font-size: 1.7em;
                text-align: left;
                
            }
    
            .contenedor-textos p{
                color: var(--color-dos);
                font-style: italic;
                font-size: 0.8em;
                text-align: justify;
            }
    
            .contenedor-textos button{
                background-color: transparent;
                font-family: 'Roboto';
                width: 100px;
                height: 30px;
                border: 3px solid var(--color-dos);
            }
    
            .contenedor-img{
                display: flex;
                justify-content: end;
                align-items: end;
                width: 100%;
                height: 100%;
    
            }
            .contenedor-img img{
                filter: drop-shadow(1px 1px 5px black);
                width: 400px;
                height: 280px;
                position: absolute;
                left: -55px;
            }
    
            .contenedor-segundaseccion{
                display: flex;
                width: 100%;
                height: 300px;
            }
    
            .imagen-segundaseccion{
                height: 100%;
                width: 100%;
                flex: 2;
            }
            .imagen-segundaseccion img {
                width: 100%;
                height: 100%;
                border-radius: 5px;
            }
    
            .textos-segundaseccion{
                width: 100%;
                display: flex;
                flex-direction: column;
                align-items: center;
                flex: 1;
                background-color: rgb(246, 242, 242);
            }
    
            .textos-segundaseccion p {
                text-align: justify;
                font-style: italic;
                padding: 10px;
                font-size: 0.8em;
                color: var(--color-dos);
            }
    
            .rellenar{
                display: flex;
                justify-content: center;
                align-items: center;
                width: 100%;
                height: 40px;
                color: white;
                text-align: center;
                background-color: var(--color-dos);
            }
    
            .contenedor-terceraseccion{
                display: flex;
                width: 100%;
                background-color: rgb(242, 242, 242);
            }
    
            .textos-terceraseccion{
                flex: 2;
                background-color: rgb(242, 242, 242);
               
            }
    
            .textos-terceraseccion h1{
                font-weight: 900;
                font-size: 1.3em;
                text-align: center;
                color: var(--color-dos);
            }
    
            .textos-terceraseccion p {
                text-align: justify;
                font-style: italic;
                padding: 10px;
                font-size: 0.8em;
                color: var(--color-dos);
    
            }
    
            .contenedor-botones{
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: space-between;
            }
    
            .contenedor-botones button {
                background-color: var(--color-dos);
                width: 90%;
                border-radius: 5px;
                height: 50px;
                color: rgb(216, 211, 211);
            }
    
            .caja-contenido{
                align-self: flex-end;
                width: 100%;
                font-weight: 900;
                display: flex;
                justify-content: center;
                align-items: center;
                height: 50px;
                background-color: var(--color-uno);
            }
    
            @media screen and (min-width: 670px ) {
            .contenedor-textos h1{
                font-size: 2rem;
            }
    
            .contenedor-textos p{
                font-size: 0.9rem;
      
            }
    
            .contenedor-textos button{
                width: 120px;
            }
    
            .contenedor-img{
          
    
            }
            .contenedor-img img{
                filter: drop-shadow(1px 1px 5px black);
                width: 400px;
                height: 280px;
                position: absolute;
                left: 32%;
            }
                
            }
    
        </style>
        <title>Gymnasio template</title>
      </head>
      <body>
        <table>
            <tr>
                <td>
                    <div class="contenedor-titulo">
                        <div class="contenedor-textos">
                            <h1>Lorem ipsum dolor sit amet</h1>
                            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. At et qui rem cum quisquam optio! Sit ad sequi repudiandae, cumque error maiores illo explicabo architecto quia temporibus reprehenderit iste sint.</p>
                            <button>Consultar</button>
                        </div>
                        <div class="contenedor-img">
                          <img src="https://i.ibb.co/dmNfx2t/zyro-image-1.png" alt="zyro-image-1" border="0">
                        </div>
                    </div>
                </td>
            </tr>
            <tr>
                <td>
                    <div class="contenedor-segundaseccion">
                        <div class="imagen-segundaseccion">
                            <img src="https://images.unsplash.com/photo-1639496908153-e89e77ea95f2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80" alt="">
                        </div>
                        <div class="textos-segundaseccion">
                            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Distinctio tempora dolore ex eius voluptatem. Obcaecati, magnam et laborum placeat texto de relleno.</p>
                            <div class="rellenar">Contenido a rellenar</div>
                        </div>
                    </div>
                </td>
            </tr>
            <tr>
                <td>
                    <div class="contenedor-terceraseccion">
                        <div class="textos-terceraseccion">
                            <h1>Lorem ipsum dolor sit amet consectetur adipisicing</h1>
                            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Maiores porro dolores aspernatur distinctio quia mollitia harum, culpa voluptatibus error consequuntur reprehenderit voluptas, voluptatum debitis possimus unde doloribus nobis consectetur id?</p>
                        </div>
                        <div class="contenedor-botones">
                            <button>Boton 1</button>
                            <div class="caja-contenido">Caja con contenido</div>
                        </div>
                    </div>
                </td>
    
            </tr>
        </table>
        
        
      </body>
    </html>
    
     `,
  };


  const transport = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });
  await transport.sendMail(mail);

  res.status(201).json({
    error: false,
    message: "Mensaje Enviado con Exito!!",
  });
});

module.exports = router;
