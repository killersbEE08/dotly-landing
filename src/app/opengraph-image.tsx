import { ImageResponse } from "next/og";

export const dynamic = "force-static";
export const alt = "Dotly — See your life, one dot at a time";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OgImage() {
  const cols = 30;
  const rows = 12;
  const total = cols * rows;
  const filled = Math.floor(total * 0.42);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#08080a",
          padding: "72px",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div style={{ display: "flex", gap: 6 }}>
            {[0, 1, 2].map((r) => (
              <div key={r} style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                {[0, 1, 2].map((c) => {
                  const active = r === 2 && c === 1;
                  return (
                    <div
                      key={c}
                      style={{
                        width: 14,
                        height: 14,
                        borderRadius: 14,
                        background: active ? "#ffc107" : "#f4f4f2",
                        opacity: active ? 1 : 0.85,
                      }}
                    />
                  );
                })}
              </div>
            ))}
          </div>
          <div style={{ color: "#f4f4f2", fontSize: 34, fontWeight: 600 }}>Dotly</div>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              color: "#f4f4f2",
              fontSize: 78,
              fontWeight: 600,
              letterSpacing: "-0.03em",
              lineHeight: 1.05,
            }}
          >
            See your life,
          </div>
          <div
            style={{
              color: "#a6a6ad",
              fontSize: 78,
              fontWeight: 600,
              letterSpacing: "-0.03em",
              lineHeight: 1.05,
            }}
          >
            one dot at a time.
          </div>
        </div>

        <div style={{ display: "flex", flexWrap: "wrap", width: cols * 22 }}>
          {Array.from({ length: total }).map((_, i) => (
            <div
              key={i}
              style={{
                width: 8,
                height: 8,
                margin: 3,
                borderRadius: 8,
                background:
                  i === filled ? "#ffc107" : i < filled ? "#f4f4f2" : "#2a2a30",
                opacity: i === filled ? 1 : i < filled ? 0.8 : 1,
              }}
            />
          ))}
        </div>

        <div
          style={{
            color: "#6f6f77",
            fontSize: 24,
            letterSpacing: "0.2em",
            textTransform: "uppercase",
          }}
        >
          A Prince Labs product
        </div>
      </div>
    ),
    { ...size }
  );
}
