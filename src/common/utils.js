//抽取公共方法
export function debounce(func, delay) {
  let tierm = null;
  return function(...args) {
    
    //clearTimeout 想要停止或清除timeout事件，请用clearTimeout。
    if (tierm) {
      clearTimeout(tierm);
    }
    tierm = setTimeout(() => {
     func.apply(this, args);
      
    }, delay);
  };
}