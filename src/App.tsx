import Preview from './pages/Preview';
import Editor from './pages/Editor';
import { useState } from 'react';
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from '@/components/ui/resizable';
import customersData from './data/customers.json';
import clientsData from './data/clients.json';
import { MODELS } from './api/modelConfigs';
import { generateTemplate } from './api/generateTemplate';
import './App.css';

export type ClientName = (typeof clientsData.clients)[number]['name'];

export interface Customer {
  id: string;
  first_name: string;
  last_name: string;
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

  const [template, setTemplate] = useState<string>('');
  const [generatedPrompt, setGeneratedPrompt] = useState<string>('');
  const [isGenerated, setIsGenerated] = useState(false);
  const [apiResponse, setApiResponse] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [isTestMode, setIsTestMode] = useState(false);
  const [apiTestResponse, setApiTestResponse] = useState<string>(''); /* For testing API reponse preview */

  const handleTestModeChange = (value: boolean) => {
    setIsTestMode(value);
    setApiResponse('');
    setIsGenerated(false);
    setError(null);
    if (!value) {
      setApiTestResponse('');
    }
  };

  const handleGenerate = async (value: boolean) => {
    setIsGenerated(value);

    if (value) {
      if (isTestMode) {
        /* Test mode: use the textarea input  */
        setApiResponse(apiTestResponse);
      } else {
        /* Live mode: use the API */
        setIsLoading(true);
        setError(null);

        try {
          const response = await generateTemplate(generatedPrompt, selectedModel.id);
          if (response.error) {
            setError(response.error);
          } else {
            setApiResponse(response.content);
          }
        } catch (err) {
          setError('Failed to generate template');
          console.error('Error:', err);
        } finally {
          setIsLoading(false);
        }
      }
    } else {
      setApiResponse('');
      setError(null);
    }
  };

  return (
    <div className='w-full h-screen'>
      <ResizablePanelGroup direction='horizontal'>
        <ResizablePanel minSize={25} defaultSize={33} className='bg-white p-6 h-full overflow-auto! no-scrollbar'>
          <Editor
            customer={selectedCustomer}
            onCustomerChange={setSelectedCustomer}
            selectedClient={selectedClient}
            onClientChange={setSelectedClient}
            clients={clientsData.clients}
            onPromptChange={setGeneratedPrompt}
            onAPIResponseChange={setApiTestResponse}
            isGenerated={isGenerated}
            onGenerate={handleGenerate}
            selectedModel={selectedModel}
            onModelChange={setSelectedModel}
            isTestMode={isTestMode}
            onTestModeChange={handleTestModeChange}
            template={template}
            onTemplateChange={setTemplate}
          />
        </ResizablePanel>
        <ResizableHandle />
        <ResizablePanel>
          <Preview
            client={selectedClient}
            customer={selectedCustomer}
            generatedPrompt={generatedPrompt}
            template={template}
            isGenerated={isGenerated}
            apiResponse={apiResponse}
            isLoading={isLoading}
            error={error}
          />
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
}

export default App;
