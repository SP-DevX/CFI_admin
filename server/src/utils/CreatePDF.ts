import fs from "fs";
import path from "path";

const imgPath=path.join(__dirname,"..","..","Public",'logo.jpg');


interface InvoiceItem {
    name: string;
    qty: number;
    price: number;
    total?: number;
}
interface Invoice {
    invoiceNumber: string;
    customerName: string;
    customerEmail: string;
    finalPrice: number;
    products: InvoiceItem[];
}

export function generateHeader(doc: PDFKit.PDFDocument): void {
    doc.fontSize(20).text('INVOICE', 0, 60, { align: "center" });
    doc.image(imgPath, 380, 90, { width: 50, height: 50 })
        .fillColor("#444444")
        .fontSize(20)
        .text("Levitation", 200, 100, { align: "right" })
        .fontSize(10)
        .text("Infotech", 440, 120)
        .moveDown();
}

export function generateCustomerInformation(doc: PDFKit.PDFDocument, invoice: Invoice): void {

    generateHr(doc, 30, 550, 185);
    const customerInformationTop = 200;
    doc
        .fontSize(10)
        .text("Invoice Number:", 50, customerInformationTop)
        .text(invoice.invoiceNumber, 150, customerInformationTop)
        .text("Invoice Date:", 50, customerInformationTop + 15)
        .text(new Date().toLocaleDateString(), 150, customerInformationTop + 15)

        .text("Customer:", 300, customerInformationTop)
        .text(invoice.customerName, 390, customerInformationTop)
        .text("Customer Address:", 300, customerInformationTop + 15)
        .text(invoice.customerEmail, 390, customerInformationTop + 15)
        .moveDown();

    generateHr(doc, 30, 550, 252);
}


export function generateInvoiceTable(doc: PDFKit.PDFDocument, invoice: Invoice): void {
    let i;
    const invoiceTableTop = 300;

    doc.font("Helvetica-Bold");
    generateTableRow(
        doc,
        invoiceTableTop,
        "Sl. No.",
        "Product",
        "Qty",
        "Rate",
        "Total Price"
    );
    generateHr(doc, 30, 550, invoiceTableTop + 20);
    doc.font("Helvetica");
    let position = invoiceTableTop;
    for (i = 0; i < invoice.products.length; i++) {
        const item = invoice.products[i];
        position = invoiceTableTop + (i + 1) * 30;
        generateTableRow(
            doc,
            position,
            i + 1,
            item.name,
            item.qty,
            item.price,
            item.qty * item.price
        );

        generateHr(doc, 30, 550, position + 20);
    }
    position += 60;
    doc.font("Helvetica-Bold");
    doc.text("Total", 350, position, { width: 90 })
        .text(`INR ${String(invoice.finalPrice)}`, 450, position, { width: 90, align: "right" })

    position += 20;
    doc.font("Helvetica");
    doc.text("GST", 350, position, { width: 90 })
        .text("18%", 450, position, { width: 90, align: "right" })

    generateHr(doc, 340, 550, position + 20);
    position += 30;
    doc.font("Helvetica-Bold");
    doc.text("Grand Total", 350, position, { width: 90 })
        .text("INR 10000", 450, position, { width: 90, align: "right" })
    generateHr(doc, 340, 550, position + 20);

    doc.font("Helvetica");
    doc.fontSize(10).text("Valid Till : ", 50, position + 80, { width: 90, align: "left" })
        .text(new Date("01.01.2025").toLocaleString(), 100, position + 80);


    position += 150;
    doc
        .lineWidth(70)
        .lineCap('round')
        .moveTo(100, position)
        .lineTo(500, position)
        .fillAndStroke("gray", "#0a0202")
        .fillColor("white")
        .fontSize(12)
        .text("Terms and Conditions", 100, position - 20)
        .fontSize(10)
        .text("we are happy to supply any further information you may need and trust that you call on us to fill your order. Which will receive our prompt and careful attention.", 100, position, { width: 400 })
}


export function generateTableRow(
    doc: PDFKit.PDFDocument,
    y: number,
    ind: string | number,
    name: string,
    qty: string | number,
    price: string | number,
    total: string | number,
): void {
    doc
        .fontSize(10)
        .text(String(ind), 50, y, { width: 50, align: "left" })
        .text(name, 150, y, { width: 90, align: "left" })
        .text(String(qty), 280, y, { width: 50, align: "left" })
        .text(`INR ${String(price)}`, 300, y, { width: 90, align: "right" })
        .text(`INR ${String(total)}`, 400, y, { width: 90, align: "right" });
}

export function generateHr(doc: PDFKit.PDFDocument, start: number, end: number, y: number): void {
    doc
        .strokeColor("#aaaaaa")
        .lineWidth(1)
        .moveTo(start, y)
        .lineTo(end, y)
        .stroke();
}
