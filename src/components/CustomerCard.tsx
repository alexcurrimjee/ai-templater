import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import customersData from '../data/customers.json';

interface Customer {
  id: string;
  name: string;
  email: string;
  debt_amount: string;
  ref_code: string;
}

interface CustomerCardProps {
  customer: Customer | null;
  onEdit: (customer: Customer) => void;
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
  const handleValueChange = (customerId: string) => {
    const selectedCustomer = customersData.customers.find((c) => c.id === customerId);
    if (selectedCustomer) {
      onEdit(selectedCustomer);
    }
  };

  return (
    <div className='w-full'>
      <Select defaultValue={customer?.id} onValueChange={handleValueChange}>
        <SelectTrigger className='w-full bg-white'>
          <SelectValue placeholder='Select a customer'>
            {customer && (
              <div className='flex items-center gap-2'>
                <div className='flex flex-col'>
                  <p className='text-sm font-medium'>{customer.name}</p>
                </div>
              </div>
            )}
          </SelectValue>
        </SelectTrigger>
        <SelectContent>
          {customersData.customers.map((c) => (
            <SelectItem key={c.id} value={c.id}>
              <div className='flex items-center gap-2'>
                <Avatar className='h-8 w-8'>
                  <AvatarFallback className='text-xs bg-primary/15'>{getInitials(c.name)}</AvatarFallback>
                </Avatar>
                <div className='flex flex-col'>
                  <p className='text-sm font-medium'>{c.name}</p>
                  <p className='text-sm text-gray-400'>{c.email}</p>
                </div>
              </div>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
