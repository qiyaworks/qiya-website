
import React, { useState, useEffect } from 'react';
import { 
  ShieldCheck, 
  Bot, 
  BarChart3, 
  Server, 
  Database, 
  Eye, 
  Scale, 
  Mail, 
  MapPin, 
  Calendar, 
  ArrowRight,
  Menu,
  X,
  CheckCircle2,
  ChevronRight,
  GraduationCap,
  Microscope,
  Stethoscope,
  Building2,
  Lock,
  Zap,
  LayoutDashboard,
  Globe
} from 'lucide-react';

/**
 * Navigation Component
 */
const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: '首页', href: '#home' },
    { name: '核心价值', href: '#core-values' },
    { name: '关于我们', href: '#about' },
    { name: '产品功能', href: '#features' },
    { name: '联系我们', href: '#contact' },
  ];

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-500 ${scrolled ? 'glass border-b border-gray-200/50 py-3 shadow-sm' : 'bg-transparent py-6'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-2 group cursor-pointer">
            <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-200 group-hover:scale-110 transition-transform duration-300">
              <span className="text-white font-bold text-2xl italic">Q</span>
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-bold tracking-tight text-gray-900 leading-none">启之云</span>
              <span className="text-blue-600 font-semibold text-xs tracking-widest">QIYA AI</span>
            </div>
          </div>
          
          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-10">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-gray-600 hover:text-blue-600 font-medium text-sm transition-colors duration-300"
              >
                {link.name}
              </a>
            ))}
            <a
              href="#contact"
              className="bg-blue-600 text-white px-6 py-2.5 rounded-full font-bold text-sm hover:bg-blue-700 transition-all transform hover:shadow-lg hover:-translate-y-0.5 active:scale-95"
            >
              预约演示
            </a>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button onClick={() => setIsOpen(!isOpen)} className="text-gray-600 p-2 focus:outline-none">
              {isOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Nav Overlay */}
      <div className={`md:hidden absolute top-full left-0 w-full bg-white border-b border-gray-100 shadow-2xl transition-all duration-300 transform ${isOpen ? 'translate-y-0 opacity-100' : '-translate-y-10 opacity-0 pointer-events-none'}`}>
        <div className="p-6 flex flex-col space-y-4">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="text-lg font-semibold text-gray-800 hover:text-blue-600 transition-colors"
              onClick={() => setIsOpen(false)}
            >
              {link.name}
            </a>
          ))}
          <a
            href="#contact"
            className="bg-blue-600 text-white px-6 py-4 rounded-2xl font-bold text-center"
            onClick={() => setIsOpen(false)}
          >
            预约演示
          </a>
        </div>
      </div>
    </nav>
  );
};

/**
 * Hero Section
 */
