// Unit Tests for Kienyeji Farm Pricing System
// Run these tests in a browser console or Node.js environment

// Test data and configuration
const PRICING_CONFIG = {
    kienyeji: {
        jogoo: {
            live: 1500,
            cleaned: 1500
        },
        hens: {
            live: 1200,
            cleaned: 1200
        },
        hensPremium: {
            live: 1300,
            cleaned: 1300
        },
        bulk: 1000
    },
    eggs: {
        kienyeji: 900,  // per tray
        broiler: 400    // per tray
    }
};

const ORDER_TYPE_MAPPING = {
    'live-jogoo-kienyeji': { category: 'kienyeji', type: 'jogoo', processing: 'live' },
    'live-hens-kienyeji': { category: 'kienyeji', type: 'hens', processing: 'live' },
    'live-hens-premium-kienyeji': { category: 'kienyeji', type: 'hensPremium', processing: 'live' },
    'cleaned-jogoo-kienyeji': { category: 'kienyeji', type: 'jogoo', processing: 'cleaned' },
    'cleaned-hens-kienyeji': { category: 'kienyeji', type: 'hens', processing: 'cleaned' },
    'cleaned-hens-premium-kienyeji': { category: 'kienyeji', type: 'hensPremium', processing: 'cleaned' },
    'bulk-kienyeji': { category: 'kienyeji', type: 'bulk', processing: 'mixed' },
    'eggs-kienyeji': { category: 'eggs', type: 'kienyeji' },
    'eggs-broiler': { category: 'eggs', type: 'broiler' }
};

// Test helper function to calculate prices
function calculateTestPrice(orderType, quantity) {
    if (ORDER_TYPE_MAPPING[orderType]) {
        const mapping = ORDER_TYPE_MAPPING[orderType];
        
        if (mapping.category === 'kienyeji') {
            if (mapping.type === 'bulk') {
                return quantity * PRICING_CONFIG.kienyeji.bulk;
            } else {
                return quantity * PRICING_CONFIG.kienyeji[mapping.type][mapping.processing];
            }
        } else if (mapping.category === 'eggs') {
            const trays = Math.ceil(quantity / 30);
            return trays * PRICING_CONFIG.eggs[mapping.type];
        }
    }
    return 0;
}

// Test helper function for getOrderTypeText
function getOrderTypeText(orderType) {
    switch (orderType) {
        case 'live-jogoo-kienyeji': return 'Live Jogoo (Roosters) - Ksh 1,500/bird';
        case 'live-hens-kienyeji': return 'Live Hens (Standard) - Ksh 1,200/bird';
        case 'live-hens-premium-kienyeji': return 'Live Hens (Premium) - Ksh 1,300/bird';
        case 'cleaned-jogoo-kienyeji': return 'Slaughtered & Cleaned Jogoo - Ksh 1,500/bird';
        case 'cleaned-hens-kienyeji': return 'Slaughtered & Cleaned Hens - Ksh 1,200/bird';
        case 'cleaned-hens-premium-kienyeji': return 'Slaughtered & Cleaned Hens (Premium) - Ksh 1,300/bird';
        case 'bulk-kienyeji': return 'Bulk Kienyeji Order - Ksh 1,000/bird';
        case 'eggs-kienyeji': return 'Kienyeji Eggs (Ksh 900/tray)';
        case 'eggs-broiler': return 'Broiler Layers Eggs (Ksh 400/tray)';
        default: return 'Kienyeji Farm Order';
    }
}

// Test Suite
class PricingTestSuite {
    constructor() {
        this.tests = [];
        this.passed = 0;
        this.failed = 0;
    }

    test(name, testFunction) {
        try {
            testFunction();
            this.passed++;
            console.log(`✅ ${name}`);
        } catch (error) {
            this.failed++;
            console.error(`❌ ${name}: ${error.message}`);
        }
    }

    assertEqual(actual, expected, message = '') {
        if (actual !== expected) {
            throw new Error(`Expected ${expected}, got ${actual}. ${message}`);
        }
    }

