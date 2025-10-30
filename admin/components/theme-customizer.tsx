"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/shared/components/ui/card";
import { Button } from "@/shared/components/ui/button";
import { Badge } from "@/shared/components/ui/badge";
import { Switch } from "@/shared/components/ui/switch";
import { Label } from "@/shared/components/ui/label";
import { Separator } from "@/shared/components/ui/separator";
import { 
  Palette, 
  Monitor, 
  Sun, 
  Moon, 
  Settings,
  Eye,
  Layout,
  Zap,
  Save
} from "lucide-react";
import { useState } from "react";
import { useTheme } from "next-themes";
import { toast } from "@/shared/hooks/use-toast";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/components/ui/select";

export function ThemeCustomizer() {
  const { theme, setTheme } = useTheme();
  const [compactMode, setCompactMode] = useState(false);
  const [showAnimations, setShowAnimations] = useState(true);
  const [autoRefresh, setAutoRefresh] = useState(true);
  const [accentColor, setAccentColor] = useState("blue");

  const handleSaveSettings = () => {
    toast.success("Theme settings saved successfully");
  };

  const colorOptions = [
    { value: "blue", label: "Blue", color: "bg-blue-500" },
    { value: "green", label: "Green", color: "bg-green-500" },
    { value: "purple", label: "Purple", color: "bg-purple-500" },
    { value: "orange", label: "Orange", color: "bg-orange-500" },
    { value: "red", label: "Red", color: "bg-red-500" },
    { value: "pink", label: "Pink", color: "bg-pink-500" },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Palette className="h-5 w-5" />
          Theme & Preferences
        </CardTitle>
        <CardDescription>
          Customize the appearance and behavior of your admin panel
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Theme Selection */}
        <div className="space-y-3">
          <Label className="text-sm font-medium">Color Theme</Label>
          <div className="grid grid-cols-3 gap-2">
            <Button
              variant={theme === "light" ? "default" : "outline"}
              size="sm"
              onClick={() => setTheme("light")}
              className="flex items-center gap-2"
            >
              <Sun className="h-4 w-4" />
              Light
            </Button>
            <Button
              variant={theme === "dark" ? "default" : "outline"}
              size="sm"
              onClick={() => setTheme("dark")}
              className="flex items-center gap-2"
            >
              <Moon className="h-4 w-4" />
              Dark
            </Button>
            <Button
              variant={theme === "system" ? "default" : "outline"}
              size="sm"
              onClick={() => setTheme("system")}
              className="flex items-center gap-2"
            >
              <Monitor className="h-4 w-4" />
              System
            </Button>
          </div>
        </div>

        <Separator />

        {/* Accent Color */}
        <div className="space-y-3">
          <Label className="text-sm font-medium">Accent Color</Label>
          <Select value={accentColor} onValueChange={setAccentColor}>
            <SelectTrigger>
              <SelectValue placeholder="Select accent color" />
            </SelectTrigger>
            <SelectContent>
              {colorOptions.map((color) => (
                <SelectItem key={color.value} value={color.value}>
                  <div className="flex items-center gap-2">
                    <div className={`h-4 w-4 rounded-full ${color.color}`} />
                    {color.label}
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <Separator />

        {/* Interface Options */}
        <div className="space-y-4">
          <Label className="text-sm font-medium">Interface Options</Label>
          
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Layout className="h-4 w-4" />
                <Label htmlFor="compact-mode" className="text-sm">
                  Compact Mode
                </Label>
              </div>
              <Switch
                id="compact-mode"
                checked={compactMode}
                onCheckedChange={setCompactMode}
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Eye className="h-4 w-4" />
                <Label htmlFor="animations" className="text-sm">
                  Show Animations
                </Label>
              </div>
              <Switch
                id="animations"
                checked={showAnimations}
                onCheckedChange={setShowAnimations}
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Zap className="h-4 w-4" />
                <Label htmlFor="auto-refresh" className="text-sm">
                  Auto Refresh Data
                </Label>
              </div>
              <Switch
                id="auto-refresh"
                checked={autoRefresh}
                onCheckedChange={setAutoRefresh}
              />
            </div>
          </div>
        </div>

        <Separator />

        {/* Preview */}
        <div className="space-y-3">
          <Label className="text-sm font-medium">Preview</Label>
          <div className="p-4 border rounded-lg space-y-3 bg-muted/50">
            <div className="flex items-center gap-2">
              <div className={`h-3 w-3 rounded-full ${colorOptions.find(c => c.value === accentColor)?.color}`} />
              <span className="text-sm">Sample accent color</span>
            </div>
            <div className="flex gap-2">
              <Badge variant="default">Default</Badge>
              <Badge variant="secondary">Secondary</Badge>
              <Badge variant="outline">Outline</Badge>
            </div>
            <Button size="sm" className="w-full">
              Sample Button
            </Button>
          </div>
        </div>

        {/* Save Button */}
        <Button onClick={handleSaveSettings} className="w-full">
          <Save className="h-4 w-4 mr-2" />
          Save Settings
        </Button>
      </CardContent>
    </Card>
  );
}