import { WordCloud } from "@isoterik/react-word-cloud";
import words from "./data/Words.js";


function MyWordCloud() {
  return (
    <div style={{ width: "400px", height: "400px" }}>
      <WordCloud words={words} width={300} height={200} />
    </div>
  );
}

export default MyWordCloud;
