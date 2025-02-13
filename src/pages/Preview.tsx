import { ReactNode } from 'react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Avatar, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { renderToStaticMarkup } from 'react-dom/server';
import { Send } from 'lucide-react';
import { useState, useEffect } from 'react';
import type { Customer, Client } from '../App';

interface PreviewProps {
  emailComponent: ReactNode;
  customer: Customer;
  client: Client;
  generatedPrompt: string;
  isGenerated: boolean;
  generatedEmail: string;
  isLoading: boolean;
  error: string | null;
}

const Preview = ({ emailComponent, customer, client, generatedPrompt, isGenerated, generatedEmail, isLoading, error }: PreviewProps) => {
  const [activeTab, setActiveTab] = useState('template');
  const emailHtml = renderToStaticMarkup(emailComponent);

  useEffect(() => {
    if (isGenerated) {
      setActiveTab('generated');
    } else {
      setActiveTab('template');
    }
  }, [isGenerated]);

  return (
    <div className='h-full bg-container-dark'>
      <Tabs value={activeTab} onValueChange={setActiveTab} className='w-full h-full flex flex-col items-center'>
        <TabsList className='h-9 my-2 bg-white/35'>
          <TabsTrigger value='template' className='aria-[selected=false]:text-gray-100'>
            Template
          </TabsTrigger>
          <TabsTrigger value='prompt' className='aria-[selected=false]:text-gray-100'>
            Prompt
          </TabsTrigger>
          <TabsTrigger value='generated' className='aria-[selected=false]:text-gray-100' disabled={!isGenerated}>
            Generated
          </TabsTrigger>
        </TabsList>
        {activeTab === 'prompt' ? (
          <></>
        ) : (
          <>
            <div className='w-full bg-white rounded-t-xl flex flex-row justify-between py-3 px-6 border-b'>
              <div className='flex flex-row items-start gap-4'>
                <Avatar className='h-12 w-12 border'>
                  <AvatarImage src={client.logo} alt={client.name} />
                </Avatar>
                <div className='flex flex-col'>
                  <div className='flex flex-row gap-x-1.5 items-baseline'>
                    <p className='text-gray-400'>To:</p>
                    <h1 className='text-lg font-medium'>{customer?.name}</h1>
                    <p className='font-base text-gray-400 text-base'>&lt;{customer?.email}&gt;</p>
                  </div>
                  <div className='flex flex-row gap-x-1.5 items-baseline mb-1'>
                    <p className='font-normal text-sm text-gray-400'>From:</p>
                    <p className='text-sm font-medium'>Ophelos </p>
                    <p className='font-base text-gray-400 text-sm'>&lt;support@ophelos.com&gt;</p>
                  </div>
                  <div className='flex flex-row gap-x-1.5 items-baseline'>
                    <p className='text-gray-400'>Subject:</p>
                    <p className=''>Clear your {client.name} debt today</p>
                  </div>
                </div>
              </div>
              <Button disabled={isGenerated ? false : true}>
                <Send size={16} />
                <span>Send</span>
              </Button>
            </div>
          </>
        )}

        <TabsContent value='template' className='m-0 w-full h-full'>
          <iframe title='email-preview' srcDoc={emailHtml} className='bg-white h-full w-full' />
        </TabsContent>
        <TabsContent value='prompt' className='overflow-scroll  text-white px-6 py-4 w-full h-full'>
          <pre className='whitespace-pre-wrap font-mono text-sm'>{generatedPrompt}</pre>
        </TabsContent>
        <TabsContent value='generated' className='m-0 w-full h-full bg-gray-50'>
          {isLoading ? (
            <div className='flex items-center justify-center h-full'>
              <div className='animate-spin rounded-full h-8 w-8 border-b-2 border-primary'></div>
            </div>
          ) : error ? (
            <div className='text-red-500 p-6'>{error}</div>
          ) : generatedEmail ? (
            <iframe title='generated-email-preview' srcDoc={generatedEmail} className='bg-white h-full w-full' />
          ) : (
            <div className='text-gray-400 text-center'>Generate a template to see the preview</div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Preview;
