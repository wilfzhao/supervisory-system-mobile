import { Task } from '../types';

export const mockTasks: Task[] = [
  {
    id: 't1',
    no: 'RW-2024-001',
    category: '党的建设',
    target: '全面开展清廉医院建设，落实党风廉政建设党委主体责任。',
    leader: '张书记',
    department: '纪检监察室',
    coDepartments: ['党办', '院办'],
    status: '进行中',
    progress: 45,
    phases: [
      { id: 'p1', name: '第一季度', deadline: '2024-03-31', content: '制定年度党风廉政建设工作计划并印发全院。', kpi: '发布正式红头文件', status: '已完成' },
      { id: 'p2', name: '第二季度', deadline: '2024-06-30', content: '开展全院医德医风专项排查。', kpi: '排查覆盖率100%，形成自查报告', status: '待审核' },
      { id: 'p3', name: '第三季度', deadline: '2024-09-30', content: '落实廉政风险点排查与防控机制。', kpi: '建立廉政档案', status: '未开始' },
      { id: 'p4', name: '第四季度', deadline: '2024-12-31', content: '进行全年党风廉政建设总结考核。', kpi: '完成年度总结报告', status: '未开始' }
    ],
    timeline: [
      { id: 'tl1', time: '2024-01-10 09:00', actor: '系统管理', role: '督查办', type: '下达', content: '经院党委会决议，全院下达2024年第一批重点任务。' },
      { id: 'tl2', time: '2024-03-28 14:30', actor: '李主任', role: '纪检干事', type: '填报', content: '相关红头文件已于昨日联合印发。', attachments: ['文件扫描件.pdf'], statusChange: '未开始 -> 进行中' },
      { id: 'tl3', time: '2024-03-29 10:15', actor: '张书记', role: '院领导', type: '批示', content: '请各党支部务必组织深入学习，确保传达到位。' }
    ]
  },
  {
    id: 't2',
    no: 'RW-2024-002',
    category: '医疗质量',
    target: '提升三级公立医院绩效考核国考排名，重点提高四级手术占比。',
    leader: '李院长',
    department: '医务处',
    coDepartments: ['外科系统', '病案室'],
    status: '滞后',
    progress: 20,
    phases: [
      { id: 'p1', name: '第一季度', deadline: '2024-03-31', content: '梳理并下发四级手术目录更新版。', kpi: '目录覆盖全部临床科室', status: '已完成' },
      { id: 'p2', name: '第二季度', deadline: '2024-06-30', content: '完善四级手术设备配置及耗材引进。', kpi: '重点支持3-5项新技术开展', status: '已填报' },
      { id: 'p3', name: '第三季度', deadline: '2024-09-30', content: '组织核心科室开展四级手术专项培训。', kpi: '开展至少3次院级培训', status: '未开始' },
      { id: 'p4', name: '第四季度', deadline: '2024-12-31', content: '年底四级手术达标率验收与绩效兑现。', kpi: '四级手术占比提升5%', status: '未开始' }
    ],
    timeline: [
      { id: 'tl1', time: '2024-02-15 10:00', actor: '王处长', role: '医务处处长', type: '填报', content: '目前第二季度设备采购流程进度缓慢，可能影响新技术落地。', statusChange: '进行中 -> 滞后' },
      { id: 'tl2', time: '2024-02-16 08:30', actor: '李院长', role: '院领导', type: '批示', content: '请采购中心加快审批进度，下周院长办公会上汇报进展。' }
    ]
  },
  {
    id: 't3',
    no: 'RW-2024-003',
    category: '科研创新',
    target: '申报国家自然科学基金项目，力争突破立项数量历史新高。',
    leader: '王副院长',
    department: '科研处',
    coDepartments: ['各临床科室', '中心实验室'],
    status: '进行中',
    progress: 70,
    phases: [
      { id: 'p1', name: '第一季度', deadline: '2024-03-31', content: '组织专家进行标书辅导并完成系统提交。', kpi: '提交成功率100%', status: '已完成' },
      { id: 'p2', name: '第三季度', deadline: '2024-09-30', content: '跟进评审结果，做好立项项目的经费配套。', kpi: '实现立项数量突破', status: '未开始' },
      { id: 'p3', name: '第四季度', deadline: '2024-12-31', content: '完成年度科研数据统计与奖励发放。', kpi: '发放年底科研绩效', status: '未开始' }
    ],
    timeline: [
      { id: 'tl1', time: '2024-03-19 16:00', actor: '赵干事', role: '科研处', type: '填报', content: '全院35份标书已全部完成系统提交审核。', attachments: ['提交回执清单.xlsx'] }
    ]
  },
  {
    id: 't4',
    no: 'RW-2024-004',
    category: '运营管理',
    target: '推进医院全面预算管理，实施科室全成本核算。',
    leader: '刘总会计师',
    department: '财务处',
    coDepartments: ['信息中心', '运营办'],
    status: '未开始',
    progress: 0,
    phases: [
      { id: 'p1', name: '第一季度', deadline: '2024-03-31', content: '组建工作专班，完成前期需求调研。', kpi: '形成调研报告', status: '未开始' },
      { id: 'p2', name: '第二季度', deadline: '2024-06-30', content: '制定全成本核算实施规划与系统对接方案。', kpi: '方案过院长办公会', status: '未开始' },
      { id: 'p3', name: '第三季度', deadline: '2024-09-30', content: '财务系统与各业务系统跨部门接口开发对接。', kpi: '完成系统对接', status: '未开始' },
      { id: 'p4', name: '第四季度', deadline: '2024-12-31', content: '全成本核算系统上线试运行。', kpi: '出具第一期成本核算报表', status: '未开始' }
    ],
    timeline: []
  },
  {
    id: 't5',
    no: 'RW-2024-005',
    category: '人才培养',
    target: '落实“百人计划”高层次骨干人才招引与签约落地。',
    leader: '李院长',
    department: '人力资源处',
    coDepartments: ['党办'],
    status: '已完成',
    progress: 100,
    phases: [
      { id: 'p1', name: '第一季度', deadline: '2024-03-31', content: '制定全年高层次人才引进简章并发布。', kpi: '发布招聘公告', status: '已完成' },
      { id: 'p2', name: '第二季度', deadline: '2024-06-30', content: '开展面试选拔及背景考察。', kpi: '完成意向签约', status: '已完成' },
      { id: 'p3', name: '第三季度', deadline: '2024-09-30', content: '办理正式入职手续及安家费核发。', kpi: '人才报到率100%', status: '已完成' },
      { id: 'p4', name: '第四季度', deadline: '2024-12-31', content: '年度引进人才考核及职业规划评估。', kpi: '完成入职考核', status: '已完成' }
    ],
    timeline: []
  },
  {
    id: 't6',
    no: 'RW-2024-006',
    category: '信息化建设',
    target: '完成全院HIS系统升级改造，实现与医保平台实时对接。',
    leader: '张副院长',
    department: '信息中心',
    coDepartments: ['医保办', '财务处'],
    status: '滞后',
    progress: 30,
    phases: [
      { id: 'p1', name: '第一季度', deadline: '2024-03-31', content: '完成全院各科室需求调研与蓝图设计。', kpi: '调研蓝图确认', status: '已完成' },
      { id: 'p2', name: '第二季度', deadline: '2024-06-30', content: '核心模块开发及医保接口联调测试。', kpi: 'UAT测试通过', status: '待审核' },
      { id: 'p3', name: '第三季度', deadline: '2024-09-30', content: '全院分批次切换上线HIS新系统。', kpi: '平稳切换无重大事故', status: '未开始' },
      { id: 'p4', name: '第四季度', deadline: '2024-12-31', content: '系统上线后优化配置与项目整体验收。', kpi: '签署验收报告', status: '未开始' }
    ],
    timeline: [
      { id: 'tl1', time: '2024-04-10 09:00', actor: '王主任', role: '信息中心', type: '填报', content: '由于接口文档有重大调整，开发进度受阻。', statusChange: '进行中 -> 滞后' }
    ]
  },
  {
    id: 't7',
    no: 'RW-2024-007',
    category: '后勤保障',
    target: '启动新门诊大楼基建工程，年底完成主体结构封顶。',
    leader: '刘副院长',
    department: '基建办',
    coDepartments: ['总务处', '保卫科'],
    status: '滞后',
    progress: 15,
    phases: [
      { id: 'p1', name: '第一季度', deadline: '2024-03-31', content: '完成施工图设计、评审及各类前置审批。', kpi: '获取施工许可证', status: '待审核' },
      { id: 'p2', name: '第二季度', deadline: '2024-06-30', content: '开展基坑支护及土方开挖作业。', kpi: '完成土方外运', status: '未开始' },
      { id: 'p3', name: '第三季度', deadline: '2024-09-30', content: '地下室底板及顶板浇筑完成。', kpi: '地下室结构封顶', status: '未开始' },
      { id: 'p4', name: '第四季度', deadline: '2024-12-31', content: '主体结构施工，达到封顶节点要求。', kpi: '年底主体结构封顶', status: '未开始' }
    ],
    timeline: [
      { id: 'tl1', time: '2024-03-05 10:30', actor: '孙科长', role: '基建办', type: '填报', content: '因环评审批未过，目前仍无法进场。', statusChange: '未开始 -> 滞后' }
    ]
  }
];

export const radarData = [
  { subject: '党的建设', A: 90, fullMark: 100 },
  { subject: '医疗质量', A: 75, fullMark: 100 },
  { subject: '运营管理', A: 60, fullMark: 100 },
  { subject: '学科建设', A: 85, fullMark: 100 },
  { subject: '人才培养', A: 95, fullMark: 100 },
  { subject: '科研创新', A: 80, fullMark: 100 },
];

export const areaData = [
  { name: '1月', total: 10, completed: 2 },
  { name: '2月', total: 15, completed: 5 },
  { name: '3月', total: 25, completed: 8 },
  { name: '4月', total: 32, completed: 15 },
  { name: '5月', total: 38, completed: 20 },
  { name: '6月', total: 45, completed: 28 },
];

export const barData = [
  { name: '医务处', 已完成: 15, 进行中: 8, 逾期: 2 },
  { name: '党办', 已完成: 10, 进行中: 5, 逾期: 0 },
  { name: '科研处', 已完成: 8, 进行中: 12, 逾期: 1 },
  { name: '后勤办', 已完成: 5, 进行中: 10, 逾期: 4 },
  { name: '护理部', 已完成: 12, 进行中: 6, 逾期: 0 },
];
