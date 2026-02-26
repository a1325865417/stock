import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout.jsx";
import Home from "./pages/Home.jsx";
import Strategies from "./pages/Strategies.jsx";
import Intel from "./pages/Intel.jsx";
import Popularity from "./pages/Popularity.jsx";
import Placeholder from "./pages/Placeholder.jsx";

export default function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/strategies" element={<Strategies />} />
          <Route path="/intel" element={<Intel />} />
          <Route path="/popularity" element={<Popularity />} />
          <Route path="/partner" element={<Placeholder title="分享赚钱" />} />
          <Route path="/downloads" element={<Placeholder title="软件下载" />} />
          <Route path="/review" element={<Placeholder title="复盘啦" />} />
          <Route path="/lhb" element={<Placeholder title="龙虎榜" />} />
          <Route path="/watchlist" element={<Placeholder title="自选股" />} />
          <Route path="/vip" element={<Placeholder title="会员中心" />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}
