import React, { useEffect, useMemo, useState } from "react";
import { fetchJson } from "../lib/api";
import { useTask } from "../lib/task";

const tabs = [
  "盘面必看",
  "日内情绪",
  "盘面联动",
  "热点解读",
  "竞价异动",
  "大盘直播",
  "异动股池",
  "区间榜",
  "题材榜",
  "股票榜",
];

const hotRows = [
  { name: "航天发展", change: "2.04%", tags: ["R", "榜"] },
  { name: "华胜天成", change: "10.00%", tags: ["R", "榜"] },
  { name: "润泽科技", change: "18.19%", tags: ["R", "创"] },
];

const tabTables = {
  盘面必看: {
    columns: ["标题", "关联板块", "热度", "更新时间"],
    rows: [
      ["算力方向集体异动", "AI算力", { text: "高", className: "tag red" }, "13:20"],
      ["机器人概念拉升", "机器人", { text: "中", className: "tag blue" }, "13:05"],
      ["低空经济回流", "低空经济", { text: "高", className: "tag red" }, "12:48"],
    ],
  },
  日内情绪: {
    columns: ["板块", "情绪", "变化", "时间"],
    rows: [
      ["算力", { text: "升温", className: "tag red" }, "+8%", "13:10"],
      ["医药", { text: "降温", className: "tag green" }, "-3%", "12:55"],
      ["汽车", { text: "回暖", className: "tag blue" }, "+2%", "12:30"],
    ],
  },
  盘面联动: {
    columns: ["联动主题", "龙头", "异动", "时间"],
    rows: [
      ["AI算力", "中科曙光", "放量上攻", "13:02"],
      ["新能源车", "比亚迪", "分时拉升", "12:40"],
      ["机器人", "埃斯顿", "连板", "11:58"],
    ],
  },
  热点解读: {
    columns: ["标题", "要点", "更新时间"],
    rows: [
      ["低空经济持续走强", "政策预期+资金回流", "12:30"],
      ["芯片方向异动", "国产替代叠加业绩", "11:50"],
      ["AI应用升温", "多条主线共振", "10:40"],
    ],
  },
  竞价异动: {
    columns: ["股票", "竞价幅度", "原因", "时间"],
    rows: [
      ["华胜天成", "+5.6%", "热点题材", "09:27"],
      ["润泽科技", "+4.2%", "资金异动", "09:26"],
      ["航天发展", "+3.8%", "情绪回暖", "09:25"],
    ],
  },
  大盘直播: {
    columns: ["时间", "事件", "影响"],
    rows: [
      ["10:15", "指数冲高回落", "情绪分化"],
      ["11:05", "北向资金回流", "权重支撑"],
      ["14:30", "题材回暖", "短线修复"],
    ],
  },
  异动股池: {
    columns: ["股票", "异动类型", "涨跌", "备注"],
    rows: [
      ["中直股份", "封板", "+9.8%", "低空经济"],
      ["中科曙光", "拉升", "+4.1%", "算力"],
      ["埃斯顿", "连板", "+6.3%", "机器人"],
    ],
  },
  区间榜: {
    columns: ["区间", "领涨板块", "涨幅", "热度"],
    rows: [
      ["3日", "AI算力", "+18%", { text: "高", className: "tag red" }],
      ["5日", "机器人", "+12%", { text: "中", className: "tag blue" }],
      ["10日", "低空经济", "+15%", { text: "高", className: "tag red" }],
    ],
  },
  题材榜: {
    columns: ["题材", "龙头", "涨幅", "热度"],
    rows: [
      ["算力", "中科曙光", "+5.3%", { text: "高", className: "tag red" }],
      ["机器人", "埃斯顿", "+3.8%", { text: "中", className: "tag blue" }],
      ["低空经济", "中直股份", "+4.1%", { text: "高", className: "tag red" }],
    ],
  },
  股票榜: {
    columns: ["排名", "股票", "涨跌", "标签"],
    rows: [
      [1, "航天发展", "+2.04%", { text: "R", className: "tag blue" }],
      [2, "华胜天成", "+10.00%", { text: "榜", className: "tag red" }],
      [3, "润泽科技", "+18.19%", { text: "创", className: "tag blue" }],
    ],
  },
};

