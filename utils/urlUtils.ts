export function getOrderDetailsUrl(orderId: string): string {
  return `https://oemsalesaftersalesorg--scaletest.sandbox.lightning.force.com/lightning/r/WorkOrder/${orderId}/view`;
}
