import { RetailerShell } from '@/components/retailer-shell';
import { CustomersTable } from '@/components/customers-table';
import { getCustomers } from '@/lib/db';

export default function CustomersPage() {
  const customers = getCustomers();
  return (
    <RetailerShell
      title="Customer intelligence"
      description="Prioritize growers with churn risk and re-enrollment opportunities."
    >
      <CustomersTable customers={customers} />
    </RetailerShell>
  );
}
