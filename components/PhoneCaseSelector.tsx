'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import React from 'react';
import Link from 'next/link';
import { Button } from './ui/button';
import { PhoneBrand, PhoneModel } from '@/types';

const config = require('@/next.config');

const phoneTypes: {
  id: number;
  name: string;
  brand: PhoneBrand;
  model: PhoneModel;
  description: string;
  image: string;
}[] = [
  {
    id: 1,
    name: 'Iphone 13',
    brand: 'iphone',
    model: '13',
    description: 'Iphone 13, Iphone 13 mini',
    image: '/images/phone-case-1.png',
  },
  {
    id: 2,
    name: 'Iphone 16',
    brand: 'iphone',
    model: '16',
    description: 'Iphone 16, Iphone 16 plus',
    image: '/images/phone-case-2.png',
  },
  {
    id: 3,
    name: 'Iphone 15 pro',
    brand: 'iphone',
    model: '15pro',
    description: 'Iphone 15 pro - Iphone 16 pro max',
    image: '/images/phone-case-3.png',
  },
  {
    id: 4,
    name: 'Iphone 14 Pro Max',
    brand: 'iphone',
    model: '14pro',
    description: 'Iphone 14 Pro, Iphone 14 Pro Max',
    image: '/images/phone-case-4.png',
  },
];

export const PhoneCaseSelector = () => {
  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">
          <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Select phone case type to get started
          </span>
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {phoneTypes.map((phone, index) => (
            <motion.div
              key={phone.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="group bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 p-6 border border-gray-200 dark:border-gray-700 hover:border-blue-600 dark:hover:border-purple-600"
            >
              <div className="relative w-full h-64 mb-4 group-hover:scale-105 transition-transform duration-300">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600/5 to-purple-600/5 rounded-lg" />
                <Image
                  src={config.basePath + phone.image}
                  alt={phone.name}
                  fill
                  className="object-contain"
                />
              </div>
              <h3 className="text-lg font-semibold mb-2 dark:text-white">
                {phone.name}
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
                {phone.description}
              </p>
              <Link href={`/editor?brand=${phone.brand}&model=${phone.model}`}>
                <Button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white transition-colors duration-300">
                  Select
                </Button>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
