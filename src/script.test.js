const { test, expect, describe } = require('@jest/globals');

// Mock data and functions to test
const months = [
	'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
];

const data = {
	income: [3000, 3200, 2800, 3500, 3100, 3300, 3600, 3400, 2900, 3200, 3400, 3700],
	expense: [1500, 1800, 1200, 1600, 1400, 1550, 1800, 1700, 1300, 1600, 1500, 1900]
};

// Utility functions for testing
function calculateTotalIncome(incomeArray) {
	return incomeArray.reduce((sum, income) => sum + income, 0);
}

function calculateTotalExpense(expenseArray) {
	return expenseArray.reduce((sum, expense) => sum + expense, 0);
}

function calculateNetProfit(income, expense) {
	return income - expense;
}

function getMonthsCount() {
	return months.length;
}

describe('Financial Data Tests', () => {
	test('should have 12 months', () => {
		expect(getMonthsCount()).toBe(12);
	});

	test('should have correct month names', () => {
		expect(months[0]).toBe('Jan');
		expect(months[11]).toBe('Dec');
	});

	test('should have equal length income and expense arrays', () => {
		expect(data.income.length).toBe(data.expense.length);
	});

	test('should have 12 data points for income', () => {
		expect(data.income.length).toBe(12);
	});

	test('should have 12 data points for expenses', () => {
		expect(data.expense.length).toBe(12);
	});
});

describe('Income Calculations', () => {
	test('should calculate correct total income', () => {
		const totalIncome = calculateTotalIncome(data.income);
		expect(totalIncome).toBe(39100);
	});

	test('should return 0 for empty income array', () => {
		const emptyIncome = calculateTotalIncome([]);
		expect(emptyIncome).toBe(0);
	});

	test('should handle single income value', () => {
		const singleIncome = calculateTotalIncome([1000]);
		expect(singleIncome).toBe(1000);
	});
});

describe('Expense Calculations', () => {
	test('should calculate correct total expense', () => {
		const totalExpense = calculateTotalExpense(data.expense);
		expect(totalExpense).toBe(18850);
	});

	test('should return 0 for empty expense array', () => {
		const emptyExpense = calculateTotalExpense([]);
		expect(emptyExpense).toBe(0);
	});

	test('should handle single expense value', () => {
		const singleExpense = calculateTotalExpense([500]);
		expect(singleExpense).toBe(500);
	});
});

describe('Profit Calculations', () => {
	test('should calculate correct net profit', () => {
		const netProfit = calculateNetProfit(39100, 18850);
		expect(netProfit).toBe(20250);
	});

	test('should handle negative profit (loss)', () => {
		const netProfit = calculateNetProfit(10000, 15000);
		expect(netProfit).toBe(-5000);
	});

	test('should handle zero profit', () => {
		const netProfit = calculateNetProfit(5000, 5000);
		expect(netProfit).toBe(0);
	});
});

describe('Data Validation', () => {
	test('all income values should be non-negative', () => {
		const allNonNegative = data.income.every(income => income >= 0);
		expect(allNonNegative).toBe(true);
	});

	test('all expense values should be non-negative', () => {
		const allNonNegative = data.expense.every(expense => expense >= 0);
		expect(allNonNegative).toBe(true);
	});

	test('should not have NaN values in income', () => {
		const hasNaN = data.income.some(income => isNaN(income));
		expect(hasNaN).toBe(false);
	});

	test('should not have NaN values in expense', () => {
		const hasNaN = data.expense.some(expense => isNaN(expense));
		expect(hasNaN).toBe(false);
	});
});
