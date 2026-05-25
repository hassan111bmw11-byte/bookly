"use client"
import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  BookOpen, ClipboardCheck, FileText, Video, Wallet, MessageCircle,
  Moon, Sun, User, Settings, GraduationCap, LayoutDashboard, Plus,
  Upload, BarChart3, Bell, Lock, Search, CheckCircle2, AlertCircle,
  PlayCircle, Pencil, ShieldCheck, Users, CalendarDays, Download,
  Image as ImageIcon, Eye, LogOut, Mail, Phone, Trophy, Bot,
  MessageSquareText, CreditCard, KeyRound, FolderOpen, LibraryBig,
  ClipboardList, ScanLine, Megaphone, Unlock, LockKeyhole, UserCheck,
  Clock3, Star, Send, Filter, MoreHorizontal, Database, HardDrive,
  ChevronLeft, Zap, Sparkles, BadgeCheck, ListVideo, LineChart
} from "lucide-react";

const TEACHER_EMAIL = "ahmad10@gmail.com";
const TEACHER_PASSWORD = "123456"; // Demo only. In real apps: server auth + hashed password.
const CASH_PHONE = "01097242107";
const PLATFORM = "فهمني من غير صداع";

const chapters = [
  "القياس الفيزيائي", "الحركة الخطية", "قوانين نيوتن", "الشغل والطاقة",
  "الزخم والتصادم", "الديناميكا الحرارية", "الموجات والصوت", "الضوء والبصريات",
  "الكهربية الساكنة", "التيار الكهربي", "المجالات المغناطيسية", "الحث الكهرومغناطيسي",
  "دوائر التيار المتردد", "الفيزياء الحديثة", "المراجعة النهائية"
];

const coursesSeed = chapters.map((title, i) => ({
  id: i + 1,
  title,
  playlist: `Playlist ${i + 1}`,
  lessons: 5 + (i % 5),
  exams: 2 + (i % 3),
  assignments: 2 + (i % 4),
  files: 4 + (i % 3),
  price: 35 + i * 5,
  progress: Math.min(96, 7 + i * 6),
  locked: i > 2 && i % 2 === 1,
  level: i < 5 ? "تأسيس" : i < 11 ? "تدريب" : "مراجعة",
  duration: `${3 + (i % 4)} ساعات`,
}));

const teacherTools = [
  ["إدارة الكورسات", LibraryBig, "إنشاء فصل، ترتيب Playlists، قفل/فتح حسب الدفع."],
  ["رفع فيديوهات", Video, "رفع فيديو، صورة غلاف، ملفات مرفقة، وتصنيف داخل Playlist."],
  ["بنك الأسئلة", Database, "أسئلة MCQ/مقالي، مستويات، وسحب عشوائي للامتحانات."],
  ["Bubble Sheets", ScanLine, "إدخال نماذج وتصحيح ورقي رقمي سريع."],
  ["إدارة الطلاب", Users, "حسابات، حضور، مدفوعات، فتح محاضرات، وتجميد حساب."],
  ["الواجبات", ClipboardList, "تسليمات، ملفات، درجات، وتعليقات للطالب."],
  ["الرسائل والواتساب", MessageSquareText, "إرسال تنبيهات فردية أو جماعية وربط واتساب."],
  ["التقارير", LineChart, "مشاهدات، حضور، درجات، أرباح، ومستوى كل فصل."],
  ["التعليقات", MessageCircle, "مراجعة تعليقات المحاضرات والرد عليها."],
  ["الإعدادات", Settings, "بيانات المعلم، أرقام التواصل، الصلاحيات، والمظهر."],
];

const students = [
  ["محمد علي", "نشط", "85%", "120 ج.م", "حاضر"],
  ["سارة محمود", "نشط", "92%", "70 ج.م", "حاضر"],
  ["عمر خالد", "بانتظار الدفع", "34%", "0 ج.م", "غائب"],
  ["ملك أحمد", "نشط", "77%", "45 ج.م", "حاضر"],
];

const messages = [
  ["المعلم", "تم فتح محاضرة التيار الكهربي بعد تأكيد الدفع."],
  ["طالب", "هل يوجد واجب على الفصل الثاني؟"],
  ["المساعد الذكي", "يمكنك مراجعة قوانين الحركة قبل الاختبار القصير."],
];

function cls(...v: any[]) { return v.filter(Boolean).join(" "); }

