// "use client";

// import { useEffect, useState } from "react";

// import { useRouter } from "next/navigation";

// import toast from "react-hot-toast";

// import API from "@/services/api";

// import socket from "@/services/socket";

// import StatsCard from "@/components/StatsCard";

// import VoteChart from "@/components/VoteChart";

// interface Nominee {
//   _id: string;
//   name: string;
//   votes: number;
// }

// export default function DashboardPage() {
//   const router = useRouter();

//   const [nominees, setNominees] = useState<
//     Nominee[]
//   >([]);

//   const [totalVotes, setTotalVotes] =
//     useState(0);

//   // FETCH RESULTS
//   const fetchResults = async () => {
//     try {
//       const token =
//         localStorage.getItem("token");

//       if (!token) {
//         router.push("/admin/login");
//         return;
//       }

//       const response = await API.get(
//         "/vote/results"
//       );

//       setNominees(response.data.nominees);

//       setTotalVotes(response.data.totalVotes);
//     } catch (error) {
//       toast.error("Failed to load dashboard");
//     }
//   };

//   useEffect(() => {
//     fetchResults();

//     // SOCKET LISTENER
//     socket.on("voteUpdated", () => {
//       fetchResults();
//     });

//     return () => {
//       socket.off("voteUpdated");
//     };
//   }, []);

//   return (
//     <main className="min-h-screen p-10">
//       <h1 className="text-4xl font-bold mb-10">
//         Admin Dashboard
//       </h1>

//       {/* STATS */}
//       <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-10">
//         <StatsCard
//           title="Total Votes"
//           value={totalVotes}
//         />
//       </div>

//       {/* NOMINEE RESULTS */}
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-10">
//         {nominees.map((nominee) => (
//           <div
//             key={nominee._id}
//             className="border rounded-xl p-5 shadow-md"
//           >
//             <h2 className="text-2xl font-bold">
//               {nominee.name}
//             </h2>

//             <p className="text-xl mt-2">
//               Votes: {nominee.votes}
//             </p>
//           </div>
//         ))}
//       </div>

//       {/* CHART */}
//       <VoteChart data={nominees} />
//     </main>
//   );
// }

















"use client";

import { useEffect, useState } from "react";

import { useRouter } from "next/navigation";

import toast from "react-hot-toast";

import API from "@/services/api";

import socket from "@/services/socket";

import StatsCard from "@/components/StatsCard";

import VoteChart from "@/components/VoteChart";

interface Nominee {
  _id: string;
  name: string;
  votes: number;
}

export default function DashboardPage() {
  const router = useRouter();

  const [nominees, setNominees] = useState<
    Nominee[]
  >([]);

  const [totalVotes, setTotalVotes] =
    useState(0);

  const [loading, setLoading] =
    useState(true);

  // FETCH RESULTS
  const fetchResults = async () => {
    try {
      const token =
        localStorage.getItem("token");

      if (!token) {
        router.push("/admin/login");

        return;
      }

      setLoading(true);

      const response = await API.get(
        "/vote/results",
        {
          headers: {
            Authorization: token,
          },
        }
      );

      setNominees(response.data.nominees);

      setTotalVotes(response.data.totalVotes);
    } catch (error) {
      toast.error("Failed to load dashboard");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchResults();

    // REALTIME SOCKET
    socket.on("voteUpdated", () => {
      fetchResults();
    });

    return () => {
      socket.off("voteUpdated");
    };
  }, []);

  // LOADING UI
  if (loading) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="w-14 h-14 border-4 border-black border-t-transparent rounded-full animate-spin mx-auto mb-5"></div>

          <p className="text-lg font-medium text-gray-600">
            Loading dashboard...
          </p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50">
      {/* HEADER */}
      <section className="border-b bg-white">
        <div className="max-w-7xl mx-auto px-5 py-10 flex flex-col md:flex-row md:items-center md:justify-between gap-5">
          <div>
            <p className="uppercase tracking-[0.3em] text-sm text-gray-500 mb-3">
              Admin Panel
            </p>

            <h1 className="text-5xl font-black text-gray-900">
              Live Dashboard
            </h1>

            <p className="text-gray-500 mt-4 text-lg">
              Monitor real-time election
              results and live voting
              analytics.
            </p>
          </div>

          {/* LOGOUT */}
          {/* <button
            onClick={() => {
              localStorage.removeItem(
                "token"
              );

              router.push(
                "/admin/login"
              );
            }}
            className="
              bg-black
              text-white
              px-6
              py-4
              rounded-2xl
              font-semibold
              hover:opacity-90
              transition
            "
          >
            Logout
          </button> */}
        </div>
      </section>

      {/* CONTENT */}
      <section className="max-w-7xl mx-auto px-5 py-12">
        {/* STATS */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <StatsCard
            title="Total Votes"
            value={totalVotes}
          />

          <StatsCard
            title="Total Nominees"
            value={nominees.length}
          />

          <StatsCard
            title="Realtime Status"
            value={1}
          />
        </div>

        {/* RESULTS */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 mb-12">
          {/* LIVE RESULTS */}
          <div className="bg-white rounded-3xl border p-8 shadow-sm">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-3xl font-bold">
                  Live Results
                </h2>

                <p className="text-gray-500 mt-2">
                  Realtime nominee vote
                  counts
                </p>
              </div>

              <div className="flex items-center gap-2 bg-green-100 text-green-700 px-4 py-2 rounded-full text-sm font-semibold">
                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>

                LIVE
              </div>
            </div>

            <div className="space-y-5">
              {nominees.map((nominee) => (
                <div
                  key={nominee._id}
                  className="
                    border
                    rounded-2xl
                    p-5
                    hover:shadow-md
                    transition
                  "
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-2xl font-bold text-gray-900">
                        {nominee.name}
                      </h3>

                      <p className="text-gray-500 mt-1">
                        Election Candidate
                      </p>
                    </div>

                    <div className="text-right">
                      <p className="text-4xl font-black text-black">
                        {
                          nominee.votes
                        }
                      </p>

                      <p className="text-sm text-gray-500">
                        Votes
                      </p>
                    </div>
                  </div>

                  {/* PROGRESS BAR */}
                  <div className="mt-5 h-3 bg-gray-100 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-black rounded-full transition-all duration-500"
                      style={{
                        width: `${
                          totalVotes > 0
                            ? (nominee.votes /
                                totalVotes) *
                              100
                            : 0
                        }%`,
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* CHART */}
          <div className="bg-white rounded-3xl border p-8 shadow-sm">
            <div className="mb-8">
              <h2 className="text-3xl font-bold">
                Voting Analytics
              </h2>

              <p className="text-gray-500 mt-2">
                Visual representation of
                live election data
              </p>
            </div>

            <VoteChart data={nominees} />
          </div>
        </div>
      </section>
    </main>
  );
}