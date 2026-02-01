import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Activity } from "lucide-react";

export default function HomePageComponent() {
  return (
    <main className="min-h-screen bg-linear-to-b from-slate-50 to-slate-100 flex items-center justify-center p-6">
      <Card className="w-full max-w-3xl shadow-lg rounded-2xl transition-all duration-300 hover:shadow-2xl hover:-translate-y-1">
        <CardContent className="p-10">
          <div className="flex flex-col items-center text-center gap-6">
            <div className="flex items-center gap-3 group">
              <Activity className="h-10 w-10 transition-transform duration-300 group-hover:rotate-6 text-[#20467e]" />
              <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-[#20467e]">
                MES Services Monitoring
              </h1>
            </div>

            <p className="text-slate-600 max-w-xl">
              Centralized monitoring dashboard for MES services. Select an environment
              to view real-time server and service status.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full mt-6">
              <Link href="/servers-status-prd" className="w-full">
                <Button
                  size="lg"
                  className="w-full h-20 text-lg rounded-2xl shadow-md transition-all duration-300 hover:scale-[1.03] hover:shadow-xl cursor-pointer"
                >
                  Production (PRD)
                </Button>
              </Link>

              <Link href="/servers-status-qas" className="w-full">
                <Button
                  size="lg"
                  variant="secondary"
                  className="w-full h-20 text-lg rounded-2xl shadow-md transition-all duration-300 hover:scale-[1.03] hover:shadow-xl cursor-pointer"
                >
                  Quality Assurance (QAS)
                </Button>
              </Link>
            </div>
          </div>
        </CardContent>
      </Card>
    </main>
  );
}
