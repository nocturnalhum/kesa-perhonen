import { IconBase, IconType } from 'react-icons';

interface ActionBtnProps {
  icon: IconType;
  text?: string;
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
  disabled?: boolean;
}

const ActionBtn: React.FC<ActionBtnProps> = ({
  icon: Icon,
  text,
  onClick,
  disabled,
}) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`flex flex-col text-[0.6rem] items-center justify-center rounded cursor-pointer w-10 h-8 text-slate-700 border border-slate-400 ${
        disabled && 'opacity-50 cursor-not-allowed'
      } `}
    >
      <Icon size={18} />

      {text}
    </button>
  );
};

export default ActionBtn;
