import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import Input from "@/components/ui/Input";
import Textarea from "@/components/ui/Textarea";

export default function TeacherProfileForm() {
  return (
    <div className="mx-auto max-w-2xl space-y-5">
      <Card>
        <div className="mb-5 flex items-center gap-5">
          <div className="h-20 w-20 rounded-full bg-gradient-to-br from-cyan-400 to-indigo-500" />
          <Button variant="outline">تغيير الصورة</Button>
        </div>
        <form className="space-y-5">
          <Input label="الاسم" defaultValue="الأستاذ أحمد" />
          <div className="grid gap-4 md:grid-cols-2">
            <Input label="الهاتف" defaultValue="+20 10 972 421 07" />
            <Input label="هاتف ولي الأمر" defaultValue="+20 10 972 421 07" />
          </div>
          <Input label="المحافظة" defaultValue="الوادي الجديد" />
          <Textarea label="نبذة" />
          <Button>حفظ</Button>
        </form>
      </Card>
      <Card>
        <h2 className="mb-4 text-xl font-black">تغيير كلمة المرور</h2>
        <div className="flex gap-3">
          <Input placeholder="كلمة مرور جديدة" type="password" />
          <Button variant="outline">تغيير</Button>
        </div>
      </Card>
    </div>
  );
}
