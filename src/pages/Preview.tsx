import { ReactNode } from 'react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { renderToStaticMarkup } from 'react-dom/server';
import { Send } from 'lucide-react';
import { useState, useEffect } from 'react';
import type { Customer } from '../App';

interface PreviewProps {
  emailComponent: ReactNode;
  customer: Customer | null;
  generatedPrompt: string;
  isGenerated: boolean;
}

const getInitials = (name: string | undefined | null): string => {
  if (!name) return '';
  return name
    .split(' ')
    .map((part) => part[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);
};

const Preview = ({ emailComponent, customer, generatedPrompt, isGenerated }: PreviewProps) => {
  const [activeTab, setActiveTab] = useState('template');
  const emailHtml = renderToStaticMarkup(emailComponent);
  const initials = getInitials(customer?.name);

  useEffect(() => {
    if (isGenerated) {
      setActiveTab('generated');
    } else {
      setActiveTab('template');
    }
  }, [isGenerated]);

  return (
    <div className='h-full pt-2 bg-white'>
      <Tabs value={activeTab} onValueChange={setActiveTab} className='w-full h-full flex flex-col items-center'>
        <TabsList className='h-9'>
          <TabsTrigger value='template' className=''>
            Template
          </TabsTrigger>
          <TabsTrigger value='generated' disabled={!isGenerated} className=''>
            Generated
          </TabsTrigger>
        </TabsList>
        <div className='w-full flex flex-row justify-between py-2 px-6 border-b'>
          <div className='flex flex-row items-start gap-4'>
            <Avatar className='h-12 w-12'>
              <AvatarFallback className='bg-primary/10'>{initials}</AvatarFallback>
            </Avatar>
            <div className='flex flex-col'>
              <div className='flex flex-row gap-x-1.5 items-baseline'>
                <p className='text-gray-400'>To:</p>
                <h1 className='text-lg font-medium'>{customer?.name}</h1>
                <p className='font-base text-primary text-base'>&lt;{customer?.email}&gt;</p>
              </div>
              <div className='flex flex-row gap-x-1.5 items-baseline mb-2'>
                <p className='font-normal text-sm text-gray-400'>From:</p>
                <p className='text-sm font-medium'>Ophelos </p>
                <p className='font-base text-primary text-sm'>&lt;support@ophelos.com&gt;</p>
              </div>
              <div className='flex flex-row gap-x-1.5 items-baseline'>
                <p className='text-gray-400'>Subject:</p>
                <p className=''></p>
              </div>
            </div>
          </div>
          <Button disabled={isGenerated ? false : true}>
            <Send size={16} />
            <span>Send</span>
          </Button>
        </div>
        <TabsContent value='template' className='m-0 w-full h-full'>
          <iframe title='email-preview' srcDoc={emailHtml} className='bg-white h-full w-full' />
        </TabsContent>
        <TabsContent value='generated'>
          <pre className='whitespace-pre-wrap font-mono text-sm'>{generatedPrompt}</pre>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Preview;
