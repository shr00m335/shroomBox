import { useState } from "react";
import { PiMicrosoftOutlookLogoFill } from "react-icons/pi";
import { RxCross2 } from "react-icons/rx";
import { SiGmail } from "react-icons/si";

interface AddEmailPopupProps {
  categories: string[];
  onClose: () => void;
}

const AddEmailPopup = ({
  categories,
  onClose,
}: AddEmailPopupProps): React.ReactNode => {
  const [selectedCategory, setSelectedCategory] = useState<string>("personal");
  return (
    <div
      className="absolute top-0 left-0 w-screen h-screen bg-black/60 flex justify-center items-center"
      onClick={onClose}
    >
      <div
        className="w-[500px] h-[300px] bg-white py-3 relative"
        onClick={(e) => e.stopPropagation()}
      >
        <RxCross2
          className="absolute right-2 top-2 cursor-pointer"
          size={32}
          onClick={onClose}
        />
        <p className="text-2xl">Choose an email you want to add.</p>
        <div className="flex justify-around items-center h-3/5 w-4/5 mx-auto">
          <a href={`https://localhost:8080/login?category=${selectedCategory}`}>
            <SiGmail size={64} />
          </a>
          <button>
            <PiMicrosoftOutlookLogoFill size={64} />
          </button>
        </div>
        <label htmlFor="categories-select" className="text-xl mr-2">
          Category:
        </label>
        <select
          id="categories-select"
          className="bg-[#F5F6FA] border-[#D5D5D5] border-[1px] rounded-lg text-xl px-2 py-1"
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          {categories.map((x) => (
            <option value={x}>{x[0].toUpperCase() + x.substring(1)}</option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default AddEmailPopup;
