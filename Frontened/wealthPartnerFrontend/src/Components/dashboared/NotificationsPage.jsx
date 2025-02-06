"use client"

import { useState } from "react"
import { Bell, Info, AlertTriangle, CheckCircle, ChevronRight } from "lucide-react"

const notificationsData = [
  {
    id: 1,
    title: "New Update Available",
    description: "A new version of the app is available. Please update.",
    date: "Jan 31, 2025",
    type: "info",
    isRead: false,
  },
  {
    id: 2,
    title: "Stock Low",
    description: "Your stock for Product X is running low.",
    date: "Jan 30, 2025",
    type: "warning",
    isRead: false,
  },
  {
    id: 3,
    title: "Payment Received",
    description: "Payment for order #12345 has been received.",
    date: "Jan 29, 2025",
    type: "success",
    isRead: false,
  },
  // Add more notifications as needed
]

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState(notificationsData)

  const handleMarkAsRead = (id) => {
    setNotifications(notifications.map((notif) => (notif.id === id ? { ...notif, isRead: true } : notif)))
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 flex items-center">
        <Bell className="mr-2" /> Notifications
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {notifications.map((notification) => (
          <NotificationCard key={notification.id} notification={notification} onMarkAsRead={handleMarkAsRead} />
        ))}
      </div>
    </div>
  )
}

function NotificationCard({ notification, onMarkAsRead }) {
  const { id, title, description, date, type, isRead } = notification

  const getIcon = () => {
    switch (type) {
      case "info":
        return <Info className="text-blue-500" />
      case "warning":
        return <AlertTriangle className="text-yellow-500" />
      case "success":
        return <CheckCircle className="text-green-500" />
      default:
        return <Bell className="text-gray-500" />
    }
  }

  return (
    <div className={`bg-white rounded-lg p-4 shadow-md hover:shadow-lg transition-all ${isRead ? "opacity-70" : ""}`}>
      <div className="flex items-start mb-2">
        <div className="flex-shrink-0 mr-3">{getIcon()}</div>
        <div className="flex-grow">
          <h2 className="text-lg font-semibold">{title}</h2>
          <p className="text-sm text-gray-600">{date}</p>
        </div>
        <div className={`w-3 h-3 rounded-full ${isRead ? "bg-gray-400" : "bg-blue-600"}`}></div>
      </div>
      <p className="text-gray-700 mb-4">{description}</p>
      <div className="flex justify-end">
        <button
          onClick={() => onMarkAsRead(id)}
          className="flex items-center text-sm transition-colors"
        >
          {isRead ? "View Details" : "Mark as Read"}
          <ChevronRight className="ml-1 w-4 h-4" />
        </button>
      </div>
    </div>
  )
}

