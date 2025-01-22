import type { NextFontWithVariable } from 'next/dist/compiled/@next/font';
import { Noto_Sans, Noto_Serif, Quicksand } from 'next/font/google';

const fontSerif = Noto_Serif({ subsets: ['latin'], variable: '--font-serif' });
const fontSans = Noto_Sans({ subsets: ['latin'], variable: '--font-sans' });
const fontDisplay = Quicksand({ subsets: ['latin'], variable: '--font-display' });

type FontKeys = 'fontDisplay' | 'fontSans' | 'fontSerif';
export const fonts: Record<FontKeys, NextFontWithVariable> = {
  fontDisplay,
  fontSans,
  fontSerif,
};
