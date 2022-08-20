import { useEffect, useState } from "react";

export default function LightModeDisclaimer() {
  const [mode, setMode] = useState<String>();

  useEffect(() => {
    const mq = window.matchMedia("(prefers-color-scheme: dark)");

    mq.addEventListener("change", (event) => {
      const colorScheme = event.matches ? "dark" : "light";
      setMode(colorScheme);
    });

    setMode(mq.matches ? "dark" : "light");
  }, []);

  if (mode === "light")
    return (
      <div
        id="lightModeDetection"
        className="flex gap-2 flex-col md:flex-row ml-auto mr-auto bg-neutral-500/50 sticky top-5 max-w-lg z-50 backdrop-blur-lg text-lg text-red-400 p-4 text-center transition-all"
      >
        <p>
          Your device is in Light Mode, which is currently not supported by this
          website.
        </p>
        <button
          className="font-bold"
          onClickCapture={() => {
            const x = document.getElementById("lightModeDetection");
            if (x) {
              if (x.style.display === "none") {
                x.style.display = "block";
              } else {
                x.style.display = "none";
              }
            } else {
              return;
            }
          }}
        >
          x
        </button>
      </div>
    );
  else return null;
}
