import { useState } from "react";
import axios from "axios";
import "./App.css";

function App() {

  const [text, setText] = useState("");
  const [video, setVideo] = useState([]);

  const getVideo = async () => {
    try {
      const res = await axios.post("http://localhost:5001/mood", {
        text: text
      });

      setVideo(res.data); // backend should return youtube search results
    } catch (err) {
      console.log("Error:", err);
    }
  };

  return (
    <div className="app">

      <h1>Mood Based Video Recommender</h1>

      <input
        type="text"
        placeholder="How is your mood today?"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />

      <button onClick={getVideo}>Predict Videos</button>

      <div className="video">
        {video.map((v) => (
          <iframe
            key={v.id.videoId}
            width="640"
            height="360"
            src={`https://www.youtube.com/embed/${v.id.videoId}`}
            title={v.snippet.title}
            allowFullScreen
          ></iframe>
        ))}
      </div>

    </div>
  );
}

export default App;