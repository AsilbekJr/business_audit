import { useState } from 'react';
import { Layout } from './components/Layout';
import { Home } from './pages/Home';
import { AuditPage } from './pages/AuditPage';
import { ResultPage } from './pages/ResultPage';
import { type AuditInputs, type AuditResults, calculateAudit } from './logic/auditCalculator';

function App() {
  const [view, setView] = useState<'home' | 'audit' | 'result'>('home');
  const [inputData, setInputData] = useState<AuditInputs | null>(null);
  const [results, setResults] = useState<AuditResults | null>(null);

  const startAudit = () => {
    setView('audit');
    window.scrollTo(0, 0);
  };

  const handleAuditSubmit = (data: AuditInputs) => {
    const calcResults = calculateAudit(data);
    setInputData(data);
    setResults(calcResults);
    setView('result');
    window.scrollTo(0, 0);
  };

  const restartAudit = () => {
    setView('home');
    setInputData(null);
    setResults(null);
    window.scrollTo(0, 0);
  };

  return (
    <Layout>
      {view === 'home' && <Home onStart={startAudit} />}
      {view === 'audit' && <AuditPage onSubmit={handleAuditSubmit} />}
      {view === 'result' && inputData && results && (
        <ResultPage data={inputData} results={results} onRestart={restartAudit} />
      )}
    </Layout>
  );
}

export default App;
