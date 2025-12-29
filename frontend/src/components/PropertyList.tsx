export default function PropertyList({
  properties,
  onSelect,
  onAnalyze,
}: {
  properties: any[];
  onSelect: (id: string) => void;
  onAnalyze: (id: string) => void;
}) {
  return (
    <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
      <h2 className="text-xl font-semibold mb-4">Properties</h2>

      <div className="space-y-4">
        {properties.map((p) => (
          <div
            key={p._id}
            className="flex items-center justify-between border-b pb-3"
          >
            <div>
              <p className="font-medium">{p.title}</p>
              <p className="text-sm text-gray-500">
                {p.location} • ₹{p.price}
              </p>
            </div>

            <div className="space-x-2">
              <button
                onClick={() => onSelect(p._id)}
                className="px-3 py-1 rounded-md border text-sm"
              >
                View
              </button>
              <button
                onClick={() => onAnalyze(p._id)}
                className="px-3 py-1 rounded-md bg-emerald-500 text-white text-sm hover:bg-emerald-600"
              >
                Analyze
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
