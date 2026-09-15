import type { Metadata, Viewport } from"next";
import { JetBrains_Mono, Inter } from"next/font/google";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { notFound } from "next/navigation";
import { setRequestLocale } from "next-intl/server";
import"../globals.css";
import { routing } from "@/i18n/routing";
import Nav from"@/components/chrome/Nav";
import Footer from"@/components/chrome/Footer";
import Cursor from"@/components/chrome/Cursor";
import Grain from"@/components/chrome/Grain";
import ImageGuard from"@/components/chrome/ImageGuard";
// SmoothScroll (Lenis) disabled — replaced with native scroll-snap for section-based navigation
// import SmoothScroll from"@/components/chrome/SmoothScroll";
import PageTransition from"@/components/chrome/PageTransition";

const sans = Inter({
 subsets: ["latin"],
 weight: ["300","400","500","600","700"],
 variable:"--font-sans",
 display:"swap",
});

const body = Inter({
 subsets: ["latin"],
 weight: ["300","400","500","600","700"],
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
 title:"Ernso Azor | Brand Designer & Brand Strategist in Curitiba",
 description:
"Ernso Azor is a Brand Designer and Brand Strategist based in Curitiba, Brazil, building brand identities and visual systems for ambitious companies, professionals and creators.",
 metadataBase: new URL("https://creativernso.co"),
 keywords: [
"Brand Designer",
"Brand Strategist",
"Brand Identity Designer",
"Visual Identity Designer",
"Brand Designer Curitiba",
"Brand Designer Brazil",
"Creative Director",
 ],
 openGraph: {
 title:"Ernso Azor | Brand Designer & Brand Strategist",
 description:
"Brand identities and visual systems for ambitious companies, professionals and creators. Based in Curitiba, Brazil, working internationally.",
 type:"website",
 url:"https://creativernso.co",
 siteName:"Ernso Azor",
 },
 twitter: {
 card:"summary_large_image",
 title:"Ernso Azor | Brand Designer & Brand Strategist",
 description:
"Brand identities and visual systems for ambitious companies, professionals and creators. Based in Curitiba, Brazil, working internationally.",
 },
};

export const viewport: Viewport = {
 themeColor:"#151516",
 width:"device-width",
 initialScale: 1,
};

export function generateStaticParams() {
 return routing.locales.map((locale) => ({ locale }));
}

export default async function RootLayout({
 children,
 params,
}: {
 children: React.ReactNode;
 params: Promise<{ locale: string }>;
}) {
 const { locale } = await params;
 if (!hasLocale(routing.locales, locale)) {
 notFound();
 }
 setRequestLocale(locale);

 return (
 <html
 lang={locale}
 className={`${sans.variable} ${body.variable} ${mono.variable}`}
 >
 <body className="bg-black text-bone">
 <script
 dangerouslySetInnerHTML={{
 __html:
"if('scrollRestoration' in history)history.scrollRestoration='manual';window.scrollTo(0,0);",
 }}
 />
 <NextIntlClientProvider>
 <ImageGuard />
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
 </NextIntlClientProvider>
 </body>
 </html>
 );
}
