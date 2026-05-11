import React, { useState } from 'react';
import { LayoutDashboard, ListTodo } from 'lucide-react';
import { cn } from './lib/utils';
import Dashboard from './components/views/Dashboard';
import TaskList from './components/views/TaskList';
import TaskDetail from './components/views/TaskDetail';

export type TabType = 'dashboard' | 'tasks';

export default function App() {
  const [activeTab, setActiveTab] = useState<TabType>('dashboard');
  const [selectedTaskId, setSelectedTaskId] = useState<string | null>(null);

  const handleTaskSelect = (taskId: string) => {
    setSelectedTaskId(taskId);
  };

  const handleBack = () => {
    setSelectedTaskId(null);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center font-sans antialiased text-gray-900">
      {/* Mobile Frame Container */}
      <div className="w-full h-screen sm:w-[414px] sm:h-[896px] sm:rounded-[3rem] sm:border-[8px] border-gray-900 sm:shadow-2xl overflow-hidden bg-gray-50 flex flex-col relative select-none">

        {/* View Router */}
        <div className="flex-1 overflow-auto bg-gray-50/50 pb-20 scroll-smooth">
          {activeTab === 'dashboard' ? (
            <Dashboard onTaskSelect={handleTaskSelect} />
          ) : (
            <TaskList onTaskSelect={handleTaskSelect} />
          )}
        </div>

        {/* Bottom Navigation */}
        <div className="absolute bottom-0 w-full h-16 bg-white/90 backdrop-blur-md border-t border-gray-200 flex items-center justify-around z-40 pb-safe">
          <button
            onClick={() => setActiveTab('dashboard')}
            className={cn(
              "flex flex-col items-center justify-center w-full h-full space-y-1 transition-colors",
              activeTab === 'dashboard' ? "text-blue-600" : "text-gray-400 hover:text-gray-600"
            )}
          >
            <LayoutDashboard className="w-6 h-6" />
            <span className="text-[10px] font-medium tracking-wide">全景看板</span>
          </button>
          <button
            onClick={() => setActiveTab('tasks')}
            className={cn(
              "flex flex-col items-center justify-center w-full h-full space-y-1 transition-colors",
              activeTab === 'tasks' ? "text-blue-600" : "text-gray-400 hover:text-gray-600"
            )}
          >
            <ListTodo className="w-6 h-6" />
            <span className="text-[10px] font-medium tracking-wide">任务清单</span>
          </button>
        </div>

        {/* Detail View Overlay */}
        {selectedTaskId && (
          <div className="absolute inset-0 bg-gray-50 z-50 transform transition-transform duration-300">
            <TaskDetail taskId={selectedTaskId} onBack={handleBack} />
          </div>
        )}
      </div>
    </div>
  );
}
