import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Cell,
  CartesianGrid
} from 'recharts';
type Props ={
  property:any;
};
export default function PriceComparisonChart({ property }: Props) {
  if (!property?.aiValuation) return null;
const listed = property.price;
const estimated = property.aiValuation.estimatedValue;
const diff = ((listed-estimated)/estimated)*100;

let status = "Fair Value";
  let color = "text-slate-600 bg-slate-100";
  
  if (diff > 5) {
     status = "Overpriced";
     color = "text-red-700 bg-red-50 ring-1 ring-red-600/10";
  } else if (diff < -5) {
     status = "Underpriced";
     color = "text-emerald-700 bg-emerald-50 ring-1 ring-emerald-600/10";
  }

  const data = [
    { name: 'Listed', value: listed},
    { name: 'AI Value', value: estimated},
  ];
const formatCurrencyAxis = (value: number) => {
    if (value >= 10000000) return `${(value / 10000000).toFixed(1)}Cr`;
    if (value >= 100000) return `${(value / 100000).toFixed(0)}L`;
    return `${value / 1000}k`;
  };
  return (
    <div className="mt-2">
      <div className='flex items-center justify-between mb-6 p-3 bg-slate-50 rounded-lg'>
        <span className='text-sm text-slate-600 font-medium'>Market Status</span>
       <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide ${color}`}>
           {status} ({Math.abs(diff).toFixed(1)}%)
        </span>
        </div>
      <div className="w-full h-[200px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} barSize={60} margin={{ top: 10, right: 10, left: 0, bottom: 20 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
            <XAxis dataKey="name"
             axisLine={false}
              tickLine={false}
              tick={{ fontSize: 12, fill: '#6b7280',fontWeight: '500' }} dy={10}
              />
            <YAxis axisLine={false} 
              tickLine={false} 
              tick={{ fontSize: 11, fill: '#94a3b8' }} 
              tickFormatter={formatCurrencyAxis}
              width={45} />
            <Tooltip cursor={{ fill:'rgba(0,0,0,0.03)' }}
                contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                formatter={(value: number | undefined) =>
                [`₹${value?.toLocaleString() ?? '0'}`,'Price']
              }
              />
            <Bar dataKey="value" radius={[6, 6, 0, 0]}> {data.map((_,index)=>(
              <Cell key ={`cell-${index}`} fill={index ==0?'#94a3b8':'#4f46e5'}
              />
            ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
      <p className='text-xs text-center text-slate-400 mt-2'>Comparison between current listing price and AI model prediction.</p>
    </div>
  );
}
