'use client';

import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis, CartesianGrid } from 'recharts';

interface EngagementChartProps {
  data: Array<{ week: string; installs: number; reenrolls: number }>;
}

export function EngagementChart({ data }: EngagementChartProps) {
  return (
    <div className="h-72 w-full">
      <ResponsiveContainer>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" className="stroke-slate-200" />
          <XAxis dataKey="week" tickLine={false} axisLine={false} minTickGap={16} />
          <YAxis tickLine={false} axisLine={false} />
          <Tooltip
            contentStyle={{
              borderRadius: '12px',
              border: '1px solid #CBD5F5',
              boxShadow: '0 10px 30px rgba(15, 23, 42, 0.08)'
            }}
          />
          <Line type="monotone" dataKey="installs" stroke="#2E7D32" strokeWidth={3} dot={false} />
          <Line type="monotone" dataKey="reenrolls" stroke="#38BDF8" strokeWidth={3} dot={false} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
