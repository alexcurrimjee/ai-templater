import { ReactNode } from 'react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { renderToStaticMarkup } from 'react-dom/server';

interface PreviewProps {
  emailComponent: ReactNode;
}

const Preview = ({ emailComponent }: PreviewProps) => {
  // Render the email component to a static HTML string.
  const emailHtml = renderToStaticMarkup(emailComponent);

  return (
    <div className='h-full pt-2 bg-white'>
      <Tabs defaultValue='template' className='w-full h-full flex flex-col items-center '>
        <TabsList className='h-9'>
          <TabsTrigger value='template' className=''>
            Template
          </TabsTrigger>
          <TabsTrigger value='generated' disabled className=''>
            Generated
          </TabsTrigger>
        </TabsList>
        <div className='w-full py-4 px-6 border-b'>
          <div className='flex flex-row items-start gap-4'>
            <Avatar className='h-12 w-12'>
              <AvatarImage src='./src/assets/octopus.png' />
              <AvatarFallback>AC</AvatarFallback>
            </Avatar>
            <div className='flex flex-col'>
              <div className='flex flex-row gap-x-1.5 items-baseline'>
                <p className='text-lg text-gray-400'>To:</p>
                <h1 className='text-lg font-medium'>Alexander Currimjee</h1>
                <p className='font-base text-primary text-base'>&lt;alex@ophelos.com&gt;</p>
              </div>
              <div className='flex flex-row gap-x-1.5 items-baseline mb-2'>
                <p className='font-normal text-sm text-gray-400'>From:</p>
                <p className='text-sm font-medium'>Ophelos </p>
                <p className='font-base text-primary text-sm'>&lt;support@ophelos.com&gt;</p>
              </div>
              <div className='flex flex-row gap-x-1.5 items-baseline'>
                <p className='font-normal text-gray-400'>Subject:</p>
                <p className=''></p>
              </div>
            </div>
          </div>
        </div>
        <TabsContent value='template' className='m-0 w-full h-full'>
          <iframe title='email-preview' srcDoc={emailHtml} className='bg-white h-full w-full' />
        </TabsContent>
        <TabsContent value='generated'>Change your password here.</TabsContent>
      </Tabs>
    </div>
  );
};

export default Preview;
