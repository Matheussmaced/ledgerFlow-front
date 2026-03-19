import * as React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './Card';

interface ChartCardProps {
  title: string;
  description?: string;
  children: React.ReactNode;
  action?: React.ReactNode;
}

export function ChartCard({ title, description, children, action }: ChartCardProps) {
  return (
    <Card className="flex flex-col h-full">
      <CardHeader className="flex flex-row items-center justify-between pb-6">
        <div className="flex flex-col space-y-1">
          <CardTitle className="text-base font-semibold">{title}</CardTitle>
          {description && <p className="text-sm text-gray-400">{description}</p>}
        </div>
        {action && <div>{action}</div>}
      </CardHeader>
      <CardContent className="flex-1 w-full p-0">
        <div className="w-full h-[300px]">
          {children}
        </div>
      </CardContent>
    </Card>
  );
}
