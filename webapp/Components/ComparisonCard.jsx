import { FileText } from "lucide-react";

const ComparisonCard = ({ pair }) => {
  const similarity = (pair.similarity * 100).toFixed(1);

  return (
    <div className="mb-8 last:mb-0">
      <div className="flex items-center justify-center mb-4">
        <div className="px-6 py-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full text-white shadow-lg">
          {similarity}% Similar
        </div>
      </div>
      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-blue-50 p-6 rounded-xl border border-blue-100">
          <h3 className="text-blue-800 text-sm font-medium mb-3">
            Paragraph {pair.paragraph_no_1}
          </h3>
          <div className="flex space-x-2 mb-4">
            {pair.clause_types_1?.map((clause, index) => (
              <p
                key={index}
                className="text-xs text-blue-600 font-semibold rounded-full text-center py-1 px-2 bg-blue-100"
              >
                {clause}
              </p>
            ))}
          </div>

          <div
            className="prose prose-sm max-w-none"
            dangerouslySetInnerHTML={{ __html: pair.paragraph_text_1 }}
          />
        </div>
        <div className="bg-purple-50 p-6 rounded-xl border border-purple-100">
          <h3 className="text-purple-800 text-sm font-medium mb-3">
            Paragraph {pair.paragraph_no_2}
          </h3>
          <div className="flex space-x-2 mb-4">
            {pair.clause_types_2?.map((clause, index) => (
              <p
                key={index}
                className="text-xs text-blue-600 font-semibold rounded-full text-center py-1 px-2 bg-blue-100"
              >
                {clause}
              </p>
            ))}
          </div>
          <div
            className="prose prose-sm max-w-none"
            dangerouslySetInnerHTML={{ __html: pair.paragraph_text_2 }}
          />
        </div>
      </div>
    </div>
  );
};

export default ComparisonCard;
