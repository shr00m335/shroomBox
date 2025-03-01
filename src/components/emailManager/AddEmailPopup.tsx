import { PiMicrosoftOutlookLogoFill } from "react-icons/pi";
import { RxCross2 } from "react-icons/rx";
import { SiGmail } from "react-icons/si";

interface AddEmailPopupProps {
  onClose: () => void;
}

const AddEmailPopup = ({ onClose }: AddEmailPopupProps): React.ReactNode => {
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
        <div className="flex justify-around items-center h-4/5 w-4/5 mx-auto">
          <a href="https://localhost:8080/login">
            <SiGmail size={64} />
          </a>
          <button>
            <PiMicrosoftOutlookLogoFill size={64} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddEmailPopup;