export default function App() {
  const [dark, setDark] = useState(true);
  const [role, setRole] = useState("guest");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [tab, setTab] = useState("dashboard");
  const [query, setQuery] = useState("");
  const [studentName, setStudentName] = useState("طالب جديد");
  const [teacherName, setTeacherName] = useState("أ/ أحمد - فيزياء 3 ثانوي");
  const [notice, setNotice] = useState("مراجعة الفصل الأول متاحة الآن + اختبار قصير بعد كل محاضرة");
  const [wallet, setWallet] = useState(120);
  const [chargeCode, setChargeCode] = useState("");

  const isTeacher = role === "teacher";
  const theme = dark ? "dark bg-[#070b18] text-slate-100" : "bg-slate-50 text-slate-950";
  const filtered = useMemo(() => coursesSeed.filter(c => c.title.includes(query) || c.level.includes(query)), [query]);

  const login = () => {
    if (email === TEACHER_EMAIL && password === TEACHER_PASSWORD) {
      setRole("teacher"); setTab("dashboard"); return;
    }
    if (email.includes("@") && password.length >= 4) {
      setRole("student"); setTab("dashboard"); return;
    }
    alert("اكتب بريد صحيح وكلمة مرور. حساب المعلم التجريبي: ahmad10@gmail.com / 123456");
  };

  const chargeWallet = () => {
    if (chargeCode.trim().length >= 4) { setWallet(v => v + 50); setChargeCode(""); alert("تمت إضافة 50 ج.م كتجربة شحن كود"); }
    else alert("اكتب كود شحن صحيح أو تواصل واتساب لتأكيد الكاش");
  };

  if (role === "guest") return <AuthScreen dark={dark} setDark={setDark} email={email} setEmail={setEmail} password={password} setPassword={setPassword} login={login} setRole={setRole} setTab={setTab} />;

  const navStudent = [
    ["dashboard", "الرئيسية", LayoutDashboard], ["courses", "المحاضرات", BookOpen],
    ["tasks", "الواجبات", ClipboardCheck], ["exams", "الاختبارات", Trophy],
    ["files", "الملفات", FolderOpen], ["wallet", "المحفظة", Wallet],
    ["chat", "الدردشة", MessageSquareText], ["ai", "المساعد الذكي", Bot],
    ["profile", "البروفايل", User], ["settings", "الإعدادات", Settings]
  ];
  const navTeacher = [
    ["dashboard", "الرئيسية", LayoutDashboard], ["courses", "الكورسات", LibraryBig],
    ["videos", "الفيديوهات", ListVideo], ["exams", "الامتحانات", Trophy],
    ["questions", "بنك الأسئلة", Database], ["bubbles", "Bubble Sheets", ScanLine],
    ["students", "الطلاب والحضور", Users], ["chat", "الرسائل", MessageSquareText],
    ["reports", "التقارير", BarChart3], ["profile", "البروفايل", User], ["settings", "الإعدادات", Settings]
  ];
  const nav = isTeacher ? navTeacher : navStudent;

  return <main dir="rtl" className={cls(theme, "min-h-screen transition-colors")}>
    <div className="flex">
      <aside className="hidden lg:flex min-h-screen w-80 flex-col border-l dark:border-white/10 bg-white/80 dark:bg-slate-950/80 backdrop-blur-xl p-4 sticky top-0">
        <div className="rounded-[1.7rem] bg-linear-to-br from-yellow-400 to-amber-600 text-slate-950 p-5 shadow-xl">
          <div className="flex items-center gap-3"><GraduationCap/><b className="text-2xl">{PLATFORM}</b></div>
          <p className="text-sm mt-2 opacity-80">منصة فيزياء 3 ثانوي</p>
        </div>
        <nav className="mt-6 space-y-2 overflow-auto pr-1">{nav.map(([id,label,Icon])=><button key={id} onClick={()=>setTab(id)} className={cls("w-full flex items-center gap-3 rounded-2xl px-4 py-3 text-right transition", tab===id?"bg-yellow-500 text-slate-950 font-black shadow-lg":"hover:bg-slate-100 dark:hover:bg-white/10 text-slate-600 dark:text-slate-300")}><Icon size={20}/>{label}</button>)}</nav>
        <button onClick={()=>setRole("guest")} className="mt-auto flex items-center gap-2 rounded-2xl p-3 text-red-400 hover:bg-red-500/10"><LogOut/> خروج</button>
      </aside>

      <section className="flex-1 p-4 md:p-8">
        <Topbar dark={dark} setDark={setDark} isTeacher={isTeacher} teacherName={teacherName} studentName={studentName} notice={notice} />
        <div className="lg:hidden mt-4 grid grid-cols-5 gap-2">{nav.slice(0,10).map(([id,label,Icon])=><button key={id} onClick={()=>setTab(id)} className={cls("rounded-2xl border p-3 text-[11px]", tab===id?"bg-yellow-500 text-slate-950 border-yellow-500":"dark:border-white/10")}><Icon className="mx-auto mb-1" size={18}/>{label}</button>)}</div>

        {tab === "dashboard" && <Dashboard isTeacher={isTeacher} wallet={wallet} />}
        {tab === "courses" && <Courses query={query} setQuery={setQuery} filtered={filtered} isTeacher={isTeacher} wallet={wallet} />}
        {tab === "videos" && <TeacherVideos />}
        {tab === "tasks" && <Panel title="الواجبات والتسليمات" action={isTeacher ? "إنشاء واجب" : "حل واجب"}><TaskList teacher={isTeacher}/></Panel>}
        {tab === "exams" && <Panel title={isTeacher ? "إدارة الامتحانات" : "الاختبارات والتصحيح الفوري"} action={isTeacher ? "إنشاء امتحان" : "ابدأ اختبار"}><ExamBuilder teacher={isTeacher}/></Panel>}
        {tab === "questions" && <QuestionBank />}
        {tab === "bubbles" && <BubbleSheets />}
        {tab === "students" && <StudentsPanel />}
        {tab === "files" && <Panel title="الملفات والمذكرات" action={isTeacher ? "رفع ملف" : "تحميل"}><Files teacher={isTeacher}/></Panel>}
        {tab === "wallet" && <WalletPanel wallet={wallet} setWallet={setWallet} chargeCode={chargeCode} setChargeCode={setChargeCode} chargeWallet={chargeWallet}/>}        
        {tab === "chat" && <ChatPanel isTeacher={isTeacher}/>}        
        {tab === "ai" && <AIPanel/>}
        {tab === "reports" && <ReportsPanel />}
        {tab === "profile" && <Profile isTeacher={isTeacher} name={isTeacher?teacherName:studentName} setName={isTeacher?setTeacherName:setStudentName}/>}        
        {tab === "settings" && <SettingsPanel dark={dark} setDark={setDark} isTeacher={isTeacher} notice={notice} setNotice={setNotice}/>}        
      </section>
    </div>
  </main>;
}

