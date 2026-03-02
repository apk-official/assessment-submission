import { CheckCircleIcon, FlagBannerFoldIcon, FlagBannerIcon, XCircleIcon } from "@phosphor-icons/react";

export default function InsightsCard() {
  const insights = [
    {
      positive_icon: <FlagBannerIcon weight="fill" size={30} color="#00a63e" />,
      negative_icon: <FlagBannerFoldIcon weight="fill" size={30} color="#ff6467" />,
      type: "Completion",
      message: "You have 2 questions remaining to complete this assessment.",
      positive: false,
    },
    {
      positive_icon: <CheckCircleIcon weight="fill" size={30} color="#00a63e" />,
      negative_icon: <XCircleIcon weight="fill" size={30} color="#ff6467" />,
      type: "Performance",
      message:
        "You demonstrate strong confidence in this element of teaching practice.",
      positive: true,
    },
  ];
  return (
    <div className="border h-full border-gray-300 dark:border-gray-700 rounded-xl p-4 flex flex-col gap-2">
      <h3 className="text-gray-800 dark:text-gray-100">Insights</h3>
      {insights.map((insight) => (
        <div
          key={insight.type}
          className="bg-neutral-100 dark:bg-neutral-800 rounded-lg p-2 w-fill flex items-start justify-between gap-2"
        >
          {insight.positive_icon}

          <div className="flex flex-col items-start justify-center">
            <p className="text-sm font-medium text-neutral-600 dark:text-neutral-300">{insight.type}</p>
            <p className="text-sm font-normal text-neutral-800 dark:text-neutral-100">{insight.message}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
