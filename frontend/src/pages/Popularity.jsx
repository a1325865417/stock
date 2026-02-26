import React, { useEffect, useMemo, useState } from "react";
import { fetchJson } from "../lib/api";
import { useTask } from "../lib/task";

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

const tabRows = {
  同花顺人气榜: [
    { rank: 1, name: "润泽科技", change: "18.19%", tags: ["创"] },
    { rank: 2, name: "中科曙光", change: "5.30%", tags: ["热"] },
  ],
  同花顺24小时榜: [
    { rank: 1, name: "中直股份", change: "4.10%", tags: ["热"] },
    { rank: 2, name: "埃斯顿", change: "3.80%", tags: ["强"] },
  ],
  开盘啦盘中榜: [
    { rank: 1, name: "华胜天成", change: "10.00%", tags: ["榜"] },
    { rank: 2, name: "航天发展", change: "2.04%", tags: ["R"] },
  ],
  开盘啦复盘榜: [
    { rank: 1, name: "润泽科技", change: "18.19%", tags: ["创"] },
    { rank: 2, name: "中科曙光", change: "5.30%", tags: ["热"] },
  ],
  东财人气榜: [
    { rank: 1, name: "中科曙光", change: "5.30%", tags: ["热"] },
    { rank: 2, name: "中直股份", change: "4.10%", tags: ["强"] },
  ],
  淘股吧人气榜: [
    { rank: 1, name: "埃斯顿", change: "3.80%", tags: ["强"] },
    { rank: 2, name: "华胜天成", change: "10.00%", tags: ["榜"] },
  ],
  财联社人气榜: [
    { rank: 1, name: "航天发展", change: "2.04%", tags: ["R"] },
    { rank: 2, name: "润泽科技", change: "18.19%", tags: ["创"] },
  ],
};

function buildTags(changeRate) {
  if (changeRate >= 9.5) return ["榜", "热"];
  if (changeRate >= 5) return ["热"];
  if (changeRate > 0) return ["暖"];
  return ["弱"];
}

export default function Popularity() {
  const [active, setActive] = useState(tabs[0]);
  const { data: task } = useTask();
  const codes = useMemo(() => (task?.stock?.dsks || []).slice(0, 12), [task]);
  const [quotes, setQuotes] = useState([]);

  useEffect(() => {
    if (codes.length === 0) return;
    fetchJson(`/api/market/quotes?codes=${codes.join(",")}`)
      .then((data) => setQuotes(data))
      .catch(() => setQuotes([]));
  }, [codes]);

  const rows =
    active === "VIP人气榜"
      ? quotes.map((row, index) => ({
          rank: index + 1,
          name: row.name || row.code,
          change: row.change_rate != null ? `${row.change_rate}%` : "-",
          tags: buildTags(row.change_rate ?? 0),
        }))
      : tabRows[active] || [];

  return (
    <>
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
              <tr key={`${active}-${row.rank}`}
            >
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
            {rows.length === 0 && (
              <tr>
                <td colSpan={4} className="note">
                  暂无数据，请稍后刷新。
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
}
