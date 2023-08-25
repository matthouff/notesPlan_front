import { useMediaQuery } from 'react-responsive';

const screenSizes = {
  xs: '480px',
  sm: '568px',
  md: '768px',
  lg: '1024px',
  xl: '1200px',
};

export default function useResponsive(minMax, widthScreen) {
  const upDown = minMax === 'up' ? 'min-width' : 'max-width';
  const width = screenSizes[widthScreen] || `${widthScreen}px`;

  return useMediaQuery({
    query: `(${upDown}: ${width})`,
  });
}
