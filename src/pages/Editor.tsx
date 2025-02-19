import { useEffect, useState } from 'react';
import type { Customer, Client, Model } from '../App';
import { CustomerCard } from '@/components/CustomerCard';
import { generatePrompt } from '@/components/promptGenerator';
import { Avatar, AvatarImage } from '@/components/ui/avatar';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Sparkles, RefreshCcw, Import, Delete } from 'lucide-react';
import { MODELS } from '../api/modelConfigs';
import { getDummyTemplate } from '@/templates/dummyTemplates';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

interface EditorProps {
  selectedClient: Client;
  customer: Customer;
  clients: Client[];
  isGenerated: boolean;
  selectedModel: Model;
  isTestMode: boolean;
  onClientChange: (client: Client) => void;
  onCustomerChange: (customer: Customer) => void;
  onPromptChange: (prompt: string) => void;
  onGenerate: (value: boolean) => void;
  onModelChange: (model: Model) => void;
  onAPIResponseChange: (response: string) => void;
  onTestModeChange: (value: boolean) => void;
  template: string;
  onTemplateChange: (template: string) => void;
}

const Editor = ({
  selectedClient,
  customer,
  isGenerated,
  clients,
  selectedModel,
  isTestMode,
  onClientChange,
  onCustomerChange,
  onPromptChange,
  onGenerate,
  onModelChange,
  onAPIResponseChange,
  onTestModeChange,
  template,
  onTemplateChange,
}: EditorProps) => {
  const [creativeLicenseValue, setCreativeLicenseValue] = useState<number>(1);
  const [toneValue, setToneValue] = useState<number>(1);
  const [customPrompt, setCustomPrompt] = useState<string>('');

  useEffect(() => {
    const prompt = generatePrompt({
      creativeLicense: creativeLicenseValue,
      tone: toneValue,
      customPrompt: customPrompt,
      template: template,
    });
    onPromptChange(prompt);
  }, [template, toneValue, creativeLicenseValue, customPrompt, onPromptChange]);

  useEffect(() => {
    const dummyTemplate = getDummyTemplate(selectedClient.name);
    onTemplateChange(dummyTemplate);
  }, [selectedClient.name, onTemplateChange]);

  const handleTemplateChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    onTemplateChange(e.target.value);
  };

  const handleClientChange = (clientId: string) => {
    const client = clients.find((c) => c.id === clientId);
    if (client) {
      onClientChange(client);
    }
  };

  const handleCustomerChange = (customer: Customer) => {
    onCustomerChange(customer);
  };

  const handleModelChange = (modelId: string) => {
    const model = MODELS.find((m) => m.id === modelId);
    if (model) {
      onModelChange(model);
    }
  };

  const handleCreativeLicenseChange = (value: number[]) => {
    setCreativeLicenseValue(value[0]);
  };

  const handleToneChange = (value: number[]) => {
    setToneValue(value[0]);
  };

  const handleTemplateButtonClick = () => {
    if (template) {
      onTemplateChange('');
    } else {
      const dummyTemplate = getDummyTemplate(selectedClient.name);
      onTemplateChange(dummyTemplate);
    }
  };

  const handleGenerateClick = () => {
    onGenerate(!isGenerated);
  };

  return (
    <div className='w-full bg-white flex flex-col gap-4 '>
      <CustomerCard customer={customer} onEdit={handleCustomerChange} />

      <Tabs value={selectedClient.id} onValueChange={handleClientChange} className='w-full'>
        <TabsList className='w-full mb-2 h-9 rounded-full'>
          {clients.map((client) => (
            <TabsTrigger key={client.id} className='w-full gap-3 aria-[selected=false]:grayscale rounded-full' value={client.id}>
              <Avatar className='h-5 w-5'>
                <AvatarImage src={client.logo} alt={client.name} />
              </Avatar>
              {client.name}
            </TabsTrigger>
          ))}
        </TabsList>

        {clients.map((client) => (
          <TabsContent key={client.id} value={client.id}>
            <Card className='pt-6 bg-gray-50 shadow-none rounded-3xl'>
              <CardContent className='space-y-4 flex flex-col'>
                <div className='gap-y-4'>
                  <Label htmlFor='model-select'>AI Model</Label>
                  <Select onValueChange={handleModelChange} defaultValue={selectedModel.id} value={selectedModel.id}>
                    <SelectTrigger className='w-full bg-white transition rounded-lg shadow-none' id='model-select'>
                      <SelectValue>
                        <div className='flex flex-col'>
                          <span className='font-medium'>{selectedModel.name}</span>
                        </div>
                      </SelectValue>
                    </SelectTrigger>
                    <SelectContent className='rounded-xl'>
                      {MODELS.map((model) => (
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
                    <span className='text-sm text-gray-500'>Level: {creativeLicenseValue}</span>
                  </div>
                  <Slider min={1} max={3} step={1} value={[creativeLicenseValue]} onValueChange={handleCreativeLicenseChange} />
                  <div className='w-full flex flex-row justify-between'>
                    <span className='h-9 w-9 rounded-full bg-primary/10 flex justify-center items-center text-xl'>⛓️</span>
                    <span className='h-9 w-9 rounded-full bg-primary/10 flex justify-center items-center text-xl'>💡</span>
                  </div>
                </div>

                <div className='space-y-4'>
                  <div className='flex justify-between items-center'>
                    <Label>Tone</Label>
                    <span className='text-sm text-gray-500'>Level: {toneValue}</span>
                  </div>
                  <Slider min={1} max={3} step={1} value={[toneValue]} onValueChange={handleToneChange} />
                  <div className='w-full flex flex-row justify-between'>
                    <span className='h-9 w-9 rounded-full bg-primary/10 flex justify-center items-center text-xl'>😊</span>
                    <span className='h-9 w-9 rounded-full bg-primary/10 flex justify-center items-center text-xl'>😡</span>
                  </div>
                </div>

                <Accordion type='single' collapsible>
                  <AccordionItem value='item-1'>
                    <AccordionTrigger>Template</AccordionTrigger>
                    <AccordionContent className='space-y-4 pt-0.25 px-0.25'>
                      <Textarea
                        id='prompt'
                        placeholder='What does a good template look like? Import it here...'
                        value={template}
                        onChange={handleTemplateChange}
                        className='min-h-[150px] bg-white rounded-xl shadow-none transition'
                      />
                      <Button variant='outline' size='sm' className='self-end shadow-none rounded-full' onClick={handleTemplateButtonClick}>
                        {template ? (
                          <>
                            <Delete className='h-4 w-4 text-gray-400' />
                            Clear Template
                          </>
                        ) : (
                          <>
                            <Import className='h-4 w-4 text-gray-400' />
                            Import Dummy Data
                          </>
                        )}
                      </Button>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>

                <Accordion type='single' collapsible defaultValue='item-1'>
                  <AccordionItem value='item-1'>
                    <AccordionTrigger>Custom Prompt</AccordionTrigger>
                    <AccordionContent className='space-y-4 pt-0.25 px-0.25'>
                      <Textarea
                        placeholder='Enter custom prompt or instructions...'
                        value={customPrompt}
                        onChange={(e) => setCustomPrompt(e.target.value)}
                        className='min-h-[100px] bg-white rounded-xl shadow-none transition'
                      />
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>

                <Button size='lg' variant={isGenerated ? 'outline' : 'default'} className='self-end rounded-full' onClick={handleGenerateClick}>
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
            <div className='flex flex-col gap-4 mt-6'>
              <div className='flex items-center space-x-2'>
                <Switch id='test-mode' checked={isTestMode} onCheckedChange={onTestModeChange} />
                <Label htmlFor='test-mode'>Test Mode</Label>
              </div>

              {isTestMode && (
                <Textarea
                  placeholder='Paste an API response here to test rendering...'
                  className='bg-gray-50 min-h-[200px] font-mono text-sm'
                  onChange={(e) => onAPIResponseChange(e.target.value)}
                />
              )}
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
};

export default Editor;
