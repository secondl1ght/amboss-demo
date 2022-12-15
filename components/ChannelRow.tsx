import { shortenPubkey } from "../utils/utils";

interface ChannelRowTypes {
  rank: number;
  channel: any;
}

export default function ChannelRow({ rank, channel }: ChannelRowTypes) {
  let peerAlias =
    channel["node2_info"].node && channel["node2_info"].node.alias
      ? channel["node2_info"].node.alias
      : "Satoshi";
  let peerPub = channel["node2_pub"];
  let idShort = channel["short_channel_id"];
  let idLong = channel["long_channel_id"];
  let capacity = new Intl.NumberFormat("en-US").format(channel.capacity);
  let blockAge = new Intl.NumberFormat("en-US").format(channel["block_age"]);
  let lastUpdate = new Date(channel["last_update"] * 1000).toLocaleDateString();

  return (
    <tr key={idShort} className="border-t-[1px] border-b-[1px] border-white/10">
      <td className="text-secondary">{rank}</td>
      <td>
        <p
          className={`font-semibold ${
            peerAlias.match("([^ ]{21})") ? "break-all" : ""
          }`}
        >
          {peerAlias}
        </p>
        <a href={`/${peerPub}`} className="text-link hover:text-pink text-xs">
          {shortenPubkey(peerPub)}
        </a>
      </td>
      <td>
        <p>{idShort}</p>
        <p className="text-secondary text-xs">{idLong}</p>
      </td>
      <td>{capacity}</td>
      <td>{blockAge}</td>
      <td>{lastUpdate}</td>
    </tr>
  );
}
