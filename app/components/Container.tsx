interface ContainerProps {
  children: React.ReactNode;
}

const Container: React.FC<ContainerProps> = ({ children }) => {
  return (
    <div className='max-w-[1920px] mx-auto desktop:px-2 px-4 h-full'>
      {children}
    </div>
  );
};

export default Container;
