import useSWR from 'swr';
import { fetchImportHistory } from '../services/api';

const ImportHistoryTable = () => {
  const { data, error, isLoading } = useSWR('importLogs', fetchImportHistory, { refreshInterval: 1800000 });

  if (error) return <div className="text-red-600 p-4">⚠️ Error loading data.</div>;
  if (isLoading || !data) return <div className="p-4 animate-pulse">📦 Loading import history...</div>;

  return (
    <div className="p-6 overflow-x-auto">
      <table className="min-w-full border border-gray-300 shadow-sm rounded-lg overflow-hidden">
        <thead className="bg-gray-50">
          <tr>
            <th className="border px-4 py-3 text-left">File Name</th>
            <th className="border px-4 py-3 text-left">Imported At</th>
            <th className="border px-4 py-3 text-center text-blue-800">Total</th>
            <th className="border px-4 py-3 text-center text-green-700">New</th>
            <th className="border px-4 py-3 text-center text-yellow-600">Updated</th>
            <th className="border px-4 py-3 text-center text-red-600">Failed</th>
          </tr>
        </thead>
        <tbody>
          {data.map((log, idx) => (
            <tr key={log._id} className={idx % 2 === 0 ? 'bg-white' : 'bg-gray-50 hover:bg-gray-100 transition'}>
              <td className="border px-4 py-2 font-medium text-blue-600">{log.fileName}-{log._id}</td>
              <td className="border px-4 py-2">{new Date(log.importDateTime).toLocaleString()}</td>
              <td className="border px-4 py-2 text-center text-blue-800 font-semibold">{log.total}</td>
              <td className="border px-4 py-2 text-center text-green-700 font-semibold">{log.new}</td>
              <td className="border px-4 py-2 text-center text-yellow-600 font-semibold">{log.updated}</td>
              <td className="border px-4 py-2 text-center text-red-600 font-semibold">{log.failed}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ImportHistoryTable;
