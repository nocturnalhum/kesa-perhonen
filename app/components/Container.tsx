interface ContainerProps {
  children: React.ReactNode;
}

const Container: React.FC<ContainerProps> = ({ children }) => {
  return (
    <div className='max-w-[1920px] h-full mx-auto px-4 desktop:px-2 bg-blue-500'>
      {children}
    </div>
  );
};

export default Container;
