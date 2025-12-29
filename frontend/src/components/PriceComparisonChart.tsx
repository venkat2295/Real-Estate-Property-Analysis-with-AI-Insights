import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

export default function PriceComparisonChart({ property }: any) {
  if (!property?.aiValuation) return null;

  const data = [
    { name: 'Listed Price', value: property.price },
    { name: 'AI Estimated', value: property.aiValuation.estimatedValue },
  ];

  return (
    <div className="mt-6">
      <h3 className="text-lg font-semibold mb-3">Price Comparison</h3>
      <div className="w-full h-[260px]">
        <ResponsiveContainer>
          <BarChart data={data}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="value" fill="#2563eb" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
