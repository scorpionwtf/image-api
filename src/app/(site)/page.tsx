"use client"
import Hero from '@/components/site/Hero';
import Showcase from '@/components/site/Showcase';
import Testimonials from '@/components/site/Testimonials';
import Logos from '@/components/site/Logos';
import Footer from '@/components/site/Footer';
import { useEffect, useState } from 'react';
import { Session } from "next-auth";
import FeaturesSection from '@/components/site/Features';
import PricingPage from '@/components/site/Pricing';

const fetchSession = async () => {
  const response = await fetch('/api/auth/session');
  if (response.ok) {
      return response.json();
  }
  return null;
};

const HomePage = () => {
  const [session, setSession] = useState<Session | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [selectedTab, setSelectedTab] = useState<'upscale' | 'reimagine'>('upscale');
  const [IsProSelected, setIsProSelected] = useState<number>(0);
  const [zoomLevel, setZoomLevel] = useState<number>(2);
  useEffect(() => {
    const getSession = async () => {
        try {
            const userSession = await fetchSession();
            setSession(userSession);
        } catch (err) {
            console.error('Error fetching session:', err);
            setError('Failed to fetch session');
        }
    };

    getSession();
}, []);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setSelectedFile(event.target.files[0]);
    }
  };

  return (
    <>
      <Hero 
        selectedTab={selectedTab} 
        setSelectedTab={setSelectedTab} 
        zoomLevel={zoomLevel} 
        setZoomLevel={setZoomLevel} 
        handleFileUpload={handleFileUpload}
        error={error}
        setError={setError}
        session={session}
        IsProSelected={IsProSelected}
        setIsProSelected={setIsProSelected}
      />
      
      <FeaturesSection />
      <Showcase />
      <PricingPage />
      <Testimonials />
      {/* <Logos /> */}
      <Footer />
    </>
  );
};

export default HomePage;
