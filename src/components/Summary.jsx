import React from 'react';

const Summary = () => {
    const transactions = [
        { id: 1, account: 'Account 1', amount: 100, date: '2022-01-01', category: 'Category 1' },
        { id: 2, account: 'Account 2', amount: -50, date: '2022-01-02', category: 'Category 2' },
        { id: 3, account: 'Account 3', amount: 200, date: '2022-01-03', category: 'Category 3' },
        { id: 4, account: 'Account 1', amount: -75, date: '2022-01-04', category: 'Category 1' },
        { id: 5, account: 'Account 2', amount: 150, date: '2022-01-05', category: 'Category 2' },
        { id: 6, account: 'Account 3', amount: 50, date: '2022-01-06', category: 'Category 3' },
        { id: 7, account: 'Account 1', amount: -25, date: '2022-01-07', category: 'Category 1' },
        { id: 8, account: 'Account 2', amount: 75, date: '2022-01-08', category: 'Category 2' },
        { id: 9, account: 'Account 3', amount: -100, date: '2022-01-09', category: 'Category 3' },
        { id: 10, account: 'Account 1', amount: 125, date: '2022-01-10', category: 'Category 1' },
        { id: 11, account: 'Account 2', amount: -30, date: '2022-01-10', category: 'Category 2' },
        { id: 12, account: 'Account 3', amount: 80, date: '2022-01-10', category: 'Category 3' },
    ];

    // Calculate total income and expenses
    const totalIncome = transactions
        .filter(transaction => transaction.amount > 0)
        .reduce((total, transaction) => total + transaction.amount, 0);

    const totalExpenses = transactions
        .filter(transaction => transaction.amount < 0)
        .reduce((total, transaction) => total + transaction.amount, 0);

    return (
        <div>
            <div>Total Income: {totalIncome}</div>
            <div>Total Expenses: {totalExpenses}</div>
        </div>
    );
};

export default Summary;