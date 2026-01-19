// src/data/items.tsx
import {
  Calendar,
  Clock,
  LayoutTemplate,
  Zap,
  Fingerprint,
} from "lucide-react";

export const ITEMS = [
  {
    id: "hero",
    type: "hero",
    title: "Lịch Tháng",
    desc: "Theo dõi ngày tháng.",
    icon: <Calendar size={24} />,
    color: "orange",
    href: "/editor/month",
    colSpan: "col-span-2", // Desktop: 2 cột
  },
  {
    id: "year",
    type: "tall",
    title: "Năm 2026",
    desc: "Tiến độ thời gian.",
    icon: <Clock size={24} />,
    color: "blue",
    href: "/editor/year",
    colSpan: "row-span-2", // Desktop: cao 2 hàng
  },
  {
    id: "life",
    type: "square",
    title: "Life Grid",
    desc: "90 năm cuộc đời.",
    icon: <LayoutTemplate size={20} />,
    color: "purple",
    href: "/editor/life",
    colSpan: "",
  },
  {
    id: "dock",
    type: "square",
    title: "Organizer",
    desc: "Khung viền Dock.",
    icon: <Zap size={20} />,
    color: "green",
    href: "/editor/dock",
    colSpan: "",
  },
  {
    id: "text",
    type: "wide",
    title: "Định Danh",
    desc: "Khẳng định phong cách.",
    icon: <Fingerprint size={24} />,
    color: "pink",
    href: "/editor/text",
    colSpan: "col-span-2",
  },
];
