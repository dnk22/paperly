// src/data/items.tsx
import {
  Calendar,
  Clock,
  LayoutTemplate,
  Zap,
  Fingerprint,
} from "lucide-react";
import { BENTO_UI_WIDGET_TYPES } from "./constants";

export const ITEMS = [
  {
    id: BENTO_UI_WIDGET_TYPES.CALENDAR,
    title: "bentoUI.calendar.title",
    desc: 'bentoUI.calendar.subtitle',
    icon: <Calendar size={24} />,
    color: "orange",
    href: "/editor/year",
    colSpan: "col-span-2",},
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
