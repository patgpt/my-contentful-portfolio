/*
 * Copyright (c) 2025.
 * Patrick Kelly.
 */
'use client';
'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Image from 'next/image';

const ParallaxBanner = ({ src, alt }: { src: string; alt: string }) => {
  const ref = useRef<HTMLDivElement>(null);

  // Track the scroll progress relative to the container
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'], // Start parallax when element enters viewport
  });

  // Transform the vertical position of the image
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '40%']); // Move image up by 30% of its height

  return (
    <div ref={ref} className="relative h-[500px] w-full overflow-hidden bg-gray-100">
      <motion.div style={{ y }} className="absolute inset-0">
        <Image src={src} alt={alt} fill className="object-cover object-center" />
      </motion.div>
    </div>
  );
};

export default ParallaxBanner;
