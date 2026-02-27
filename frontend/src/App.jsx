import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout.jsx";
import Home from "./pages/Home.jsx";
import Strategies from "./pages/Strategies.jsx";
import Intel from "./pages/Intel.jsx";
import Popularity from "./pages/Popularity.jsx";
import Partner from "./pages/Partner.jsx";
import Downloads from "./pages/Downloads.jsx";
import Review from "./pages/Review.jsx";
import Lhb from "./pages/Lhb.jsx";
import Watchlist from "./pages/Watchlist.jsx";
import Vip from "./pages/Vip.jsx";
import { TaskProvider } from "./lib/task";
import { UserProvider } from "./lib/user";

export default function App() {
  return (
    <BrowserRouter>
      <TaskProvider>
        <UserProvider>
          <Layout>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/strategies" element={<Strategies />} />
              <Route path="/intel" element={<Intel />} />
              <Route path="/popularity" element={<Popularity />} />
              <Route path="/partner" element={<Partner />} />
              <Route path="/downloads" element={<Downloads />} />
              <Route path="/review" element={<Review />} />
              <Route path="/lhb" element={<Lhb />} />
              <Route path="/watchlist" element={<Watchlist />} />
              <Route path="/vip" element={<Vip />} />
            </Routes>
          </Layout>
        </UserProvider>
      </TaskProvider>
    </BrowserRouter>
  );
}
