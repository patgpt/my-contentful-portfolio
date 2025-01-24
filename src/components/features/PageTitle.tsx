'use client';

import { motion } from 'framer-motion';
import React from 'react';

const PageTitle = ({ titleText }: { titleText: string }) => {
  return (
    <motion.h1
      initial={{ opacity: 0, y: -20, scale: 0.7 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.6, delay: 0.2 }}
      className="mb-12 text-center text-3xl font-bold tracking-tight md:mb-24 md:text-5xl">
      {titleText}
    </motion.h1>
  );
};

export default PageTitle;
