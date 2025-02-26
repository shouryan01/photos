import AdminAppInsights from '@/admin/insights/AdminAppInsights';
import AdminInfoPage from '@/admin/AdminInfoPage';

export default async function AdminInsightsPage() {
  return <AdminInfoPage page="Insights">
    <AdminAppInsights />
  </AdminInfoPage>;
}