function AuthScreen({dark,setDark,email,setEmail,password,setPassword,login,setRole,setTab}) {
  const theme = dark ? "dark bg-[#070b18] text-slate-100" : "bg-slate-50 text-slate-950";
  return <main dir="rtl" className={cls(theme, "min-h-screen p-4 md:p-8 transition-colors overflow-hidden")}>
    <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_top_left,rgba(234,179,8,.25),transparent_35%),radial-gradient(circle_at_bottom_right,rgba(59,130,246,.12),transparent_35%)]" />
    <div className="relative mx-auto max-w-7xl grid lg:grid-cols-[1.2fr_.8fr] gap-6 items-stretch">
      <section className="rounded-[2.4rem] border border-white/10 bg-gradient-to-br from-slate-900 via-slate-950 to-black p-8 shadow-2xl overflow-hidden relative min-h-[620px]">
        <div className="absolute -top-24 -left-24 h-72 w-72 rounded-full bg-yellow-500/20 blur-3xl" />
        <div className="relative z-10 h-full flex flex-col">
          <div className="flex items-center justify-between gap-4">
            <div className="inline-flex items-center gap-2 rounded-full bg-yellow-500/15 px-4 py-2 text-yellow-300 border border-yellow-500/30"><GraduationCap size={18}/> منصة فيزياء 3 ثانوي</div>
            <button onClick={()=>setDark(!dark)} className="rounded-2xl border border-white/10 p-3">{dark?<Sun/>:<Moon/>}</button>
          </div>
          <h1 className="mt-8 text-4xl md:text-7xl font-black leading-tight">{PLATFORM}</h1>
          <p className="mt-5 text-lg text-slate-300 max-w-2xl">منصة متكاملة للمحاضرات والفيديوهات والواجبات والاختبارات والملفات والمحفظة والشحن والدردشة والمساعد الذكي مع لوحة معلم احترافية.</p>
          <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {[
              ["فتح وقفل حسب الدفع", LockKeyhole], ["Realtime Chat", MessageSquareText], ["رفع حتى 1TB", HardDrive],
              ["Playlists للفيديو", ListVideo], ["تصحيح اختبارات", ClipboardCheck], ["تقارير ودرجات", BarChart3]
            ].map(([x,Icon]) => <div key={x} className="rounded-2xl bg-white/10 p-4 border border-white/10"><Icon className="text-yellow-400 mb-2"/>{x}</div>)}
          </div>
          <div className="mt-auto rounded-3xl bg-white/10 border border-white/10 p-5 flex flex-col md:flex-row gap-4 md:items-center justify-between">
            <div><b>رقم الكاش والتواصل</b><p className="text-yellow-300 text-xl font-black">{CASH_PHONE}</p></div>
            <div className="flex -space-x-3 space-x-reverse">{[1,2,3,4].map(i=><div key={i} className="h-12 w-12 rounded-full border-2 border-slate-900 bg-gradient-to-br from-yellow-300 to-slate-600" />)}</div>
          </div>
        </div>
      </section>
      <section className="rounded-[2.4rem] border border-slate-200/10 bg-white/90 dark:bg-slate-900/90 p-6 md:p-8 shadow-xl backdrop-blur">
        <div className="flex items-center justify-between"><h2 className="text-3xl font-black">دخول آمن</h2><ShieldCheck className="text-yellow-500"/></div>
        <p className="text-slate-500 mt-2">صلاحيات منفصلة للطالب والمعلم بدون تكرار تسجيل جوجل.</p>
        <div className="mt-7 space-y-4">
          <InputIcon icon={Mail} label="البريد الإلكتروني" value={email} onChange={setEmail} placeholder="student@example.com" />
          <InputIcon icon={Lock} label="كلمة المرور" value={password} onChange={setPassword} placeholder="••••••" type="password" />
          <button onClick={login} className="w-full rounded-2xl bg-yellow-500 hover:bg-yellow-400 text-slate-950 font-black py-4 shadow-lg">دخول المنصة</button>
          <button onClick={()=>{setRole("student");setTab("profile")}} className="w-full rounded-2xl border dark:border-white/10 py-4 font-bold">إنشاء حساب طالب جديد</button>
          <button className="w-full rounded-2xl border dark:border-white/10 py-4 font-bold flex items-center justify-center gap-2 opacity-80"><KeyRound size={18}/> تسجيل Google اختياري لاحقًا</button>
          <div className="rounded-2xl bg-slate-100 dark:bg-slate-800 p-4 text-sm leading-7">
            <b>حساب المعلم Demo:</b><br/> {TEACHER_EMAIL} / {TEACHER_PASSWORD}<br/>
            <b>ملاحظة:</b> الإنتاج الحقيقي يحتاج Backend وDatabase وStorage.
          </div>
        </div>
      </section>
    </div>
  </main>;
}

