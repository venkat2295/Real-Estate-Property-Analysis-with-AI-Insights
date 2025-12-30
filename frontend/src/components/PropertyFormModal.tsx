import { useState } from 'react';
import { X } from 'lucide-react';
import { createProperty, updateProperty } from '../services/api';

type Props = {
  onSuccess: () => void;
  onClose: () => void;
  initialData?: any;
};

export default function PropertyFormModal({ onSuccess, onClose, initialData }: Props) {
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    title: initialData?.title || '',
    location: initialData?.location || '',
    price: initialData?.price?.toString() || '',
    size: initialData?.size?.toString() || '',
    bedrooms: initialData?.bedrooms?.toString() || '',
    bathrooms: initialData?.bathrooms?.toString() || '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const payload = {
      ...form,
      price: Number(form.price),
      size: Number(form.size),
      bedrooms: Number(form.bedrooms),
      bathrooms: Number(form.bathrooms),
    };
    
    if (initialData) {
        await updateProperty(initialData._id, payload);
    } else {
        await createProperty(payload);
    }
    setLoading(false);
    onSuccess();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden animate-in fade-in zoom-in duration-200">
        <div className="px-6 py-4 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
          <h2 className="text-lg font-semibold text-slate-900">{initialData ? 'Edit Property' : 'Add New Property'}</h2>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600 transition-colors">
            <X className="h-5 w-5" />
          </button>
        </div>

        <form onSubmit={submit} className="p-6 grid grid-cols-2 gap-4">
          <div className="col-span-2">
            <label className="block text-xs font-medium text-slate-700 mb-1">Property Title</label>
            <input name="title" value={form.title} onChange={handleChange} required 
              className="w-full rounded-lg border-slate-200 focus:border-indigo-500 focus:ring-indigo-500 transition-all text-sm py-2" placeholder="e.g. Sunset Villa" />
          </div>
          
          <div className="col-span-2">
            <label className="block text-xs font-medium text-slate-700 mb-1">Location</label>
            <input name="location" value={form.location} onChange={handleChange} required 
              className="w-full rounded-lg border-slate-200 focus:border-indigo-500 focus:ring-indigo-500 transition-all text-sm py-2" placeholder="e.g. Mumbai, Bandra West" />
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-700 mb-1">Price (₹)</label>
            <input type="number" name="price" value={form.price} onChange={handleChange} required 
              className="w-full rounded-lg border-slate-200 focus:border-indigo-500 focus:ring-indigo-500 transition-all text-sm py-2" />
          </div>
          
          <div>
            <label className="block text-xs font-medium text-slate-700 mb-1">Size (sqft)</label>
            <input type="number" name="size" value={form.size} onChange={handleChange} required 
              className="w-full rounded-lg border-slate-200 focus:border-indigo-500 focus:ring-indigo-500 transition-all text-sm py-2" />
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-700 mb-1">Bedrooms</label>
            <input type="number" name="bedrooms" value={form.bedrooms} onChange={handleChange} required 
              className="w-full rounded-lg border-slate-200 focus:border-indigo-500 focus:ring-indigo-500 transition-all text-sm py-2" />
          </div>
          
          <div>
            <label className="block text-xs font-medium text-slate-700 mb-1">Bathrooms</label>
            <input type="number" name="bathrooms" value={form.bathrooms} onChange={handleChange} required 
              className="w-full rounded-lg border-slate-200 focus:border-indigo-500 focus:ring-indigo-500 transition-all text-sm py-2" />
          </div>

          <div className="col-span-2 pt-4 flex gap-3">
            <button type="button" onClick={onClose} className="flex-1 px-4 py-2 text-slate-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 text-sm font-medium">
              Cancel
            </button>
            <button type="submit" disabled={loading} className="flex-1 px-4 py-2 text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 text-sm font-medium disabled:opacity-70">
              {loading ? 'Saving...' : (initialData ? 'Update Property' : 'Create Property')}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}