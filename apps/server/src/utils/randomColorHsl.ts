const randomInRange = (min: number, max: number) =>
  Math.random() * (max - min) + min;

export const randomColorHsl = () => {
  const h = Math.floor(Math.random() * 360);
  const s = randomInRange(60, 80);
  const l = randomInRange(50, 65);

  return `hsl(${h}, ${s}%, ${l}%)`;
};
