import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs) {
    return twMerge(clsx(inputs));
}

export const arraysAreEqual = (arr1, arr2) => {
    if (arr1.length !== arr2.length) return false;

    return arr1.every((value, index) => value === arr2[index]);
};
