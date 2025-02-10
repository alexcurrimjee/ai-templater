import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Avatar, AvatarImage } from '@radix-ui/react-avatar';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { CustomerCard } from '@/components/CustomerCard';
import type { EmailTemplate } from '../App';

interface EditorProps {
  selectedTemplate: EmailTemplate;
  onTemplateChange: (value: EmailTemplate) => void;
  authorName: string;
  authorImage: string;
  reviewText: string;
  onAuthorNameChange: (value: string) => void;
  onAuthorImageChange: (value: string) => void;
  onReviewTextChange: (value: string) => void;
  customer: Customer | null;
  onCustomerChange: (customer: Customer | null) => void;
}

interface Customer {
  id: string;
  name: string;
  company: string;
  email: string;
  phone: string;
  logo: string;
  industry: string;
  debt_amount: string;
}

const Editor = ({
  authorName,
  authorImage,
  reviewText,
  selectedTemplate,
  customer,
  onTemplateChange,
  onAuthorNameChange,
  onAuthorImageChange,
  onReviewTextChange,
  onCustomerChange,
}: EditorProps) => {
  const handleValueChange = (value: string) => {
    if (value === 'octopus' || value === 'clearpay' || value === 'intrum') {
      onTemplateChange(value);
    }
  };
  const handleCustomerChange = () => {
    return onCustomerChange(null);
  };
  return (
    <div className='h-full w-full pt-6 p-10 bg-white flex flex-col'>
      <CustomerCard customer={customer} onEdit={handleCustomerChange} />
      <Tabs value={selectedTemplate} onValueChange={handleValueChange} className='w-full'>
        <TabsList className='w-full h-11 px-1 mb-4'>
          <TabsTrigger className='w-full text-lg gap-3' value='octopus'>
            <Avatar>
              <AvatarImage className='h-5 w-5' src='./src/assets/octopus.png' alt='Octopus' />
            </Avatar>
            Octopus
          </TabsTrigger>
          <TabsTrigger className='w-full text-lg gap-3' value='clearpay'>
            <Avatar>
              <AvatarImage className='h-5 w-5' src='./src/assets/clearpay.png' alt='Clearpay' />
            </Avatar>
            Clearpay
          </TabsTrigger>
          <TabsTrigger className='w-full text-lg gap-3' value='intrum'>
            <Avatar>
              <AvatarImage className='h-5 w-5' src='./src/assets/intrum.png' alt='Intrum' />
            </Avatar>
            Intrum
          </TabsTrigger>
        </TabsList>

        <TabsContent value='octopus'>
          <div className='space-y-4'>
            <div>
              <Label htmlFor='authorName'>Author Name</Label>
              <Input id='authorName' value={authorName} onChange={(e) => onAuthorNameChange(e.target.value)} placeholder='Enter author name...' />
            </div>
            <div>
              <Label htmlFor='authorImage'>Author Image URL</Label>
              <Input id='authorImage' value={authorImage} onChange={(e) => onAuthorImageChange(e.target.value)} placeholder='Enter image URL...' />
            </div>
            <div>
              <Label htmlFor='reviewText'>Review Text</Label>
              <textarea
                id='reviewText'
                value={reviewText}
                onChange={(e) => onReviewTextChange(e.target.value)}
                placeholder='Enter review text...'
                className='flex min-h-[150px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50'
              />
            </div>
          </div>
        </TabsContent>
        <TabsContent value='clearpay'>
          <div className='space-y-4'>{/* Form fields will go here */}</div>
        </TabsContent>
        <TabsContent value='intrum'>
          <div className='space-y-4'>{/* Form fields will go here */}</div>
        </TabsContent>
      </Tabs>
    </div>
  );
};
export default Editor;
