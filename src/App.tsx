import Preview from './pages/Preview';
import Editor from './pages/Editor';
import { useState, useEffect } from 'react';
import OctopusEmail from './templates/OctopusEmail';
import customersData from './data/customers.json';
import clientsData from './data/clients.json';
import modelsData from './data/models.json';
import './App.css';
import { generateTemplate } from './api/generateTemplate';

export type ClientName = (typeof clientsData.clients)[number]['name'];

export interface Customer {
  id: string;
  name: string;
  email: string;
  debt_amount: string;
  ref_code: string;
}

export interface Client {
  id: string;
  name: string;
  logo: string;
  industry: string;
  website: string;
}

export interface Model {
  id: string;
  name: string;
}

function App() {
  const [selectedCustomer, setSelectedCustomer] = useState<Customer>(customersData.customers[0]);
  const [selectedClient, setSelectedClient] = useState<Client>(clientsData.clients[0]);
  const [selectedModel, setSelectedModel] = useState<Model>(modelsData.models[0]);
  const [emailComponent, setEmailComponent] = useState<React.ReactNode>(null);
  const [generatedPrompt, setGeneratedPrompt] = useState<string>('');
  const [isGenerated, setIsGenerated] = useState(false);
  const [generatedEmail, setGeneratedEmail] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (selectedCustomer) {
      const component = <OctopusEmail client={selectedClient} customer={selectedCustomer} />;
      setEmailComponent(component);
    }
  }, [selectedCustomer, selectedClient]);

  const handleGenerate = async (value: boolean) => {
    setIsGenerated(value);

    if (value) {
      setIsLoading(true);
      setError(null);

      try {
        const response = await generateTemplate(generatedPrompt, selectedModel.id);

        if (response.error) {
          setError(response.error);
        } else {
          setGeneratedEmail(response.content);
        }
      } catch (err) {
        setError('Failed to generate template');
        console.error('Error:', err);
      } finally {
        setIsLoading(false);
      }
    } else {
      // Reset state when toggling off
      setGeneratedEmail('');
      setError(null);
    }
  };

  return (
    <div className='w-full h-full'>
      <div className='flex flex-row'>
        <div className='w-1/3 2xl:w-1/4 overflow-y-auto no-scrollbar p-6'>
          <Editor
            customer={selectedCustomer}
            onCustomerChange={setSelectedCustomer}
            selectedClient={selectedClient}
            onClientChange={setSelectedClient}
            clients={clientsData.clients}
            onPromptChange={setGeneratedPrompt}
            isGenerated={isGenerated}
            onGenerate={handleGenerate}
            selectedModel={selectedModel}
            onModelChange={setSelectedModel}
          />
        </div>
        <div className='border-l w-2/3 2xl:w-3/4'>
          <Preview
            emailComponent={emailComponent}
            client={selectedClient}
            customer={selectedCustomer}
            generatedPrompt={generatedPrompt}
            isGenerated={isGenerated}
            generatedEmail={generatedEmail}
            isLoading={isLoading}
            error={error}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
