import {Metadata} from "next";

export const metadata: Metadata = {
    title: "Специальности",
    description: "Платформа для онлайн-записи на прием к врачам.",
};

export default function Layout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {
    return <>{children}</>
}
