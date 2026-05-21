// interface Props {
//   title: string;
//   value: number;
// }

// const StatsCard = ({
//   title,
//   value,
// }: Props) => {
//   return (
//     <div className="border rounded-xl p-6 shadow-md">
//       <h2 className="text-gray-500 text-lg">
//         {title}
//       </h2>

//       <p className="text-4xl font-bold mt-2">
//         {value}
//       </p>
//     </div>
//   );
// };

// export default StatsCard;


interface Props {
  title: string;
  value: number | string;
  icon?: string;
  subtitle?: string;
}

const StatsCard = ({
  title,
  value,
  icon,
  subtitle,
}: Props) => {
  return (
    <div
      className="
        relative
        overflow-hidden
        bg-white
        border
        border-gray-200
        rounded-3xl
        p-7
        shadow-sm
        hover:shadow-xl
        transition-all
        duration-300
        hover:-translate-y-1
      "
    >
      {/* TOP */}
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-widest text-gray-500">
            {title}
          </p>

          <h2 className="text-5xl font-black text-gray-900 mt-4">
            {value}
          </h2>

          {subtitle && (
            <p className="text-gray-500 mt-3 text-sm">
              {subtitle}
            </p>
          )}
        </div>

        {/* ICON */}
        {icon && (
          <div
            className="
              w-14
              h-14
              rounded-2xl
              bg-black
              text-white
              flex
              items-center
              justify-center
              text-2xl
              shadow-lg
            "
          >
            {icon}
          </div>
        )}
      </div>

      {/* BOTTOM LINE */}
      <div className="mt-8 h-1 w-full bg-gray-100 rounded-full overflow-hidden">
        <div className="h-full w-2/3 bg-black rounded-full"></div>
      </div>

      {/* GLOW EFFECT */}
      <div className="absolute -top-10 -right-10 w-32 h-32 bg-gray-100 rounded-full blur-3xl opacity-40"></div>
    </div>
  );
};

export default StatsCard;