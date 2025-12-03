import { CVProvider } from '@/context/CVContext';
import SummarySection from '../SummarySection';

export default function SummarySectionExample() {
  return (
    <CVProvider>
      <div className="max-w-2xl">
        <SummarySection />
      </div>
    </CVProvider>
  );
}
