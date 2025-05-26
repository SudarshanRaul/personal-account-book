import Tesseract from "tesseract.js";

const receiptItem = function (rawText) {
  this.product = null;
  this.amount = null;
  this.rawText = rawText;
};

const imageToText = async (image) => {
  const worker = await Tesseract.createWorker("eng");
  const {
    data: { text },
  } = await worker.recognize(image);
  console.log(text);
  await worker.terminate();
  return {
    ...getTotals(text),
    ...getDate(text),
  };
};



const getData = function () {
  const regex = /\b\d+\.\d{2}\b/;
  const match = this.rawText.match(regex);
  if (match) {
    const amount = parseFloat(match[0]);
    console.log(amount);
  }
};

const getTotals = function (text) {
    const subtotalMatch = text.match(/suBTOTAL\s+(\d+\.\d{2})/i);
    const taxMatch = text.match(/TAX\s+(\d+\.\d{2})/i);
    const totalMatch = text.match(/TOTAL\s+(\d+\.\d{2})/i);
  
    const subtotal = subtotalMatch ? parseFloat(subtotalMatch[1]) : 0;
    const tax = taxMatch ? parseFloat(taxMatch[1]) : 0;
    const total = subtotal + tax;
  
    return { subtotal, tax, total };
};

const getDate = (text) => {
  const dateMatch1 = text.match(/DATE\s+(\d{2}\/\d{2}\/\d{4})/i);
  const dateMatch2 = text.match(/\b\d{2}\/\d{2}\/\d{2}\b/);
  const date = dateMatch1 ? dateMatch1[0] : dateMatch2 ? dateMatch2[0] : null;
  return { date };
}

export { imageToText };
