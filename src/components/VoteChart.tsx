// "use client";

// import {
//   PieChart,
//   Pie,
//   Tooltip,
//   Cell,
//   ResponsiveContainer,
// } from "recharts";

// interface Props {
//   data: {
//     name: string;
//     votes: number;
//   }[];
// }

// const COLORS = [
//   "#111827",
//   "#2563EB",
//   "#16A34A",
//   "#DC2626",
//   "#9333EA",
// ];

// const VoteChart = ({ data }: Props) => {
//   return (
//     <div className="w-full h-[400px] border rounded-xl p-5">
//       <ResponsiveContainer width="100%" height="100%">
//         <PieChart>
//           <Pie
//             data={data}
//             dataKey="votes"
//             nameKey="name"
//             outerRadius={140}
//             label
//           >
//             {data.map((_, index) => (
//               <Cell
//                 key={index}
//                 fill={
//                   COLORS[index % COLORS.length]
//                 }
//               />
//             ))}
//           </Pie>

//           <Tooltip />
//         </PieChart>
//       </ResponsiveContainer>
//     </div>
//   );
// };

// export default VoteChart;


"use client";

import {
  PieChart,
  Pie,
  Tooltip,
  Cell,
  ResponsiveContainer,
  Legend,
} from "recharts";

interface Props {
  data: {
    name: string;
    votes: number;
  }[];
}

const COLORS = [
  "#111827",
  "#2563EB",
  "#16A34A",
  "#DC2626",
  "#9333EA",
];

const VoteChart = ({ data }: Props) => {
  const totalVotes = data.reduce(
    (acc, item) => acc + item.votes,
    0
  );

  return (
    <div
      className="
        relative
        overflow-hidden
        bg-white
        border
        border-gray-200
        rounded-3xl
        p-8
        shadow-sm
      "
    >
      {/* HEADER */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-5 mb-8">
        <div>
          <p className="uppercase tracking-[0.25em] text-xs font-semibold text-gray-500 mb-3">
            Live Analytics
          </p>

          <h2 className="text-4xl font-black text-gray-900">
            Vote Distribution
          </h2>

          <p className="text-gray-500 mt-3 text-lg">
            Realtime graphical analysis of
            audience voting.
          </p>
        </div>

        {/* TOTAL */}
        <div className="bg-black text-white px-6 py-5 rounded-3xl min-w-[180px]">
          <p className="text-sm uppercase tracking-widest text-gray-400">
            Total Votes
          </p>

          <h3 className="text-5xl font-black mt-2">
            {totalVotes}
          </h3>
        </div>
      </div>

      {/* CHART */}
      <div className="w-full h-[420px]">
        <ResponsiveContainer
          width="100%"
          height="100%"
        >
          <PieChart>
            <Pie
              data={data}
              dataKey="votes"
              nameKey="name"
              cx="50%"
              cy="50%"
              innerRadius={90}
              outerRadius={150}
              paddingAngle={5}
              label={({ percent }) =>
                `${(
                  (percent || 0) * 100
                ).toFixed(0)}%`
              }
              labelLine={false}
            >
              {data.map((_, index) => (
                <Cell
                  key={index}
                  fill={
                    COLORS[
                      index %
                        COLORS.length
                    ]
                  }
                  stroke="white"
                  strokeWidth={4}
                />
              ))}
            </Pie>

            <Tooltip
              contentStyle={{
                borderRadius: "16px",
                border:
                  "1px solid #e5e7eb",
                boxShadow:
                  "0 10px 30px rgba(0,0,0,0.08)",
              }}
            />

            <Legend
              verticalAlign="bottom"
              iconType="circle"
              wrapperStyle={{
                paddingTop: 30,
              }}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* LIVE STATUS */}
      <div className="absolute top-8 right-8 flex items-center gap-2 bg-green-100 text-green-700 px-4 py-2 rounded-full text-sm font-semibold">
        <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>

        LIVE
      </div>

      {/* BACKGROUND GLOW */}
      <div className="absolute -bottom-20 -right-20 w-72 h-72 bg-gray-100 rounded-full blur-3xl opacity-40"></div>
    </div>
  );
};

export default VoteChart;