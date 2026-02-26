import React, { useEffect, useMemo, useState } from "react";
import { useTask } from "../lib/task";
import { fetchJson } from "../lib/api";

const tabs = [
  "股票龙虎榜",
  "游资龙虎榜",
  "机构龙虎榜",
  "主力龙虎榜",
  "热门游资榜",
  "全部榜单",
];

const staticData = {
  游资龙虎榜: [
    ["2026-02-26", "某游资席位", "华胜天成", "¥0.22亿"],
    ["2026-02-26", "某游资席位", "润泽科技", "¥0.18亿"],
  ],
  机构龙虎榜: [
    ["2026-02-26", "机构A", "中科曙光", "¥0.30亿"],
    ["2026-02-26", "机构B", "埃斯顿", "¥0.25亿"],
  ],
  主力龙虎榜: [
    ["2026-02-26", "主力净买", "中直股份", "+¥0.28亿"],
    ["2026-02-26", "主力净卖", "航天发展", "-¥0.15亿"],
  ],
  热门游资榜: [
    ["游资A", "6", "¥0.90亿"],
    ["游资B", "4", "¥0.65亿"],
  ],
  全部榜单: [
    ["2026-02-26", "华胜天成", "游资+机构", "上榜"],
    ["2026-02-26", "中科曙光", "机构", "上榜"],
  ],
};

export default function Lhb() {
  const [active, setActive] = useState(tabs[0]);
  const { data: task } = useTask();
  const [quotes, setQuotes] = useState([]);
  const codes = useMemo(() => (task?.stock?.lhbs || []).slice(0, 12), [task]);

  useEffect(() => {
    if (active !== "股票龙虎榜" || codes.length === 0) return;
    fetchJson(`/api/market/quotes?codes=${codes.join(",")}`)
      .then((data) => setQuotes(data))
      .catch(() => setQuotes([]));
  }, [active, codes]);

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
        <div>游资机构</div>
      </div>

      {active === "股票龙虎榜" && (
        <>
          <div className="panel">
            <div className="section-title">龙虎榜热门股（来自公开行情）</div>
            <table className="table">
              <thead>
                <tr>
                  <th>代码</th>
                  <th>股票</th>
                  <th>最新价</th>
                  <th>涨跌</th>
                  <th>涨幅</th>
                  <th>换手</th>
                </tr>
              </thead>
              <tbody>
                {quotes.map((row) => (
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
                    <td>{row.turnover_ratio ?? "-"}%</td>
                  </tr>
                ))}
                {quotes.length === 0 && (
                  <tr>
                    <td colSpan={6} className="note">
                      暂无数据，请稍后刷新。
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </>
      )}

      {active !== "股票龙虎榜" && (
        <div className="panel">
          <table className="table">
            <thead>
              {active === "游资龙虎榜" && (
                <tr>
                  <th>日期</th>
                  <th>游资席位</th>
                  <th>股票</th>
                  <th>净买</th>
                </tr>
              )}
              {active === "机构龙虎榜" && (
                <tr>
                  <th>日期</th>
                  <th>机构</th>
                  <th>股票</th>
                  <th>净买</th>
                </tr>
              )}
              {active === "主力龙虎榜" && (
                <tr>
                  <th>日期</th>
                  <th>类型</th>
                  <th>股票</th>
                  <th>净买</th>
                </tr>
              )}
              {active === "热门游资榜" && (
                <tr>
                  <th>游资名称</th>
                  <th>上榜次数</th>
                  <th>净买金额</th>
                </tr>
              )}
              {active === "全部榜单" && (
                <tr>
                  <th>日期</th>
                  <th>股票</th>
                  <th>类型</th>
                  <th>状态</th>
                </tr>
              )}
            </thead>
            <tbody>
              {(staticData[active] || []).map((row, index) => (
                <tr key={`${active}-${index}`}>
                  {row.map((cell, cellIndex) => {
                    const className =
                      cellIndex === row.length - 1 && String(cell).includes("-¥")
                        ? "tag green"
                        : cellIndex === row.length - 1 && String(cell).includes("¥")
                        ? "tag red"
                        : "";
                    return (
                      <td key={cellIndex} className={className}>
                        {cell}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
}
