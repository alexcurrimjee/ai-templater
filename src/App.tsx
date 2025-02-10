import Preview from './pages/Preview';
import Editor from './pages/Editor';
import { useState, useEffect } from 'react';
import OctopusEmail from './templates/OctopusEmail';
import customersData from './templates/customers.json';
import './App.css';

export type EmailTemplate = 'octopus' | 'clearpay' | 'intrum';

export interface Customer {
  id: string;
  name: string;
  company: string;
  email: string;
  phone: string;
  logo: string;
  industry: string;
  debt_amount: string;
}

function App() {
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);

  const [authorName, setAuthorName] = useState('Alex');
  const [authorImage, setAuthorImage] = useState('https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300&h=300&fit=crop');
  const [reviewText, setReviewText] = useState(
    "Alan was a great guest! Easy communication, the apartment was left in great condition, very polite, and respectful of all house rules. He's welcome back anytime and would easily recommend him to any host!"
  );
  const [emailComponent, setEmailComponent] = useState<React.ReactNode>(null);

  const handleFormChange = () => {
    const component = <OctopusEmail authorName={authorName} authorImage={authorImage} reviewText={reviewText} />;
    setEmailComponent(component);
  };

  useEffect(() => {
    handleFormChange();
  }, [authorName, authorImage, reviewText]);

  const customers = customersData.customers[0];
  setSelectedCustomer(customers);
  const [selectedTemplate, setSelectedTemplate] = useState<EmailTemplate>('octopus');

  return (
    <div className='w-full h-screen'>
      <div className='flex flex-row h-full'>
        <div className='w-1/3'>
          <Editor
            customer={selectedCustomer}
            onCustomerChange={setSelectedCustomer}
            selectedTemplate={selectedTemplate}
            onTemplateChange={setSelectedTemplate}
            authorName={authorName}
            authorImage={authorImage}
            reviewText={reviewText}
            onAuthorNameChange={setAuthorName}
            onAuthorImageChange={setAuthorImage}
            onReviewTextChange={setReviewText}
          />
        </div>
        <div className='border-l w-2/3'>
          <Preview emailComponent={emailComponent} customer={selectedCustomer} />
        </div>
      </div>
    </div>
  );
}

export default App;
