import Preview from './pages/Preview';
import Editor from './pages/Editor';
import { useState, useEffect } from 'react';
import OctopusEmail from './templates/OctopusEmail';
import customersData from './templates/customers.json';
import clientsData from './templates/clients.json';
import './App.css';

export type ClientName = (typeof clientsData.clients)[number]['name'];

export interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  debt_amount: string;
}

export interface Client {
  id: string;
  name: string;
  logo: string;
  industry: string;
  website: string;
}

function App() {
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(customersData.customers[0]);
  const [selectedClient, setSelectedClient] = useState<ClientName>(clientsData.clients[0].name);
  const [emailComponent, setEmailComponent] = useState<React.ReactNode>(null);
  const [generatedPrompt, setGeneratedPrompt] = useState<string>('');
  const [isGenerated, setIsGenerated] = useState(false);

  useEffect(() => {
    if (selectedCustomer) {
      const component = <OctopusEmail selectedClient={selectedClient} clients={clientsData.clients} customer={selectedCustomer} />;
      setEmailComponent(component);
    }
  }, [selectedCustomer, selectedClient]);

  const handleGenerate = (value: boolean) => {
    setIsGenerated(value);
    // Future API call will go here
  };

  return (
    <div className='w-full h-screen'>
      <div className='flex flex-row h-full'>
        <div className='w-1/3 2xl:w-1/4'>
          <Editor
            customer={selectedCustomer}
            onCustomerChange={setSelectedCustomer}
            selectedClient={selectedClient}
            onClientChange={setSelectedClient}
            clients={clientsData.clients}
            emailComponent={emailComponent}
            onPromptChange={setGeneratedPrompt}
            isGenerated={isGenerated}
            onGenerate={handleGenerate}
          />
        </div>
        <div className='border-l w-2/3 2xl:w-3/4'>
          <Preview emailComponent={emailComponent} customer={selectedCustomer} generatedPrompt={generatedPrompt} isGenerated={isGenerated} />
        </div>
      </div>
    </div>
  );
}

export default App;
