import { useMediaQuery } from 'react-responsive'

export default function useResponsive(minMax, widthScreen){
  let upDown;
  let width;

  if(minMax === "up"){
    upDown = "min-width";
  }else if(minMax === "down"){
    upDown = "max-width";
  }

  if(widthScreen === "xs"){
    width = "480px";
  }else if(widthScreen === "sm"){
    width = "568px";
  }
  else if(widthScreen === "md"){
    width = "768px";
  }
  else if(widthScreen === "lg"){
    width = "1024px";
  }else if(widthScreen === "xl"){
    width = "1200px";
  }else {
    width = `${widthScreen}px`
  }

  return useMediaQuery({
    query: `(${upDown}: ${width})`
  })
}
