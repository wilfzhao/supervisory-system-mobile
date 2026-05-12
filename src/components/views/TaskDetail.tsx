import React, { useState } from 'react';
import { ChevronLeft, FileText, CheckCircle2, Clock, PlayCircle, MessageSquarePlus, PenLine, Paperclip, CheckCircle, ClipboardCheck, MessageSquareMore, Plus, X, LayoutList } from 'lucide-react';
import { mockTasks } from '../../data/mock';
import { cn } from '../../lib/utils';
import { TaskStatus } from '../../types';

interface Props {
  taskId: string;
  onBack: () => void;
}

export default function TaskDetail({ taskId, onBack }: Props) {
  const [activeSegment, setActiveSegment] = useState<'概况' | '阶段' | '记录'>('概况');
  const [phases, setPhases] = useState(() => {
    const t = mockTasks.find(task => task.id === taskId);
    return t?.phases || [];
  });

  const [isAddingPhase, setIsAddingPhase] = useState(false);
  const [newPhase, setNewPhase] = useState({
    name: '第一季度',
    content: '',
    kpi: '',
    deadline: '2024-03-31'
  });

  const task = mockTasks.find(t => t.id === taskId);

  if (!task) return null;

  const openAddPhaseModal = () => {
    const phaseOrder = ['第一季度', '第二季度', '第三季度', '第四季度'];
    const nextAvailablePhase = phaseOrder.find(q => !phases.some(p => p.name === q));
    
    if (nextAvailablePhase) {
      const idx = phaseOrder.indexOf(nextAvailablePhase);
      const deadlines = ['2024-03-31', '2024-06-30', '2024-12-31', '2024-12-31']; // Fix last two
      // Corrected deadlines logic
      const deadlineMap: Record<string, string> = {
        '第一季度': '2024-03-31',
        '第二季度': '2024-06-30',
        '第三季度': '2024-09-30',
        '第四季度': '2024-12-31'
      };

      setNewPhase({
        name: nextAvailablePhase,
        content: '',
        kpi: '',
        deadline: deadlineMap[nextAvailablePhase]
      });
      setIsAddingPhase(true);
    }
  };

  const handleAddPhase = () => {
    const phaseOrder = ['第一季度', '第二季度', '第三季度', '第四季度'];
    const currentIdx = phaseOrder.indexOf(newPhase.name);
    const nextPhaseName = phaseOrder[Math.min(currentIdx + 1, 3)];
    const nextDeadline = currentIdx === 0 ? '2024-06-30' : currentIdx === 1 ? '2024-09-30' : '2024-12-31';

    const phase = {
      id: Math.random().toString(36).substr(2, 9),
      ...newPhase,
      status: '未开始' as any
    };
    setPhases([...phases, phase]);
    setIsAddingPhase(false);
    setNewPhase({
      name: nextPhaseName,
      content: '',
      kpi: '',
      deadline: nextDeadline
    });
  };

  const getStatusColor = (status: TaskStatus) => {
    switch (status) {
      case '进行中': return 'bg-blue-600 text-white';
      case '已完成': return 'bg-emerald-600 text-white';
      case '滞后': return 'bg-red-600 text-white';
      case '未开始': return 'bg-gray-400 text-white';
    }
  };

  const getPhaseIcon = (status: string) => {
    switch (status) {
      case '已完成': return <CheckCircle2 className="w-5 h-5 text-emerald-500" />;
      case '进行中': return <PlayCircle className="w-5 h-5 text-blue-500" />;
      case '待审核': return <Clock className="w-5 h-5 text-orange-500" />;
      default: return <div className="w-5 h-5 rounded-full border-2 border-gray-300" />;
    }
  };

  return (
    <div className="flex flex-col h-full bg-gray-50">
      {/* App Bar */}
      <div className="bg-white px-4 pt-12 pb-3 sticky top-0 z-40 shadow-sm flex items-center justify-between">
        <button onClick={onBack} className="p-1 -ml-1 text-gray-700 active:bg-gray-100 rounded-lg">
          <ChevronLeft className="w-6 h-6" />
        </button>
        <div className="font-semibold text-gray-900">督办详情</div>
        <div className="w-8" /> {/* Spacer to keep title centered */}
      </div>

      {/* Segmented Control */}
      <div className="bg-white px-4 py-2 border-b border-gray-100 sticky top-[88px] z-30">
        <div className="flex p-1 bg-gray-100 rounded-lg">
          {['概况', '阶段', '记录'].map(seg => (
            <button
              key={seg}
              onClick={() => setActiveSegment(seg as any)}
              className={cn(
                "flex-1 text-sm font-medium py-1.5 rounded-md transition-all",
                activeSegment === seg ? "bg-white text-gray-900 shadow-sm" : "text-gray-500"
              )}
            >
              {seg}
            </button>
          ))}
        </div>
      </div>

      <div className="flex-1 overflow-auto pb-6">
        {activeSegment === '概况' && (
          <div className="p-4 space-y-4 animate-in fade-in slide-in-from-bottom-2 duration-300">
            {/* Header Info */}
            <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100/50">
              <div className="flex justify-between items-start mb-3">
                <span className={cn("text-xs px-2.5 py-1 rounded-md font-medium", getStatusColor(task.status))}>
                  {task.status}
                </span>
                <span className="text-xs text-gray-400">{task.no}</span>
              </div>
              <h2 className="text-lg font-bold text-gray-900 leading-snug mb-4">
                {task.target}
              </h2>
              
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-y-3 gap-x-4 text-sm">
                  <div>
                    <p className="text-gray-400 text-xs mb-0.5">任务分类</p>
                    <p className="font-medium text-gray-800">{task.category}</p>
                  </div>
                  <div>
                    <p className="text-gray-400 text-xs mb-0.5">责任院领导</p>
                    <p className="font-medium text-gray-800">{task.leader}</p>
                  </div>
                  <div className="col-span-2">
                    <p className="text-gray-400 text-xs mb-0.5">主责部门</p>
                    <p className="font-medium text-gray-800">{task.department}</p>
                  </div>
                  <div className="col-span-2">
                    <p className="text-gray-400 text-xs mb-0.5">协同部门</p>
                    <p className="font-medium text-gray-800">{task.coDepartments.length ? task.coDepartments.join('、') : '无'}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeSegment === '阶段' && (
          <div className="p-4 space-y-3 animate-in fade-in slide-in-from-bottom-2 duration-300">
            {phases.length === 0 ? (
              <div className="bg-white rounded-2xl p-10 border-2 border-dashed border-gray-100 flex flex-col items-center justify-center text-center">
                <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mb-4">
                  <LayoutList className="w-8 h-8 text-blue-500" />
                </div>
                <h3 className="text-gray-900 font-bold mb-1">尚未进行阶段拆解</h3>
                <p className="text-gray-400 text-xs mb-6 max-w-[200px]">请将年度任务拆解至具体季度，并明确考核指标</p>
                <button 
                  onClick={openAddPhaseModal}
                  disabled={phases.length >= 4}
                  className="bg-blue-600 active:bg-blue-700 disabled:opacity-50 disabled:bg-gray-300 text-white px-8 py-3 rounded-xl text-sm font-bold shadow-lg shadow-blue-600/20 disabled:shadow-none flex items-center transition-all"
                >
                  <Plus className="w-4 h-4 mr-1.5" />
                  拆解任务
                </button>
              </div>
            ) : (
              <>
                <div className="flex justify-between items-center mb-1">
                  <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">阶段列表 ({phases.length})</span>
                  {phases.length < 4 && (
                    <button 
                      onClick={openAddPhaseModal}
                      className="text-blue-600 text-xs font-bold flex items-center"
                    >
                      <Plus className="w-3.5 h-3.5 mr-0.5" />
                      拆解任务
                    </button>
                  )}
                </div>
                {phases.map((phase, idx) => (
                  <div key={phase.id} className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100/50">
                    <div className="flex justify-between items-start mb-2">
                      <div className="flex items-center space-x-2">
                        <span className="text-sm font-bold text-gray-900">{phase.name}</span>
                      </div>
                      {getPhaseIcon(phase.status)}
                    </div>
                    <p className="text-sm text-gray-700 leading-relaxed mb-3">{phase.content}</p>
                    <div className="bg-gray-50 rounded-lg p-3 space-y-2 text-xs">
                      <div className="flex">
                        <span className="text-gray-400 w-16 flex-shrink-0">考核内容:</span>
                        <span className="text-gray-700 font-medium">{phase.kpi}</span>
                      </div>
                      <div className="flex">
                        <span className="text-gray-400 w-16 flex-shrink-0">截止日期:</span>
                        <span className="text-red-600 font-medium">{phase.deadline}</span>
                      </div>
                      <div className="flex">
                        <span className="text-gray-400 w-16 flex-shrink-0">当前状态:</span>
                        <span className="text-blue-600 font-medium">{phase.status}</span>
                      </div>
                    </div>

                    {/* Phase specific actions */}
                    <div className="mt-4 pt-3 border-t border-gray-50 flex items-center justify-between space-x-2">
                      <button className="flex-1 flex items-center justify-center space-x-1 py-2 rounded-lg bg-blue-50 text-blue-600 border border-blue-100/50 active:bg-blue-100 transition-colors">
                        <PenLine className="w-3.5 h-3.5" />
                        <span className="text-[11px] font-medium">编辑</span>
                      </button>
                      <button className="flex-1 flex items-center justify-center space-x-1 py-2 rounded-lg bg-blue-50 text-blue-600 border border-blue-100/50 active:bg-blue-100 transition-colors">
                        <FileText className="w-3.5 h-3.5" />
                        <span className="text-[11px] font-medium">填报</span>
                      </button>
                      <button className="flex-1 flex items-center justify-center space-x-1 py-2 rounded-lg bg-blue-50 text-blue-600 border border-blue-100/50 active:bg-blue-100 transition-colors">
                        <ClipboardCheck className="w-3.5 h-3.5" />
                        <span className="text-[11px] font-medium">审核</span>
                      </button>
                      <button className="flex-1 flex items-center justify-center space-x-1 py-2 rounded-lg bg-blue-50 text-blue-600 border border-blue-100/50 active:bg-blue-100 transition-colors">
                        <MessageSquarePlus className="w-3.5 h-3.5" />
                        <span className="text-[11px] font-medium">批阅</span>
                      </button>
                    </div>
                  </div>
                ))}
              </>
            )}
          </div>
        )}

        {activeSegment === '记录' && (
          <div className="p-4 animate-in fade-in slide-in-from-bottom-2 duration-300">
            <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100/50 relative">
              {/* Vertical line */}
              <div className="absolute left-9 top-6 bottom-6 w-0.5 bg-gray-100" />
              
              <div className="space-y-6 relative">
                {task.timeline.length === 0 ? (
                  <div className="text-center py-6 text-sm text-gray-400">暂无督办记录</div>
                ) : (
                  task.timeline.map((event, idx) => (
                    <div key={event.id} className="flex space-x-3 relative z-10">
                      <div className={cn(
                        "w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 border-4 border-white shadow-sm font-medium",
                        event.type === '批示' ? 'bg-orange-100 text-orange-600' :
                        event.type === '填报' ? 'bg-blue-100 text-blue-600' :
                        'bg-gray-100 text-gray-600'
                      )}>
                        {event.type === '批示' ? <MessageSquarePlus className="w-4 h-4" /> :
                         event.type === '填报' ? <PenLine className="w-4 h-4" /> :
                         <CheckCircle className="w-4 h-4" />}
                      </div>
                      <div className="flex-1 pt-1">
                        <div className="flex justify-between items-baseline mb-1">
                          <span className="text-[13px] font-bold text-gray-900">{event.actor} <span className="text-gray-400 font-normal ml-1">({event.role})</span></span>
                          <span className="text-[10px] text-gray-400">{event.time.split(' ')[0]}</span>
                        </div>
                        <div className={cn(
                          "text-sm rounded-xl p-3 mt-1.5",
                          event.type === '批示' ? "bg-orange-50/80 text-orange-900 border border-orange-100" :
                          "bg-gray-50 text-gray-700 border border-gray-100"
                        )}>
                          <p className="leading-relaxed">{event.content}</p>
                          {event.statusChange && (
                            <div className="mt-2 text-[11px] font-medium text-blue-600 bg-blue-50/50 inline-block px-2 py-0.5 rounded">
                              状态流转: {event.statusChange}
                            </div>
                          )}
                          {event.attachments && event.attachments.length > 0 && (
                            <div className="mt-2 space-y-1">
                              {event.attachments.map(att => (
                                <div key={att} className="flex items-center text-xs text-blue-600 bg-white border border-blue-100 px-2 py-1.5 rounded-lg max-w-fit">
                                  <Paperclip className="w-3 h-3 mr-1" />
                                  <span className="truncate max-w-[150px]">{att}</span>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Add Phase Sheet */}
      {isAddingPhase && (
        <div className="fixed inset-0 z-[60] flex items-end justify-center pointer-events-none">
          <div className="w-full h-full sm:w-[414px] sm:h-[896px] relative pointer-events-none flex flex-col justify-end overflow-hidden sm:rounded-[3rem]">
            <div 
              className="absolute inset-0 bg-black/40 pointer-events-auto transition-opacity"
              onClick={() => setIsAddingPhase(false)}
            />
            <div className="relative w-full bg-white rounded-t-3xl p-6 pointer-events-auto animate-in slide-in-from-bottom-full duration-300">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-bold text-gray-900">任务拆解</h3>
                <button onClick={() => setIsAddingPhase(false)} className="p-1 active:bg-gray-100 rounded-md text-gray-400 text-sm">
                  取消
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">选择阶段</label>
                  <div className="grid grid-cols-2 gap-2">
                    {['第一季度', '第二季度', '第三季度', '第四季度'].map(q => {
                      const isExists = phases.some(p => p.name === q);
                      return (
                        <button 
                          key={q}
                          disabled={isExists}
                          onClick={() => setNewPhase({ ...newPhase, name: q })}
                          className={cn(
                            "py-2.5 rounded-xl border text-sm font-medium transition-all",
                            newPhase.name === q ? "bg-blue-600 border-blue-600 text-white shadow-sm" : 
                            isExists ? "bg-gray-100 border-gray-200 text-gray-300" :
                            "bg-gray-50 border-gray-100 text-gray-600"
                          )}
                        >
                          {q}
                          {isExists && <span className="block text-[10px] opacity-60">(已拆解)</span>}
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">阶段工作内容</label>
                  <textarea 
                    placeholder="请输入本阶段具体工作安排..."
                    value={newPhase.content}
                    onChange={(e) => setNewPhase({ ...newPhase, content: e.target.value })}
                    className="w-full bg-gray-50 border border-gray-100 rounded-xl p-4 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50 min-h-[100px]"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">考核指标（内容）</label>
                  <input 
                    type="text"
                    placeholder="请输入关键考核点..."
                    value={newPhase.kpi}
                    onChange={(e) => setNewPhase({ ...newPhase, kpi: e.target.value })}
                    className="w-full bg-gray-50 border border-gray-100 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                  />
                </div>
              </div>

              <div className="mt-8 pb-safe">
                <button 
                  onClick={handleAddPhase}
                  disabled={!newPhase.content || !newPhase.kpi || phases.length >= 4}
                  className="w-full py-4 bg-blue-600 active:bg-blue-700 disabled:opacity-50 disabled:bg-gray-300 text-white rounded-xl font-bold text-[16px] shadow-lg shadow-blue-600/20"
                >
                  确认拆解
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
