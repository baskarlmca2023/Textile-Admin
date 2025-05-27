import { Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Dashboard from './pages/admin/Dashboard';
import UploadProducts from './pages/admin/UploadProducts';
import Orders from './pages/admin/Orders';
import DeliveryTracking from './pages/admin/DeliveryTracking';
import Stocks from './pages/admin/Stocks';
import Expense from './pages/admin/Expense';
import Reviews from './pages/admin/Reviews';
import Advertisement from './pages/admin/Advertisement';
import AdminLayout from './layouts/AdminLayout';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <Routes>

      <Route path="/" element={<Navigate to="/login" replace />} />
      <Route path="/login" element={<Login />} />

      <Route
        path="/admin"
        element={
          <ProtectedRoute>
            <AdminLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<Dashboard />} />
        <Route path="upload-products" element={<UploadProducts />} />
        <Route path="orders" element={<Orders />} />
        <Route path="delivery-tracking" element={<DeliveryTracking />} />
        <Route path="stocks" element={<Stocks />} />
        <Route path="expense" element={<Expense />} />
        <Route path="reviews" element={<Reviews />} />
        <Route path="advertisement" element={<Advertisement />} />
      </Route>
    </Routes>
  );
}

export default App;






