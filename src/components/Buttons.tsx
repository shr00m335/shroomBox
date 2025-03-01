interface BlueButtonProps {
  children?: React.ReactNode;
}

export const BlueButton = ({ children }: BlueButtonProps): React.ReactNode => {
  return (
    <button className="bg-[#4880FF] text-[#FFFFFF] w-full py-2 rounded-2xl cursor-pointer hover:bg-[#487fffcb]">
      {children}
    </button>
  );
};
