interface ImageProps {
  src: string;
  alt: string;
  onDelete: () => void;
}

const Image = ({ src, alt, onDelete }: ImageProps) => {
  return (
    <div
      className=""
      style={{
        position: "relative",
        margin: "0 0.5rem",
      }}
    >
      <img src={src} alt={alt} width={40} height={40} />
      <div
        style={{
          position: "absolute",
          top: 2,
          right: 2,
          backgroundColor: "rgba(0,0,0,0.5)",
          width: 20,
          height: 20,
          borderRadius: "50%",
        }}
        onClick={onDelete}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="close-icon"
        >
          <line x1="18" y1="6" x2="6" y2="18" />
          <line x1="6" y1="6" x2="18" y2="18" />
        </svg>
      </div>
    </div>
  );
};
export default Image;
