export type TaskStatus = '未开始' | '进行中' | '已完成' | '滞后';

export interface Phase {
  id: string;
  name: string;
  deadline: string;
  content: string;
  kpi: string;
  status: '未开始' | '已填报' | '待审核' | '已完成' | '驳回';
}

export interface TimelineEvent {
  id: string;
  time: string;
  actor: string;
  role: string;
  type: '批示' | '填报' | '下达' | '审核';
  content: string;
  attachments?: string[];
  statusChange?: string;
}

export interface Task {
  id: string;
  no: string;
  category: string;
  target: string;
  leader: string;
  department: string;
  coDepartments: string[];
  status: TaskStatus;
  progress: number;
  phases: Phase[];
  timeline: TimelineEvent[];
}
