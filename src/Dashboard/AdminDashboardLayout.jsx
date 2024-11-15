import React, { useState } from "react";
import { Link, Routes, Route } from "react-router-dom";
import {
  FiBarChart,
  FiChevronsRight,
  FiDollarSign,
  FiHome,
  FiMonitor,
  FiShoppingCart,
  FiTag,
  FiUsers,
} from "react-icons/fi";
import { motion } from "framer-motion";

import LogoutAdmin from "../02-AdminAccountCreate/LogoutAdmin";

import Appointments from "../A-AdminDashComponents/Appointments";

const AdminDashboardLayout = () => {
  return (
    <div className="flex bg-indigo-50 mt-[80px] relative">
      <Sidebar />
      <div className="w-full p-4">
        <Routes>
          <Route path="/" element={<DashboardPage />} />
          <Route path="appointments" element={<Appointments />} />
          <Route path="view-site" element={<ViewSitePage />} />
          <Route path="products" element={<ProductsPage />} />
          <Route path="tags" element={<TagsPage />} />
          <Route path="analytics" element={<AnalyticsPage />} />
          <Route path="members" element={<MembersPage />} />
        </Routes>
      </div>
    </div>
  );
};

export default AdminDashboardLayout;

// Sidebar Component
const Sidebar = () => {
  const [open, setOpen] = useState(true);
  const [selected, setSelected] = useState("Dashboard");

  return (
    <motion.nav
      layout
      className="sticky top-0 h-[calc(100vh-80px)] shrink-0 border-r border-slate-300 bg-white p-2"
      style={{ width: open ? "300px" : "fit-content" }}
    >
      <TitleSection open={open} />

      <div className="space-y-1">
        <Option
          Icon={FiHome}
          title="Dashboard"
          selected={selected}
          setSelected={setSelected}
          open={open}
          to=""
        />
        <Option
          Icon={FiDollarSign}
          title="Appointments"
          selected={selected}
          setSelected={setSelected}
          open={open}
          to="appointments"
        />
        <Option
          Icon={FiMonitor}
          title="View Site"
          selected={selected}
          setSelected={setSelected}
          open={open}
          to="view-site"
        />
        <Option
          Icon={FiShoppingCart}
          title="Products"
          selected={selected}
          setSelected={setSelected}
          open={open}
          to="products"
        />
        <Option
          Icon={FiTag}
          title="Tags"
          selected={selected}
          setSelected={setSelected}
          open={open}
          to="tags"
        />
        <Option
          Icon={FiBarChart}
          title="Analytics"
          selected={selected}
          setSelected={setSelected}
          open={open}
          to="analytics"
        />
        <Option
          Icon={FiUsers}
          title="Members"
          selected={selected}
          setSelected={setSelected}
          open={open}
          to="members"
        />
      </div>

      <div className="mt-5">
        <LogoutAdmin />
      </div>

      <ToggleClose open={open} setOpen={setOpen} />
    </motion.nav>
  );
};

const Option = ({ Icon, title, selected, setSelected, open, to }) => {
  return (
    <motion.button
      layout
      onClick={() => setSelected(title)}
      className={`relative flex h-10 w-full items-center rounded-md transition-colors ${
        selected === title
          ? "bg-indigo-100 text-indigo-800"
          : "text-slate-500 hover:bg-slate-100"
      }`}
    >
      <motion.div
        layout
        className="grid h-full w-10 place-content-center text-lg"
      >
        <Icon />
      </motion.div>
      {open && (
        <motion.span
          layout
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.125 }}
          className="text-xs font-medium"
        >
          <Link to={to}>{title}</Link>
        </motion.span>
      )}
    </motion.button>
  );
};

// TitleSection, ToggleClose, and Placeholder components for dashboard pages
const TitleSection = ({ open }) => (
  <div className="mb-3 border-b border-slate-300 pb-3">
    <div className="flex items-center justify-between">
      {open && <span className="text-xs font-semibold">Admin Dashboard</span>}
    </div>
  </div>
);

const ToggleClose = ({ open, setOpen }) => (
  <motion.button
    layout
    onClick={() => setOpen((prev) => !prev)}
    className="absolute bottom-0 left-0 right-0 border-t border-slate-300 hover:bg-slate-100"
  >
    <div className="flex items-center p-2">
      <motion.div layout className="grid size-10 place-content-center text-lg">
        <FiChevronsRight className={`${open && "rotate-180"}`} />
      </motion.div>
      {open && (
        <motion.span
          layout
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.125 }}
          className="text-xs font-medium"
        >
          Close
        </motion.span>
      )}
    </div>
  </motion.button>
);

// Placeholder Components
const DashboardPage = () => <div>Dashboard Contentgsdfgsdfg</div>;

const ViewSitePage = () => <div>View Site Content</div>;
const ProductsPage = () => <div>Products Content</div>;
const TagsPage = () => <div>Tags Content</div>;
const AnalyticsPage = () => <div>Analytics Content</div>;
const MembersPage = () => <div>Members Content</div>;
