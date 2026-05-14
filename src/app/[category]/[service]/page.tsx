import { notFound } from 'next/navigation';
import { navigation } from '@/lib/data';
import ServiceContent from './ServiceContent';

// Generate static params for all known service routes at build time
export async function generateStaticParams() {
  const params: { category: string; service: string }[] = [];
  for (const cat of navigation) {
    const category = cat.path.replace('/', '');
    for (const sub of cat.subRoutes) {
      const service = sub.path.replace(`/${category}/`, '');
      params.push({ category, service });
    }
  }
  return params;
}

export default async function ServicePage({ params }: { params: Promise<{ category: string; service: string }> }) {
  const { category: categoryStr, service: serviceStr } = await params;

  const categoryPath = `/${categoryStr}`;
  const fullPath = `/${categoryStr}/${serviceStr}`;

  const category = navigation.find((cat) => cat.path === categoryPath);
  if (!category) notFound();

  const rawDetails = category.subRoutes.find((sub) => sub.path === fullPath);
  if (!rawDetails) notFound();

  // Strip non-serializable icon functions before passing to the Client Component
  const { icon: _icon, ...details } = rawDetails;

  return (
    <div className="pt-64 pb-48 bg-vforce-primary min-h-screen relative overflow-hidden">
      {/* Background Decorative Elements */}
      <div className="absolute top-0 right-0 w-full h-full opacity-20 pointer-events-none">
        <div className="absolute top-[-5%] right-[-5%] w-[40%] h-[40%] bg-vforce-emerald/10 blur-[120px] rounded-full"></div>
        <div className="absolute top-[20%] left-[-10%] w-[30%] h-[30%] bg-vforce-emerald/5 blur-[100px] rounded-full"></div>
      </div>
      <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
        <ServiceContent details={details} />
      </div>
    </div>
  );
}
