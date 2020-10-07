export default function formatLargeNumbers(value: any) {
  if (Math.abs(value) > 999999) {
    return `${Math.sign(value) * +(Math.abs(value) / 1000000).toFixed(1)}M`;
  }

  if (Math.abs(value) > 999) {
    return `${Math.sign(value) * +(Math.abs(value) / 1000).toFixed(1)}k`;
  }

  return Math.sign(value) * Math.abs(value);
}
