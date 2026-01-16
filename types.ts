// Fix: Import React to support React.ElementType usage
import React from 'react';

export interface ServiceItem {
  id: string;
  title: string;
  icon: React.ElementType;
  description: string;
}

export enum QuoteStatus {
  IDLE = 'IDLE',
  GENERATING = 'GENERATING',
  COMPLETE = 'COMPLETE',
  ERROR = 'ERROR'
}

export interface QuoteRequest {
  location: string;
  description: string;
  materials: string;
  access: string;
}