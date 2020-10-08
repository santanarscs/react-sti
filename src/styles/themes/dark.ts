import light from './light';

const dark: typeof light = {
  ...light,
  colors: {
    ...light.colors,
    background: '#262e3e',
    white: '#fff',
  },
};

export default dark;
