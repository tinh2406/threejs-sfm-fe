import { useRef, useState } from "react";
import "./App.css";
import ButtonUploadImage from "./components/ButtonUploadImage";
import Image from "./components/Image";
import axios from "axios";
import Canvas from "./components/Canvas";
import LoadingBar from "react-top-loading-bar";

function App() {
  const [files, setFiles] = useState<File[]>([]);
  const ref = useRef<any>(null);
  const [sessionId, setSessionId] = useState<string>("");
  // const [url, setUrl] = useState<string>();
  const [url, setUrl] = useState<string>("result.ply");
  return (
    <main className="main">
      <LoadingBar color="#f11946" ref={ref} />
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
              try {
                const formData = new FormData();
                for (let i = 0; i < files.length; i++) {
                  formData.append("images", files[i]);
                }
                const res = await axios.postForm(
                  "http://127.0.0.1:5001/upload",
                  formData
                );
                ref.current.continuousStart();
                if (res.data.sessionId) {
                  ref.current.continuousStart();
                  const sessionId = res.data.sessionId;
                  setSessionId(sessionId);
                  const res2 = await axios.post(
                    `http://127.0.0.1:5001/processing/${sessionId}`
                  );
                  setUrl(res2.data.ply_url);
                }
              } catch (error) {}
              ref.current.complete();
            }}
          >
            Generate
          </button>
          <button className="ml-1">
            <a
              href={`http://127.0.0.1:5001/ply/${sessionId}`}
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
