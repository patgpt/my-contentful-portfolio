'use client';
import Link from 'next/link';
import React from 'react';

import SocialButtonRow from '@src/components/SocialButtonRow';

export default function Hero() {
  return (
    <div className="hero min-h-[60vh] bg-base-200">
      <div className="hero-content flex flex-col justify-center text-center">
        <div className="max-w-2xl">
          <h1 className="text-5xl font-bold">Hey, I&apos;m John Doe 👋</h1>
          <p className="py-6">
            A passionate full-stack developer specialized in building exceptional digital
            experiences. Currently focused on building accessible, human-centered products.
          </p>
          <h2 className="text-2xl">Let&apos;s Connect</h2>
        </div>
        <SocialButtonRow />
      </div>
    </div>
  );
}

export { Hero };
