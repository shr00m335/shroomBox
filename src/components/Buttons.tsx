import React from 'react';

interface BlueButtonProps {
  children?: React.ReactNode;
  onClick?: () => void;
}

export const BlueButton: React.FC<BlueButtonProps> = ({ children, onClick }) => {
  return (
    <button
      onClick={onClick}
      className="bg-[#4880FF] text-[#FFFFFF] w-full py-2 rounded-2xl cursor-pointer hover:bg-[#487fffcb]"
    >
      {children}
    </button>
  );
};