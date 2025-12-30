import PriceComparisonChart from './PriceComparisonChart';

type Props ={
  property:any;
}
export default function PropertyAnalysis({ property }: Props) {
  if (!property) return null;
const verdict = property.aiAnalysis?.verdict;
const summary = property.aiAnalysis?.summary;
  return (
    <div className="bg-white rounded-xl shadow-sm p-6 ">
      <div className='mb-4'>
      <h2 className="text-lg font-semibold text-gray-900">AI Property Insights</h2>
      {verdict && (
          <p className="mt-1 text-sm font-medium text-blue-600">
            {verdict}
          </p>
        )}
      </div>
      <p className="text-sm text-gray-700 leading-relaxed mb-6">
        {property.aiAnalysis?.summary ||
          'Run AI analysis to see insights about this property.'}
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div className='rounded-lg bg-emerald-50 p-4'>
          <h4 className="text-sm font-medium text-emerald-700 mb-2">Strengths</h4>
          <ul className="space-y-1 text-sm text-emerald-700">
            {property.aiAnalysis?.pros?.map(
              (p: string, i: number) => (
                <li key={i}>{p}</li>
              )
            )||<li>-</li>}
          </ul>
        </div>

        <div className='rounded-lg bg-red-50 p-4'>
          <h4 className="text-sm font-medium text-red-700 mb-2">Risks</h4>
          <ul className="space-y-1 text-sm text-red-700">
            {property.aiAnalysis?.cons?.map(
              (c: string, i: number) => (
                <li key={i}>{c}</li>
              )
            )|| <li>-</li>}
          </ul>
        </div>
      </div>

      <PriceComparisonChart property={property} />
    </div>
  );
}
