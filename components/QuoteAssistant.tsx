import React, { useState } from 'react';
import { generateFormattedQuote } from '../services/geminiService';
import { QuoteStatus } from '../types';
import { Button } from './Button';
import { MessageSquare, Copy, Check, Loader2, Sparkles } from 'lucide-react';

export const QuoteAssistant: React.FC = () => {
  const [inputs, setInputs] = useState({
    location: '',
    description: '',
    materials: '',
    access: ''
  });
  const [status, setStatus] = useState<QuoteStatus>(QuoteStatus.IDLE);
  const [result, setResult] = useState<string>('');
  const [copied, setCopied] = useState(false);

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus(QuoteStatus.GENERATING);
    try {
      const formatted = await generateFormattedQuote(inputs);
      setResult(formatted);
      setStatus(QuoteStatus.COMPLETE);
    } catch (error) {
      console.error(error);
      setStatus(QuoteStatus.ERROR);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(result);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSms = () => {
    const phoneNumber = "4072345863";
    const body = encodeURIComponent(result);
    window.location.href = `sms:${phoneNumber}?&body=${body}`;
  };

  return (
    <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6 md:p-8 max-w-2xl mx-auto shadow-2xl shadow-black/50">
      <div className="flex items-center gap-3 mb-6">
        <div className="bg-brand-yellow/10 p-2 rounded-lg">
          <Sparkles className="w-6 h-6 text-brand-yellow" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-white">Smart Text Builder</h2>
          <p className="text-gray-400 text-sm">Let AI format your request for the fastest response.</p>
        </div>
      </div>

      {status === QuoteStatus.IDLE || status === QuoteStatus.GENERATING || status === QuoteStatus.ERROR ? (
        <form onSubmit={handleGenerate} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-300">Location (City/Zip)</label>
              <input 
                required
                className="w-full bg-black border border-gray-700 rounded-lg p-3 text-white focus:ring-2 focus:ring-brand-yellow focus:border-transparent outline-none"
                placeholder="e.g. Spartanburg, 29301"
                value={inputs.location}
                onChange={(e) => setInputs({...inputs, location: e.target.value})}
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-300">Materials on site?</label>
              <input 
                className="w-full bg-black border border-gray-700 rounded-lg p-3 text-white focus:ring-2 focus:ring-brand-yellow focus:border-transparent outline-none"
                placeholder="e.g. Yes, I have the fan"
                value={inputs.materials}
                onChange={(e) => setInputs({...inputs, materials: e.target.value})}
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-300">What needs to be done?</label>
            <textarea 
              required
              rows={3}
              className="w-full bg-black border border-gray-700 rounded-lg p-3 text-white focus:ring-2 focus:ring-brand-yellow focus:border-transparent outline-none"
              placeholder="e.g. Need to replace a garbage disposal and hang a TV."
              value={inputs.description}
              onChange={(e) => setInputs({...inputs, description: e.target.value})}
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-300">Access Notes (Optional)</label>
            <input 
              className="w-full bg-black border border-gray-700 rounded-lg p-3 text-white focus:ring-2 focus:ring-brand-yellow focus:border-transparent outline-none"
              placeholder="e.g. Gate code is 1234, friendly dog in yard"
              value={inputs.access}
              onChange={(e) => setInputs({...inputs, access: e.target.value})}
            />
          </div>

          <Button 
            type="submit" 
            fullWidth 
            disabled={status === QuoteStatus.GENERATING}
          >
            {status === QuoteStatus.GENERATING ? (
              <span className="flex items-center gap-2">
                <Loader2 className="w-4 h-4 animate-spin" /> Preparing Text...
              </span>
            ) : "Generate Text Message"}
          </Button>
          
          {status === QuoteStatus.ERROR && (
             <p className="text-brand-red text-sm text-center">Something went wrong. Please try again.</p>
          )}
        </form>
      ) : (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
          <div className="bg-black border border-gray-800 rounded-lg p-4 relative">
            <pre className="text-gray-200 font-mono text-sm whitespace-pre-wrap font-sans">{result}</pre>
            <button 
              onClick={handleCopy}
              className="absolute top-2 right-2 p-2 hover:bg-gray-800 rounded-md transition-colors text-gray-400 hover:text-white"
              title="Copy to clipboard"
            >
              {copied ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
            </button>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-3">
            <Button onClick={handleSms} fullWidth className="flex items-center gap-2">
              <MessageSquare className="w-4 h-4" /> Open in Messages
            </Button>
            <Button variant="outline" onClick={() => setStatus(QuoteStatus.IDLE)} fullWidth>
              Start Over
            </Button>
          </div>
          <p className="text-center text-xs text-gray-500">
            Pressing "Open in Messages" will open your default SMS app with the text pre-filled.
          </p>
        </div>
      )}
    </div>
  );
};