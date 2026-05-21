"use client";

import type { Nominee } from "@/types";

interface Props {
  nominee: Nominee;
  onVote: (id: string) => void;
  disabled: boolean;
}

const NomineeCard = ({
  nominee,
  onVote,
  disabled,
}: Props) => {
  return (
    <div
      className="
        bg-white
        border
        rounded-3xl
        p-8
        shadow-sm
        hover:shadow-xl
        transition-all
        duration-300
        hover:-translate-y-1
      "
    >
      {/* IMAGE */}
      <div className="w-20 h-20 rounded-full bg-black text-white flex items-center justify-center text-2xl font-bold mb-6">
        {nominee.name.charAt(0)}
      </div>

      {/* INFO */}
      <h2 className="text-3xl font-bold text-gray-900">
        {nominee.name}
      </h2>

      <p className="text-gray-500 mt-2 text-lg">
        {nominee.party}
      </p>

      {/* BUTTON */}
      <button
        onClick={() => onVote(nominee._id)}
        disabled={disabled}
        className="
          w-full
          mt-8
          bg-black
          text-white
          py-4
          rounded-2xl
          font-semibold
          text-lg
          transition-all
          hover:opacity-90
          active:scale-[0.98]
          disabled:opacity-50
          disabled:cursor-not-allowed
        "
      >
        {disabled
          ? "Already Voted"
          : "Vote Now"}
      </button>
    </div>
  );
};

export default NomineeCard;