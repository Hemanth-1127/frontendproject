import { LucideIcon } from 'lucide-react';

type StatsCardProps = {
  label: string;
  value: number;
  icon: LucideIcon;
  bgColor: string;
  textColor: string;
};

export default function StatsCard({ label, value, icon: Icon, bgColor, textColor }: StatsCardProps) {
  return (
    <div className={`${bgColor} rounded-xl p-6 shadow-sm hover:shadow-md transition`}>
      <div className="flex items-center justify-between mb-2">
        <Icon className={`w-6 h-6 ${textColor}`} />
      </div>
      <div className={`text-4xl font-bold ${textColor} mb-1`}>{value}</div>
      <div className={`text-sm font-medium ${textColor} opacity-80`}>{label}</div>
    </div>
  );
}
