import { ElectronicArtsBar } from "@/components/layout/ElectronicArtsBar";
import { UnboundFooter } from "@/components/unbound/UnboundFooter";
import { UnboundNav } from "@/components/unbound/UnboundNav";

export default function NeedForSpeedUnboundLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      <div className="sticky top-0 z-50">
        <ElectronicArtsBar />
        <UnboundNav />
      </div>
      {children}
      <UnboundFooter />
    </div>
  );
}
