import "./App.css";
import * as amplitude from "@amplitude/analytics-browser";
import { sessionReplayPlugin } from "@amplitude/plugin-session-replay-browser";
import { Cloudinary } from "@cloudinary/url-gen";
import { auto } from "@cloudinary/url-gen/actions/resize";
import { autoGravity } from "@cloudinary/url-gen/qualifiers/gravity";
import { AdvancedImage } from "@cloudinary/react";

function App() {
  const cld = new Cloudinary({ cloud: { cloudName: "dwi8mo6ev" } });
  // Use this sample image or upload your own via the Media Explorer
  const img = cld
    .image("IMG_1514_jzxba8")
    .format("auto") // Optimize delivery by resizing and applying auto-format and auto-quality
    .quality("auto")
    .resize(auto().gravity(autoGravity()).width(500).height(500)); // Transform the image: auto-crop to square aspect_ratio

  const apiKey = process.env.APP_API_KEY;
  const sessionReplayTracking = sessionReplayPlugin({
    debugMode: true,
    sampleRate: 1,
  });

  const instanceTest = amplitude.createInstance();
  instanceTest.add(sessionReplayTracking);
  instanceTest.init(apiKey, "lp-test-sr3@gmail.com", {
    serverZone: "EU",
    instanceName: "instance 1",
  });
  // console.log("sessionReplay::", JSON.stringify(sessionReplayTracking));
  console.log(sessionReplayTracking);
  return (
    <div className="App">
      <header className="App-header">
        {/* <img src={logo} className="App-logo" alt="logo" /> */}
        <AdvancedImage cldImg={img} />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
