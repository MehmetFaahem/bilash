import AdminLayout from "../../components/admin/AdminLayout";
import CountCards from "../../components/dashboard/CountCards";
import Charts from "../../components/dashboard/Charts";
export default function Dashboard() {
  return (
    <AdminLayout>
      <CountCards />
      <Charts />
    </AdminLayout>
  );
}
