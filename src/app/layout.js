import "./globals.css";

export const metadata = {
  title: "VRK Wealth | Save Today For Better Future",
  description: "VRK Wealth provides strategic financial planning, investment solutions, and retirement planning. Authorized Mutual Fund Distributor and Financial Advisor.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body style={{ margin: 0 }}>
        {children}
      </body>
    </html>
  );
}
