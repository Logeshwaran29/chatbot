import React, {useState, useEffect} from 'react';

const Carousel = ({value, setOpen}) => {
  const [i, setI] = useState(0);

  const leftArrow = () =>{
    if (i === 0) {
      setI(value.length-1);
    }else{
      setI(prevCount => prevCount - 1);
    }
  };

  const rightArrow = () =>{
    if (i === value.length-1) {
      setI(0);
    }else{
      setI(prevCount => prevCount + 1);
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      rightArrow();
    }, 3000);

    return () => clearInterval(interval);
  }, [i]);

  return (
    <div className='carousel'>
      <div className='caro-label'>
        <label onClick={(e) => setOpen(false)}>
          <svg xmlns="http://www.w3.org/2000/svg" height={22} width={20} viewBox="0 0 384 512">
            <path fill="#ffff" d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z"/>
          </svg>  
        </label>  
      </div>
      <div className="slider-div" >
        <svg className='arrow-svg' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512" height={25} width={25} onClick={leftArrow}>
          <path d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l192 192c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L77.3 256 246.6 86.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-192 192z"/>
        </svg>
        <div className="img_div">
          <img src={value[i]} alt="img"/>
        </div>
        <svg className='arrow-svg' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512" height={25} width={25} onClick={rightArrow}>
          <path d="M310.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-192 192c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L242.7 256 73.4 86.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l192 192z"/>
        </svg>
      </div>
    </div>
  );
};

export default Carousel;
