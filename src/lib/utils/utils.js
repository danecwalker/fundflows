/**
 * cm - Class Merge
 * @description Merge multiple class names into one
 * @param {string[]} classes - The class names to merge
 * @returns {string} - The merged class names
 */

export const cm = (...classes) => classes.join(' ');