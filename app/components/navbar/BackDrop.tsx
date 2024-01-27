import React from 'react';

interface BackDropProps {
  onClick: () => void;
}

const BackDrop: React.FC<BackDropProps> = ({ onClick }) => {
  return (
    <div
      className='z-20 bg-gradient-to-b from-slate-200/20 to-slate-500/50 w-screen h-screen fixed top-0 left-0 backdrop-blur-sm'
      onClick={onClick}
    />
  );
};

export default BackDrop;
