import { CheckCircle } from 'lucide-react'

const features = [
  "Advanced contract comparison",
  "Automated change detection",
  "Intelligent similarity analysis",
  "Customizable report generation",
  "Secure document handling",
  "Integration with popular legal tools"
]

export default function Features() {
  return (
    (<section className="py-20 ">
      <div className="container mx-auto px-6">
        <h2
          className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-900">
          Powerful Features for Legal Professionals
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="flex items-start">
              <CheckCircle className="h-6 w-6 text-green-500 mr-3 flex-shrink-0" />
              <p className="text-lg text-gray-700">{feature}</p>
            </div>
          ))}
        </div>
      </div>
    </section>)
  );
}

