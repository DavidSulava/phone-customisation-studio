import React from 'react';

export const ResizeControl = () => {
  return <div className="w-4 h-4 bg-gray-500 dark:bg-gray-300 rounded-full" />;
};

export const ResizeControlTop = () => {
  return (
    <div className="w-6 h-1 bg-gray-500 dark:bg-gray-300 rounded-sm mx-auto" />
  );
};

export const ResizeControlBottom = () => {
  return (
    <div className="w-6 h-1 bg-gray-500 dark:bg-gray-300 rounded-sm mx-auto my-1.5" />
  );
};

export const ResizeControlLeft = () => {
  return (
    <div className="absolute w-1 h-6 left-0 bg-gray-500 dark:bg-gray-300 rounded-sm top-1/2 -translate-y-1/2" />
  );
};

export const ResizeControlRight = () => {
  return (
    <div className="absolute w-1 h-6 right-0 bg-gray-500 dark:bg-gray-300 rounded-sm top-1/2 -translate-y-1/2" />
  );
};
