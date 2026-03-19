import * as React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './Card';
import { TrendingUp, TrendingDown } from 'lucide-react';

interface StatsCardProps {
  title: string;
  value: string;
  trend?: number;
  icon?: React.ReactNode;
}

export function StatsCard({ title, value, trend, icon }: StatsCardProps) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-gray-400">
          {title}
        </CardTitle>
        {icon && <div className="text-gray-400">{icon}</div>}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold text-white">{value}</div>
        {trend !== undefined && (
          <p className="mt-1 flex items-center text-xs">
            {trend >= 0 ? (
              <span className="text-[var(--color-success)] flex items-center font-medium">
                <TrendingUp className="mr-1 h-3 w-3" />
                +{trend}%
              </span>
            ) : (
              <span className="text-[var(--color-danger)] flex items-center font-medium">
                <TrendingDown className="mr-1 h-3 w-3" />
                {trend}%
              </span>
            )}
            <span className="ml-2 text-gray-500">em relação ao último mês</span>
          </p>
        )}
      </CardContent>
    </Card>
  );
}
