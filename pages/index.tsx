export default function Home() {
  return (
    <main className="w-full p-8">
      <div className="text-white text-center space-y-2 w-full md:w-96 mx-auto">
        <img src="/images/amboss.svg" alt="Amboss" className="w-full" />

        <h1 className="text-3xl font-semibold">DEMO</h1>

        <p className="bg-white/[0.03] rounded-lg p-8">
          Trying out the{" "}
          <a href="https://amboss.space/" className="text-link hover:text-pink">
            AMBOSS.SPACE
          </a>{" "}
          API!
          <br />
          <br />
          Use the following URL format to view node channel information:{" "}
          <code className="break-all md:break-normal">
            https://ambossdemo.space/
            <span className="text-pink">[pubkey]</span>
          </code>
        </p>
      </div>
    </main>
  );
}
