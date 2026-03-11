"use client";

import { Card, CardContent} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function CustomersPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold">Customers</h1>
          <p className="text-muted-foreground">Manage your customer directory</p>
        </div>
        <Button>Add Customer</Button>
      </div>

      <Card>
        <CardContent className="pt-6">
          <p className="text-muted-foreground text-center py-8">
            No customers yet. Add your first customer to get started.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
