import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Avatar, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Send, Code, ClipboardCopy, Check, Columns2 } from 'lucide-react';
import { useState, useEffect } from 'react';
import type { Customer, Client } from '../App';
import { Drawer, DrawerContent, DrawerTrigger } from '@/components/ui/drawer';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

import GeneratedEmailRenderer from '@/components/GeneratedEmailRenderer';

interface PreviewProps {
  customer: Customer;
  client: Client;
  generatedPrompt: string;
  isGenerated: boolean;
  apiResponse: string;
  isLoading: boolean;
  error: string | null;
  template: string; // Add this
}

const Preview = ({ customer, client, generatedPrompt, template, isGenerated, apiResponse, isLoading, error }: PreviewProps) => {
  const [activeTab, setActiveTab] = useState('template');
  const [codeFormat, setCodeFormat] = useState<'react' | 'html'>('react');
  const [copied, setCopied] = useState(false);
  const [emailHtml, setEmailHtml] = useState<string>('');

  const handleHtmlRender = (html: string) => {
    setEmailHtml(html); // Save the generated email HTML
  };

  const handleCopy = async () => {
    const code = codeFormat === 'react' ? apiResponse : emailHtml;

    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

  useEffect(() => {
    if (isGenerated) {
      setActiveTab('generated');
    } else {
      setActiveTab('template');
    }
  }, [isGenerated]);

  return (
    <div className='h-full bg-container-dark'>
      <Drawer>
        <TooltipProvider>
          <Tabs
            value={activeTab}
            onValueChange={setActiveTab}
            className={`w-full ${activeTab === 'prompt' || activeTab === 'code' ? 'h-screen' : 'h-full'} flex flex-col items-center`}>
            <div className='realtive w-full h-12 shrink-0 flex flex-row justify-center items-center gap-4'>
              <TabsList className='h-8 p-0 bg-white/0 border border-white/35 overflow-hidden rounded-md'>
                <TabsTrigger
                  value='template'
                  className='aria-[selected=false]:text-gray-100 aria-[selected=false]:hover:bg-white/10 data-[state="active"]:bg-white/20! data-[state="active"]:text-white! h-full py-0 px-5 rounded-none'>
                  Template
                </TabsTrigger>
                <TabsTrigger
                  value='prompt'
                  className='aria-[selected=false]:text-gray-100 aria-[selected=false]:hover:bg-white/10 data-[state="active"]:bg-white/20! data-[state="active"]:text-white! h-full py-0 px-5 rounded-none'>
                  Prompt
                </TabsTrigger>
              </TabsList>
              <TabsList className={`${!isGenerated && 'hidden'} h-8 p-0 bg-white/0 border border-white/35 overflow-hidden rounded-md`}>
                <TabsTrigger
                  value='generated'
                  className='aria-[selected=false]:text-gray-100 aria-[selected=false]:hover:bg-white/10 data-[state="active"]:bg-white/20! data-[state="active"]:text-white! h-full py-0 px-5 rounded-none'
                  disabled={!isGenerated}>
                  ✨ Generated ✨
                </TabsTrigger>
                <TabsTrigger
                  value='code'
                  className='aria-[selected=false]:text-gray-100 aria-[selected=false]:hover:bg-white/10 data-[state="active"]:bg-white/20! data-[state="active"]:text-white! h-full py-0 px-5 rounded-none'
                  disabled={!isGenerated}>
                  <Code size={16} />
                </TabsTrigger>
              </TabsList>

              <div className={`${!isGenerated && 'hidden'} absolute right-4 top-2 dark`}>
                <Tooltip delayDuration={10}>
                  <TooltipTrigger>
                    <DrawerTrigger>
                      <Button variant='secondary' size='sm' className='dark border border-white/25 bg-white/0 hover:bg-white/20'>
                        <Columns2 size={16} />
                      </Button>
                    </DrawerTrigger>
                  </TooltipTrigger>
                  <TooltipContent side='left' sideOffset={14} className='bg-white text-black border shadow-sm'>
                    Side-by-side comparison
                  </TooltipContent>
                </Tooltip>
              </div>
            </div>

            {activeTab === 'prompt' || activeTab === 'code' ? (
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
                        <h1 className='text-lg font-medium'>
                          {customer?.first_name} {customer?.last_name}
                        </h1>
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
              <GeneratedEmailRenderer code={template} customer={customer} client={client} />
            </TabsContent>
            <TabsContent value='prompt' className='text-white px-6 pb-6 w-full h-full overflow-auto no-scrollbar'>
              <pre className='whitespace-pre-wrap font-mono text-sm'>{generatedPrompt}</pre>
            </TabsContent>
            <TabsContent value='generated' className='m-0 w-full h-full bg-gray-50'>
              {isLoading ? (
                <div className='flex items-center justify-center h-full'>
                  <div className='animate-spin rounded-full h-8 w-8 border-b-2 border-primary'></div>
                </div>
              ) : error ? (
                <div className='text-red-500 p-6'>{error}</div>
              ) : apiResponse ? (
                /* Generate the email using API reponse here component */
                <GeneratedEmailRenderer code={apiResponse} customer={customer} client={client} />
              ) : (
                <div className='text-gray-400 text-center'>Generate a template to see the preview</div>
              )}
            </TabsContent>
            <TabsContent value='code' className='text-white w-full border border-white/25 rounded-lg overflow-hidden max-w-2xl'>
              <Tabs defaultValue='react' onValueChange={(value) => setCodeFormat(value as 'react' | 'html')} className='w-full'>
                <div className='flex justify-between items-center mb-0 border-b border-white/15'>
                  <TabsList className='h-10 p-0 bg-white/0'>
                    <TabsTrigger
                      value='react'
                      className='aria-[selected=false]:text-gray-100 aria-[selected=false]:hover:bg-white/10 data-[state="active"]:bg-white/20! data-[state="active"]:text-white! h-full py-0 px-5 rounded-none'>
                      React Email
                    </TabsTrigger>
                    <TabsTrigger
                      value='html'
                      className='aria-[selected=false]:text-gray-100 aria-[selected=false]:hover:bg-white/10 data-[state="active"]:bg-white/20! data-[state="active"]:text-white! h-full py-0 px-5 rounded-none'>
                      HTML
                    </TabsTrigger>
                  </TabsList>

                  <Tooltip delayDuration={10}>
                    <TooltipTrigger>
                      <DrawerTrigger>
                        <Button variant='secondary' size='sm' className='dark bg-white/15 hover:bg-white/25 mr-1' onClick={handleCopy}>
                          {copied ? <Check size={16} /> : <ClipboardCopy size={16} />}
                        </Button>
                      </DrawerTrigger>
                    </TooltipTrigger>
                    <TooltipContent side='right' sideOffset={14} className='bg-white text-black border shadow-sm'>
                      Copy to Clipboard
                    </TooltipContent>
                  </Tooltip>
                </div>

                <TabsContent value='react' className='m-0'>
                  <div className='bg-white/5 rounded-lg p-4 overflow-y-scroll h-[calc(100vh-8rem)] no-scrollbar'>
                    <pre className='whitespace-pre-wrap font-mono text-sm'>{apiResponse}</pre>
                  </div>
                </TabsContent>

                <TabsContent value='html' className='m-0'>
                  <div className='bg-white/5 rounded-lg p-4 overflow-y-scroll h-[calc(100vh-8rem)] no-scrollbar'>
                    <pre className='whitespace-pre-wrap font-mono text-sm'>
                      <GeneratedEmailRenderer
                        code={apiResponse}
                        customer={customer}
                        client={client}
                        returnHTML={true}
                        onHtmlRender={handleHtmlRender}
                      />
                    </pre>
                  </div>
                </TabsContent>
              </Tabs>
            </TabsContent>
          </Tabs>
        </TooltipProvider>

        <DrawerContent className='h-[calc(100vh-3rem)]'>
          <div className='bg-white p-0 flex flex-row h-full'>
            <div className='w-1/2 h-full flex flex-col items-center'>
              <p className='text-center text-md font-medium px-4 py-0.5 bg-gray-100 rounded-full mb-2'>Template</p>
              <GeneratedEmailRenderer code={template} customer={customer} client={client} />
            </div>
            <div className='w-1/2 h-full flex flex-col items-center'>
              <p className='text-center text-md font-medium px-4 py-0.5 bg-orange-100 rounded-full mb-2'>Generated</p>
              <GeneratedEmailRenderer code={apiResponse} customer={customer} client={client} />
            </div>
          </div>
        </DrawerContent>
      </Drawer>
    </div>
  );
};

export default Preview;
