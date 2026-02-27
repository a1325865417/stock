import React from "react";
import { NavLink } from "react-router-dom";
import { navItems } from "../lib/nav";
import { useTask } from "../lib/task";

function formatNow() {
  const now = new Date();
  const y = now.getFullYear();
  const m = String(now.getMonth() + 1).padStart(2, "0");
  const d = String(now.getDate()).padStart(2, "0");
  const h = String(now.getHours()).padStart(2, "0");
  const min = String(now.getMinutes()).padStart(2, "0");
  return `${y}-${m}-${d} ${h}:${min}`;
}

export default function Layout({ children }) {
  const { data: task } = useTask();
  const online = task?.online;
  const notice = task?.notice?.index?.banner || task?.notice?.index?.title;
  const logo = task?.base?.logo || task?.soft?.logo;
  const kefu = task?.kefu_pic;

  return (
    <div className="app">
      <aside className="sidebar">
        <div className="logo">
          {logo ? <img src={logo} alt="VIP复盘网" /> : "VIP复盘网"}
        </div>
        <div className="user-card">
          <div className="user-title">VIP 1 · 打电话哈</div>
          <div className="user-line">ID：138518 · 余额：0 元</div>
          <div className="user-line">签到：未签到 · 策略卡：0 次</div>
          <div className="user-line">VIP软件：13 天 · 通达信：未参与</div>
          <div className="user-line">市场：交易中</div>
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
            <span className="nav-subtitle">{item.subtitle}</span>
          </NavLink>
        ))}
      </aside>

      <main className="content">
        <div className="topbar">
          <div className="topbar-left">
            <span className="pill">市场：交易中</span>
            <span className="muted">{formatNow()}</span>
            {online?.show && (
              <span className="pill ghost">在线 {online.num}</span>
            )}
          </div>
          <div className="topbar-actions">
            <div className="icon-btn">全屏</div>
            <div className="icon-btn">主题</div>
            <div className="icon-btn">+</div>
            <div className="icon-btn">客服</div>
            <div className="icon-btn">搜索</div>
          </div>
        </div>
        {notice && (
          <div className="headline" dangerouslySetInnerHTML={{ __html: notice }} />
        )}
        {children}
      </main>

      <div className="float-right">
        {kefu && (
          <div className="float-card">
            <div className="float-card-title">专属客服</div>
            <img src={kefu} alt="客服" />
          </div>
        )}
        <div className="float-btn">VIP</div>
        <div className="float-btn">通知</div>
        <div className="float-btn">客服</div>
      </div>

      <div className="footer-bar">
        当前在线人数：{online?.num ?? "--"} ｜ 公告：
        {task?.soft?.notice || "VIP复盘网“2026年度新春优惠”活动启动..."}
      </div>
    </div>
  );
}
