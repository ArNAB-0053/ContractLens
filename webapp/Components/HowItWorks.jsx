import { Upload, Search, FileCheck } from 'lucide-react'

const steps = [
  {
    icon: <Upload className="h-12 w-12 text-gray-800" />,
    title: "Upload Contracts",
    description: "Drag and drop or browse your PDF documents to start."
  },
  {
    icon: <Search className="h-12 w-12 text-gray-800" />,
    title: "Analyze & Compare",
    description: "Identify similarities, highlight changes, and discover unique content effortlessly."
  },
  {
    icon: <FileCheck className="h-12 w-12 text-gray-800" />,
    title: "Get Insights",
    description: "Access detailed reports for easy understanding and better decisions."
  }
]

export default function HowItWorks() {
  return (
    (<section className="py-20">
      <div className="container mx-auto px-6">
        <h2
          className="text-3xl md:text-4xl font-bold text-center mb-16 text-gray-900">How ContractLens Works</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {steps.map((step, index) => (
            <div key={index} className="flex flex-col items-center text-center">
              <div className="mb-6">
                {step.icon}
              </div>
              <h3 className="text-xl font-semibold mb-4 text-gray-800">{step.title}</h3>
              <p className="text-gray-600">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>)
  );
}

