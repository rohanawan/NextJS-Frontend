export const generateCategoryColors = (categories) => {
    const colorMap = {};
    const colors = [];
  
    categories.forEach((category, index) => {
      const color = generateRandomColor();
      colorMap[category] = color;
    });
  
    categories.forEach((category) => {
      colors.push(colorMap[category]);
    });
  
    return colors;
  };
  
  const generateRandomColor = () => {
    const randomColor = `rgba(${getRandomValue(0, 255)}, ${getRandomValue(0, 255)}, ${getRandomValue(0, 255)}, 0.6)`;
    return randomColor;
  };
  
  const getRandomValue = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };
  