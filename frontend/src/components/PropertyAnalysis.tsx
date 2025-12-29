import PriceComparisonChart from './PriceComparisonChart';

export default function PropertyAnalysis({ property }: any) {
  if (!property) return null;

  return (
    <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
      <h2 className="text-xl font-semibold mb-2">AI Insights</h2>

      <p className="text-gray-700 mb-4">
        {property.aiAnalysis?.summary ||
          'Run AI analysis to see insights.'}
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h4 className="font-medium mb-2">Pros</h4>
          <ul className="list-disc list-inside text-sm text-gray-600">
            {property.aiAnalysis?.pros?.map(
              (p: string, i: number) => (
                <li key={i}>{p}</li>
              )
            )}
          </ul>
        </div>

        <div>
          <h4 className="font-medium mb-2">Cons</h4>
          <ul className="list-disc list-inside text-sm text-gray-600">
            {property.aiAnalysis?.cons?.map(
              (c: string, i: number) => (
                <li key={i}>{c}</li>
              )
            )}
          </ul>
        </div>
      </div>

      <PriceComparisonChart property={property} />
    </div>
  );
}