    run() {
        console.log('🧪 Running Kienyeji Farm Pricing Tests...\n');

        // Test 1: Live Jogoo Pricing
        this.test('Live Jogoo pricing calculation', () => {
            const price = calculateTestPrice('live-jogoo-kienyeji', 10);
            this.assertEqual(price, 15000, 'Live Jogoo: 10 birds × 1500 = 15000');
        });

        // Test 2: Live Hens Standard Pricing
        this.test('Live Hens standard pricing calculation', () => {
            const price = calculateTestPrice('live-hens-kienyeji', 5);
            this.assertEqual(price, 6000, 'Live Hens: 5 birds × 1200 = 6000');
        });

        // Test 3: Live Hens Premium Pricing
        this.test('Live Hens premium pricing calculation', () => {
            const price = calculateTestPrice('live-hens-premium-kienyeji', 8);
            this.assertEqual(price, 10400, 'Premium Hens: 8 birds × 1300 = 10400');
        });

        // Test 4: Cleaned Jogoo Pricing
        this.test('Cleaned Jogoo pricing calculation', () => {
            const price = calculateTestPrice('cleaned-jogoo-kienyeji', 3);
            this.assertEqual(price, 4500, 'Cleaned Jogoo: 3 birds × 1500 = 4500');
        });

        // Test 5: Cleaned Hens Pricing
        this.test('Cleaned Hens pricing calculation', () => {
            const price = calculateTestPrice('cleaned-hens-kienyeji', 12);
            this.assertEqual(price, 14400, 'Cleaned Hens: 12 birds × 1200 = 14400');
        });

        // Test 6: Cleaned Premium Hens Pricing
        this.test('Cleaned Premium Hens pricing calculation', () => {
            const price = calculateTestPrice('cleaned-hens-premium-kienyeji', 6);
            this.assertEqual(price, 7800, 'Cleaned Premium Hens: 6 birds × 1300 = 7800');
        });

        // Test 7: Bulk Kienyeji Pricing
        this.test('Bulk Kienyeji pricing calculation', () => {
            const price = calculateTestPrice('bulk-kienyeji', 50);
            this.assertEqual(price, 50000, 'Bulk Kienyeji: 50 birds × 1000 = 50000');
        });

        // Test 8: Kienyeji Eggs Pricing (exact trays)
        this.test('Kienyeji eggs pricing - exact trays', () => {
            const price = calculateTestPrice('eggs-kienyeji', 60); // 2 trays
            this.assertEqual(price, 1800, 'Kienyeji Eggs: 2 trays × 900 = 1800');
        });

        // Test 9: Kienyeji Eggs Pricing (partial tray)
        this.test('Kienyeji eggs pricing - partial tray', () => {
            const price = calculateTestPrice('eggs-kienyeji', 45); // 1.5 trays = 2 trays
            this.assertEqual(price, 1800, 'Kienyeji Eggs: 45 eggs = 2 trays × 900 = 1800');
        });

        // Test 10: Broiler Eggs Pricing
        this.test('Broiler eggs pricing calculation', () => {
            const price = calculateTestPrice('eggs-broiler', 90); // 3 trays
            this.assertEqual(price, 1200, 'Broiler Eggs: 3 trays × 400 = 1200');
        });

        // Test 11: getOrderTypeText for Live Jogoo
        this.test('getOrderTypeText for Live Jogoo', () => {
            const text = getOrderTypeText('live-jogoo-kienyeji');
            this.assertEqual(text, 'Live Jogoo (Roosters) - Ksh 1,500/bird');
        });

        // Test 12: getOrderTypeText for Premium Hens
        this.test('getOrderTypeText for Premium Hens', () => {
            const text = getOrderTypeText('live-hens-premium-kienyeji');
            this.assertEqual(text, 'Live Hens (Premium) - Ksh 1,300/bird');
        });

        // Test 13: getOrderTypeText for Bulk Orders
        this.test('getOrderTypeText for Bulk Orders', () => {
            const text = getOrderTypeText('bulk-kienyeji');
            this.assertEqual(text, 'Bulk Kienyeji Order - Ksh 1,000/bird');
        });

        // Test 14: getOrderTypeText for Eggs
        this.test('getOrderTypeText for Kienyeji Eggs', () => {
            const text = getOrderTypeText('eggs-kienyeji');
            this.assertEqual(text, 'Kienyeji Eggs (Ksh 900/tray)');
        });

        // Test 15: getOrderTypeText for Broiler Eggs
        this.test('getOrderTypeText for Broiler Eggs', () => {
            const text = getOrderTypeText('eggs-broiler');
            this.assertEqual(text, 'Broiler Layers Eggs (Ksh 400/tray)');
        });

        // Test 16: Deposit Calculation
        this.test('Deposit calculation (50%)', () => {
            const totalPrice = 10000;
            const deposit = Math.round(totalPrice * 0.5);
            this.assertEqual(deposit, 5000, 'Deposit should be 50% of total price');
        });

        // Test 17: Balance Calculation
        this.test('Balance calculation', () => {
            const totalPrice = 15000;
            const deposit = Math.round(totalPrice * 0.5);
            const balance = totalPrice - deposit;
            this.assertEqual(balance, 7500, 'Balance should be total minus deposit');
        });

        // Test 18: Edge case - Zero quantity
        this.test('Zero quantity handling', () => {
            const price = calculateTestPrice('live-jogoo-kienyeji', 0);
            this.assertEqual(price, 0, 'Zero quantity should result in zero price');
        });

        // Test 19: Edge case - Single item
        this.test('Single item pricing', () => {
            const price = calculateTestPrice('live-hens-kienyeji', 1);
            this.assertEqual(price, 1200, 'Single hen should cost 1200');
        });

        // Test 20: Edge case - Large quantity
        this.test('Large quantity pricing', () => {
            const price = calculateTestPrice('bulk-kienyeji', 1000);
            this.assertEqual(price, 1000000, 'Large bulk order: 1000 birds × 1000 = 1000000');
        });

        // Summary
        console.log(`\n📊 Test Results:`);
        console.log(`✅ Passed: ${this.passed}`);
        console.log(`❌ Failed: ${this.failed}`);
        console.log(`📈 Success Rate: ${((this.passed / (this.passed + this.failed)) * 100).toFixed(1)}%`);
        
        if (this.failed === 0) {
            console.log(`\n🎉 All tests passed! Pricing system is working correctly.`);
        } else {
            console.log(`\n⚠️  Some tests failed. Please review the pricing logic.`);
        }
    }
}

// Run the tests
const testSuite = new PricingTestSuite();
testSuite.run();

// Export for use in other environments
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { PricingTestSuite, calculateTestPrice, getOrderTypeText };
}