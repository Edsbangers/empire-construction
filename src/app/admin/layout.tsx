import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin Portal | Empire Contractors Ltd",
  description: "Admin dashboard for Empire Contractors Ltd - manage news, leads, and customer conversations.",
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
