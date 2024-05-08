import { useRef } from "react";

interface ButtonUploadImageProps {
  setFiles: React.Dispatch<React.SetStateAction<File[]>>;
}

const ButtonUploadImage = ({ setFiles }: ButtonUploadImageProps) => {
  const labelRef = useRef<HTMLLabelElement>(null);

  return (
    <button
      onClick={() => {
        labelRef.current?.click();
      }}
    >
      Select images
      <label htmlFor="input" ref={labelRef} />
      <input
        id="input"
        type="file"
        className="hidden"
        multiple
        accept="image/*"
        onChange={(e) => {
          if (e.target.files) {
            setFiles(Array.from(e.target.files));
          }
        }}
      />
    </button>
  );
};
export default ButtonUploadImage;
