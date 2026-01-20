import { ImageResponse } from "next/og";
// import MonthTheme from "@/container/themes/Month";
export const runtime = "edge";

export async function GET(request: Request) {
  const now = new Date();
  const { searchParams } = new URL(request.url);
  const type = searchParams.get("type") || "month";
  const rawWidth = parseInt(searchParams.get("width") || "430");
  const height = parseInt(searchParams.get("height") || "932");
  const pixelRatio = rawWidth < 500 ? 3 : 1;
  const finalWidth = rawWidth * pixelRatio;
  const finalHeight = height * pixelRatio;
  const data = {
    year: now.getFullYear(),
    month: now.getMonth() + 1,
    currentDay: now.getDate(),
    width: finalWidth,
  };
  let ComponentToRender;
  switch (type) {
    case "month":
      ComponentToRender = <></>;
      break;
    default:
      ComponentToRender = <></>;
      break;
  }
  return new ImageResponse(ComponentToRender, {
    width: finalWidth,
    height: finalHeight,
  });
}