function Topbar({dark,setDark,isTeacher,teacherName,studentName,notice}){return <header className="flex flex-col xl:flex-row gap-4 xl:items-center justify-between">
  <div><div className="inline-flex items-center gap-2 rounded-full bg-yellow-500/15 text-yellow-500 px-3 py-1 text-sm font-bold"><Sparkles size={16}/> تجربة احترافية متكاملة</div><h1 className="text-3xl md:text-4xl font-black mt-2">{isTeacher ? "لوحة تحكم المعلم" : "لوحة الطالب"}</h1><p className="text-slate-500 mt-1">{isTeacher ? teacherName : studentName} • {notice}</p></div>
  <div className="flex flex-wrap gap-2"><button onClick={()=>setDark(!dark)} className="rounded-2xl border dark:border-white/10 p-3">{dark?<Sun/>:<Moon/>}</button><button className="rounded-2xl border dark:border-white/10 px-4 font-bold flex items-center gap-2"><Bell size={18}/> إشعارات</button><button className="rounded-2xl bg-yellow-500 text-slate-950 px-4 font-black flex items-center gap-2"><MessageCircle size={18}/> واتساب</button></div>
</header>}

function Dashboard({isTeacher,wallet}){return <div className="mt-8 space-y-6">
  <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-4">{(isTeacher ? [
    ["إجمالي الطلاب", "1,248", Users], ["الفيديوهات", "186", Video], ["امتحانات نشطة", "42", Trophy], ["دخل الشهر", "68,400 ج.م", Wallet]
  ] : [
    ["رصيد المحفظة", `${wallet} ج.م`, Wallet], ["محاضرات مفتوحة", "28", Unlock], ["واجبات مطلوبة", "4", ClipboardCheck], ["اختبارات قادمة", "3", Trophy]
  ]).map(([a,b,Icon],i)=><motion.div initial={{opacity:0,y:12}} animate={{opacity:1,y:0}} transition={{delay:i*.05}} key={a} className="rounded-3xl border dark:border-white/10 bg-white dark:bg-slate-900 p-5 shadow-sm"><div className="flex items-center justify-between"><Icon className="text-yellow-500"/><MoreHorizontal className="text-slate-400"/></div><p className="mt-4 text-slate-500">{a}</p><b className="text-3xl">{b}</b></motion.div>)}</div>
  {isTeacher ? <TeacherTools/> : <StudentHome/>}
