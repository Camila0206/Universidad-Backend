const PostgresService = require("../../services/postgres.service");
const servicioDeCorreo = require("../../services/nodemailer");
const servicioDeExcel = require("../../services/excel");
const _pg = new PostgresService();


const getUsers = async (req, res) => {
   let sql = "select * from personas";

   // Resolviendo la promesa con ASYNC-AWAIT
   try {
      let result = await _pg.executeSql(sql);
      let rows = result.rows;

      return res.send({
         ok: true,
         message: "Usuarios consultados",
         content: rows,
      });
   } catch (error) {
      return res.send({
         ok: false,
         message: "Ha ocurrido un error consultando los usuarios",
         content: error,
      });
   }
};

const CreateUsers = async (req, res) => {
   try {
      let user = req.body;
      let sql = `INSERT INTO public.personas("name", email) VALUES($1,$2);`;
      let datos = [user.name, user.email];
      let result = await _pg.executeSql2(sql, datos);
   
      if (result.rowCount == 1) {
         let asunto = "Bienvenido";
         let cuerpo = `<h1> Hola  ${user.name} bienvenid@ a la universidad </h1>`;
         const _nodemailer = new servicioDeCorreo();
         await _nodemailer.enviarMensaje(user.email, asunto, cuerpo);
      }
      return res.send({
         ok: result.rowCount == 1,
         message: result.rowCount == 1 ? "Usuario creado" : "El usuario no fue creado",
         content: user,
      });
   } catch (error) {
      return res.send({
         ok: false,
         message:"error",
         content: error.toString()
      });
   }
};

const crearInformeDePersonas = async (req, res) => {
   let sql = `SELECT id, name, email FROM public.personas;`;

	try {
		
		let result = await _pg.executeSql(sql);
		let rows = result.rows;
		const _exceljs = new servicioDeExcel();
     
      await _exceljs.crearHojaPersonas(rows); 
		return res.send({
			ok: true,
			menssaje: "Excel creado",
			enlace_de_descarga: "http://localhost:3001/docs/universidad.xlsx",
		});
	} catch (error) {
		return res.send({
			ok: false,
			menssaje: "Error en servidor creando reporte excel",
			content: error,
		});
	}
};


module.exports = { getUsers, CreateUsers, crearInformeDePersonas};