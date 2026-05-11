import React, { useState } from 'react';
import { 
  XAxis, YAxis, CartesianGrid, Tooltip,
  BarChart, Bar, Legend, ResponsiveContainer
} from 'recharts';
import { Bell, ChevronDown, ListChecks, CheckCircle2, Clock, AlertTriangle, ChevronRight } from 'lucide-react';
import { barData, mockTasks } from '../../data/mock';
import { cn } from '../../lib/utils';

interface Props {
  onTaskSelect: (id: string) => void;
}

export default function Dashboard({ onTaskSelect }: Props) {
  const [year, setYear] = useState('2024年度');

  // Stats
  const total = mockTasks.length;
  const inProgress = mockTasks.filter(t => t.status === '进行中').length;
  const completed = mockTasks.filter(t => t.status === '已完成').length;
  const delayedTasks = mockTasks.filter(t => t.status === '滞后');
  const warnings = delayedTasks.length;

  return (
    <div className="flex flex-col min-h-full">
      {/* Header & Filters */}
      <div className="bg-blue-600 px-4 pt-12 pb-6 text-white sticky top-0 z-30 shadow-md">
        <h1 className="text-xl font-bold tracking-tight mb-4">督办全景看板</h1>
        <div className="flex space-x-3">
          <button className="flex-1 bg-white/20 hover:bg-white/30 transition-colors rounded-full py-1.5 px-3 flex items-center justify-between text-sm backdrop-blur-sm border border-white/10">
            <span>{year}</span>
            <ChevronDown className="w-4 h-4 opacity-70" />
          </button>
        </div>
      </div>

      <div className="p-4 space-y-4">
        {/* KPI Cards */}
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100/50 relative overflow-hidden">
            <div className="absolute top-0 right-0 p-3 opacity-10">
              <ListChecks className="w-12 h-12 text-blue-600" />
            </div>
            <p className="text-gray-500 text-xs font-medium mb-1">项目总数</p>
            <p className="text-2xl font-bold text-gray-900">{total}</p>
          </div>
          <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100/50 relative overflow-hidden">
            <div className="absolute top-0 right-0 p-3 opacity-10">
              <Clock className="w-12 h-12 text-blue-600" />
            </div>
            <p className="text-gray-500 text-xs font-medium mb-1">进行中</p>
            <p className="text-2xl font-bold text-blue-600">{inProgress}</p>
          </div>
          <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100/50 relative overflow-hidden">
            <div className="absolute top-0 right-0 p-3 opacity-10">
              <CheckCircle2 className="w-12 h-12 text-emerald-600" />
            </div>
            <p className="text-gray-500 text-xs font-medium mb-1">已完成</p>
            <p className="text-2xl font-bold text-emerald-600">{completed}</p>
          </div>
          <div className="bg-red-50 rounded-2xl p-4 shadow-sm border border-red-100 relative overflow-hidden">
            <div className="absolute top-0 right-0 p-3 opacity-10">
              <AlertTriangle className="w-12 h-12 text-red-600" />
            </div>
            <p className="text-red-700 text-xs font-medium mb-1">逾期预警</p>
            <p className="text-2xl font-bold text-red-600">{warnings}</p>
          </div>
        </div>

        {/* Alerts List */}
        {delayedTasks.length > 0 && (
          <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
            <div className="flex items-center space-x-2 mb-4 pb-2 border-b border-gray-50">
              <Bell className="w-4 h-4 text-orange-500" />
              <h2 className="text-[15px] font-bold text-gray-800">滞后任务预警</h2>
            </div>
            <div className="space-y-3">
              {delayedTasks.map(task => (
                <div 
                  key={task.id}
                  className="bg-orange-50/50 border border-orange-100 rounded-xl p-3 flex items-center justify-between space-x-3"
                >
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center space-x-2 text-xs mb-1">
                      <span className="text-orange-600 font-medium bg-orange-100 px-1.5 py-0.5 rounded">
                        {task.no.replace('RW-', '')}
                      </span>
                      <span className="text-gray-500">{task.department}</span>
                    </div>
                    <p className="text-sm text-gray-800 font-medium line-clamp-1">
                      {task.target}
                    </p>
                  </div>
                  <button 
                    onClick={() => onTaskSelect(task.id)}
                    className="flex-shrink-0 text-xs font-medium text-orange-700 bg-orange-200/50 px-3 py-1.5 rounded-md active:scale-95 transition-transform"
                  >
                    查看
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Charts */}
        <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
          <h2 className="text-[15px] font-bold text-gray-800 mb-4 pb-2 border-b border-gray-50">部门执行情况</h2>
          <div className="h-64 w-full -ml-4">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart layout="vertical" data={barData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" horizontal={false} vertical={true} stroke="#f3f4f6" />
                <XAxis type="number" tick={{ fill: '#9ca3af', fontSize: 11 }} axisLine={false} tickLine={false} />
                <YAxis dataKey="name" type="category" tick={{ fill: '#9ca3af', fontSize: 11 }} axisLine={false} tickLine={false} width={60} />
                <Tooltip cursor={{fill: 'transparent'}} />
                <Legend iconType="circle" wrapperStyle={{ fontSize: '11px', paddingTop: '10px' }} />
                <Bar dataKey="已完成" stackId="a" fill="#10b981" radius={[4, 0, 0, 4]} barSize={20} />
                <Bar dataKey="进行中" stackId="a" fill="#3b82f6" />
                <Bar dataKey="逾期" stackId="a" fill="#ef4444" radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

    </div>
  );
}
