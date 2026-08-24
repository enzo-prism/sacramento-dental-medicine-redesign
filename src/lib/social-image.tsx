import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { contact } from "@/data/site";

export const socialImageSize = {
  width: 1200,
  height: 630,
};

const logoData = await readFile(
  join(process.cwd(), "public/images/logo-mark.png"),
);

// ImageResponse accepts ArrayBuffer sources even though the JSX img type does not.
const logoSrc = Uint8Array.from(logoData).buffer as unknown as string;
const city = contact.addressLine2.split(",")[0];

const colors = {
  canvas: "#f7f9fc",
  night: "#0a1424",
  ink: "#0d1b2e",
  inkSoft: "#3e4c63",
  brand: "#6a8ece",
  brandDeep: "#3b5fa5",
  brandTint: "#dde7f6",
  line: "#dce3ed",
};

const imageOptions = {
  ...socialImageSize,
};

function BrandLockup({ inverse = false }: { inverse?: boolean }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
      <div
        style={{
          width: 68,
          height: 68,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: 19,
          background: colors.brandTint,
          border: `1px solid ${inverse ? "#ffffff22" : colors.line}`,
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={logoSrc}
          alt=""
          width={56}
          height={56}
          style={{ width: 56, height: 56 }}
        />
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
        <div
          style={{
            color: inverse ? "#ffffff" : colors.ink,
            fontSize: 23,
            letterSpacing: "-0.02em",
          }}
        >
          {contact.practiceName}
        </div>
        <div
          style={{
            display: "flex",
            color: inverse ? "#d5e1f4" : colors.brandDeep,
            fontSize: 14,
            letterSpacing: "0.16em",
            textTransform: "uppercase",
          }}
        >
          {city} · California
        </div>
      </div>
    </div>
  );
}

export function createHomeSocialImage() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        position: "relative",
        overflow: "hidden",
        background: colors.canvas,
        color: colors.ink,
      }}
    >
      <div
        style={{
          width: 810,
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "62px 70px 58px 74px",
        }}
      >
        <BrandLockup />

        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              fontSize: 66,
              lineHeight: 1.02,
              letterSpacing: "-0.055em",
            }}
          >
            <span>A dentist visit</span>
            <span style={{ color: colors.brandDeep }}>you won&apos;t dread.</span>
          </div>
          <div
            style={{
              display: "flex",
              maxWidth: 600,
              color: colors.inkSoft,
              fontSize: 24,
              lineHeight: 1.35,
            }}
          >
            Gentle family, cosmetic and emergency dentistry in Antelope, CA.
          </div>
        </div>

        <div style={{ display: "flex", gap: 14, alignItems: "center" }}>
          <div
            style={{
              display: "flex",
              borderRadius: 999,
              background: colors.night,
              color: "#ffffff",
              padding: "12px 20px",
              fontSize: 18,
            }}
          >
            New patients welcome
          </div>
          <div
            style={{
              display: "flex",
              color: colors.inkSoft,
              fontSize: 18,
            }}
          >
            {contact.phoneDisplay}
          </div>
        </div>
      </div>

      <div
        style={{
          position: "absolute",
          right: 0,
          top: 0,
          width: 410,
          height: 630,
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "66px 52px 58px",
          background: colors.night,
          color: "#ffffff",
        }}
      >
        <div
          style={{
            display: "flex",
            color: "#d5e1f4",
            fontSize: 15,
            letterSpacing: "0.15em",
            textTransform: "uppercase",
          }}
        >
          Care for every chapter
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 15,
            fontSize: 35,
            lineHeight: 1.1,
            letterSpacing: "-0.035em",
          }}
        >
          <span>Family</span>
          <span>Cosmetic</span>
          <span>Restorative</span>
          <span>Emergency</span>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 15 }}>
          <div style={{ width: 86, height: 3, display: "flex", background: colors.brand }} />
          <div style={{ display: "flex", color: "#d5e1f4", fontSize: 18 }}>
            Request a visit online
          </div>
        </div>
      </div>
    </div>,
    imageOptions,
  );
}

export function createReviewsSocialImage({
  rating,
  totalReviews,
  fiveStarShare,
  checkedDate,
}: {
  rating: number;
  totalReviews: number;
  fiveStarShare: number;
  checkedDate: string;
}) {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        background: colors.canvas,
        color: colors.ink,
      }}
    >
      <div
        style={{
          width: 760,
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "62px 54px 54px 74px",
        }}
      >
        <BrandLockup />
        <div style={{ display: "flex", flexDirection: "column", gap: 23 }}>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              fontSize: 58,
              lineHeight: 1.04,
              letterSpacing: "-0.052em",
            }}
          >
            <span>{totalReviews} patient perspectives.</span>
            <span style={{ color: colors.brandDeep }}>One clear pattern.</span>
          </div>
          <div
            style={{
              display: "flex",
              color: colors.inkSoft,
              fontSize: 23,
              lineHeight: 1.35,
            }}
          >
            Kind people. Clear answers. Care that earns trust.
          </div>
        </div>
        <div style={{ display: "flex", color: "#5b6b80", fontSize: 16 }}>
          Patient review analysis · Checked {checkedDate}
        </div>
      </div>

      <div
        style={{
          width: 440,
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "70px 64px 58px",
          background: colors.night,
          color: "#ffffff",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
          <div
            style={{
              display: "flex",
              fontSize: 128,
              lineHeight: 0.92,
              letterSpacing: "-0.075em",
            }}
          >
            {rating}
          </div>
          <div
            style={{
              display: "flex",
              color: "#d5e1f4",
              fontSize: 20,
              letterSpacing: "0.04em",
            }}
          >
            on Google
          </div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 22 }}>
          <div style={{ width: 86, height: 3, display: "flex", background: colors.brand }} />
          <div style={{ display: "flex", flexDirection: "column", gap: 7 }}>
            <div style={{ display: "flex", fontSize: 28 }}>{totalReviews} reviews</div>
            <div style={{ display: "flex", color: "#d5e1f4", fontSize: 17 }}>
              {fiveStarShare}% are five-star
            </div>
          </div>
        </div>
      </div>
    </div>,
    imageOptions,
  );
}