export default function Home() {
  const [active, setActive] = useState(tabs[0]);
  const { data: task } = useTask();
  const plan = task?.plan || {};
  const hotCodes = useMemo(() => (task?.stock?.lhbs || []).slice(0, 6), [task]);
  const [hotQuotes, setHotQuotes] = useState([]);

  useEffect(() => {
    if (!hotCodes.length) return;
    fetchJson(`/api/market/quotes?codes=${hotCodes.join(",")}`)
      .then((data) => setHotQuotes(data))
      .catch(() => setHotQuotes([]));
  }, [hotCodes]);

  const table = tabTables[active];

  return (
    <>
      <div className="panel">
        <div className="section-title">市场摘要</div>
        <div className="stat-grid">
          <div className="stat-card">
            <div className="stat-label">在线人数</div>
            <div className="stat-value">{task?.online?.num ?? "--"}</div>
          </div>
          <div className="stat-card">
            <div className="stat-label">VIP客户端</div>
            <div className="stat-value">{task?.soft?.version || "--"}</div>
          </div>
          <div className="stat-card">
            <div className="stat-label">策略计划</div>
            <div className="stat-value">{plan?.open_plan ? "已开启" : "待开启"}</div>
          </div>
          <div className="stat-card">
            <div className="stat-label">行情源</div>
            <div className="stat-value">公开行情</div>
          </div>
        </div>
        <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginTop: 10 }}>
          <span className={plan?.jingjia ? "tag red" : "tag ghost"}>竞价策略</span>
          <span className={plan?.panzhong ? "tag red" : "tag ghost"}>盘中策略</span>
          <span className={plan?.fupan ? "tag red" : "tag ghost"}>复盘策略</span>
          <span className="tag gold">AI策略卡：可用 0 次</span>
        </div>
      </div>

      <div className="toolbar">
        <div className="tabs">
          {tabs.map((t) => (
            <div
              key={t}
              className={`tab ${t === active ? "active" : ""}`}
              onClick={() => setActive(t)}
            >
              {t}
            </div>
          ))}
        </div>
        <div>13:38 周四</div>
      </div>

      <div className="panel">
        <div style={{ marginBottom: 8 }}>AI策略卡：可用 0 次</div>
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 10 }}>
          <span className="tag blue">点击购买AI策略次卡</span>
          <span className="tag">点击查看AI历史策略</span>
          <span className="tag">仅供模拟学习</span>
        </div>
        <table className="table">
          <thead>
            <tr>
              {table.columns.map((col) => (
                <th key={col}>{col}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {table.rows.map((row, rowIndex) => (
              <tr key={`${active}-${rowIndex}`}>
                {row.map((cell, index) => {
                  if (cell && typeof cell === "object") {
                    return (
                      <td key={index} className={cell.className}>
                        {cell.text}
                      </td>
                    );
                  }
                  return <td key={index}>{cell}</td>;
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="panel">
        <div className="section-title">热门行情</div>
        <table className="table">
          <thead>
            <tr>
              <th>代码</th>
              <th>股票</th>
              <th>最新价</th>
              <th>涨跌</th>
              <th>涨幅</th>
            </tr>
          </thead>
          <tbody>
            {hotQuotes.map((row) => (
              <tr key={row.code}>
                <td>{row.code}</td>
                <td>{row.name || "-"}</td>
                <td>{row.price ?? "-"}</td>
                <td className={row.change >= 0 ? "tag red" : "tag green"}>
                  {row.change ?? "-"}
                </td>
                <td className={row.change_rate >= 0 ? "tag red" : "tag green"}>
                  {row.change_rate ?? "-"}%
                </td>
              </tr>
            ))}
            {hotQuotes.length === 0 && (
              <tr>
                <td colSpan={5} className="note">
                  暂无数据，请稍后刷新。
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="panel">
        <div style={{ marginBottom: 8 }}>人气TOP10</div>
        <table className="table">
          <thead>
            <tr>
              <th>排名</th>
              <th>股票</th>
              <th>涨跌</th>
              <th>标签</th>
            </tr>
          </thead>
          <tbody>
            {hotRows.map((row, index) => (
              <tr key={row.name}>
                <td>{index + 1}</td>
                <td>{row.name}</td>
                <td>{row.change}</td>
                <td>
                  {row.tags.map((tag) => (
                    <span key={tag} className="tag blue" style={{ marginRight: 6 }}>
                      {tag}
                    </span>
                  ))}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
