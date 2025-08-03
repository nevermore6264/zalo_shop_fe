import DashboardLayout from '@/components/Layout/DashboardLayout';

export default function DashboardLayoutWrapper({
    children,
}: {
    children: React.ReactNode;
}) {
    return <DashboardLayout>{children}</DashboardLayout>;
} 