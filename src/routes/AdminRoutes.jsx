import { Route } from 'react-router-dom';
import Dashboard from '../pages/admin/Dashboard';
import UploadProducts from '../pages/admin/UploadProducts';
import Orders from '../pages/admin/Orders';
import DeliveryTracking from '../pages/admin/DeliveryTracking';
import Stocks from '../pages/admin/Stocks';
import Expense from '../pages/admin/Expense';
import Reviews from '../pages/admin/Reviews';
import Advertisement from '../pages/admin/Advertisement';

const AdminRoutes = () => (
  <>
    <Route index element={<Dashboard />} />
    <Route path="upload-products" element={<UploadProducts />} />
    <Route path="orders" element={<Orders />} />
    <Route path="delivery-tracking" element={<DeliveryTracking />} />
    <Route path="stocks" element={<Stocks />} />
    <Route path="expense" element={<Expense />} />
    <Route path="reviews" element={<Reviews />} />
    <Route path="advertisement" element={<Advertisement />} />
  </>
);

export default AdminRoutes;
