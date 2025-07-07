import ImportHistoryTable from '../components/ImportHistoryTable';

export default function Home() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-4">📊 Job Import History</h1>
      <ImportHistoryTable />
    </div>
  );
}