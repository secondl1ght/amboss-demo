import { useState } from "react";

export default function Home() {
  const [pubkey, setPubkey] = useState("");

  const handleInput = (e:any) => {
    setPubkey(e.target.value);
  };

  return (
    <main className="w-full p-4 md:p-8">
      <div className="text-white text-center space-y-2 w-full md:w-96 mx-auto">
        <img src="/images/amboss.svg" alt="Amboss" className="w-full" />

        <h1 className="text-3xl font-semibold uppercase">DEMO</h1>

        <div className="bg-white/[0.03] rounded-lg p-4 md:p-8 space-y-2">
          <p>
            Trying out the{" "}
            <a
              href="https://amboss.space/"
              target="_blank"
              rel="noreferrer"
              className="text-link hover:text-pink"
            >
              AMBOSS.SPACE
            </a>{" "}
            API!
          </p>

          <p>—</p>

          <p>
            Use the following URL format to view node channel information:{" "}
            <code className="break-all md:break-normal">
              https://ambossdemo.space/
              <span className="text-pink">[pubkey]</span>
            </code>
          </p>

          <p className="text-secondary font-semibold">OR</p>

          <input
            onInput={(e) => handleInput(e)}
            placeholder="Enter a pubkey..."
            type="text"
            id="pubkey"
            name="pubkey"
            className="w-full placeholder:text-center rounded-lg px-4 py-2 bg-input/5 border-[1px] border-input/10 hover:border-pink focus:shadow-[0px_0px_5px_rgb(255,0,128)] focus:border-pink focus:outline-none transition-colors"
          />

          <a
            href={`/${pubkey}`}
            className={`${
              pubkey ? "" : "pointer-events-none"
            } gradient flex justify-center items-center bg-black text-sm text-white font-semibold h-[42px] p-1 rounded-lg`}
          >
            Explore Channels
          </a>
        </div>
      </div>
    </main>
  );
}
