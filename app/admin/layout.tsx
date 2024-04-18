import { getServerSession } from 'next-auth/next';
import {redirect} from "next/navigation" 
export default async function PractitionerLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  return (
    <section className="container mx-auto">
      <div className="">{children}</div>
    </section>
  );
}
