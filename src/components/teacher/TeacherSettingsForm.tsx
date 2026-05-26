import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import Input from "@/components/ui/Input";
import Textarea from "@/components/ui/Textarea";

export default function TeacherSettingsForm() {
  return (
    <Card className="mx-auto max-w-2xl">
      <form className="space-y-5">
        <Input label="اسم المعلم" defaultValue="أحمد محرم" />
        <Input label="رقم فودافون كاش" defaultValue="+201097242107" />
        <Input label="رقم الواتساب" defaultValue="+201097242107" />
        <Textarea label="نص الترحيب" defaultValue="منصة فهمني من غير صداع - الفيزياء للصف الثالث الثانوي مع الأستاذ أحمد" />
        <Button>حفظ التغييرات</Button>
      </form>
    </Card>
  );
}
