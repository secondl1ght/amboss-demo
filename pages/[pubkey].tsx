import { useRouter } from "next/router";
import { useQuery } from "@apollo/client";
import LoadingSpinner from "../components/LoadingSpinner.tsx";
import StatItem from "../components/StatItem.tsx";
import { GET_CHANNELS } from "../queries/channels";

const Channels = () => {
  const router = useRouter();
  const { pubkey } = router.query;

  const { loading, error, data } = useQuery(GET_CHANNELS, {
    variables: {
      pubkey: pubkey,
      page: { limit: 0, offset: 0 },
      order: { by: "capacity", direction: "DESC" },
    },
  });

  console.log(data);

  const channels =
    (data && data.getNode["graph_info"].channels["channel_list"].list) || [];

  const numChannels = new Intl.NumberFormat("en-US").format(channels.length);

  let totalCapacity = 0;
  let channelCapacaties = [];
  let lastUpdates = [];

  channels.forEach((channel) => {
    const capacity = parseInt(channel.capacity);

    // calculate sum of channel capacity
    totalCapacity = totalCapacity + capacity;

    // create array of capacities to calculate min/max
    channelCapacaties.push(capacity);

    // push last updates to array to determine latest
    lastUpdates.push(channel["last_update"]);
  });

  const biggestChannel = new Intl.NumberFormat("en-US").format(
    Math.max(...channelCapacaties)
  );
  const smallestChannel = new Intl.NumberFormat("en-US").format(
    Math.min(...channelCapacaties)
  );
  const lastUpdated = new Date(
    Math.max(...lastUpdates) * 1000
  ).toLocaleDateString();

  const statItems = [
    {
      title: "Pubkey",
      stat: pubkey,
    },
    {
      title: "Total Capacity",
      stat: new Intl.NumberFormat("en-US").format(totalCapacity),
    },
    { title: "Number of Channels", stat: numChannels },
    { title: "Biggest Channel", stat: biggestChannel },
    { title: "Smallest Channel", stat: smallestChannel },
    { title: "Last Update", stat: lastUpdated },
  ];

  if (loading)
    return (
      <main className="w-full text-center p-8">
        <p className="text-white font-semibold text-3xl">
          L
          <LoadingSpinner />
          ading...
        </p>
      </main>
    );
  if (error)
    return (
      <main className="w-full text-center p-8">
        <p className="text-white font-semibold text-3xl">
          Error : {error.message}
        </p>
      </main>
    );

  if (!channels.length)
    return (
      <main className="w-full text-center p-8">
        <p className="text-white font-semibold text-3xl">
          No channels to display.
        </p>
      </main>
    );

  return (
    <main>
      <div className="flex justify-center text-white p-8">
        <section className="space-y-2">
          {statItems.map((stat) => (
            <StatItem key={stat.title} title={stat.title} stat={stat.stat} />
          ))}
        </section>
      </div>
    </main>
  );
};

export default Channels;
