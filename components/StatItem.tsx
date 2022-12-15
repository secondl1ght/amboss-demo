import CopyButton from "./CopyButton";
import { shortenPubkey } from "../utils/utils";

interface StatItemTypes {
  title: string;
  stat: any;
}

export default function StatItem({ title, stat }: StatItemTypes) {
  const satUnits = ["Total Capacity", "Biggest Channel", "Smallest Channel"];

  let pubkeyShortened = "";

  if (title === "Pubkey") {
    pubkeyShortened = shortenPubkey(stat);
  }

  return (
    <div>
      <p className="text-xl text-secondary">{title}</p>

      <p className="text-3xl font-semibold">
        {pubkeyShortened ? pubkeyShortened : stat}{" "}
        {satUnits.includes(title) && (
          <span className="text-pink text-xl">sats</span>
        )}
        {title === "Pubkey" && <CopyButton content={stat} />}
      </p>
    </div>
  );
}
