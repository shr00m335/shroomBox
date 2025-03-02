import React from "react";

interface GameManagerItemProps {
  imgsrc: string;
  name: string;
  email: string;
}

const GameManagerItem: React.FC<GameManagerItemProps> = ({
  imgsrc,
  name,
  email,
}) => {
  return (
    <div className="border border-gray-200 rounded-lg p-4 w-72 m-2 shadow-sm h-[240px] flex flex-col justify-center py-2">
      <img
        src={imgsrc}
        width={128}
        height={128}
        className="mx-auto rounded-full"
      />
      <p className="text-xl font-bold my-1">{name}</p>
      <p>{email}</p>
    </div>
  );
};

export default GameManagerItem;
