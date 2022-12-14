import { useRouter } from "next/router";
import { useQuery } from "@apollo/client";
import { Chart as ChartJS, ArcElement, Tooltip } from "chart.js";
import { Pie } from "react-chartjs-2";
import LoadingSpinner from "../components/LoadingSpinner";
import StatItem from "../components/StatItem";
import ChannelRow from "../components/ChannelRow";
import Footer from "../components/Footer";
import { GET_CHANNELS } from "../queries/channels";

ChartJS.register(ArcElement, Tooltip);

const Channels = () => {
  const router = useRouter();
  const { pubkey } = router.query;

  const { loading, error, data } = useQuery(GET_CHANNELS, {
    variables: {
      pubkey,
      page: { limit: 50, offset: 0 },
      order: { by: "capacity", direction: "DESC" },
    },
  });

  const channels =
    (data && data.getNode["graph_info"].channels["channel_list"].list) || [];

  const numChannels = new Intl.NumberFormat("en-US").format(channels.length);

  let totalCapacity = 0;
  let channelCapacities: Array<number> = [];
  let lastUpdates: Array<number> = [];

  channels.forEach((channel: any) => {
    const capacity = parseInt(channel.capacity);

    // calculate sum of channel capacity
    totalCapacity = totalCapacity + capacity;

    // create array of capacities to calculate min/max
    channelCapacities.push(capacity);

    // push last updates to array to determine latest
    lastUpdates.push(channel["last_update"]);
  });

  const biggestChannel = new Intl.NumberFormat("en-US").format(
    Math.max(...channelCapacities)
  );
  const smallestChannel = new Intl.NumberFormat("en-US").format(
    Math.min(...channelCapacities)
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

  interface PieChartTypes {
    short_channel_id: string;
    capacity: string;
  }

  const pieChartData = {
    labels: channels.map(
      ({ short_channel_id }: PieChartTypes) => short_channel_id
    ),
    datasets: [
      {
        label: "Capacity",
        data: channels.map(({ capacity }: PieChartTypes) => capacity),
        backgroundColor: channels.map(
          () => `rgba(255, 0, 128, ${Math.random()})`
        ),
        borderColor: "rgba(255, 0, 128, 1)",
        borderWidth: 1,
      },
    ],
  };

  if (loading)
    return (
      <main className="center w-full text-center p-8">
        <p className="text-white font-semibold text-3xl">
          L
          <LoadingSpinner />
          ading...
        </p>
      </main>
    );

  if (error)
    return (
      <>
        <main className="center w-full text-center p-8">
          <p className="text-white font-semibold text-3xl">
            Error : {error.message}
          </p>
        </main>
        <Footer />
      </>
    );

  if (!channels.length)
    return (
      <>
        <main className="center w-full text-center p-8">
          <p className="text-white font-semibold text-3xl">
            No channels to display.
          </p>
        </main>
        <Footer />
      </>
    );

  return (
    <>
      <main className="space-y-8 text-white p-8">
        <section className="flex justify-center">
          <div className="space-y-2">
            <p className="text-3xl font-semibold text-center mb-4">
              Channel Stats
            </p>
            {statItems.map((stat) => (
              <StatItem key={stat.title} title={stat.title} stat={stat.stat} />
            ))}
          </div>
        </section>

        <section className="w-full md:w-[500px] mx-auto">
          <p className="text-3xl font-semibold text-center mb-4">
            Channel Capacity
          </p>
          <Pie data={pieChartData} />
        </section>

        <section>
          <p className="text-3xl font-semibold text-center mb-4">Channels</p>
          <div className="bg-white/[0.05] text-white rounded-lg p-8 w-[80vw] max-h-[80vh] mx-auto overflow-auto">
            <table className="w-full">
              <thead className="text-left font-semibold">
                <tr>
                  <th className="min-w-[35px]"></th>
                  <th className="min-w-[225px]">Peer</th>
                  <th className="min-w-[175px]">Id</th>
                  <th className="min-w-[150px]">
                    Capacity{" "}
                    <span className="text-pink font-normal">(sats)</span>
                  </th>
                  <th className="min-w-[125px]">Block Age</th>
                  <th className="min-w-[100px]">Last Update</th>
                </tr>
              </thead>
              <tbody>
                {channels.map((channel: any) => (
                  <ChannelRow
                    key={channel["short_channel_id"]}
                    rank={channels.indexOf(channel) + 1}
                    channel={channel}
                  />
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default Channels;
