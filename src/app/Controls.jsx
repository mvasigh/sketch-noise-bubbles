import { saveAs } from 'file-saver'

import "./Controls.css";

function Controls() {
  const handleScreenshot = () => {
    const canvas = document.querySelector("canvas");

    if (!canvas) return;

    canvas.toBlob(blob => saveAs(blob, `screenshot_${Date.now()}.png`));
  };

  return (
    <ul className="controls__root">
      <li>
        <button onClick={handleScreenshot}>Screenshot</button>
      </li>
    </ul>
  );
}

export default Controls;
