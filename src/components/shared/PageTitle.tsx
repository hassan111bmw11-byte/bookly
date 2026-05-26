type Props = {
  title: string;
  desc?: string;
};

export default function PageTitle({ title, desc }: Props) {
  return (
    <div className="mb-6">
      <h1 className="text-3xl font-black md:text-4xl">{title}</h1>
      {desc && <p className="mt-2 text-slate-500 dark:text-slate-400">{desc}</p>}
    </div>
  );
}
