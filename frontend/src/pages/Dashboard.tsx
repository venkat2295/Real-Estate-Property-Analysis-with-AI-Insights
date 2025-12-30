import { useEffect, useState } from 'react';
import {
  getProperties,
  getProperty,
  analyzeProperty,
  deleteProperty,
} from '../services/api';
import { Plus, LayoutDashboard } from 'lucide-react';

import PropertyCard from '../components/PropertyCard';
import PropertyFormModal from '../components/PropertyFormModal';
import PropertyDetails from '../components/PropertyDetails';


export default function Dashboard() {
  const [view, setView] = useState<'list' | 'detail'>('list');
  const [properties, setProperties] = useState<any[]>([]);
  const [selected, setSelected] = useState<any>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingProperty, setEditingProperty] = useState<any>(null);
 const [loadingAI, setLoadingAI] = useState(false);
 
  const load = async () => {
    const res = await getProperties();
    setProperties(res.data.data);
  };

  const handleSelect = async (id: string) => {
    try {
    const res = await getProperty(id);
    setSelected(res.data.data);
    setView('detail');
  } catch (err) {
    console.error('Failed to fetch property', err);
  }
  };

  const runAI = async (id: string) => {
    try{
      setLoadingAI(true);
    const res = await analyzeProperty(id);
    setSelected(res.data.data);
    load();}
    finally{
      setLoadingAI(false);
    }
  };

  const handleEdit = (property: any) => {
    setEditingProperty(property);
    setIsFormOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this property?')) {
        try {
            await deleteProperty(id);
            load();
        } catch (err) {
            console.error('Failed to delete', err);
        }
    }
  };

  useEffect(() => {
    load();
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900">
      <nav className="bg-white border-b border-slate-200 sticky top-0 z-30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
           <div className="flex items-center gap-2 cursor-pointer" onClick={() => setView('list')}>
            <div className='bg-indigo-600 p-2 rounded-lg'>
               <LayoutDashboard className='h-5 w-5 text-white' />
            </div>
            <span className="font-bold text-xl tracking-tight text-slate-800">
                  Property<span className="text-indigo-600">AI</span>
            </span>
            </div>
     {view == 'list'&&(
      <button
       onClick={() => { setEditingProperty(null); setIsFormOpen(true); }}
       className="flex items-center gap-2 bg-slate-900 hover:bg-slate-800 text-white px-4 py-2 rounded-lg text-sm font-medium transition-all shadow-sm"
      >
        <Plus className='h-4 w-4'/>
        Add Property
        </button>
      
      )}
      </div>
      </div>
      </nav>
      <main className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8'>
        {view === 'list' ? (
          <>
            <div className="mb-6">
              <h1 className="text-2xl font-bold text-slate-900">Market Overview</h1>
              <p className="text-slate-500">Manage and analyze your real estate portfolio.</p>
            </div>
            
            {properties.length === 0 ? (
              <div className="text-center py-20 bg-white rounded-xl border border-dashed border-slate-300">
                <p className="text-slate-500 mb-4">No properties found.</p>
                <button onClick={() => setIsFormOpen(true)} className="text-indigo-600 font-medium hover:underline">
                  Add your first property
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {properties.map((p) => (
                  <PropertyCard 
                    key={p._id} 
                    property={p} 
                    onClick={() => handleSelect(p._id)} 
                    onEdit={handleEdit}
                    onDelete={handleDelete}
                  />
                ))}
              </div>
            )}
          </>
        ) : (
          <PropertyDetails 
            property={selected} 
            loadingAI={loadingAI} 
            onAnalyze={() => runAI(selected._id)}
            onBack={() => setView('list')}
          />
        )}
      </main>
      {isFormOpen && (
        <PropertyFormModal 
          onClose={() => setIsFormOpen(false)} 
          initialData={editingProperty}
          onSuccess={() => {
            load();
            setIsFormOpen(false);
          }} 
        />
      )}
      </div>
  
  );
}
