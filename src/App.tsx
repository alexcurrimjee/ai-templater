import Preview from './pages/Preview';
import Editor from './pages/Editor';
import { useState, useEffect } from 'react';
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from '@/components/ui/resizable';
import OctopusEmail from './templates/OctopusEmail';
import customersData from './data/customers.json';
import clientsData from './data/clients.json';
import { MODELS } from './api/modelConfigs';
import { ReactElement } from 'react';
import { generateTemplate } from './api/generateTemplate';
import './App.css';

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
  const [selectedModel, setSelectedModel] = useState<Model>(MODELS.find((model) => model.id === 'claude-3-5-sonnet') || MODELS[0]);
  const [emailComponent, setEmailComponent] = useState<ReactElement>(() => (
    <OctopusEmail client={clientsData.clients[0]} customer={customersData.customers[0]} />
  ));
  const [generatedPrompt, setGeneratedPrompt] = useState<string>('');
  const [isGenerated, setIsGenerated] = useState(false);
  const [generatedEmail, setGeneratedEmail] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [isTestMode, setIsTestMode] = useState(false);
  const [apiResponse, setApiResponse] = useState<string>(''); /* For testing API reponse preview */

  useEffect(() => {
    if (selectedCustomer) {
      const component = <OctopusEmail client={selectedClient} customer={selectedCustomer} />;
      setEmailComponent(component);
    }
  }, [selectedCustomer, selectedClient]);

  const handleTestModeChange = (value: boolean) => {
    setIsTestMode(value);
    setGeneratedEmail('');
    setIsGenerated(false);
    setError(null);
    if (!value) {
      setApiResponse('');
    }
  };

  const handleGenerate = async (value: boolean) => {
    setIsGenerated(value);

    if (value) {
      if (isTestMode) {
        /* Test mode: use the textarea input  */
        setGeneratedEmail(apiResponse);
      } else {
        /* Live mode: use the API */
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
      }
    } else {
      setGeneratedEmail('');
      setError(null);
    }
  };

  return (
    <div className='w-full h-full min-h-screen'>
      <ResizablePanelGroup direction='horizontal'>
        <ResizablePanel minSize={25} defaultSize={33} className='bg-white overflow-y-auto no-scrollbar p-6'>
          <Editor
            customer={selectedCustomer}
            onCustomerChange={setSelectedCustomer}
            selectedClient={selectedClient}
            onClientChange={setSelectedClient}
            clients={clientsData.clients}
            onPromptChange={setGeneratedPrompt}
            onAPIResponseChange={setApiResponse}
            isGenerated={isGenerated}
            onGenerate={handleGenerate}
            selectedModel={selectedModel}
            onModelChange={setSelectedModel}
            isTestMode={isTestMode}
            onTestModeChange={handleTestModeChange}
          />
        </ResizablePanel>
        <ResizableHandle />
        <ResizablePanel>
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
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
}

export default App;
