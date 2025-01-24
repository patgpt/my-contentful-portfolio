import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * A utility function to merge Tailwind CSS classes with clsx.
 * @param inputs - The Tailwind CSS classes to merge.
 * @returns The merged Tailwind CSS classes.
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
