import React from "react";

const tabs = [
  "VIP人气榜",
  "同花顺人气榜",
  "同花顺24小时榜",
  "开盘啦盘中榜",
  "开盘啦复盘榜",
  "东财人气榜",
  "淘股吧人气榜",
  "财联社人气榜",
];

const rows = [
  { rank: 1, name: "航天发展", change: "2.04%", tags: ["亏", "R", "榜"] },
  { rank: 2, name: "华胜天成", change: "10.00%", tags: ["R", "榜"] },
  { rank: 3, name: "润泽科技", change: "18.19%", tags: ["R", "创"] },
];

export default function Popularity() {
  return (
    <>
      <div className="toolbar">
        <div className="tabs">
          {tabs.map((t, i) => (
            <div key={t} className={`tab ${i === 0 ? "active" : ""}`}>
              {t}
            </div>
          ))}
        </div>
        <div>人气联动</div>
      </div>

      <div className="panel">
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
            {rows.map((row) => (
              <tr key={row.rank}>
                <td>{row.rank}</td>
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
