"use client";

import { useEffect, useState } from "react";

import toast from "react-hot-toast";

import API from "@/services/api";

import type { Nominee } from "@/types";

import NomineeCard from "@/components/NomineeCard";

import { getSessionId } from "@/utils/session";

export default function HomePage() {
  const [nominees, setNominees] = useState<
    Nominee[]
  >([]);

  const [voted, setVoted] = useState(false);

  const [loading, setLoading] =
    useState(true);

  // FETCH NOMINEES
  const fetchNominees = async () => {
    try {
      setLoading(true);

      const response = await API.get(
        "/nominees"
      );

      setNominees(response.data);
    } catch (error) {
      toast.error("Failed to load nominees");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNominees();

    const alreadyVoted =
      localStorage.getItem("voted");

    if (alreadyVoted) {
      setVoted(true);
    }
  }, []);

  // SUBMIT VOTE
  const handleVote = async (
    nomineeId: string
  ) => {
    try {
      const sessionId = getSessionId();

      await API.post("/vote", {
        nomineeId,
        sessionId,
      });

      localStorage.setItem("voted", "true");

      setVoted(true);

      toast.success(
        "Vote submitted successfully"
      );
    } catch (error: any) {
      toast.error(
        error.response?.data?.message ||
          "Vote failed"
      );
    }
  };

  // LOADING SCREEN
  if (loading) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="w-14 h-14 border-4 border-black border-t-transparent rounded-full animate-spin mx-auto mb-5"></div>

          <p className="text-lg font-medium text-gray-600">
            Loading nominees...
          </p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50">
      {/* HERO */}
      <section className="border-b bg-white">
        <div className="max-w-7xl mx-auto px-5 py-20">
          <div className="max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-widest text-gray-500 mb-4">
              Live Election 2026
            </p>

            <h1 className="text-5xl md:text-6xl font-black leading-tight text-gray-900">
              Online Live Polling System
            </h1>

            <p className="text-lg text-gray-600 mt-6 leading-relaxed">
              Vote securely for your preferred
              nominee. Results are updated in
              real-time for administrators.
            </p>

            <div className="flex gap-4 mt-8 flex-wrap">
              <div className="bg-black text-white px-6 py-3 rounded-full text-sm font-semibold">
                Real-Time Voting
              </div>

              <div className="bg-white border px-6 py-3 rounded-full text-sm font-semibold">
                Secure Session Voting
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* VOTING SECTION */}
      <section className="max-w-7xl mx-auto px-5 py-16">
        <div className="flex items-center justify-between mb-10 flex-wrap gap-5">
          <div>
            <h2 className="text-3xl font-bold text-gray-900">
              Election Nominees
            </h2>

            <p className="text-gray-500 mt-2">
              Select one nominee and submit
              your vote.
            </p>
          </div>

          {voted && (
            <div className="bg-green-100 text-green-700 px-5 py-3 rounded-xl font-medium">
              You have already voted
            </div>
          )}
        </div>

        {/* EMPTY STATE */}
        {nominees.length === 0 ? (
          <div className="bg-white rounded-2xl border p-10 text-center">
            <h3 className="text-2xl font-bold mb-3">
              No nominees found
            </h3>

            <p className="text-gray-500">
              Please check back later.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
            {nominees.map((nominee) => (
              <NomineeCard
                key={nominee._id}
                nominee={nominee}
                onVote={handleVote}
                disabled={voted}
              />
            ))}
          </div>
        )}
      </section>
    </main>
  );
}