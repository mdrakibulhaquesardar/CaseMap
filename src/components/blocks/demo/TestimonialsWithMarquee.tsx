import { TestimonialsSection } from "@/components/blocks/TestimonialsWithMarquee"

const testimonials = [
  {
    author: {
      name: "Anisur Rahman",
      handle: "@anis_advocate",
      avatar: "https://i.pravatar.cc/150?u=a042581f4e29026704a",
    },
    text: "Odhikar has been a game-changer for tracking my cases. The timeline view is incredibly intuitive and keeps me updated.",
    href: "#",
  },
  {
    author: {
      name: "Salma Akhtar",
      handle: "@salma_legal",
      avatar: "https://i.pravatar.cc/150?u=a042581f4e29026704b",
    },
    text: "The AI document summarizer saved me hours of reading. It breaks down complex legal jargon into simple, understandable Bangla.",
    href: "#",
  },
  {
    author: {
      name: "Karim Khan",
      handle: "@karim_k",
      avatar: "https://i.pravatar.cc/150?u=a042581f4e29026704c",
    },
    text: "As a student, the Community Q&A is an invaluable resource. I get answers from both AI and experienced professionals.",
  },
]

export function TestimonialsSectionDemo() {
  return (
    <TestimonialsSection
      title="What our users are saying"
      description="Join thousands of citizens and legal professionals who are simplifying their legal journey with Odhikar."
      testimonials={testimonials}
    />
  )
}
