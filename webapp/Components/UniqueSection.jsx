import { cn } from "@/lib/utils";
import { AlertCircle } from "lucide-react";

const UniqueContent = ({ para, type }) => {
  const colors = {
    1: {
      bg: "bg-red-50",
      border: "border-red-100",
      text: "text-red-800",
      accent: "bg-red-500",
    },
    2: {
      bg: "bg-green-50",
      border: "border-green-100",
      text: "text-green-800",
      accent: "bg-green-500",
    },
  };

  const classes = cn(
    "text-sm px-4 py-2 mb-4 text-gray-700 rounded-full w-28 text-center",
    para.paragraph_no === 1 ? "bg-black" : '',
    para.paragraph_no === 2 ? 'bg-green-200' : ''
  );

  // console.log(para);

  return (
    <div
      className={`group relative ${colors[type].bg} p-6 rounded-xl border ${colors[type].border} transition-all duration-300 hover:shadow-lg`}
    >
      <div className="absolute -left-2 top-1/2 -translate-y-1/2 w-1 h-[80%] rounded-full bg-gradient-to-b from-transparent via-red-500 to-transparent opacity-50 group-hover:opacity-100 transition-opacity" />
      <h4
        className={`${colors[type].text} text-sm font-medium mb-3 flex items-center`}
      >
        <AlertCircle className="w-4 h-4 mr-2" />
        Paragraph {para.paragraph_no}
      </h4>

      <div className="flex space-x-2 mb-4">
        {para.clause_types?.map((clause, index) => (
          <p
            className={cn(
              "text-xs py-1 mb-4 font-semibold rounded-full w-24 text-center",
              type === 1 && "bg-orange-100 text-orange-700",
              type === 2 && "bg-green-100 text-green-700"
            )}
          >
            {clause}
          </p>
        ))}
      </div>

      <div
        className="prose prose-sm max-w-none"
        dangerouslySetInnerHTML={{ __html: para.paragraph_text }}
      />
      <div className="absolute top-2 right-2">
        <span
          className={`${colors[type].accent} text-white text-xs px-2 py-1 rounded-full`}
        >
          Unique Content
        </span>
      </div>
    </div>
  );
};

export default UniqueContent;
