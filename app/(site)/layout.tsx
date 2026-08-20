import type { Metadata, Viewport } from"next";
import { Space_Grotesk, Instrument_Sans, JetBrains_Mono } from"next/font/google";
import"../globals.css";
import Nav from"@/components/chrome/Nav";
import Footer from"@/components/chrome/Footer";
import Cursor from"@/components/chrome/Cursor";
import Grain from"@/components/chrome/Grain";
// SmoothScroll (Lenis) disabled — replaced with native scroll-snap for section-based navigation
// import SmoothScroll from"@/components/chrome/SmoothScroll";
import PageTransition from"@/components/chrome/PageTransition";

const sans = Space_Grotesk({
 subsets: ["latin"],
 weight: ["300","400","500","600","700"],
 variable:"--font-sans",
 display:"swap",
});

const body = Instrument_Sans({
 subsets: ["latin"],
 weight: ["400","500","600","700"],
 variable:"--font-body",
 display:"swap",
});

const mono = JetBrains_Mono({
 subsets: ["latin"],
 weight: ["400","500"],
 variable:"--font-mono",
 display:"swap",
});

export const metadata: Metadata = {
 title:"Ernso Azor. Revealing what was always there.",
 description:
"Brand strategist & designer building identities across institutions, professionals and creators. One philosophy. Three worlds. No average.",
 metadataBase: new URL("https://ernsoazor.com"),
 openGraph: {
 title:"Ernso Azor. Revealing what was always there.",
 description:"One philosophy. Three worlds. No average.",
 type:"website",
 },
};

export const viewport: Viewport = {
 themeColor:"#000000",
 width:"device-width",
 initialScale: 1,
};

export default function RootLayout({
 children,
}: {
 children: React.ReactNode;
}) {
 return (
 <html
 lang="en"
 className={`${sans.variable} ${body.variable} ${mono.variable}`}
 >
 <body className="bg-black text-bone">
 <script
 dangerouslySetInnerHTML={{
 __html:
"if('scrollRestoration' in history)history.scrollRestoration='manual';window.scrollTo(0,0);",
 }}
 />
 <Cursor />
 <Grain />

 {/* Navigation */}
 <Nav />

 {/* Page content — full-bleed, normal scroll */}
 <main className="pt-[100px] md:pt-[120px]">
 <PageTransition>{children}</PageTransition>
 </main>
 <Footer />

 {/* <SmoothScroll /> */}
 </body>
 </html>
 );
}