</div>}

function Panel({title, action, children}){return <div className="mt-8 rounded-[2rem] border dark:border-white/10 bg-white dark:bg-slate-900 p-5 shadow-sm"><div className="flex flex-col sm:flex-row gap-3 sm:items-center justify-between mb-5"><h2 className="text-2xl font-black">{title}</h2><button className="rounded-2xl bg-yellow-500 text-slate-950 font-black px-4 py-3 flex items-center justify-center gap-2"><Plus size={18}/>{action}</button></div>{children}</div>}
function Card({icon:Icon,title,text}){return <div className="rounded-3xl border dark:border-white/10 p-5 bg-slate-50 dark:bg-slate-950/70 hover:-translate-y-1 transition"><Icon className="text-yellow-500"/><h3 className="font-black mt-3">{title}</h3><p className="text-slate-500 mt-1 leading-7">{text}</p></div>}
function TeacherTools(){return <div className="grid md:grid-cols-2 xl:grid-cols-5 gap-4">{teacherTools.map(([title,Icon,text])=><Card key={title} icon={Icon} title={title} text={text}/>)}</div>}
function StudentHome(){return <div className="grid xl:grid-cols-3 gap-4"><div className="xl:col-span-2 rounded-3xl border dark:border-white/10 p-5 bg-white dark:bg-slate-900"><h2 className="font-black text-xl">استكمل التعلم</h2><div className="mt-4 rounded-3xl bg-slate-100 dark:bg-slate-950 p-5 flex items-center gap-4"><div className="h-20 w-28 rounded-2xl bg-gradient-to-br from-yellow-400 to-slate-700 flex items-center justify-center"><PlayCircle className="text-white" size={42}/></div><div className="flex-1"><b>الحث الكهرومغناطيسي - الدرس 2</b><p className="text-slate-500">أكمل المشاهدة ثم حل الاختبار القصير.</p><div className="mt-3 h-2 rounded-full bg-slate-200 dark:bg-slate-800"><div className="h-2 rounded-full bg-yellow-500 w-2/3"/></div></div></div></div><div className="rounded-3xl border dark:border-white/10 p-5 bg-white dark:bg-slate-900"><h2 className="font-black text-xl">تنبيهات مهمة</h2><p className="mt-3 text-slate-500 leading-7">واجب الحركة الخطية ينتهي خلال يومين. يوجد اختبار قصير بعد محاضرة التيار.</p></div></div>}

function Courses({query,setQuery,filtered,isTeacher,wallet}){return <Panel title={isTeacher ? "إدارة الكورسات والـ Playlists" : "المحاضرات والكورسات"} action={isTeacher ? "إضافة كورس" : "متابعة التعلم"}>
  <div className="flex flex-col md:flex-row gap-3 mb-5"><div className="flex-1 flex items-center gap-2 rounded-2xl border dark:border-white/10 px-4 py-3"><Search size={18}/><input value={query} onChange={e=>setQuery(e.target.value)} placeholder="ابحث عن فصل، مستوى، أو Playlist" className="w-full bg-transparent outline-none"/></div><button className="rounded-2xl border dark:border-white/10 px-4 flex items-center justify-center gap-2"><Filter size={18}/> فلترة</button></div>
  <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-4">{filtered.map(c=><CourseCard key={c.id} c={c} teacher={isTeacher} wallet={wallet}/>)}</div>
</Panel>}
function CourseCard({c,teacher,wallet}){const canOpen=!c.locked||wallet>=c.price;return <div className="rounded-3xl overflow-hidden border dark:border-white/10 bg-slate-50 dark:bg-slate-950/70"><div className="h-36 bg-gradient-to-br from-yellow-400 via-amber-600 to-slate-900 flex items-center justify-center relative"><PlayCircle size={50} className="text-white"/><span className="absolute top-3 right-3 rounded-full bg-black/50 text-white px-3 py-1 text-xs">{c.playlist}</span></div><div className="p-4"><div className="flex items-center justify-between"><span className="text-xs rounded-full bg-yellow-500/20 px-3 py-1 text-yellow-500">{c.level}</span>{c.locked&&!canOpen?<LockKeyhole className="text-red-400"/>:<Unlock className="text-emerald-400"/>}</div><h3 className="font-black text-lg mt-3">{c.title}</h3><p className="text-sm text-slate-500 mt-1">{c.lessons} فيديو • {c.exams} امتحان • {c.assignments} واجب • {c.files} ملف</p><p className="text-sm mt-2"><b>{c.price} ج.م</b> • {c.duration}</p><div className="mt-4 h-2 rounded-full bg-slate-200 dark:bg-slate-800"><div className="h-2 rounded-full bg-yellow-500" style={{width:c.progress+"%"}}/></div><button className={cls("mt-4 w-full rounded-2xl py-3 font-bold", canOpen?"bg-yellow-500 text-slate-950":"border dark:border-white/10 text-slate-500")}>{teacher?"تعديل / قفل / فتح":canOpen?"فتح المحاضرات":"اشحن لفتح الكورس"}</button></div></div>}

