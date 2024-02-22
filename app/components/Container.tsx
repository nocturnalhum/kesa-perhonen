interface ContainerProps {
  children: React.ReactNode;
}

const Container: React.FC<ContainerProps> = ({ children }) => {
  return (
    <div className='max-w-[1920px] mx-auto  md:px-8 xl:px-12'>{children}</div>
  );
};

export default Container;
