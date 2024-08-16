export function stringToColor(str: string, seed: number = 2): string {
  let hash = seed;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }

  function vibrantColor(value: number): number {
    const min = 100;
    const max = 255;
    const adjustedValue = Math.max(min, (value + 100) % (max + 1)); // Ajusta a cor para o intervalo vibrante
    return adjustedValue;
  }

  let color = "#";
  for (let i = 0; i < 3; i++) {
    const value = vibrantColor((hash >> (i * 8)) & 0xff);
    color += ("00" + value.toString(16)).slice(-2);
  }

  return color;
}
