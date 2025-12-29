import { useEffect, useState } from 'react';
import {
  getProperties,
  getProperty,
  analyzeProperty,
} from '../services/api';

import PropertyForm from '../components/PropertyForm';
import PropertyList from '../components/PropertyList';
import PropertyAnalysis from '../components/PropertyAnalysis';

export default function Dashboard() {
  const [properties, setProperties] = useState<any[]>([]);
  const [selected, setSelected] = useState<any>(null);

  const load = async () => {
    const res = await getProperties();
    setProperties(res.data.data);
  };

  const view = async (id: string) => {
    try {
    const res = await getProperty(id);
    setSelected(res.data.data);
  } catch (err) {
    console.error('Failed to fetch property', err);
  }
  };

  const runAI = async (id: string) => {
    try{const res = await analyzeProperty(id);
    setSelected(res.data.data);
    load();}
    catch(err){
      console.error('Failed to analyze property', err);
    }
  };

  useEffect(() => {
    load();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-6xl mx-auto p-6">
        <PropertyForm onSuccess={load} />
        <PropertyList
          properties={properties}
          onSelect={view}
          onAnalyze={runAI}
        />
        <PropertyAnalysis property={selected} />
      </div>
    </div>
  );
}
