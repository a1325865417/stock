import React, { useState } from "react";

const tabs = ["我的自选", "条件提醒", "策略跟踪"];

const watchRows = [
  { name: "中科曙光", price: "42.18", change: "+2.1%", status: "观察" },
  { name: "埃斯顿", price: "15.72", change: "-0.8%", status: "跟踪" },
  { name: "中直股份", price: "36.40", change: "+3.4%", status: "关注" },
];

const alertRows = [
  { name: "中科曙光", rule: "涨幅>5%", status: "触发" },
  { name: "埃斯顿", rule: "跌幅<-3%", status: "未触发" },
];

const trackRows = [
  { name: "低空经济", desc: "回流迹象", time: "13:20" },
  { name: "算力", desc: "龙头强势", time: "12:50" },
];

export default function Watchlist() {
  const [active, setActive] = useState(tabs[0]);

  return (
    <>
      <div className="toolbar">
        <div className="tabs">
          {tabs.map((tab) => (
            <div
              key={tab}
              className={`tab ${tab === active ? "active" : ""}`}
              onClick={() => setActive(tab)}
            >
              {tab}
            </div>
          ))}
        </div>
        <div>我的选股</div>
      </div>

      {active === "我的自选" && (
        <div className="panel">
          <table className="table">
            <thead>
              <tr>
                <th>股票</th>
                <th>最新价</th>
                <th>涨跌</th>
                <th>状态</th>
              </tr>
            </thead>
            <tbody>
              {watchRows.map((row) => (
                <tr key={row.name}>
                  <td>{row.name}</td>
                  <td>{row.price}</td>
                  <td className={row.change.startsWith("+") ? "tag red" : "tag green"}>
                    {row.change}
                  </td>
                  <td className="tag blue">{row.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {active === "条件提醒" && (
        <div className="panel">
          <table className="table">
            <thead>
              <tr>
                <th>股票</th>
                <th>条件</th>
                <th>状态</th>
              </tr>
            </thead>
            <tbody>
              {alertRows.map((row) => (
                <tr key={row.name}>
                  <td>{row.name}</td>
                  <td>{row.rule}</td>
                  <td className={row.status === "触发" ? "tag red" : "tag blue"}>
                    {row.status}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {active === "策略跟踪" && (
        <div className="panel">
          <table className="table">
            <thead>
              <tr>
                <th>题材</th>
                <th>描述</th>
                <th>时间</th>
              </tr>
            </thead>
            <tbody>
              {trackRows.map((row) => (
                <tr key={row.name}>
                  <td>{row.name}</td>
                  <td>{row.desc}</td>
                  <td>{row.time}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
}
