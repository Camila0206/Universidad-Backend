const nodemailer = require("nodemailer");

class servicioDeCorreo {
	constructor() {
        this.configuracion_de_transportador()
		this.correoRemitente = '"Universidad" <pruebadesarrweb2021@gmail.com>';
	}

	async configuracion_de_transportador() {
		this.transportador = nodemailer.createTransport({
			host: "smtp.gmail.com",
			port: 465,
			secure: true,
			auth: {
				user: "pruebadesarrweb2021@gmail.com",
				pass: "iskkrecuvkfllhnz"
			},
            tls: {
                rejectUnauthorized: false
            }
		});
	}
	async enviarMensaje(destinatario, asunto, cuerpo) {
        console.log("llega");
		await this.transportador.sendMail({
			from: this.correoRemitente,
			to: destinatario,
			subject: asunto,
			html: cuerpo,
		});
	}
}

module.exports = servicioDeCorreo;