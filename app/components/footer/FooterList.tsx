interface FooterListProps {
  children: React.ReactNode;
}

const FooterList: React.FC<FooterListProps> = ({ children }) => {
  return (
    <div className='flex flex-col gap-2 w-fit md:w-1/2 lg:w-1/4 xl:w-1/6 mb-6'>
      {children}
    </div>
  );
};

export default FooterList;
