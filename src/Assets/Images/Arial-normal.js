import { jsPDF } from "jspdf"
var font = 'undefined';
var callAddFont = function () {
this.addFileToVFS('Arial-normal.ttf', font);
this.addFont('Arial-normal.ttf', 'Arial', 'normal');
};
jsPDF.API.events.push(['addFonts', callAddFont])
