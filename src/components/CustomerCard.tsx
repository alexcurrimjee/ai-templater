import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import customersData from '../data/customers.json';

interface Customer {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  debt_amount: string;
  ref_code: string;
}

interface CustomerCardProps {
  customer: Customer | null;
  onEdit: (customer: Customer) => void;
}

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
        <SelectTrigger className='w-full bg-white rounded-lg shadow-none'>
          <SelectValue placeholder='Select a customer'>
            {customer && (
              <div className='flex items-center gap-2'>
                <div className='flex flex-col'>
                  <p className='text-sm font-medium'>
                    {customer.first_name} {customer.last_name}
                  </p>
                </div>
              </div>
            )}
          </SelectValue>
        </SelectTrigger>
        <SelectContent>
          {customersData.customers.map((c) => (
            <SelectItem key={c.id} value={c.id}>
              <div className='flex items-center gap-2'>
                <div className='flex flex-col'>
                  <p className='text-sm font-medium'>
                    {c.first_name} {c.last_name}
                  </p>
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
