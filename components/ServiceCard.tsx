import React from 'react';
import { ServiceItem } from '../types';

interface ServiceCardProps {
  service: ServiceItem;
}

export const ServiceCard: React.FC<ServiceCardProps> = ({ service }) => {
  const Icon = service.icon;
  return (
    <div className="bg-brand-gray p-6 rounded-xl border border-gray-800 hover:border-brand-yellow/50 transition-colors group">
      <div className="w-12 h-12 bg-gray-900 rounded-lg flex items-center justify-center mb-4 group-hover:bg-brand-yellow transition-colors">
        <Icon className="w-6 h-6 text-brand-yellow group-hover:text-black transition-colors" />
      </div>
      <h3 className="text-xl font-bold text-white mb-2">{service.title}</h3>
      <p className="text-gray-400">{service.description}</p>
    </div>
  );
};