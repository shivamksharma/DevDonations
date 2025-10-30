"use client";

import { motion } from "framer-motion";
import { 
  Plus, 
  Download, 
  Upload, 
  Mail, 
  FileText, 
  Users, 
  Calendar,
  TrendingUp,
  Filter,
  RefreshCw
} from "lucide-react";
import { Button } from "@/shared/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/shared/components/ui/card";
import { Badge } from "@/shared/components/ui/badge";
import { Separator } from "@/shared/components/ui/separator";
import { toast } from "@/shared/hooks/use-toast";

export function QuickActions() {
  const handleExportData = () => {
    toast.success("Data export started. You'll receive an email when ready.");
  };

  const handleSendNewsletter = () => {
    toast.success("Newsletter sent to all subscribers");
  };

  const handleGenerateReport = () => {
    toast.success("Monthly report is being generated");
  };

  const handleRefreshData = () => {
    toast.success("Data refreshed successfully");
  };

  const quickActions = [
    {
      title: "Create Event",
      description: "Add a new fundraising event",
      icon: Plus,
      color: "text-green-600",
      bgColor: "hover:bg-green-50",
      onClick: () => toast.info("Event creation form would open here"),
    },
    {
      title: "Export Data",
      description: "Download donation records",
      icon: Download,
      color: "text-blue-600",
      bgColor: "hover:bg-blue-50",
      onClick: handleExportData,
    },
    {
      title: "Send Newsletter",
      description: "Email all volunteers",
      icon: Mail,
      color: "text-purple-600",
      bgColor: "hover:bg-purple-50",
      onClick: handleSendNewsletter,
    },
    {
      title: "Generate Report",
      description: "Monthly impact summary",
      icon: FileText,
      color: "text-orange-600",
      bgColor: "hover:bg-orange-50",
      onClick: handleGenerateReport,
    },
  ];

  const systemActions = [
    {
      title: "Refresh Data",
      icon: RefreshCw,
      onClick: handleRefreshData,
    },
    {
      title: "Filter Options",
      icon: Filter,
      onClick: () => toast.info("Advanced filters would open here"),
    },
    {
      title: "View Analytics",
      icon: TrendingUp,
      onClick: () => toast.info("Detailed analytics would open here"),
    },
  ];

  return (
    <div className="space-y-6">
      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5" />
            Quick Actions
          </CardTitle>
          <CardDescription>
            Common administrative tasks
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {quickActions.map((action, index) => (
              <motion.div
                key={action.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Button
                  variant="outline"
                  className={`w-full h-auto p-4 flex flex-col items-start gap-2 ${action.bgColor} border-l-4 transition-all`}
                  onClick={action.onClick}
                >
                  <div className="flex items-center gap-3 w-full">
                    <div className={`p-2 rounded-full bg-muted ${action.color}`}>
                      <action.icon className="h-4 w-4" />
                    </div>
                    <div className="text-left flex-1">
                      <p className="font-medium text-sm">{action.title}</p>
                      <p className="text-xs text-muted-foreground">
                        {action.description}
                      </p>
                    </div>
                  </div>
                </Button>
              </motion.div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* System Actions */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="h-5 w-5" />
            System Tools
          </CardTitle>
          <CardDescription>
            Data management and system utilities
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            {systemActions.map((action, index) => (
              <motion.div
                key={action.title}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
              >
                <Button
                  variant="secondary"
                  size="sm"
                  className="flex items-center gap-2"
                  onClick={action.onClick}
                >
                  <action.icon className="h-4 w-4" />
                  {action.title}
                </Button>
              </motion.div>
            ))}
          </div>
          
          <Separator className="my-4" />
          
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <p className="text-sm font-medium">System Status</p>
              <p className="text-xs text-muted-foreground">
                All services operational
              </p>
            </div>
            <Badge variant="outline" className="text-green-600 border-green-200">
              Healthy
            </Badge>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}