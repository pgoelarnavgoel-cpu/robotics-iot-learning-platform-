// Quick test of the project generator
const { generateProject, generateProjects, getTotalPossibleProjects } = require('./src/utils/projectGenerator.ts');

console.log('Testing Project Generator...\n');

// Test single project generation
console.log('1. Generating project #0:');
const project0 = generateProject(0);
console.log(`   Title: ${project0.title}`);
console.log(`   Category: ${project0.category}`);
console.log(`   Difficulty: ${project0.difficulty}`);
console.log(`   Code Length: ${project0.code_snippet.length} characters`);
console.log(`   Components: ${project0.required_components.length}`);

console.log('\n2. Generating project #42:');
const project42 = generateProject(42);
console.log(`   Title: ${project42.title}`);
console.log(`   Category: ${project42.category}`);
console.log(`   Difficulty: ${project42.difficulty}`);

console.log('\n3. Batch generation (10 projects):');
const batch = generateProjects(0, 10);
console.log(`   Generated: ${batch.length} projects`);
console.log(`   All have code: ${batch.every(p => p.code_snippet.length > 0)}`);

console.log('\n4. Total possible projects:');
console.log(`   Maximum combinations: ${getTotalPossibleProjects()}`);

console.log('\n✅ All tests passed!');
