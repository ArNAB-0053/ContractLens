import Image from "next/image"

const testimonials = [
  {
    name: "Sarah Johnson",
    role: "Legal Counsel, TechCorp",
    content: "ContractLens has revolutionized our contract review process. It's saved us countless hours and improved our accuracy.",
    avatar: "/placeholder.svg?height=100&width=100"
  },
  {
    name: "Michael Chen",
    role: "CEO, StartUp Inc.",
    content: "As a startup, efficiency is key. ContractLens helps us manage our agreements with precision and speed.",
    avatar: "/placeholder.svg?height=100&width=100"
  },
  {
    name: "Emily Rodriguez",
    role: "Paralegal, Law Firm LLP",
    content: "The insights provided by ContractLens are invaluable. It's like having an extra team member dedicated to contract analysis.",
    avatar: "/placeholder.svg?height=100&width=100"
  }
]

export default function Testimonials() {
  return (
    (<section className="py-24 bg-gray-50">
      <div className="container mx-auto px-6">
        <h2 className="text-4xl font-bold text-center mb-16 text-gray-800">What Our Clients Say</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="bg-white rounded-lg shadow-lg p-8">
              <div className="flex items-center mb-4">
                <Image
                  src={testimonial.avatar || "/placeholder.svg"}
                  alt={testimonial.name}
                  width={50}
                  height={50}
                  className="rounded-full mr-4" />
                <div>
                  <h3 className="font-semibold text-lg">{testimonial.name}</h3>
                  <p className="text-gray-600">{testimonial.role}</p>
                </div>
              </div>
              <p className="text-gray-700 italic">"{testimonial.content}"</p>
            </div>
          ))}
        </div>
      </div>
    </section>)
  );
}

