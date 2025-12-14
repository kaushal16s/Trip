import React, { useState } from 'react';
import TripForm from './TripForm';

const Hero = ({ onGenerate }) => {
  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden py-20 px-4">

      {/* Background Ambience */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-purple-900/20 rounded-full blur-[120px] animate-float"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-blue-900/20 rounded-full blur-[120px] animate-float" style={{ animationDelay: '2s' }}></div>
      </div>

      <div className="container mx-auto max-w-6xl relative z-10 grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">

        {/* Left: Text Content */}
        <div className="text-left space-y-6 lg:space-y-8 animate-fade-in-up">
          <div className="inline-block px-4 py-1.5 rounded-full border border-[var(--color-accent)]/30 bg-[var(--color-accent)]/10">
            <span className="text-[var(--color-accent)] font-medium text-xs md:text-sm tracking-wider uppercase">
              AI-Powered Travel Architect
            </span>
          </div>

          <h1 className="text-4xl md:text-7xl font-heading font-bold leading-tight text-transparent bg-clip-text bg-gradient-to-r from-white via-blue-100 to-blue-200 drop-shadow-sm">
            Design your <br />
            <span className="italic text-[var(--color-accent)]">perfect journey</span>
          </h1>

          <p className="text-lg md:text-xl text-[var(--color-text-muted)] max-w-xl leading-relaxed">
            Say goodbye to generic plans. Our AI crafts hyper-personalized itineraries based on your budget, vibe, and travel style.
          </p>

          <div className="flex gap-4 pt-4">
            <div className="flex -space-x-4">
              {[1, 2, 3].map(i => (
                <div key={i} className="w-10 h-10 rounded-full border-2 border-[var(--color-bg-dark)] bg-gray-700 overflow-hidden">
                  <img src={`https://i.pravatar.cc/100?img=${i + 10}`} alt="User" />
                </div>
              ))}
            </div>
            <div className="flex flex-col justify-center">
              <span className="text-sm font-bold text-white">1000+ Trips Planned</span>
              <span className="text-xs text-[var(--color-text-muted)]">Join the community</span>
            </div>
          </div>
        </div>

        {/* Right: Glass Form */}
        <div className="relative animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-3xl blur-2xl opacity-20 transform rotate-3"></div>
          <TripForm onSubmit={onGenerate} />
        </div>
      </div>
    </div>
  );
};

export default Hero;
