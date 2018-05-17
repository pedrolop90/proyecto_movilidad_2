'use strict'
const express=require("express"),
	  app=express(),
	  path=require('path'),
	  morgan=require("morgan"),
	  mysql=require("mysql"),
	  myConnection=require('express-myconnection'),
	  usuarioRutas=require("./routes/usuario"),
	  adminRutas=require("./routes/Admin")

//configuraciones
app.set('port',process.env.PORT || 3000)
app.set('view engine','ejs')
app.set('views',path.join(__dirname,'views'))

//middlewares
app.use(morgan('dev'))

'localhost = 127.0.0.1'

app.use(myConnection(mysql,{
		host: '127.0.0.1',
		user: 'root',
		password: '',
		port: '3306',
		database: 'proyecto_movilidad'
	},'single'))

app.use(express.urlencoded({extended:false}));

//routes
app.use('/',usuarioRutas)
app.use('/Admin',adminRutas)

//static files
app.use(express.static(path.join(__dirname,'public')))

//iniciando el servidor
app.listen(app.get('port'),()=>{
	console.log("server funcionando en el puerto 3000");
});
