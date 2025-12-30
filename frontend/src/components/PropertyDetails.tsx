import { ArrowLeft, BrainCircuit, CheckCircle, AlertTriangle, TrendingUp } from 'lucide-react';
import PriceComparisonChart from './PriceComparisonChart';

type Props = {
  property: any;
  loadingAI: boolean;
  onAnalyze: () => void;
  onBack: () => void;
};

export default function PropertyDetails({ property, loadingAI, onAnalyze, onBack }: Props) {
  if (!property) return null;

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-300">
    
      <div className="flex items-center gap-4 mb-8">
        <button 
          onClick={onBack}
          className="p-2 rounded-full hover:bg-white hover:shadow-sm text-slate-500 transition-all"
        >
          <ArrowLeft className="h-5 w-5" />
        </button>
        <div>
          <h1 className="text-2xl font-bold text-slate-900">{property.title}</h1>
          <p className="text-slate-500">{property.location}</p>
        </div>
        <div className="ml-auto flex items-center gap-4">
             <div className="text-right">
                <p className="text-xs text-slate-400 font-medium uppercase tracking-wider">Asking Price</p>
                <p className="text-2xl font-bold text-slate-900">₹{property.price.toLocaleString()}</p>
             </div>
             <button
              onClick={onAnalyze}
              disabled={loadingAI}
              className="flex items-center gap-2 bg-indigo-600 text-white px-5 py-2.5 rounded-lg font-medium hover:bg-indigo-700 disabled:opacity-70 shadow-lg shadow-indigo-200 transition-all"
            >
              {loadingAI ? (
                <>Analyzing...</>
              ) : (
                <>
                  <BrainCircuit className="h-4 w-4" /> Run AI Analysis
                </>
              )}
            </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
       
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
             <div className="flex items-center gap-2 mb-4">
                <BrainCircuit className="h-5 w-5 text-indigo-600" />
                <h2 className="text-lg font-bold text-slate-900">AI Valuation Report</h2>
             </div>
             
             {!property.aiAnalysis ? (
                 <div className="text-center py-12 bg-slate-50 rounded-lg border border-dashed border-slate-300">
                    <p className="text-slate-500">Run the analysis to generate valuation insights.</p>
                 </div>
             ) : (
                <div className="space-y-6">
                    <div className="bg-indigo-50/50 p-4 rounded-lg border border-indigo-100">
                         <p className="text-slate-700 leading-relaxed text-sm">
                            {property.aiAnalysis.summary}
                         </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="border border-emerald-100 bg-emerald-50/30 rounded-lg p-4">
                            <h3 className="flex items-center gap-2 font-semibold text-emerald-800 mb-3 text-sm">
                                <CheckCircle className="h-4 w-4" /> Key Strengths
                            </h3>
                            <ul className="space-y-2">
                                {property.aiAnalysis.pros?.map((item: string, i: number) => (
                                    <li key={i} className="text-sm text-slate-700 flex items-start gap-2">
                                        <span className="block w-1 h-1 mt-1.5 rounded-full bg-emerald-500" />
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className="border border-amber-100 bg-amber-50/30 rounded-lg p-4">
                            <h3 className="flex items-center gap-2 font-semibold text-amber-800 mb-3 text-sm">
                                <AlertTriangle className="h-4 w-4" /> Risk Factors
                            </h3>
                            <ul className="space-y-2">
                                {property.aiAnalysis.cons?.map((item: string, i: number) => (
                                    <li key={i} className="text-sm text-slate-700 flex items-start gap-2">
                                        <span className="block w-1 h-1 mt-1.5 rounded-full bg-amber-500" />
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
             )}
          </div>
        </div>

        
        <div className="space-y-6">
             {property.aiAnalysis && (
                 <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
                    <div className="flex items-center gap-2 mb-4">
                        <TrendingUp className="h-5 w-5 text-indigo-600" />
                        <h2 className="text-lg font-bold text-slate-900">Price Verdict</h2>
                    </div>
                    <PriceComparisonChart property={property} />
                 </div>
             )}

             <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
                 <h3 className="font-semibold text-slate-900 mb-4">Property Specs</h3>
                 <div className="space-y-3">
                    <div className="flex justify-between text-sm py-2 border-b border-slate-100">
                        <span className="text-slate-500">Size</span>
                        <span className="font-medium">{property.size} sqft</span>
                    </div>
                    <div className="flex justify-between text-sm py-2 border-b border-slate-100">
                        <span className="text-slate-500">Bedrooms</span>
                        <span className="font-medium">{property.bedrooms}</span>
                    </div>
                    <div className="flex justify-between text-sm py-2 border-b border-slate-100">
                        <span className="text-slate-500">Bathrooms</span>
                        <span className="font-medium">{property.bathrooms}</span>
                    </div>
                    <div className="flex justify-between text-sm py-2">
                        <span className="text-slate-500">Price/Sqft</span>
                        <span className="font-medium">₹{Math.round(property.price / property.size).toLocaleString()}</span>
                    </div>
                 </div>
             </div>
        </div>
      </div>
    </div>
  );
}