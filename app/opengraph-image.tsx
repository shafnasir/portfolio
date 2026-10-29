import { ImageResponse } from "next/og";
import { site } from "@/data/site";

export const alt = `${site.name} — ${site.role}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const dynamic = "force-static";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 72,
          background: "#f8f7f4",
          color: "#191919",
        }}
      >
        <div style={{ fontSize: 22, letterSpacing: 3, color: "#70706b", textTransform: "uppercase" }}>
          {site.hero.label}
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ display: "flex", fontSize: 112, fontWeight: 600, letterSpacing: -5, lineHeight: 1 }}>
            {site.name}
            <span style={{ color: "#00a676" }}>.</span>
          </div>
          <div style={{ marginTop: 28, fontSize: 32, color: "#70706b", maxWidth: 900 }}>{site.hero.intro}</div>
        </div>
      </div>
    ),
    size,
  );
}
