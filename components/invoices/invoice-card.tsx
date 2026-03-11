interface InvoiceCardProps {
  id: string;
  icon: React.ReactNode;
  title: string;
  subtitle: string;
  children: React.ReactNode;
  visible: boolean;
  delay: string;
}

export function InvoiceCard({ 
  id, 
  icon, 
  title, 
  subtitle, 
  children, 
  visible, 
  delay 
}: InvoiceCardProps) {
  return (
    <div 
      id={id}
      className={`bg-white/[0.02] border border-white/6 rounded-2xl overflow-hidden transition-all duration-500 ${
        visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'
      }`}
      style={{ transitionDelay: delay }}
    >
      <div className="flex items-center gap-3 px-6 py-5 border-b border-white/6">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500/20 to-purple-500/20 flex items-center justify-center text-indigo-400">
          {icon}
        </div>
        <div>
          <h2 className="font-syne text-base font-bold text-white">{title}</h2>
          <p className="text-xs text-white/40 mt-0.5">{subtitle}</p>
        </div>
      </div>
      <div className="p-6">
        {children}
      </div>
    </div>
  );
}
