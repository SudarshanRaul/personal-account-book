const sampleText = `2X Member 111826278335
  E 673919 FF BS BREAST 23.99 E
  E 33561 KS DICED TOM 6.49 E
  E 967596 JACKORGSALSA 2.9TE
  384.29
  EH 878137 18CT EGGS 12.87 E
  E 77053 GRAPE TOMATO 6.29 E
  404609 ECO HALF PAN 6.49 A
  E 55992 GRND TURKEY 18.47 E
  £ 263423 CHPD ONION 3.59 E
  [SME 22101 MONT JACK 2% 4.45 E
  SsuBTOTAL 85.61
  TAX 3.52
  xxx 10 AL [85.13 I.
  Check/Menber Prntd ~~ 89.13
  CHANGE 0.00`;
const ReceiptItem = function (rawText) {
  this.product = null;
  this.amount = null;
  this.category = null;
  this.rawText = rawText;
};

const Receipt = function (rawText) {
    this.items = [];
    this.date = null;
    this.total = null;
    this.merchant = null;
    this.rawText = rawText;
};

Receipt.prototype.createItem = function (rawText) {
    rawText.split("/n").map(line => {
        const lineObj = new ReceiptItem(line);
        lineObj.getData();
        return lineObj;
    });
};

Receipt.prototype.addItem = function (item) {
    this.items.push(item);
};

Receipt.prototype.getTotal = function () {

};

ReceiptItem.prototype.isItem = function (product) {
  return this.product && this.amount;
};

ReceiptItem.prototype.getData = function () {
  const regex = /\b\d+\.\d{2}\b/;
  const match = this.rawText.match(regex);
  if (match) {
    const amount = parseFloat(match[0]);
    this.amount = amount;
    this.product = this.rawText.split(amount).join('').trim();
  }
};

ReceiptItem.prototype.getTotal = function () {};

const textToData = text => {
  const textArray = text.split('\n');
  console.log(textArray);
  const newReceipt = new Receipt(text);
  const output = textArray.map(line => {
    const lineObj = new ReceiptItem(line);
    lineObj.getData();
    return lineObj;
  });
  console.log(output);
};

textToData(sampleText);
