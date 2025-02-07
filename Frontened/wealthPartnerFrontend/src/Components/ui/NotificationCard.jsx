import {
  Bell,
  Info,
  AlertTriangle,
  CheckCircle,
  ChevronRight,
  Plus,
  X,
} from "lucide-react";

export default function NotificationCard({ notification, handleMarkAsRead }) {
  const { _id, title, description, date, type, isRead } = notification;


  const getIcon = () => {
    switch (type) {
      case "info":
        return <Info className="text-blue-500" />;
      case "warning":
        return <AlertTriangle className="text-yellow-500" />;
      case "success":
        return <CheckCircle className="text-green-500" />;
      default:
        return <Bell className="text-gray-500" />;
    }
  };

  return (
    <div
      className={`bg-white rounded-lg p-4 shadow-md hover:shadow-lg transition-all ${
        isRead ? "opacity-70" : ""
      }`}
    >
      <div className="flex items-start mb-2">
        <div className="flex-shrink-0 mr-3">{getIcon()}</div>
        <div className="flex-grow">
          <h2 className="text-lg font-semibold">{title}</h2>
          <p className="text-sm text-gray-600">{date}</p>
        </div>
        <div
          className={`w-3 h-3 rounded-full ${
            isRead ? "bg-gray-400" : "bg-blue-600"
          }`}
        ></div>
      </div>
      <p className="text-gray-700 mb-4">{description}</p>
      <div className="flex justify-end">
        <button
          onClick={() => handleMarkAsRead(_id, isRead ? "delete" : "mark")}
          className="flex items-center text-sm transition-colors"
        >
          {isRead ? "Delete" : "Mark as Read"}
          <ChevronRight className="ml-1 w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
