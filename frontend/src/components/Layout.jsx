import React from "react";
import { NavLink } from "react-router-dom";
import { navItems } from "../lib/nav";

export default function Layout({ children }) {
  return (
    <div className="app">
      <aside className="sidebar">
        <div className="logo">VIP复盘网</div>
        <div className="user-card">
          <div>VIP 1</div>
          <div>ID：138518</div>
          <div>昵称：打电话哈</div>
          <div>余额：0 元</div>
          <div>签到：未签到</div>
          <div>VIP软件：13 天</div>
          <div>通达信：未参与</div>
          <div>策略卡：0 次</div>
          <div>市场：交易中</div>
        </div>
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            end={item.path === "/"}
            className={({ isActive }) =>
              `nav-item ${isActive ? "active" : ""}`
            }
          >
            <span>{item.label}</span>
            <span style={{ marginLeft: "auto", fontSize: 10, color: "#6b7280" }}>
              {item.subtitle}
            </span>
          </NavLink>
        ))}
      </aside>

      <main className="content">
        <div className="topbar">
          <div className="topbar-left">
            <span className="pill">市场：交易中</span>
            <span className="muted">2026-02-26 13:38</span>
          </div>
          <div className="topbar-actions">
            <div className="icon-btn">全屏</div>
            <div className="icon-btn">主题</div>
            <div className="icon-btn">+</div>
            <div className="icon-btn">客服</div>
            <div className="icon-btn">搜索</div>
          </div>
        </div>
        {children}
      </main>

      <div className="float-right">
        <div className="float-btn">VIP</div>
        <div className="float-btn">通知</div>
        <div className="float-btn">客服</div>
      </div>

      <div className="footer-bar">
        当前在线人数：-- ｜ 公告：VIP复盘网“2026年度新春优惠”活动启动...
      </div>
    </div>
  );
}
