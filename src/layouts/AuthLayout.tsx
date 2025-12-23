import React, { useState, useEffect } from 'react';
import authFlow1 from '../assets/auth-flow.webp'
import authFlow2 from '../assets/auth-flow-2.webp'
import authFlow3 from '../assets/auth-flow-3.webp'

interface AuthLayoutProps {
  children: React.ReactNode;
}

const AuthLayout = ({ children }: AuthLayoutProps) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  
 const slides = [
  { url: authFlow1 },
  { url: authFlow2 },
  { url: authFlow3 },
]

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    }, 5000);
    return () => clearInterval(timer);
  }, [slides.length]);

  return (
    <div className="min-h-screen w-full bg-[#F5F5F5] flex items-center justify-center p-4 md:p-8 font-sans">
      <div className="bg-white w-full max-w-6xl rounded-[2.5rem] shadow-2xl overflow-hidden flex flex-col md:flex-row min-h-auto">
        
        {/* Left Side: Form Content Area */}
        <div className="w-full md:w-1/2 p-8 md:p-16 flex flex-col justify-center bg-white">
          {children}
        </div>

        {/* Right Side: Visual Carousel */}
        <div className="hidden md:block w-1/2 p-6 bg-white">
          <div className="relative h-full w-full rounded-4xl overflow-hidden group">
            {slides.map((slide, index) => (
              <div
                key={index}
                className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                  index === currentSlide ? 'opacity-100' : 'opacity-0'
                }`}
              >
                <img 
                  src={slide.url} 
                  alt="Agriculture" 
                  className="w-full h-full object-cover"
                />
                {/* Purple Gradient Overlay */}
                <div className="absolute inset-0 bg-linear-to-t from-[#6B21A8]/90 via-transparent to-transparent flex flex-col justify-end p-12">
                  <h2 className="text-white text-3xl font-bold leading-tight max-w-sm mb-6">
                    
                  </h2>
                  
                  {/* Indicators */}
                  <div className="flex space-x-2">
                    {slides.map((_, dotIndex) => (
                      <div 
                        key={dotIndex}
                        className={`h-1.5 rounded-full transition-all duration-300 ${
                          dotIndex === currentSlide ? 'w-10 bg-white' : 'w-4 bg-white/40'
                        }`}
                      />
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;