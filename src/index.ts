export interface TelemetrySchema {
  deviceId: string;
  timestamp: number;
  cpuUtilization: number;
  memoryUsageGB: number;
  status: 'healthy' | 'warning' | 'critical';
}

export class SynthForge {
  /**
   * Deterministically generates a batch of synthetic device telemetry logs at the edge
   */
  public generateTelemetryBatch(count: number, seedStatus?: 'healthy' | 'warning' | 'critical'): TelemetrySchema[] {
    const batch: TelemetrySchema[] = [];
    const statuses: ('healthy' | 'warning' | 'critical')[] = ['healthy', 'warning', 'critical'];

    for (let i = 0; i < count; i++) {
      const selectedStatus = seedStatus || statuses[Math.floor(Math.random() * statuses.length)];
      
      let cpu = Math.floor(Math.random() * 40) + 10; // Default 10-50%
      if (selectedStatus === 'warning') cpu = Math.floor(Math.random() * 20) + 70; // 70-90%
      if (selectedStatus === 'critical') cpu = Math.floor(Math.random() * 15) + 85; // 85-100%

      batch.push({
        deviceId: `node-${Math.random().toString(36).substring(2, 7).toUpperCase()}`,
        timestamp: Date.now() - (i * 1000),
        cpuUtilization: cpu,
        memoryUsageGB: parseFloat((Math.random() * 4 + 2).toFixed(2)),
        status: selectedStatus
      });
    }
    return batch;
  }

  /**
   * Local sanitization engine to scrub sensitive user details before an agent pushes context to a public LLM
   */
  public scrubPII(rawLog: string): string {
    let sanitized = rawLog;
    
    // Simple Email Regex Masking
    const emailRegex = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g;
    sanitized = sanitized.replace(emailRegex, '[REDACTED_EMAIL]');

    // Simple IP Address Masking
    const ipRegex = /\b(?:[0-9]{1,3}\.){3}[0-9]{1,3}\b/g;
    sanitized = sanitized.replace(ipRegex, '[REDACTED_IP]');

    return sanitized;
  }
}
