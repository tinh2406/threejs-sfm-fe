import { useState } from "react";
import "./App.css";
import ButtonUploadImage from "./components/ButtonUploadImage";
import Image from "./components/Image";
import axios from "axios";
import Canvas from "./components/Canvas";

function App() {
  const [files, setFiles] = useState<File[]>([]);
  const [sessionId, setSessionId] = useState<string>("");
  const [url, setUrl] = useState<string>();
  // const [url, setUrl] = useState<string>("table.ply");
  return (
    <main className="main">
      <header className="header">
        <div className="flex">
          <ButtonUploadImage setFiles={setFiles} />
          <div className="flex ml-1 align-center">
            {files.map((file) => (
              <Image
                key={file.name}
                src={URL.createObjectURL(file)}
                alt={file.name}
                onDelete={() => {
                  setFiles(files.filter((f) => f.name !== file.name));
                }}
              />
            ))}
          </div>
        </div>
        <div className="flex">
          <button
            onClick={async () => {
              if (!files || files.length == 0) return;
              const formData = new FormData();
              for (let i = 0; i < files.length; i++) {
                formData.append("images", files[i]);
              }
              const res = await axios.postForm(
                "http://127.0.0.1:5000/upload",
                formData
              );
              if (res.data.sessionId) {
                const sessionId = res.data.sessionId;
                setSessionId(sessionId);
                const res2 = await axios.post(
                  `http://127.0.0.1:5000/processing/${sessionId}`
                );
                setUrl(res2.data.ply_url);
              }
            }}
          >
            Generate
          </button>
          <button className="ml-1">
            <a
              href={`http://127.0.0.1:5000/ply/${sessionId}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              Download
            </a>
          </button>
        </div>
      </header>
      <Canvas url={url} />
    </main>
  );
}
export default App;
