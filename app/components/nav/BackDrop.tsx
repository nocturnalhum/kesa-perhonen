import React from 'react';

interface BackDropProps {
  onClick: () => void;
}

const BackDrop: React.FC<BackDropProps> = ({ onClick }) => {
  return (
    <div
      className='z-20 bg-slate-300/10 w-screen h-screen fixed top-0 left-0 backdrop-blur-sm'
      onClick={onClick}
    >
      BackDrop
    </div>
  );
};

export default BackDrop;
