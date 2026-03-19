export type Locale = "vi" | "en";

export const dictionary = {
  vi: {
    hero: {
      title: "Màn hình của bạn.",
      subtitle: " Phong cách của bạn.",
      desc: 'Bộ sưu tập hình nền "động" giúp bạn tập trung, theo dõi thời gian và định hình phong cách sống.',
    },
    bentoUI: {
      routine: {
        title: "Sự kiện sắp tới",
        subtitle1: "Theo dõi kế hoạch",
        subtitle2: "& quản lý thời gian.",
      },
      calendar: {
        title: "Lịch",
        subtitle: "Theo dõi ngày tháng ngay trên màn hình khóa",
      },
      personalization: {
        title: "Cá nhân hóa",
        subTitle: "Khung viền và hơn thế nữa",
      },
      gallery: {
        title: "Khoảnh khắc",
        subTitle: "Hiển thị bộ sưu tập ảnh yêu thích ngay trên màn hình khóa.",
      },
    },
    footer: {
      title:
        'Công cụ tạo hình nền "động" giúp bạn tập trung vào những điều quan trọng nhất.',
      product: { title: "Sản phẩm" },
      instruction: {
        title: "Hướng dẫn",
        shortcutsInstall: "Cài đặt Shortcut",
        question: "Câu hỏi thường gặp",
      },
      connect: "Kết nối",
      active: "Hệ thống hoạt động",
      copyright: "© 2026 Paperly. Bảo lưu mọi quyền.",
    },
    configPanel: {
      header: {
        title: "Tạo hình nền của bạn",
        resetTooltip: "Đặt lại",
        description:
          "Chọn nội dung hiển thị và cách hiển thị. Xem trước được cập nhật ngay.",
      },
      main: {
        title: "Nội dung hiển thị",
        deviceLabel: "Thiết bị của bạn",
        layoutLabel: "Chọn bố cục",
      },
      displayOptions: {
        title: "Tùy chọn hiển thị",
        startWeekOnMonday: "Bắt đầu tuần vào thứ Hai",
        showDayName: "Hiển thị tên ngày",
        showDot: "Hiển thị chấm",
        showOtherMonthDays: "Hiển thị ngày của tháng khác",
        showMoonPhase: "Hiển thị pha trăng",
        quarterNoExtra:
          "Quarter hiện chưa có trường cấu hình bổ sung (`data: undefined`).",
        birthDate: "Ngày sinh",
        lifeExpectancyYears: "Tuổi thọ dự kiến (năm)",
      },
      appearance: {
        title: "Giao diện & tiện ích bổ sung",
        backgroundTitle: "Nền",
        modeColor: "Màu",
        modeImage: "Ảnh",
        solidColor: "Màu đơn",
        backgroundImageUrl: "URL ảnh nền",
        backgroundImagePlaceholder: "https://example.com/image.jpg",
        themeTitle: "Chủ đề / Màu sắc",
        themeAuto: "Tự động",
        themeLight: "Sáng",
        themeDark: "Tối",
        border: "Viền",
        dock: "Dock",
        statusBar: "Thanh trạng thái",
        island: "Đảo",
        leftWidget: "Widget trái",
        rightWidget: "Widget phải",
      },
      reset: {
        buttonLabel: "Đặt lại sản phẩm phụ hiện tại",
      },
      footer: {
        systemOnline: "Hệ thống trực tuyến",
      },
      dialog: {
        title: "Đặt lại sản phẩm phụ hiện tại?",
        description:
          "Thao tác này chỉ hoàn tác sản phẩm phụ đang chọn mà không ảnh hưởng các widget khác.",
        confirm: "Đặt lại",
        cancel: "Hủy",
      },
      vision: {
        titleLabel: "Tiêu đề",
        titlePlaceholder: "Bảng tầm nhìn của tôi",
        noteLabel: "Ghi chú",
        notePlaceholder: "Mô tả mục tiêu của bạn",
      },
    },
  },
  en: {
    hero: {
      title: "Your Screen.",
      subtitle: " Your Style.",
      desc: '"Dynamic" wallpaper collection to help you stay focused, track time, and shape your lifestyle.',
    },
    bentoUI: {
      routine: {
        title: "Coming Events",
        subtitle1: "Design an effective",
        subtitle2: "& disciplined day.",
      },
      calendar: {
        title: "Calendar",
        subtitle: "Keep track of dates right on your Lock Screen.",
      },
      personalization: {
        title: "Personalization",
        subTitle: "Frames and more",
      },
      gallery: {
        title: "Moments",
        subTitle:
          "Display your favorite photo collection right on the lock screen.",
      },
    },
    footer: {
      title:
        '"Dynamic" wallpaper creation tool to help you focus on what matters most.',
      product: { title: "Product" },
      instruction: {
        title: "Instructions",
        shortcutsInstall: "Install Shortcuts",
        question: "Frequently Asked Questions",
      },
      connect: "Connect",
      active: "Systems Operational",
      copyright: "© 2026 Paperly. All rights reserved.",
    },
    configPanel: {
      header: {
        title: "Create Your Wallpaper",
        resetTooltip: "Reset",
        description:
          "Choose what to show and how it looks. Preview updates instantly.",
      },
      main: {
        title: "What to Show",
        deviceLabel: "Your Device",
        layoutLabel: "Choose a layout",
      },
      displayOptions: {
        title: "Display Options",
        startWeekOnMonday: "Start week on Monday",
        showDayName: "Show day name",
        showDot: "Show dot",
        showOtherMonthDays: "Show other month days",
        showMoonPhase: "Show moon phase",
        quarterNoExtra:
          "Quarter currently has no extra schema fields (`data: undefined`).",
        birthDate: "Birth date",
        lifeExpectancyYears: "Life expectancy (years)",
      },
      appearance: {
        title: "Appearance & Add-ons",
        backgroundTitle: "Background",
        modeColor: "Color",
        modeImage: "Image",
        solidColor: "Solid Color",
        backgroundImageUrl: "Background image URL",
        backgroundImagePlaceholder: "https://example.com/image.jpg",
        themeTitle: "Theme / Colors",
        themeAuto: "Auto",
        themeLight: "Light",
        themeDark: "Dark",
        border: "Border",
        dock: "Dock",
        statusBar: "Status Bar",
        island: "Island",
        leftWidget: "Left Widget",
        rightWidget: "Right Widget",
      },
      reset: {
        buttonLabel: "Reset current sub-product",
      },
      footer: {
        systemOnline: "System Online",
      },
      dialog: {
        title: "Reset current sub-product?",
        description:
          "This will revert only the currently selected sub-product without touching other widgets.",
        confirm: "Reset",
        cancel: "Cancel",
      },
      vision: {
        titleLabel: "Title",
        titlePlaceholder: "My vision board",
        noteLabel: "Note",
        notePlaceholder: "Describe your focus",
      },
    },
  },
};
