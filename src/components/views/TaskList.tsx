import React, { useState } from 'react';
import { Search, Plus, SlidersHorizontal, ChevronRight, Hash, X } from 'lucide-react';
import { mockTasks } from '../../data/mock';
import { cn } from '../../lib/utils';
import { TaskStatus } from '../../types';

interface Props {
  onTaskSelect: (id: string) => void;
}

const TABS: Array<{ label: string, value: TaskStatus | '全部' }> = [
  { label: '全部', value: '全部' },
  { label: '未开始', value: '未开始' },
  { label: '进行中', value: '进行中' },
  { label: '已完成', value: '已完成' },
  { label: '滞后', value: '滞后' },
];

export default function TaskList({ onTaskSelect }: Props) {
  const [activeTab, setActiveTab] = useState<TaskStatus | '全部'>('全部');
  const [searchQuery, setSearchQuery] = useState('');
  
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [filterYear, setFilterYear] = useState('2024年度');
  const [filterLeader, setFilterLeader] = useState('');
  const [filterCategory, setFilterCategory] = useState('');

  const filteredTasks = mockTasks.filter(task => {
    const matchTab = activeTab === '全部' || task.status === activeTab;
    const matchSearch = task.target.includes(searchQuery) || task.category.includes(searchQuery) || task.department.includes(searchQuery);
    const matchLeader = !filterLeader || task.leader === filterLeader;
    const matchCategory = !filterCategory || task.category === filterCategory;
    
    return matchTab && matchSearch && matchLeader && matchCategory;
  });

  const getStatusColor = (status: TaskStatus) => {
    switch (status) {
      case '进行中': return 'bg-blue-100 text-blue-700 border-blue-200';
      case '已完成': return 'bg-emerald-100 text-emerald-700 border-emerald-200';
      case '滞后': return 'bg-red-100 text-red-700 border-red-200';
      case '未开始': return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  return (
    <div className="flex flex-col min-h-full">
      {/* Header & Search */}
      <div className="bg-white px-4 pt-12 pb-3 sticky top-0 z-30 shadow-sm border-b border-gray-100">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold tracking-tight text-gray-900">任务清单</h1>
        </div>

        <div className="flex items-center space-x-2">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input 
              type="text" 
              placeholder="搜索项目关键字..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-gray-100 border-none rounded-xl py-2 pl-9 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50"
            />
          </div>
          <button 
            onClick={() => setIsFilterOpen(true)}
            className={cn(
              "w-9 h-9 flex items-center justify-center rounded-xl flex-shrink-0 transition-colors",
              filterLeader || filterCategory ? "bg-blue-100 text-blue-600" : "bg-gray-100 text-gray-600"
            )}
          >
            <SlidersHorizontal className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* TABS */}
      <div className="bg-white/80 backdrop-blur-md sticky top-[120px] z-20 border-b border-gray-100 py-2">
        <div className="flex overflow-x-auto hide-scrollbar px-4 space-x-6">
          {TABS.map(tab => (
            <button
              key={tab.label}
              onClick={() => setActiveTab(tab.value)}
              className={cn(
                "whitespace-nowrap pb-2 text-sm font-medium border-b-2 transition-colors relative",
                activeTab === tab.value 
                  ? "text-blue-600 border-blue-600" 
                  : "text-gray-500 border-transparent hover:text-gray-700"
              )}
            >
              <div className="flex items-center space-x-1.5">
                <span>{tab.label}</span>
                {tab.value === '滞后' && (
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
                  </span>
                )}
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* List */}
      <div className="p-4 space-y-4">
        {filteredTasks.length === 0 && (
          <div className="text-center py-20 text-gray-400 text-sm">
            没有查找到相关任务
          </div>
        )}
        {filteredTasks.map(task => (
          <div 
            key={task.id} 
            onClick={() => onTaskSelect(task.id)}
            className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100/50 active:scale-[0.98] transition-transform"
          >
            <div className="flex justify-between items-start mb-3">
              <div className="flex items-center space-x-2">
                <span className="text-[10px] border border-blue-200 text-blue-600 px-2 py-0.5 rounded">
                  {task.category}
                </span>
              </div>
              <span className={cn("text-[10px] px-2 py-0.5 rounded font-medium border", getStatusColor(task.status))}>
                {task.status}
              </span>
            </div>
            
            <h3 className="text-[15px] font-bold text-gray-900 leading-snug mb-3 line-clamp-2">
              {task.target}
            </h3>
            
            <div className="flex justify-between items-end border-t border-gray-50 pt-3 mt-1">
              <div className="space-y-1 text-xs">
                <div className="flex items-center space-x-1">
                  <span className="text-gray-400">责任领导:</span>
                  <span className="text-gray-700 font-medium">{task.leader}</span>
                </div>
                <div className="flex items-center space-x-1 text-gray-500">
                  <span className="text-gray-400">主责部门:</span>
                  <span className="truncate max-w-[120px]">{task.department}</span>
                </div>
                {task.coDepartments && task.coDepartments.length > 0 && (
                  <div className="flex items-center space-x-1 text-gray-500">
                    <span className="text-gray-400">协办部门:</span>
                    <span className="truncate max-w-[120px]">{task.coDepartments.join('、')}</span>
                  </div>
                )}
              </div>
              <ChevronRight className="w-5 h-5 text-gray-300" />
            </div>
          </div>
        ))}
      </div>

      {/* Filter Bottom Sheet */}
      {isFilterOpen && (
        <div className="fixed inset-0 z-[60] flex items-end justify-center pointer-events-none">
          <div className="w-full h-full sm:w-[414px] sm:h-[896px] relative pointer-events-none flex flex-col justify-end overflow-hidden sm:rounded-[3rem]">
            {/* Backdrop */}
            <div 
              className="absolute inset-0 bg-black/40 pointer-events-auto transition-opacity"
              onClick={() => setIsFilterOpen(false)}
            />
            {/* Sheet */}
            <div className="relative w-full bg-white rounded-t-3xl p-6 pointer-events-auto animate-in slide-in-from-bottom-full duration-300 shadow-[0_-10px_40px_rgba(0,0,0,0.1)]">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-bold text-gray-900">综合筛选</h3>
                <button onClick={() => setIsFilterOpen(false)} className="p-1 active:bg-gray-100 rounded-md text-gray-400">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-5">
                {/* 年份预设 */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">所属年度 (年)</label>
                  <select 
                    value={filterYear}
                    onChange={(e) => setFilterYear(e.target.value)}
                    className="w-full bg-gray-50 border border-gray-200 text-gray-900 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50 appearance-none"
                  >
                    <option value="2024年度">2024年</option>
                    <option value="2023年度">2023年</option>
                    <option value="2022年度">2022年</option>
                  </select>
                </div>

                {/* 责任领导 */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">责任高管</label>
                  <select 
                    value={filterLeader}
                    onChange={(e) => setFilterLeader(e.target.value)}
                    className="w-full bg-gray-50 border border-gray-200 text-gray-900 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50 appearance-none"
                  >
                    <option value="">全部领导</option>
                    <option value="张书记">张书记</option>
                    <option value="李院长">李院长</option>
                    <option value="王副院长">王副院长</option>
                    <option value="刘副院长">刘副院长</option>
                    <option value="张副院长">张副院长</option>
                    <option value="刘总会计师">刘总会计师</option>
                  </select>
                </div>

                {/* 栏目分类 */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">任务分类</label>
                  <select 
                    value={filterCategory}
                    onChange={(e) => setFilterCategory(e.target.value)}
                    className="w-full bg-gray-50 border border-gray-200 text-gray-900 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50 appearance-none"
                  >
                    <option value="">全部分类</option>
                    <option value="党的建设">党的建设</option>
                    <option value="医疗质量">医疗质量</option>
                    <option value="科研创新">科研创新</option>
                    <option value="运营管理">运营管理</option>
                    <option value="人才培养">人才培养</option>
                    <option value="信息化建设">信息化建设</option>
                    <option value="后勤保障">后勤保障</option>
                  </select>
                </div>
              </div>

              <div className="mt-8 flex space-x-3 pb-safe">
                <button 
                  onClick={() => {
                    setFilterYear('2024年度');
                    setFilterLeader('');
                    setFilterCategory('');
                  }}
                  className="flex-[1] py-3 bg-gray-100 active:bg-gray-200 transition-colors text-gray-700 rounded-xl font-medium text-[15px]"
                >
                  重置
                </button>
                <button 
                  onClick={() => setIsFilterOpen(false)} 
                  className="flex-[2] py-3 bg-blue-600 active:bg-blue-700 transition-colors text-white rounded-xl font-medium text-[15px] shadow-sm shadow-blue-600/20"
                >
                  查看结果 ({filteredTasks.length})
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