const Hero: React.FC = () => {
  return (
    <section id="home" className="relative pt-24 pb-14 lg:pt-24 lg:pb-24 overflow-hidden">
      {/* Background Decorative Elements */}
      <div className="absolute top-0 left-0 w-full h-full -z-10 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-blue-50 via-white to-white"></div>
      <div className="absolute top-1/4 right-0 w-96 h-96 bg-blue-100/50 rounded-full blur-3xl -z-10 animate-pulse"></div>
      <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          <div className="lg:w-3/5 space-y-5">
            <div className="inline-flex items-center px-4 py-1.5 rounded-full bg-blue-50 border border-blue-100 text-blue-600 text-[10px] font-black uppercase tracking-[0.2em] animate-fade-in shadow-sm">
              <Zap size={12} className="mr-2 fill-blue-600" />
              Intelligence Infrastructure
            </div>
            <h1 className="text-3xl lg:text-4xl font-black text-gray-900 leading-[1.1] tracking-tight">
              Enabling Intelligence Across <br />
              <span className="text-blue-600">Healthcare, Education and Research</span>
              <div className="mt-6 text-2xl lg:text-3xl font-bold text-gray-500 tracking-tight">
                启亚智能｜赋能医疗、教育与科研的智能未来
              </div>
            </h1>
            <div className="space-y-6 text-xl text-gray-600 max-w-2xl leading-relaxed">
              <p>
                Qiya AI is a cross-sector AI infrastructure platform designed to empower hospitals, universities, and research institutions.
              </p>
              <p className="text-base border-l-4 border-blue-600 pl-6 py-2 font-medium bg-blue-50/50 rounded-r-xl italic">
                Qiya AI 是一款面向医疗、教育与科研的跨领域 AI 基础平台，
                通过安全的数据架构与智能体工作流，实现合规的数据管理、智能交互与隐私保护分析，助力规模化创新。
              </p>
            </div>
            <div className="flex flex-wrap gap-4 pt-6">
              <a
                href="#contact"
                className="bg-blue-600 text-white px-10 py-5 rounded-2xl font-black text-lg flex items-center hover:bg-blue-700 transition-all shadow-xl shadow-blue-200 group"
              >
                Book a Demo ｜ 预约演示
                <ArrowRight className="ml-3 group-hover:translate-x-1 transition-transform" size={24} />
              </a>
              <button className="bg-white border-2 border-gray-100 text-gray-700 px-10 py-5 rounded-2xl font-black text-lg hover:bg-gray-50 hover:border-blue-200 transition-all shadow-sm">
                View Platform ｜ 查看平台
              </button>
            </div>
          </div>
          <div className="lg:w-2/5 relative">
            <div className="relative z-10 p-4 bg-white rounded-[2.5rem] shadow-2xl border border-gray-100 transform hover:scale-[1.02] transition-transform duration-700">
               <div className="grid grid-cols-2 gap-3">
                  <div className="col-span-2 relative rounded-2xl overflow-hidden h-48 lg:h-64 shadow-inner">
                    <img src="https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&q=80&w=800" alt="Healthcare AI" className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent flex items-end p-4">
                      <span className="text-white font-bold text-xs flex items-center"><Stethoscope size={14} className="mr-2"/> Healthcare</span>
                    </div>
                  </div>
                  <div className="relative rounded-2xl overflow-hidden h-40 shadow-inner">
                    <img src="https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&q=80&w=400" alt="Education AI" className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent flex items-end p-3">
                      <span className="text-white font-bold text-[10px] flex items-center"><GraduationCap size={12} className="mr-1"/> Education</span>
                    </div>
                  </div>
                  <div className="relative rounded-2xl overflow-hidden h-40 shadow-inner">
                    <img src="https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&q=80&w=400" alt="Research AI" className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent flex items-end p-3">
                      <span className="text-white font-bold text-[10px] flex items-center"><Microscope size={12} className="mr-1"/> Research</span>
                    </div>
                  </div>
               </div>
            </div>
            {/* Background elements */}
            <div className="absolute -top-12 -left-12 w-24 h-24 bg-blue-600 rounded-3xl opacity-10 rotate-12 -z-10"></div>
            <div className="absolute -bottom-12 -right-12 w-32 h-32 border-2 border-blue-600 rounded-[3rem] opacity-5 -z-10"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

/**
 * Core Values Section
 */
const CoreValues: React.FC = () => {
  const values = [
    {
      icon: <Building2 size={40} strokeWidth={1.5} />,
      title: "Multi-Institutions Secure Architecture",
      subTitle: "多机构安全架构",
      desc: "Multi-tenant design ensures hospital, university, and research lab data isolation, enabling safe scaling across diverse institutions.",
      cnDesc: "多租户架构，实现医院、院校与科研机构的数据隔离，支持安全、合规的规模化部署。"
    },
    {
      icon: <Bot size={40} strokeWidth={1.5} />,
      title: "Agent-Driven Customer Engagement",
      subTitle: "智能体驱动的交互参与",
      desc: "Intelligent agents automate patient follow-ups, student learning support, and research workflows to improve participation and efficiency.",
      cnDesc: "智能体自动驱动患者随访、学习支持与科研流程，提升参与度并降低人工成本。"
    },
    {
      icon: <BarChart3 size={40} strokeWidth={1.5} />,
      title: "Anonymous Analytics & RWE",
      subTitle: "匿名化分析与真实世界研究",
      desc: "Privacy-preserving analytics transform operational, academic, and clinical data into reusable research-grade assets.",
      cnDesc: "在隐私保护前提下，将医疗、教育与科研数据转化为可复用的真实世界研究资产。"
    }
  ];

  return (
    <section id="core-values" className="py-24 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <span className="text-blue-600 font-black text-base sm:text-lg uppercase tracking-widest mb-2 block">Our Foundations</span>
            <h2 className="text-3xl font-black text-gray-900 tracking-tight sm:text-4xl">Core Value Highlights</h2>
          </div>
          <p className="text-blue-600 text-2xl font-bold border-l-2 border-blue-600 pl-4 uppercase tracking-wider sm:text-3xl">核心价值</p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
          {values.map((v, i) => (
            <div key={i} className="group relative p-4 rounded-[2.5rem] bg-gray-50 hover:bg-blue-600 transition-all duration-500 overflow-hidden shadow-sm hover:shadow-2xl hover:shadow-blue-200">
              <div className="relative z-10">
                <div className="mb-2 w-16 h-16 rounded-2xl bg-white flex items-center justify-center text-blue-600 group-hover:text-white group-hover:bg-blue-500 transition-colors shadow-sm">
                  {v.icon}
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-1 group-hover:text-white transition-colors">{v.title}</h3>
                <p className="text-blue-600 font-black text-lg mb-6 group-hover:text-blue-200 transition-colors uppercase tracking-widest">{v.subTitle}</p>
                <div className="space-y-4">
                  <p className="text-gray-600 text-sm leading-relaxed group-hover:text-blue-50 transition-colors">{v.desc}</p>
                  <div className="h-px w-12 bg-gray-200 group-hover:bg-blue-400 transition-colors"></div>
                  <p className="text-gray-500 text-sm font-medium italic group-hover:text-blue-100 transition-colors">{v.cnDesc}</p>
                </div>
              </div>
              {/* Abstract decorative shape */}
              <div className="absolute -bottom-8 -right-8 w-32 h-32 bg-white/5 rounded-full group-hover:scale-150 transition-transform duration-700"></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

/**
 * Flow Section
 */
const PlatformFlow: React.FC = () => {
  const steps = [
    { label: "Hospitals / Universities / Research Labs / Devices", icon: <Building2 size={36} />, cn: "医院 / 院校 / 科研机构 / 设备" },
    { label: "Data Standardization", icon: <CheckCircle2 size={36} />, cn: "数据标准化" },
    { label: "Multi-Tenant Secure Storage", icon: <Database size={36} />, cn: "多租户安全存储" },
    { label: "Dashboards & Analytics", icon: <LayoutDashboard size={36} />, cn: "可视化仪表盘与分析" },
    { label: "Agent Workflows", icon: <Bot size={36} />, cn: "智能体工作流" },
    { label: "Anonymized Data Models", icon: <Eye size={36} />, cn: "匿名化数据模型" },
  ];

  return (
    <section className="py-12 bg-gray-900 text-white overflow-hidden relative">
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-20"></div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-10">
          <h2 className="text-4xl font-black mb-4 tracking-tight">Platform Flow</h2>
          <p className="text-blue-400 text-3xl font-black tracking-widest">平台工作流</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-6 relative">
          {steps.map((step, i) => (
            <div key={i} className="flex flex-col items-center group relative">
              <div className="w-20 h-20 rounded-[2rem] bg-white/5 flex items-center justify-center mb-6 group-hover:bg-blue-600 transition-all duration-300 border border-white/10 group-hover:border-blue-400 group-hover:shadow-2xl group-hover:shadow-blue-500/20 group-hover:-translate-y-2">
                <div className="text-blue-400 group-hover:text-white transition-colors">{step.icon}</div>
              </div>
              <div className="text-center space-y-2">
                <p className="text-xs font-black uppercase tracking-widest text-white/90 leading-tight min-h-[32px]">{step.label}</p>
                <div className="h-0.5 w-6 bg-blue-500 mx-auto opacity-50 group-hover:w-10 transition-all"></div>
                <p className="text-xs font-bold text-white/80">{step.cn}</p>
              </div>
              
              {/* Connector Arrows for Desktop */}
              {i < steps.length - 1 && (
                <div className="hidden lg:block absolute top-6 -right-4 translate-x-1/2 z-20">
                  <ChevronRight className="text-white/50" size={32} />
                </div>
              )}
            </div>
          ))}
          {/* Background horizontal line for lg screens */}
          <div className="absolute top-10 left-0 w-full h-px bg-white/50 -z-10 hidden lg:block"></div>
        </div>
      </div>
    </section>
  );
};

/**
 * About Section
 */
const About: React.FC = () => {
  return (
    <section id="about" className="py-20 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-20 items-center">
          <div className="relative order-2 lg:order-1">
            <div className="rounded-[3rem] overflow-hidden shadow-2xl relative">
              <img src="https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&q=80&w=800" alt="Innovation" className="w-full aspect-square object-cover" />
              <div className="absolute inset-0 bg-blue-600/10 mix-blend-multiply"></div>
            </div>
            <div className="absolute -top-10 -right-10 p-10 bg-white rounded-[2.5rem] shadow-2xl border border-gray-50 max-w-sm hidden xl:block animate-bounce-slow">
              <span className="text-blue-600 font-black text-xs uppercase tracking-[0.2em] mb-3 block">Perspective</span>
              <p className="text-xl font-black text-gray-900 italic leading-snug">"From fragmented information to continuous intelligence."</p>
              <p className="mt-3 text-xl font-bold text-gray-600">"从分散信息迈向持续智能能力"</p>
            </div>
          </div>

          <div className="space-y-10 order-1 lg:order-2">
            <div>
              <span className="text-blue-600 font-black text-lg uppercase tracking-widest mb-4 block">Who We Are | 关于我们</span>
              <h2 className="text-4xl font-black text-gray-900 tracking-tight leading-tight mb-8">
                Building the Next Generation <br />
                <span className="text-blue-600">Foundation for Intelligent Transformation</span>
                <div className="mt-4 text-3xl font-bold text-gray-900">
                  构建新一代智能化技术转型平台
                </div>
              </h2>
              <div className="space-y-3 text-lg text-gray-600">
                <p>
                  Qiya AI builds the foundation for intelligent transformation across healthcare, education, and scientific research. 
                  We connect data, workflows, and insights into one scalable, secure platform.
                </p>
                <div className="p-4 bg-gray-50 rounded-2xl border-l-4 border-blue-600">
                  <p className="font-bold text-gray-900 italic">
                    启亚智能致力于构建医疗、教育与科研的智能化基础平台，
                    将数据、流程与洞察整合为一个可规模化、可持续的系统，推动从碎片化信息到持续智能的转变。
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="group cursor-default">
                <div className="flex items-center space-x-4 mb-2">
                  <div className="w-10 h-10 rounded-xl bg-blue-100 flex items-center justify-center text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-all">
                    <Zap size={20} />
                  </div>
                  <h4 className="text-xl font-black text-gray-900 tracking-tight">Our Mission / 使命</h4>
                </div>
                <p className="text-gray-600 text-sm italic mb-2">To enable institutions to transform data into actionable intelligence — securely, ethically, and at scale.</p>
                <p className="text-gray-900 font-bold text-sm">让医疗、教育与科研数据在合规与可信的前提下，转化为真正可行动的智能。</p>
              </div>
              <div className="group cursor-default">
                <div className="flex items-center space-x-4 mb-2">
                  <div className="w-10 h-10 rounded-xl bg-blue-100 flex items-center justify-center text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-all">
                    <Eye size={20} />
                  </div>
                  <h4 className="text-xl font-black text-gray-900 tracking-tight">Our Vision / 愿景</h4>
                </div>
                <p className="text-gray-600 text-sm italic mb-2">To become a leading AI infrastructure platform for innovation, transformation, and discovery.</p>
                <p className="text-gray-900 font-bold text-sm">成为亚太乃至全球领先的 医疗创新 × 教育变革 × 科研探索 跨领域 AI 基础平台。</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

/**
 * Features Section
 */
const Features: React.FC = () => {
  const features = [
    {
      title: "Multi-Tenant Data Architecture",
      cnTitle: "多租户数据架构",
      icon: <Server className="text-blue-600" />,
      items: [
        { en: "Institution-level isolation: Separation for hospitals, universities, and labs.", cn: "机构级隔离：医院、院校与科研机构的数据环境逻辑分离。" },
        { en: "Project-level segmentation: Independent study/course management.", cn: "项目级分区：不同的研究、课程或临床项目独立管理。" },
        { en: "Secure APIs: Role-based access for sensitive data protection.", cn: "安全 API：基于角色的权限控制，确保数据安全。" },
        { en: "Scalable deployment: Expansion without compliance compromise.", cn: "可扩展部署：支持跨机构扩展，合规性不受影响。" },
        { en: "Cross-sector adaptability: Unified framework for records & datasets.", cn: "跨领域适配：支持医疗记录、学习数据与科研数据的统一管理。" }
      ]
    },
    {
      title: "Intelligent Agent Workflows",
      cnTitle: "智能体工作流",
      icon: <Bot className="text-blue-600" />,
      items: [
        { en: "Healthcare automation: Patient follow-ups & behavioral interventions.", cn: "医疗自动化：智能体管理患者随访、提醒与行为干预。" },
        { en: "Education support: Personalized learning paths & engagement.", cn: "教育支持：智能体辅助个性化学习路径与学生互动。" },
        { en: "Research facilitation: Experiment tracking & collaboration.", cn: "科研助力：智能体简化数据收集、实验跟踪与协作流程。" },
        { en: "Context-aware interactions: Role-adaptive dynamic responses.", cn: "上下文感知交互：根据用户角色动态调整响应。" },
        { en: "Reduced workload: Minimize repetitive manual tasks.", cn: "降低工作负担：减少重复性任务，专注更高价值工作。" }
      ]
    },
    {
      title: "Visualization & Monitoring",
      cnTitle: "可视化与监控系统",
      icon: <BarChart3 className="text-blue-600" />,
      items: [
        { en: "Real-time dashboards: Track outcomes & milestones instantly.", cn: "实时仪表盘：即时跟踪结果、进度或项目里程碑。" },
        { en: "Multi-dimensional analytics: Analyze by time, institution, or project.", cn: "多维度分析：按时间、人群、机构或项目类型分析。" },
        { en: "Cross-sector insights: View performance metrics in one view.", cn: "跨领域洞察：在同一视图中比较医疗、教育与科研指标。" },
        { en: "Management visibility: Minute-level insights for decision-making.", cn: "管理层可视化：分钟级洞察，支持决策制定。" },
        { en: "Custom reporting: Tailored views for clinical & scientific studies.", cn: "定制化报告：为各项目提供专属可视化。" }
      ]
    },
    {
      title: "Privacy-Preserving Data Modeling",
      cnTitle: "隐私保护数据建模",
      icon: <Lock className="text-blue-600" />,
      items: [
        { en: "De-identification: Remove personal identifiers securely.", cn: "去标识化：移除患者、学生或参与者的个人标识信息。" },
        { en: "Aggregation: Trend analysis without individual exposure.", cn: "数据聚合：合并数据集以揭示趋势，而不暴露个体。" },
        { en: "Research-ready models: Anonymized RWE for scientific study.", cn: "科研级模型：生成匿名化的真实世界证据。" },
        { en: "No traceability: Data cannot be linked back to natural persons.", cn: "不可回溯性：确保数据无法追溯至自然人。" },
        { en: "Ethical compliance: Meeting global privacy standards.", cn: "伦理合规：符合各领域的全球隐私标准。" }
      ]
    },
    {
      title: "Compliance-First Design",
      cnTitle: "合规优先设计",
      icon: <Scale className="text-blue-600" />,
      items: [
        { en: "Privacy-by-design: Security embedded from the ground up.", cn: "隐私优先架构：从系统设计之初即嵌入安全。" },
        { en: "Audit logs: Full traceability of access and actions.", cn: "审计日志：全流程访问与操作可追溯。" },
        { en: "Sector-specific standards: HIPAA, education & ethics policies.", cn: "行业标准：符合医疗法规、教育政策与科研要求。" },
        { en: "Global readiness: Aligned with international frameworks (GDPR).", cn: "全球适配：与国际数据保护框架保持一致。" }
      ]
    }
  ];

  return (
    <section id="features" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <span className="text-blue-600 font-black text-lg uppercase tracking-widest mb-3 block underline decoration-4 underline-offset-8">Technology Stack</span>
          <h2 className="text-4xl font-black text-gray-900 mb-3 tracking-tight">Unified Feature Suite</h2>
          <p className="text-blue-600 text-3xl font-black tracking-widest">统一功能矩阵</p>
        </div>
        <div className="grid lg:grid-cols-2 xl:grid-cols-3 gap-8">
          {features.map((f, i) => (
            <div key={i} className="flex flex-col p-10 rounded-[2.5rem] bg-white border border-gray-100 shadow-sm hover:shadow-2xl transition-all duration-500 group">
              <div className="mb-8 p-5 rounded-2xl bg-blue-50 w-fit text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-all duration-300">
                {f.icon}
              </div>
              <h3 className="text-2xl font-black text-gray-900 mb-1 leading-tight">{f.title}</h3>
              <p className="text-blue-600 font-black text-xl mb-6 tracking-widest uppercase">{f.cnTitle}</p>
              <ul className="space-y-6 flex-grow">
                {f.items.map((item, idx) => (
                  <li key={idx} className="flex items-start text-sm group/li">
                    <CheckCircle2 size={18} className="text-blue-500 mt-0.5 mr-4 flex-shrink-0 group-hover/li:scale-110 transition-transform" />
                    <div>
                      <p className="text-gray-900 font-bold mb-1 leading-snug">{item.en}</p>
                      <p className="text-gray-500 text-xs font-medium">{item.cn}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

/**
 * Contact Section
 */
const Contact: React.FC = () => {
  const [form, setForm] = useState({
    name: '',
    email: '',
    institution: 'Hospital (医疗机构)',
    message: '',
  });
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus('sending');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      if (!response.ok) {
        throw new Error('Request failed');
      }

      setStatus('sent');
      setForm({
        name: '',
        email: '',
        institution: 'Hospital (医疗机构)',
        message: '',
      });
    } catch (error) {
      setStatus('error');
    }
  };

  return (
    <section id="contact" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gray-900 rounded-[4rem] shadow-3xl overflow-hidden relative">
          <div className="absolute top-0 right-0 w-1/3 h-full bg-blue-600/5 -z-10 rotate-12"></div>
          <div className="flex flex-col lg:flex-row">
            <div className="lg:w-2/5 p-8 lg:p-15 text-white flex flex-col justify-center">
              <span className="text-blue-400 font-black text-lg uppercase tracking-[0.3em] mb-2 block">Get Started</span>
              <h2 className="text-4xl font-black mb-8 leading-tight tracking-tight">
                Let’s Work <span className="text-blue-500 italic">Together</span>
                <div className="text-3xl mt-4 opacity-50 font-bold">联系我们</div>
              </h2>
              <p className="text-lg text-white/70 mb-8 font-medium leading-relaxed">
                Whether you are a hospital, university, or research team, Qiya AI can support your journey toward continuous intelligence.
              </p>
              
              <div className="space-y-6">
                <div className="flex items-center space-x-6 group cursor-pointer">
                  <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-blue-600 group-hover:border-blue-400 transition-all duration-300">
                    <Mail size={24} className="text-blue-400 group-hover:text-white" />
                  </div>
                  <div>
                    <div className="text-[10px] font-black opacity-40 uppercase tracking-widest mb-1">Email Inquiry</div>
                    <div className="text-xl font-bold tracking-tight">christinewx3@outlook.com</div>
                  </div>
                </div>
                <div className="flex items-center space-x-6 group cursor-pointer">
                  <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-blue-600 group-hover:border-blue-400 transition-all duration-300">
                    <MapPin size={24} className="text-blue-400 group-hover:text-white" />
                  </div>
                  <div>
                    <div className="text-[10px] font-black opacity-40 uppercase tracking-widest mb-1">Headquarters</div>
                    <div className="text-xl font-bold tracking-tight">China, Hangzhou</div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="lg:w-3/5 p-12 lg:p-20 bg-white">
              <div className="mb-10">
                <h3 className="text-3xl font-black text-gray-900 tracking-tight mb-2">Book a Demo</h3>
                <p className="text-gray-500 font-medium italic">预约演示并开启智能化转型</p>
              </div>
              
              <form className="space-y-6" onSubmit={handleSubmit}>
                <div className="grid md:grid-cols-2 gap-8">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-blue-600 uppercase tracking-widest ml-1">Your Name | 姓名</label>
                    <input
                      type="text"
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      className="w-full px-6 py-4 rounded-2xl bg-gray-50 border border-transparent focus:bg-white focus:border-blue-200 outline-none transition-all font-bold text-gray-900 placeholder-gray-300 shadow-inner"
                      placeholder="John Doe"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-blue-600 uppercase tracking-widest ml-1">Email Address | 邮箱</label>
                    <input
                      type="email"
                      name="email"
                      value={form.email}
                      onChange={handleChange}
                      className="w-full px-6 py-4 rounded-2xl bg-gray-50 border border-transparent focus:bg-white focus:border-blue-200 outline-none transition-all font-bold text-gray-900 placeholder-gray-300 shadow-inner"
                      placeholder="john@domain.com"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-blue-600 uppercase tracking-widest ml-1">Institution Type | 机构类型</label>
                  <select
                    name="institution"
                    value={form.institution}
                    onChange={handleChange}
                    className="w-full px-6 py-4 rounded-2xl bg-gray-50 border border-transparent focus:bg-white focus:border-blue-200 outline-none transition-all font-bold text-gray-900 bg-white shadow-inner appearance-none cursor-pointer"
                  >
                    <option>Hospital (医疗机构)</option>
                    <option>University (学术院校)</option>
                    <option>Research Lab (科研实验室)</option>
                    <option>Others (其他)</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-blue-600 uppercase tracking-widest ml-1">Message | 咨询内容</label>
                  <textarea
                    rows={4}
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    className="w-full px-6 py-4 rounded-2xl bg-gray-50 border border-transparent focus:bg-white focus:border-blue-200 outline-none transition-all font-bold text-gray-900 placeholder-gray-300 shadow-inner resize-none"
                    placeholder="Tell us how we can help your project..."
                  ></textarea>
                </div>
                <button
                  type="submit"
                  disabled={status === 'sending'}
                  className="w-full bg-blue-600 text-white font-black py-5 rounded-[1.5rem] hover:bg-blue-700 transition-all shadow-xl shadow-blue-100 flex items-center justify-center text-lg active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {status === 'sending' ? 'Sending... | 发送中' : 'Submit Request | 提交咨询'}
                  <ArrowRight className="ml-3" size={24} />
                </button>
                {status === 'sent' && (
                  <p className="text-sm font-bold text-green-600">Submitted successfully. We will contact you soon.</p>
                )}
                {status === 'error' && (
                  <p className="text-sm font-bold text-red-600">Failed to submit. Please try again.</p>
                )}
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

/**
 * Footer Component
 */
const Footer: React.FC = () => {
  return (
    <footer className="bg-white py-16 border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div className="col-span-1 md:col-span-1 space-y-6">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-black text-lg italic">Q</span>
              </div>
              <span className="font-black text-gray-900 tracking-tighter text-xl">启之云 | Qiya AI</span>
            </div>
            <p className="text-sm text-gray-500 font-medium leading-relaxed">
              Pioneering intelligent infrastructure for the world's most critical sectors.
            </p>
          </div>
          
          <div className="space-y-6">
            <h5 className="text-[10px] font-black text-blue-600 uppercase tracking-[0.3em]">Sectors</h5>
            <ul className="space-y-4 text-sm font-bold text-gray-900">
              <li><a href="#" className="hover:text-blue-600 transition-colors">Healthcare</a></li>
              <li><a href="#" className="hover:text-blue-600 transition-colors">Education</a></li>
              <li><a href="#" className="hover:text-blue-600 transition-colors">Research</a></li>
            </ul>
          </div>
          
          <div className="space-y-6">
            <h5 className="text-[10px] font-black text-blue-600 uppercase tracking-[0.3em]">Resources</h5>
            <ul className="space-y-4 text-sm font-bold text-gray-900">
              <li><a href="#" className="hover:text-blue-600 transition-colors">Documentation</a></li>
              <li><a href="#" className="hover:text-blue-600 transition-colors">API Reference</a></li>
              <li><a href="#" className="hover:text-blue-600 transition-colors">Trust Center</a></li>
            </ul>
          </div>

          <div className="space-y-6">
            <h5 className="text-[10px] font-black text-blue-600 uppercase tracking-[0.3em]">Legal</h5>
            <ul className="space-y-4 text-sm font-bold text-gray-900">
              <li><a href="#" className="hover:text-blue-600 transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-blue-600 transition-colors">Terms of Service</a></li>
              <li><a href="#" className="hover:text-blue-600 transition-colors">Compliance</a></li>
            </ul>
          </div>
        </div>
        
        <div className="pt-8 border-t border-gray-100 flex flex-col md:flex-row justify-between items-center text-xs font-black text-gray-400 uppercase tracking-widest gap-4">
          <div>© {new Date().getFullYear()} 启之云 (Hangzhou) Technology Co., Ltd.</div>
          <div className="flex items-center space-x-6">
             <span className="flex items-center"><Globe size={14} className="mr-2"/> Global Readiness</span>
             <span>Privacy First</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

/**
 * Main App
 */
const App: React.FC = () => {
  return (
    <div className="relative min-h-screen bg-white selection:bg-blue-100 selection:text-blue-700 antialiased">
      <Navbar />
      <main>
        <Hero />
        <CoreValues />
        <PlatformFlow />
        <About />
        <Features />
        <Contact />
      </main>
      <Footer />
    </div>
  );
};

export default App;
