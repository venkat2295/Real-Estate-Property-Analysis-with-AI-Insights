import { MapPin, BedDouble, Bath, Square, Sparkles, Edit, Trash } from 'lucide-react';

type Props = {
  property: any;
  onClick: () => void;
  onEdit?: (property: any) => void;
  onDelete?: (id: string) => void;
};

export default function PropertyCard({ property, onClick, onEdit, onDelete }: Props) {
  const isAnalyzed = !!property.aiAnalysis;

  return (
    <div 
      onClick={onClick}
      className="group bg-white rounded-xl border border-slate-200 overflow-hidden hover:shadow-xl hover:border-indigo-100 transition-all duration-300 cursor-pointer flex flex-col"
    >
      <div className="h-40 bg-slate-100 relative">
       
        <div className="absolute inset-0 flex items-center justify-center text-slate-300">
           <MapPin className="h-12 w-12 opacity-20" />
        </div>
        
        {isAnalyzed && (
          <div className="absolute top-3 right-3 bg-white/90 backdrop-blur px-2 py-1 rounded-full text-xs font-semibold text-indigo-600 flex items-center gap-1 shadow-sm">
            <Sparkles className="h-3 w-3" /> AI Analyzed
          </div>
        )}
      </div>

      <div className="p-5 flex-1 flex flex-col">
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-semibold text-lg text-slate-900 line-clamp-1 group-hover:text-indigo-600 transition-colors">
            {property.title}
          </h3>
        </div>
        
        <div className="flex items-center text-slate-500 text-sm mb-4">
          <MapPin className="h-3.5 w-3.5 mr-1" />
          <span className="line-clamp-1">{property.location}</span>
        </div>

        <div className="grid grid-cols-3 gap-2 py-3 border-t border-slate-100 text-xs text-slate-600">
          <div className="flex flex-col items-center">
            <BedDouble className="h-4 w-4 mb-1 text-slate-400" />
            {property.bedrooms} Beds
          </div>
          <div className="flex flex-col items-center border-l border-slate-100">
            <Bath className="h-4 w-4 mb-1 text-slate-400" />
            {property.bathrooms} Baths
          </div>
          <div className="flex flex-col items-center border-l border-slate-100">
            <Square className="h-4 w-4 mb-1 text-slate-400" />
            {property.size} sqft
          </div>
        </div>

        <div className="mt-auto pt-4 flex items-center justify-between">
            <div>
                <p className="text-xs text-slate-400">Listed Price</p>
                <p className="text-lg font-bold text-slate-900">₹{property.price.toLocaleString()}</p>
            </div>
            {(onEdit || onDelete) && (
              <div className="flex gap-2">
                 {onEdit && (
                  <button 
                    onClick={(e) => { e.stopPropagation(); onEdit(property); }}
                    className="p-2 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-full transition-colors"
                  >
                    <Edit className="h-4 w-4" />
                  </button>
                 )}
                 {onDelete && (
                  <button 
                    onClick={(e) => { e.stopPropagation(); onDelete(property._id); }}
                    className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-full transition-colors"
                  >
                    <Trash className="h-4 w-4" />
                  </button>
                 )}
              </div>
            )}
        </div>
      </div>
    </div>
  );
}