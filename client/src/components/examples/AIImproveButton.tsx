import { useState } from 'react';
import AIImproveButton from '../AIImproveButton';

export default function AIImproveButtonExample() {
  const [text, setText] = useState('Experienced software developer with 5 years of experience in web development.');

  return (
    <div className="p-8 bg-card rounded-2xl space-y-4">
      <p className="text-sm text-muted-foreground">Current text:</p>
      <p className="text-sm">{text}</p>
      <AIImproveButton 
        text={text} 
        onImprove={(improved) => setText(improved)} 
        fieldName="example"
      />
    </div>
  );
}
