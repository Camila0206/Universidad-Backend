const Exceljs = require("exceljs");

class servicioDeExcel{
	constructor() {
		this.libro_de_trabajo = new Exceljs.Workbook();
	}
	async crearHojaPersonas(personas) {
		const hojaPersonas = this.libro_de_trabajo.addWorksheet("personas");
		hojaPersonas.columns = [
			{header: "Id", key: "id", width: 10},
			{header: "Nombre", key: "name", width: 32},
			{header: "Correo electrónico", key: "email", width: 32},
		];
		personas.forEach((persona) => {
			hojaPersonas.addRow(persona);
		});
		await this.libro_de_trabajo.xlsx.writeFile("docs/universidad.xlsx");
	}
}
module.exports = servicioDeExcel;