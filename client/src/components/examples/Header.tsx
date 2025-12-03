import { CVProvider } from '@/context/CVContext';
import Header from '../Header';

export default function HeaderExample() {
  return (
    <CVProvider>
      <Header onExportPDF={() => console.log('Export PDF clicked')} />
    </CVProvider>
  );
}
