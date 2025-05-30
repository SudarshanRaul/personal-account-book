import React from 'react';

const ReceiptList = () => {
    const receipts = [];

    return (
        <div>
            <h1>Receipts</h1>
            <div className="border-bottom">
                {receipts && receipts.map((receipt, index) => (
                    <div key={receipt.id} className="grid-col-1fr-1fr-1fr padding-10">
                        <div>{receipt.date}</div>
                        <div>{receipt.account}</div>
                        <div>{receipt.amount}</div>
                        <div>{receipt.category}</div>
                        <div>
                            <img className="inline-img" src={receipt.image} />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ReceiptList;