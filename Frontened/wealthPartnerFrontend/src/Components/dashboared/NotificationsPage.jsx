"use client";

import { useState, useEffect } from "react";
import {
  Bell,
  Info,
  AlertTriangle,
  CheckCircle,
  ChevronRight,
  Plus,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import Cookies from "js-cookie";
import { showMessage } from "../LoginSections/SignupUtility";
import NotificationCard from "../ui/NotificationCard";
import NotificationForm from "../ui/NotificationForm";

const fetchNotifications = async () => {
  const email = Cookies.get("email");
  if (!email) throw new Error("User email is missing");

  const res = await fetch("http://localhost:8080/api/notifications/", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email }), // Send email in the body
  });

  if (!res.ok) throw new Error(`Error: ${res.status} ${res.statusText}`);
  return res.json();
};


export default function NotificationsPage() {
  const [notifications, setNotifications] = useState([]);
  const [isFormOpen, setIsFormOpen] = useState(false);

  useEffect(() => {
    const loadNotifications = async () => {
      try {
        const data = await fetchNotifications();
        setNotifications(data);
      } catch (error) {
        console.error(error);
      }
    };
    loadNotifications();
  }, []);

const handleMarkAsRead = async (id, action) => {
  try {
    if (action === "delete") {
      await fetch(`http://localhost:8080/api/notifications/${id}`, {
        method: "DELETE",
      });
      setNotifications(notifications.filter((notif) => notif._id !== id));
    } else {
      await fetch(`http://localhost:8080/api/notifications/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ isRead: true }),
      });

      setNotifications(
        notifications.map((notif) =>
          notif._id === id ? { ...notif, isRead: true } : notif
        )
      );
    }
  } catch (error) {
    console.error("Error updating notification:", error);
  }
};


  const handleFormSubmit = async (formData) => {
    try {
      const res = await fetch("http://localhost:8080/api/notifications/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (!res.ok) throw new Error("Failed to add notification");
      showMessage("Notfication added successfully", "success");
      const updatedNotifications = await fetchNotifications();
      setNotifications(updatedNotifications);
      setIsFormOpen(false);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold flex items-center">
          <Bell className="mr-2" /> Notifications
        </h1>
        <Button
          onClick={() => setIsFormOpen(true)}
          className="flex items-center gap-2"
        >
          <Plus size={18} /> Add Notification
        </Button>
      </div>

      {isFormOpen && (
        <NotificationForm
          onSubmit={handleFormSubmit}
          onClose={() => setIsFormOpen(false)}
        />
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {notifications.map((notification) => (
          <NotificationCard
            key={notification._id}
            notification={notification}
            handleMarkAsRead={handleMarkAsRead}
          />
        ))}
      </div>
    </div>
  );
}


