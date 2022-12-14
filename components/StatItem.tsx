import CopyButton from "./CopyButton.tsx";

export default function StatItem({ title, stat }) {
  const satUnits = ["Total Capacity", "Biggest Channel", "Smallest Channel"];

  let pubkeyShortened;

  if (title === "Pubkey") {
    pubkeyShortened =
      stat.slice(0, 6) + "..." + stat.slice(stat.length - 6, stat.length);
  }

  return (
    <div>
      <p className="text-xl text-secondary">{title}</p>

      <p className="text-3xl font-semibold">

        {pubkeyShortened ? pubkeyShortened : stat}{" "}

        {satUnits.includes(title) && (
          <span className="text-hover text-xl">sats</span>
        )}

        {title === "Pubkey" && <CopyButton content={stat} />}
      </p>
    </div>
  );
}