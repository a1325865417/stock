import React, { useState } from "react";

const tabs = [
  "股票龙虎榜",
  "游资龙虎榜",
  "机构龙虎榜",
  "主力龙虎榜",
  "热门游资榜",
  "全部榜单",
];

const tabData = {
  股票龙虎榜: [
    ["2026-02-26", "华胜天成", "¥1.24亿", "¥0.88亿", "¥0.36亿"],
    ["2026-02-26", "润泽科技", "¥0.92亿", "¥1.10亿", "-¥0.18亿"],
  ],
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

      <div className="panel">
        <table className="table">
          <thead>
            {active === "股票龙虎榜" && (
              <tr>
                <th>日期</th>
                <th>股票</th>
                <th>买入</th>
                <th>卖出</th>
                <th>净买</th>
              </tr>
            )}
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
            {tabData[active].map((row, index) => (
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
    </>
  );
}
