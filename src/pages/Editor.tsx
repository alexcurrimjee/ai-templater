import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Avatar, AvatarImage } from '@radix-ui/react-avatar';
import { CustomerCard } from '@/components/CustomerCard';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Sparkles, RefreshCcw } from 'lucide-react';
import { useState } from 'react';
import type { ClientName, Customer, Client } from '../App';
import { generatePrompt } from '@/components/promptGenerator';
import { ReactNode } from 'react';
import { useEffect } from 'react';

import modelsData from '../templates/models.json';

interface Model {
  id: string;
  name: string;
}

interface EditorProps {
  selectedClient: ClientName;
  customer: Customer | null;
  clients: Client[];
  emailComponent: ReactNode;

  isGenerated: boolean;
  onClientChange: (value: ClientName) => void;
  onCustomerChange: (customer: Customer) => void;
  onPromptChange: (prompt: string) => void;
  onGenerate: (value: boolean) => void;
}

const Editor = ({
  selectedClient,
  customer,
  emailComponent,
  isGenerated,
  clients,

  onClientChange,
  onCustomerChange,
  onPromptChange,
  onGenerate,
}: EditorProps) => {
  const [selectedModel, setSelectedModel] = useState<Model>(modelsData.models[0]);
  const [creativeLicenseValue, setCreativeLicenseValue] = useState<number>(3);
  const [customPrompt, setCustomPrompt] = useState<string>('');

  useEffect(() => {
    const prompt = generatePrompt({
      template: emailComponent,
      creativeLicense: creativeLicenseValue,
      customPrompt: customPrompt,
    });
    onPromptChange(prompt);
  }, [emailComponent, creativeLicenseValue, customPrompt, onPromptChange]);

  const handleValueChange = (value: string) => {
    onClientChange(value as ClientName);
  };

  const handleCustomerChange = (customer: Customer) => {
    onCustomerChange(customer);
  };

  const handleModelChange = (modelId: string) => {
    const model = modelsData.models.find((m) => m.id === modelId);
    if (model) {
      setSelectedModel(model);
    }
  };

  const handleCreativeLicenseChange = (value: number[]) => {
    setCreativeLicenseValue(value[0]);
  };

  const handleGenerateClick = () => {
    onGenerate(!isGenerated);
  };

  return (
    <div className='h-full w-full pt-6 p-6 bg-white flex flex-col gap-6'>
      <CustomerCard customer={customer} onEdit={handleCustomerChange} />
      <Tabs value={selectedClient} onValueChange={handleValueChange} className='w-full'>
        <TabsList className='w-full mb-2'>
          {clients.map((client) => (
            <TabsTrigger key={client.id} className='w-full gap-3' value={client.name}>
              <Avatar>
                <AvatarImage className='h-5 w-5' src={client.logo} alt={client.name} />
              </Avatar>
              {client.name}
            </TabsTrigger>
          ))}
        </TabsList>

        {clients.map((client) => (
          <TabsContent key={client.id} value={client.name}>
            <Card>
              <CardHeader>
                <CardTitle>Build your Prompt</CardTitle>
              </CardHeader>
              <CardContent className='space-y-8 flex flex-col'>
                <div className='gap-y-4'>
                  <Label htmlFor='model-select'>AI Model</Label>
                  <Select onValueChange={handleModelChange} defaultValue={selectedModel.id} value={selectedModel.id}>
                    <SelectTrigger className='w-full bg-gray-50 hover:bg-white transition' id='model-select'>
                      <SelectValue>
                        <div className='flex flex-col'>
                          <span className='font-medium'>{selectedModel.name}</span>
                        </div>
                      </SelectValue>
                    </SelectTrigger>
                    <SelectContent>
                      {modelsData.models.map((model) => (
                        <SelectItem key={model.id} value={model.id}>
                          <div className='flex flex-col'>
                            <span className='font-medium'>{model.name}</span>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className='space-y-4'>
                  <div className='flex justify-between items-center'>
                    <Label>Creative License</Label>
                    <span className='text-sm text-gray-500'>{creativeLicenseValue}/5</span>
                  </div>
                  <Slider min={1} max={5} step={1} value={[creativeLicenseValue]} onValueChange={handleCreativeLicenseChange} />
                  <div className='w-full flex flex-row justify-between'>
                    <span className='h-9 w-9 rounded-full bg-primary/10 flex justify-center items-center text-xl'>⛓️</span>
                    <span className='h-9 w-9 rounded-full bg-primary/10 flex justify-center items-center text-xl'>💡</span>
                  </div>
                </div>

                <div className='space-y-4'>
                  <Label htmlFor='prompt'>Custom Prompt</Label>
                  <Textarea
                    id='prompt'
                    placeholder='Enter custom prompt or instructions...'
                    value={customPrompt}
                    onChange={(e) => setCustomPrompt(e.target.value)}
                    className='min-h-[150px] bg-gray-50 hover:bg-white transition'
                  />
                </div>
                <Button variant={isGenerated ? 'outline' : 'default'} className='self-end' onClick={handleGenerateClick}>
                  {isGenerated ? (
                    <>
                      <RefreshCcw size={16} className='mr-2' />
                      <span>Reset</span>
                    </>
                  ) : (
                    <>
                      <Sparkles size={16} className='mr-2' />
                      <span>Generate Email</span>
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
};

export default Editor;
