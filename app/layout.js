import "./globals.css";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import { Poppins } from "next/font/google";
import HeaderComponent from "./components/global/Header";
import { ConfigProvider } from "antd";

const poppins = Poppins({
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
  variable: "--font-poppins",
});

export const metadata = {
  title: "Bilash",
  description: "Bilash",
};

const theme = {
  token: {
    fontFamily: "var(--font-poppins)",
    colorPrimary: "#1a136e",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={poppins.className}>
      <body className="px-4 pb-10 pt-5">
        <AntdRegistry>
          <HeaderComponent />
          <ConfigProvider theme={theme}>{children}</ConfigProvider>
        </AntdRegistry>
      </body>
    </html>
  );
}
