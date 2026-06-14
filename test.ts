import { SynthForge } from './src/index.js';

const forge = new SynthForge();

console.log("=============================================");
console.log("🛠️ TITAN FORGE: SYNTHETIC DATA ENGINE ONLINE");
console.log("=============================================");

// Test 1: Local Edge Telemetry Synthesis
console.log("\n⚡ [FORGE]: Fabricating 3 Critical Node Failures locally...");
const criticalLogs = forge.generateTelemetryBatch(3, 'critical');
console.log(JSON.stringify(criticalLogs, null, 2));

// Test 2: Local Context Sanitizer (PII scrubbing)
console.log("\n🔒 [FORGE]: Ingesting raw network trace payload containing PII...");
const dirtyLog = "Error at 14:22:11 on node 192.168.1.45 triggered by admin@titan-networks.io. Core dump initiated.";
console.log("   -> Original:", dirtyLog);

const cleanLog = forge.scrubPII(dirtyLog);
console.log("   -> Sanitized:", cleanLog);
console.log("=============================================");
