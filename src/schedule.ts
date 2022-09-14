import * as cron from "node-cron";

export function initScheduledFunction(schedule: string, func: () => void) {
  const scheduledJobFunction = cron.schedule(schedule, func);
  scheduledJobFunction.start();
}