function TeacherVideos(){return <Panel title="رفع وإدارة الفيديوهات" action="رفع فيديو جديد"><div className="grid xl:grid-cols-[1fr_.8fr] gap-4"><div className="rounded-3xl border border-dashed dark:border-white/10 p-8 text-center"><Upload className="mx-auto text-yellow-500" size={44}/><h3 className="font-black mt-3">رفع فيديو أو ملفات حتى 1TB</h3><p className="text-slate-500 mt-2">اربط Storage خارجي مثل S3/Bunny/Cloudflare R2 في النسخة الحقيقية.</p></div><div className="space-y-3">{["Playlist الحركة", "Playlist الكهربية", "Playlist المراجعة"].map(x=><div key={x} className="rounded-2xl border dark:border-white/10 p-4 flex items-center justify-between"><span className="font-bold">{x}</span><button className="text-yellow-500"><Pencil size={18}/></button></div>)}</div></div></Panel>}
function TaskList({teacher}){return <div className="space-y-3">{["واجب الحركة الخطية","واجب التيار الكهربي","ملف مسائل البصريات","تسليم تجربة عملية"].map((x,i)=><div key={x} className="rounded-2xl border dark:border-white/10 p-4 flex flex-col md:flex-row gap-3 md:items-center justify-between"><div><b>{x}</b><p className="text-sm text-slate-500">آخر موعد: {12+i}/6/2026 • الدرجة: {20+i*5} • مسموح ملف PDF/صورة</p></div><button className="rounded-xl bg-yellow-500 text-slate-950 px-4 py-2 font-bold">{teacher?"مراجعة التسليمات":"حل الآن"}</button></div>)}</div>}
function ExamBuilder({teacher}){return <div className="grid md:grid-cols-2 gap-4"><Card icon={ClipboardCheck} title={teacher?"منشئ الامتحانات":"اختبار متاح"} text={teacher?"MCQ، مقالي، مؤقت، ترتيب عشوائي، درجات، ومحاولات.":"اختبار الفصل الأول - 30 دقيقة - تصحيح فوري."}/><Card icon={BarChart3} title="تحليل النتائج" text="متوسط الدرجات، أكثر الأسئلة خطأ، ومستوى كل طالب."/><div className="md:col-span-2 rounded-3xl border dark:border-white/10 p-5"><h3 className="font-black mb-3">مثال سؤال</h3><p>عند زيادة فرق الجهد إلى الضعف وثبات المقاومة فإن شدة التيار...</p><div className="grid md:grid-cols-4 gap-2 mt-4">{["تقل للنصف","تتضاعف","تثبت","تصبح صفر"].map((a,i)=><button key={a} className={cls("rounded-2xl border p-3",i===1?"border-yellow-500 bg-yellow-500/10":"dark:border-white/10")}>{a}</button>)}</div></div></div>}
function QuestionBank(){return <Panel title="بنك الأسئلة" action="إضافة سؤال"><div className="grid md:grid-cols-3 gap-4"><Card icon={Database} title="2,450 سؤال" text="مصنفة حسب الفصل، المستوى، ونوع السؤال."/><Card icon={Zap} title="توليد امتحان" text="اسحب 30 سؤالًا عشوائيًا من فصول محددة."/><Card icon={BadgeCheck} title="مراجعة الجودة" text="تمييز الأسئلة المكررة أو الناقصة قبل النشر."/></div></Panel>}
function BubbleSheets(){return <Panel title="Bubble Sheets" action="رفع نموذج"><div className="grid md:grid-cols-2 gap-4"><Card icon={ScanLine} title="تصحيح ورقي" text="ارفع صورة نموذج الإجابة لتسجيل درجات الطلاب."/><Card icon={FileText} title="نماذج متعددة" text="A/B/C/D مع مفاتيح إجابة منفصلة."/></div></Panel>}
function StudentsPanel(){return <Panel title="إدارة الطلاب والحضور" action="إضافة طالب"><div className="overflow-auto"><table className="w-full text-sm"><thead><tr className="text-slate-500 border-b dark:border-white/10"><th className="p-3 text-right">الطالب</th><th>الحالة</th><th>التقدم</th><th>الرصيد</th><th>الحضور</th><th></th></tr></thead><tbody>{students.map(s=><tr key={s[0]} className="border-b dark:border-white/10"><td className="p-3 font-bold">{s[0]}</td><td>{s[1]}</td><td>{s[2]}</td><td>{s[3]}</td><td>{s[4]}</td><td><button className="rounded-xl bg-yellow-500 text-slate-950 px-3 py-2 font-bold">إدارة</button></td></tr>)}</tbody></table></div></Panel>}
function Files({teacher}){return <div className="grid md:grid-cols-3 gap-4">{["مذكرة الفصل الأول.pdf","قوانين الفيزياء.pdf","صور تجارب عملية.zip","ملخص ليلة الامتحان.pdf","واجب شامل.docx","جدول المراجعة.xlsx"].map((f,i)=><Card key={f} icon={i===2?ImageIcon:Download} title={f} text={teacher?"تعديل / حذف / إعادة رفع / قفل حسب الدفع":"تحميل الملف ومراجعته"}/>)}</div>}
function WalletPanel({wallet,chargeCode,setChargeCode,chargeWallet}){return <Panel title="المحفظة والشحن" action="طلب تأكيد"><div className="grid xl:grid-cols-3 gap-4"><Card icon={Wallet} title="رصيدك الحالي" text={`${wallet} ج.م`}/><Card icon={Phone} title="الكاش / واتساب" text={CASH_PHONE}/><Card icon={CreditCard} title="فتح المحاضرات" text="يتم خصم سعر الكورس أو فتحه بعد تأكيد الدفع."/><div className="xl:col-span-3 rounded-3xl border dark:border-white/10 p-5"><label className="font-black">كود الشحن</label><div className="mt-3 flex gap-2"><input value={chargeCode} onChange={e=>setChargeCode(e.target.value)} placeholder="اكتب كود الشحن" className="flex-1 rounded-2xl border dark:border-white/10 bg-transparent px-4 py-3 outline-none"/><button onClick={chargeWallet} className="rounded-2xl bg-yellow-500 text-slate-950 px-5 font-black">شحن</button></div></div></div></Panel>}
function ChatPanel({isTeacher}){return <Panel title={isTeacher?"الرسائل والواتساب والتعليقات":"الدردشة والدعم"} action="إرسال رسالة"><div className="grid xl:grid-cols-[.8fr_1.2fr] gap-4"><div className="rounded-3xl border dark:border-white/10 p-4 space-y-2">{["الدعم العام","تعليقات المحاضرات","رسائل الطلاب","واتساب"].map((x,i)=><button key={x} className={cls("w-full rounded-2xl p-3 text-right",i===0?"bg-yellow-500 text-slate-950 font-black":"hover:bg-slate-100 dark:hover:bg-white/10")}>{x}</button>)}</div><div className="rounded-3xl border dark:border-white/10 p-5"><div className="space-y-3">{messages.map(([u,m])=><div key={m} className="rounded-2xl bg-slate-100 dark:bg-slate-950 p-4"><b className="text-yellow-500">{u}</b><p className="mt-1">{m}</p></div>)}</div><div className="mt-4 flex gap-2"><input placeholder="اكتب رسالة..." className="flex-1 rounded-2xl border dark:border-white/10 bg-transparent px-4 py-3 outline-none"/><button className="rounded-2xl bg-yellow-500 text-slate-950 px-4"><Send/></button></div></div></div></Panel>}
function AIPanel(){return <Panel title="المساعد الذكي" action="اسأل الآن"><div className="grid md:grid-cols-2 gap-4"><Card icon={Bot} title="شرح سؤال" text="اكتب السؤال ليشرح لك الفكرة خطوة بخطوة."/><Card icon={Sparkles} title="خطة مذاكرة" text="اقتراح محاضرات وواجبات حسب مستواك ودرجاتك."/><div className="md:col-span-2 rounded-3xl border dark:border-white/10 p-5"><input placeholder="مثال: اشرح قانون أوم بطريقة بسيطة" className="w-full rounded-2xl border dark:border-white/10 bg-transparent px-4 py-4 outline-none"/></div></div></Panel>}
function ReportsPanel(){return <Panel title="التقارير والتحليلات" action="تصدير PDF"><div className="grid md:grid-cols-4 gap-4"><Card icon={UserCheck} title="الحضور" text="87% متوسط حضور الشهر."/><Card icon={Eye} title="المشاهدات" text="14,820 مشاهدة محاضرات."/><Card icon={Trophy} title="الدرجات" text="متوسط الاختبارات 76%."/><Card icon={Wallet} title="المدفوعات" text="مدفوع/معلق/مرفوض."/></div></Panel>}
function Profile({isTeacher,name,setName}){return <Panel title={isTeacher?"بروفايل المعلم":"بروفايل الطالب"} action="حفظ التعديل"><div className="grid md:grid-cols-[240px_1fr] gap-6"><div className="rounded-3xl border dark:border-white/10 p-5 text-center"><div className="mx-auto h-36 w-36 rounded-full bg-gradient-to-br from-yellow-400 to-slate-700 flex items-center justify-center shadow-xl"><User size={58}/></div><button className="mt-4 rounded-2xl border dark:border-white/10 px-4 py-2">تغيير الصورة</button><p className="text-slate-500 text-sm mt-3">صورة شخصية واضحة للثقة داخل المنصة</p></div><div className="space-y-4"><Input label="الاسم" value={name} onChange={setName}/><Input label="رقم الهاتف" value={CASH_PHONE}/><Input label="البريد" value={isTeacher?TEACHER_EMAIL:"student@example.com"}/><Input label="كلمة المرور الجديدة" value="" placeholder="اتركها فارغة إذا لا تريد التغيير"/><Input label="نبذة قصيرة" value={isTeacher?"مدرس فيزياء 3 ثانوي - شرح مبسط بدون صداع":"طالب فيزياء 3 ثانوي"}/></div></div></Panel>}
function SettingsPanel({dark,setDark,isTeacher,notice,setNotice}){return <Panel title="الإعدادات والصلاحيات" action="حفظ"><div className="grid md:grid-cols-2 gap-4"><Card icon={ShieldCheck} title="الأمان" text="صلاحيات منفصلة، تغيير كلمة المرور، وحماية الحساب."/><Card icon={Eye} title="المظهر" text="تبديل بين الوضع الليلي والفاتح وحفظ التفضيل."/><button onClick={()=>setDark(!dark)} className="rounded-3xl border dark:border-white/10 p-5 text-right font-black">تبديل الثيم الآن: {dark?"Dark":"Light"}</button>{isTeacher&&<div className="rounded-3xl border dark:border-white/10 p-5"><label className="font-black">إعلان يظهر للطلاب</label><textarea value={notice} onChange={e=>setNotice(e.target.value)} className="mt-3 w-full rounded-2xl border dark:border-white/10 bg-transparent p-3 outline-none"/></div>}<Card icon={HardDrive} title="Storage" text="للرفع حتى 1TB اربط S3/Bunny/R2 ولا تخزن الفيديوهات مباشرة في قاعدة البيانات."/><Card icon={MessageCircle} title="واتساب" text={`رقم التواصل الحالي: ${CASH_PHONE}`}/></div></Panel>}
function Input({label,value,onChange,placeholder}){return <label className="block"><span className="text-sm text-slate-500">{label}</span><input value={value} placeholder={placeholder} onChange={e=>onChange?.(e.target.value)} className="mt-2 w-full rounded-2xl border dark:border-white/10 bg-transparent px-4 py-3 outline-none"/></label>}
function InputIcon({icon:Icon,label,value,onChange,placeholder,type="text"}){return <label className="block"><span className="text-sm text-slate-500">{label}</span><div className="mt-2 flex items-center gap-2 rounded-2xl border dark:border-white/10 px-4 py-3"><Icon size={18}/><input className="bg-transparent outline-none w-full" type={type} value={value} onChange={e=>onChange(e.target.value)} placeholder={placeholder}/></div></label>}
