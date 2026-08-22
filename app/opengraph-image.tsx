import { ImageResponse } from "next/og";

export const alt =
  "Footprint : comprends les ordres de grandeur des émissions de gaz à effet de serre";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const bars = [
  { height: 300, color: "#8B4513", label: "avion" },
  { height: 110, color: "#b98888", label: "smartphone" },
  { height: 92, color: "#dc382d", label: "bœuf" },
  { height: 36, color: "#9a9a9a", label: "streaming" },
  { height: 32, color: "#6e6e6e", label: "voiture" },
  { height: 14, color: "#22c55e", label: "végé" },
  { height: 9, color: "#86efac", label: "TGV" },
  { height: 7, color: "#d4d4d4", label: "ChatGPT" },
];

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          background: "#F1EFED",
          padding: "64px 72px",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            maxWidth: 620,
          }}
        >
          <div
            style={{
              fontSize: 92,
              fontWeight: 800,
              color: "#111111",
              letterSpacing: "-0.03em",
            }}
          >
            Footprint
          </div>
          <div
            style={{
              marginTop: 28,
              fontSize: 34,
              lineHeight: 1.4,
              color: "#333333",
              display: "flex",
              flexWrap: "wrap",
            }}
          >
            <span style={{ color: "#FF4B31", marginRight: 10 }}>
              Comprends
            </span>
            <span style={{ marginRight: 10 }}>
              les ordres de grandeur du carbone,
            </span>
            <span style={{ color: "#FF4B31", marginRight: 10 }}>situe</span>
            <span style={{ marginRight: 10 }}>ton empreinte et sache</span>
            <span style={{ marginRight: 10 }}>par où</span>
            <span style={{ color: "#FF4B31" }}>agir</span>
            <span>.</span>
          </div>
          <div
            style={{
              marginTop: 36,
              fontSize: 24,
              color: "#777777",
            }}
          >
            footprint.climatelab.fr
          </div>
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "flex-end",
            gap: 14,
            height: 320,
          }}
        >
          {bars.map((bar) => (
            <div
              key={bar.label}
              style={{
                width: 36,
                height: bar.height,
                background: bar.color,
                borderRadius: 10,
              }}
            />
          ))}
        </div>
      </div>
    ),
    { ...size },
  );
}
