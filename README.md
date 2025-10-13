# CaseMap আইনি সহকারী

CaseMap is an AI-powered legal assistance platform designed specifically for Bangladesh, providing comprehensive legal support in Bengali language. The platform combines artificial intelligence with community-driven legal knowledge to help users navigate complex legal matters.

## 🌟 Features

### Core Functionality
- **Case Timeline Visualization** - Track case progress with visual timelines
- **AI Legal Document Summarizer** - Upload legal documents and get simplified Bengali summaries powered by Google Gemini
- **Legal Aid Center Locator** - Find nearby legal aid centers and NGOs on an interactive map
- **Community Legal Q&A** - Ask legal questions and get AI-assisted answers from the community
- **Profile & Saved Cases** - Save cases and FAQs for future reference using local storage
- **Legal Tool Recommendations** - Get personalized tool suggestions based on your legal needs

### AI-Powered Features
- **Document Summarization** - Complex legal documents simplified in Bengali
- **Legal Question Answering** - AI-powered responses to legal queries
- **Smart Recommendations** - Intelligent tool suggestions based on user context

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn
- Firebase project (for deployment)

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd CaseMap
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env.local
```
Add your Google AI API key and Firebase configuration to `.env.local`.

4. Run the development server:
```bash
npm run dev
```

5. Open [http://localhost:9002](http://localhost:9002) in your browser.

### Available Scripts

- `npm run dev` - Start development server with Turbopack
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run typecheck` - Run TypeScript type checking
- `npm run genkit:dev` - Start Genkit AI development server
- `npm run genkit:watch` - Start Genkit with file watching

## 🛠️ Tech Stack

- **Framework**: Next.js 15.3.3 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: Radix UI + shadcn/ui
- **AI Integration**: Google Genkit with Gemini API
- **Icons**: Lucide React
- **Forms**: React Hook Form with Zod validation
- **Charts**: Recharts
- **Deployment**: Firebase Hosting

## 📁 Project Structure

```
src/
├── app/                    # Next.js app router pages
│   ├── about/             # About page
│   ├── faq/               # FAQ and Q&A section
│   ├── law-finder/        # Legal aid center locator
│   ├── legal-aid/         # Legal aid information
│   ├── profile/           # User profile and saved cases
│   ├── summarizer/        # AI document summarizer
│   └── timeline/          # Case timeline visualization
├── ai/                    # AI flows and Genkit configuration
│   ├── flows/             # Individual AI workflows
│   └── genkit.ts          # Genkit setup
├── components/            # Reusable UI components
│   ├── blocks/            # Page-specific components
│   ├── icons/             # Custom icons
│   ├── layout/            # Layout components
│   └── ui/                # Base UI components
├── hooks/                 # Custom React hooks
├── lib/                   # Utility functions and data
└── types/                 # TypeScript type definitions
```

## 🎨 Design System

- **Primary Color**: #4A90E2 (Trust Blue)
- **Background**: #F5F5F5 (Light Gray)
- **Accent Color**: #E29A4A (Warm Orange)
- **Typography**: Inter (body) + SolaimanLipi (Bengali headlines)
- **Design**: Mobile-first, card-based, minimalist approach

## 🌐 Localization

The platform is fully localized for Bangladesh with:
- Bengali language support
- Local legal terminology
- Bangladesh-specific legal information
- Cultural context in UI/UX design

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🆘 Support

For support and questions:
- Check the FAQ section in the app
- Open an issue on GitHub
- Contact the development team

## 🔮 Roadmap

- [ ] Multi-language support
- [ ] Advanced case analytics
- [ ] Integration with Bangladesh court systems
- [ ] Mobile app development
- [ ] Lawyer directory and booking system
