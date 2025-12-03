import { CVProvider } from '@/context/CVContext';
import PersonalDetails from '../PersonalDetails';

export default function PersonalDetailsExample() {
  return (
    <CVProvider>
      <div className="max-w-2xl">
        <PersonalDetails />
      </div>
    </CVProvider>
  );
}
