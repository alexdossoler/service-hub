import { QuoteRequest } from '../types';

// Local formatter - no API key needed, instant, free
const formatQuoteLocally = (request: QuoteRequest): string => {
  const lines = [
    `📍 Location: ${request.location || 'Not specified'}`,
    `🔧 Job: ${request.description || 'Not specified'}`,
    `📦 Materials On-site: ${request.materials || 'Not specified'}`,
    `🚪 Access Notes: ${request.access || 'N/A'}`,
    '',
    'Thanks! I can send photos if needed.'
  ];
  return lines.join('\n');
};

export const generateFormattedQuote = async (request: QuoteRequest): Promise<string> => {
  // Use local formatting - fast, free, always works
  return formatQuoteLocally(request);
};