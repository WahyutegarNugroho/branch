'use client'

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'

export function AnalyticsChart({ data }: { data: any[] }) {
  if (!data || data.length === 0) {
    return <div className="h-[300px] flex items-center justify-center text-zinc-500 font-medium">No data available yet</div>
  }

  return (
    <div className="h-[300px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={data}
          margin={{
            top: 20,
            right: 0,
            left: -20,
            bottom: 0,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255, 255, 255, 0.05)" />
          <XAxis 
            dataKey="name" 
            axisLine={false}
            tickLine={false}
            tick={{ fill: '#a1a1aa', fontSize: 12 }}
            dy={10}
          />
          <YAxis 
            axisLine={false}
            tickLine={false}
            tick={{ fill: '#a1a1aa', fontSize: 12 }}
          />
          <Tooltip 
            cursor={{ fill: 'rgba(255, 255, 255, 0.03)' }}
            contentStyle={{ 
              borderRadius: '16px', 
              border: '1px solid rgba(255, 255, 255, 0.1)', 
              backgroundColor: '#09090b',
              color: '#ffffff',
              boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.3)' 
            }}
          />
          <Bar dataKey="views" name="Views" fill="#ec4899" radius={[4, 4, 0, 0]} />
          <Bar dataKey="clicks" name="Clicks" fill="#f97316" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}
