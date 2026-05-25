export default function Navbar(){
    return(
        <div className="bg-yellow-600 rounded-2xl container mx-auto fixed top-4 left-4 right-4 h-12  flex justify-around items-center px-">
            <div className="font-bold text-xl flex gap-4 items-center"><span className="px-4 py-2 bg-slate-950 rounded-md text-yellow-600 text-md">B</span>Bookly
            </div>
            <div className="flex gap-4 items-center font-bold">
                <nav>الرئيسية</nav>
                <nav>استكشف</nav>
                <nav>كيف احجز</nav>
                <nav>تواصل معنا</nav>
            </div>
            <div className="flex gap-4 items-center font-bold">
                <button className="bg-slate-950 px-2 py-1 rounded-md text-yellow-600">تسجيل الدخول</button>
                <button className="bg-slate-950 px-2 py-1 rounded-md text-yellow-600">انشاء حساب</button>
            </div>
        </div>
    )
}