import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarImage } from '@/components/ui/avatar';

interface Customer {
  id: string;
  name: string;
  company: string;
  email: string;
  phone: string;
  logo: string;
}

interface CustomerCardProps {
  customer: Customer | null;
  onEdit: () => void;
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

export function CustomerCard({ customer, onEdit }: CustomerCardProps) {
  if (!customer) return null;

  const initials = getInitials(customer.name);
  const displayName = `${customer.name} - ${customer.company}`;

  return (
    <Card className='w-full mb-6 border-gray-200 shadow-none'>
      <CardContent className='p-4 flex justify-between items-center'>
        <div className='flex items-center gap-4'>
          <Avatar className='h-11 w-11'>
            <AvatarImage src={customer.logo} />
          </Avatar>
          <div className='flex flex-col'>
            <p className='text-xl font-medium'>{customer.name}</p>
            <p className='text-lg text-gray-400 font-light'>{customer.company}</p>
          </div>
        </div>
        <Button variant='ghost' size='sm' onClick={onEdit}>
          Edit
        </Button>
      </CardContent>
    </Card>
  );
}
