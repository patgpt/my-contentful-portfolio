import React from 'react';

export default function Hero() {
  return (
    <div className="hero min-h-[60vh] bg-base-200">
      <div className="hero-content text-center">
        <div className="max-w-2xl">
          <h1 className="text-5xl font-bold">Hey, I&apos;m John Doe 👋</h1>
          <p className="py-6">
            A passionate full-stack developer specialized in building exceptional digital
            experiences. Currently focused on building accessible, human-centered products.
          </p>
          <a href="#contact" className="btn btn-primary">
            Let&apos;s Connect
          </a>
        </div>
      </div>
    </div>
  );
}

export { Hero };
