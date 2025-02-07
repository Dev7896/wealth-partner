"use client";

import { useState } from "react";
import Cookies from "js-cookie";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { X, Calendar, Edit, FileText, Bell } from "lucide-react";
import { motion } from "framer-motion";

export default function NotificationForm({ onSubmit, onClose }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [type, setType] = useState("info");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({
      email: Cookies.get("email"),
      title,
      description,
      date,
      type,
      isRead: false,
    });
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        transition={{ duration: 0.3 }}
      >
        <Card className="p-6 border-2 border-black shadow-[4px_4px_0px_black] bg-white rounded-lg w-96">
          {/* Header */}
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold flex items-center gap-2">
              <Bell className="w-5 h-5" /> Add Notification
            </h2>
            <Button variant="ghost" onClick={onClose} className="p-1">
              <X size={20} />
            </Button>
          </div>

          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4 w-auto h-auto block p-0 m-0">
              {/* Title Input */}
              <div className="relative">
                <Input
                  placeholder="Title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                  className="pl-10"
                />
                <Edit className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 w-5 h-5" />
              </div>

              {/* Description Input */}
              <div className="relative">
                <Textarea
                  placeholder="Description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  required
                  className="pl-10"
                />
                <FileText className="absolute left-3 top-4 text-gray-500 w-5 h-5" />
              </div>

              {/* Date Input */}
              <div className="relative">
                <Input
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  required
                  className="pl-10"
                />
                <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 w-5 h-5" />
              </div>

              {/* Type Selection */}
              <Select onValueChange={setType} value={type}>
                <SelectTrigger className="pl-10">
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="info">Info</SelectItem>
                  <SelectItem value="warning">Warning</SelectItem>
                  <SelectItem value="success">Success</SelectItem>
                </SelectContent>
              </Select>

              {/* Submit Button */}
              <Button type="submit" className="w-full">
                Submit
              </Button>
            </form>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
