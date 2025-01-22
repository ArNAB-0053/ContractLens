
import Hero from '@/components/Hero'
import Features from '@/components/Features'
import HowItWorks from '@/components/HowItWorks'
import Footer from '@/components/Footer'
import Header from '@/Components/Header';
import VideoSection from '@/Components/VideoSection';

export default function Home() {
  return (
    (<div className="flex flex-col min-h-screen bg-white w-full">
      
      <main className='lg:px-40 select-none'> 
        <Hero />
        <VideoSection/>
        <Features />
        <HowItWorks />
      </main>
      
    </div>)
  );
}

