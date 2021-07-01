const colorPalette = [
  "#5470c6",
  "#91cc75",
  "#fac858",
  "#ee6666",
  "#73c0de",
  "#3ba272",
  "#fc8452",
  "#9a60b4",
  "#ea7ccc",
];

const randomColor = (colors) =>
  colors[Math.floor(Math.random() * colors.length)];
const sequenceColor = (idx, colors) =>
  colors[idx >= colors.length ? idx - colors.length : idx];

export { colorPalette, randomColor, sequenceColor };
