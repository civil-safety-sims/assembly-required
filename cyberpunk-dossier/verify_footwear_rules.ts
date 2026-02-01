
import { runSimulation } from './src/logic/simulationEngine';
import { AVAILABLE_ITEMS } from './src/data/gameData';

const findItem = (id: string) => {
    const item = AVAILABLE_ITEMS.find(i => i.id === id);
    if (!item) throw new Error(`Item ${id} not found`);
    return item;
};

const runTest = (name: string, setup: any, expectedPartial: string, minScoreChange?: number) => {
    console.log(`Running test: ${name}`);
    const { items, weather, precip, threat } = setup;

    // Baseline run (empty)
    const baseline = runSimulation([], weather, precip, threat).score;
    const result = runSimulation(items, weather, precip, threat);

    const found = result.feedback.some(f => f.message.includes(expectedPartial));
    const scoreDiff = result.score - baseline;

    if (found) {
        console.log(`✅ PASS: Found "${expectedPartial}"`);
    } else {
        console.log(`❌ FAIL: Did not find "${expectedPartial}"`);
        console.log("Feedback received:", JSON.stringify(result.feedback, null, 2));
    }

    if (minScoreChange !== undefined) {
        if (scoreDiff >= minScoreChange) {
            console.log(`✅ PASS: Score change ${scoreDiff} >= ${minScoreChange}`);
        } else {
            console.log(`❌ FAIL: Score change ${scoreDiff} < ${minScoreChange}`);
        }
    }
    console.log('---');
};

const runningShoes = findItem('item-running-shoes');
const steelToe = findItem('item-steel-toe-boots');
const hikingBoots = findItem('item-hiking-boots');
const snowBoots = findItem('item-snow-boots');
const rxGlasses = findItem('item-prescription-safety-glasses');

// Test 0: Rx Glasses exist
console.log(`Rx Glasses found: ${rxGlasses.name}`);

// Test 1: Running Shoes (Mobility)
runTest('Running Shoes - Mobility', {
    items: [runningShoes],
    weather: 'Comfortable',
    precip: false,
    threat: 'Low'
}, 'AGILITY', 5);

// Test 2: Steel Toe (Protection + Heavy) - High Threat
// Should get FEET PROTECTED (+10) and FATIGUE (-5) -> Net +5
runTest('Steel Toe - Protection & Fatigue', {
    items: [steelToe],
    weather: 'Comfortable',
    precip: false,
    threat: 'High'
}, 'FEET PROTECTED', 5);

// Also check for Fatigue message
runTest('Steel Toe - Fatigue Message Check', {
    items: [steelToe],
    weather: 'Comfortable',
    precip: false,
    threat: 'Low'
}, 'FATIGUE RISK', -5); // Only fatigue in low threat (-5)

// Test 3: Hiking Boots (Waterproof + Mobility) - Rain
// Should get DRY & SAFE (+10) and AGILITY (+5) -> Net +15
runTest('Hiking Boots - Rain & Mobility', {
    items: [hikingBoots],
    weather: 'Comfortable',
    precip: true,
    threat: 'Low'
}, 'DRY & SAFE', 15);

// Test 4: Snow Boots (Warmth + Waterproof + Heavy) - Cold Rain
// Should get WARMTH (+10), DRY & SAFE (+10), FATIGUE (-5) -> Net +15
runTest('Snow Boots - Cold Rain & Fatigue', {
    items: [snowBoots],
    weather: 'Cold',
    precip: true,
    threat: 'Low'
}, 'FATIGUE RISK', 15);
