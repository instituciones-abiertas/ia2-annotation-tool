const colorPalette = ['#5470c6', '#91cc75', '#fac858', '#ee6666', '#73c0de', '#3ba272', '#fc8452', '#9a60b4', '#ea7ccc']

const randomColor = () => colorPalette[Math.floor(Math.random() * colorPalette.length)];
const sequenceColor = (idx) => colorPalette[ (idx >= colorPalette.length) ? idx - colorPalette.length :idx];

export { colorPalette, randomColor, sequenceColor }
