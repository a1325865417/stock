import React, { useState } from "react";
import { useTask } from "../lib/task";

const tabs = ["AI操盘策略", "专家复盘策略"];

const aiRows = [
  [
    "2026-02-26",
    "09:29",
    "竞价",
    "示例股票",
    { text: "13.94%", className: "tag red" },
    { text: "5.20%", className: "tag green" },
    "★★",
    "¥0",
    "待结算",
    "进行中",
    "-",
  ],
  [
    "2026-02-26",
    "10:15",
    "盘中",
    "示例股票B",
    { text: "6.20%", className: "tag red" },
    { text: "2.10%", className: "tag green" },
    "★",
    "¥0",
    "胜",
    "已完结",
    "-",
  ],
];

const expertRows = [
  [
    "2026-02-25",
    "20:30",
    "复盘策略",
    "示例股票C",
    "题材+情绪共振",
    "¥0",
    "平",
    "已完结",
    "-",
  ],
  [
    "2026-02-24",
    "20:20",
    "复盘策略",
    "示例股票D",
    "资金回流+龙头效应",
    "¥0",
    "胜",
    "已完结",
    "-",
  ],
];

export default function Strategies() {
  const [active, setActive] = useState(tabs[0]);
  const { data: task } = useTask();
  const plan = task?.plan || {};

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
        <div>策略中心</div>
      </div>

      <div className="panel">
        <div className="section-title">今日策略计划</div>
        <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
          <span className={plan?.jingjia ? "tag red" : "tag ghost"}>竞价策略</span>
          <span className={plan?.panzhong ? "tag red" : "tag ghost"}>盘中策略</span>
          <span className={plan?.fupan ? "tag red" : "tag ghost"}>复盘策略</span>
          <span className={plan?.open_plan ? "tag blue" : "tag ghost"}>计划状态</span>
          <span className="tag gold">AI策略卡：0 次</span>
        </div>
      </div>

      {active === "AI操盘策略" && (
        <>
          <div className="panel">
            <div style={{ marginBottom: 8 }}>
              AI操盘策略（竞价/盘中/尾盘/复盘）
            </div>
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
              <span className="tag blue">点击购买AI策略次卡</span>
              <span className="tag">点击查看AI历史策略</span>
              <span className="tag">仅供模拟学习</span>
            </div>
          </div>

          <div className="panel">
            <table className="table">
              <thead>
                <tr>
                  <th>日期</th>
                  <th>推送时间</th>
                  <th>类型</th>
                  <th>股票</th>
                  <th>日内收益</th>
                  <th>隔日最高</th>
                  <th>仓位</th>
                  <th>金额</th>
                  <th>胜负</th>
                  <th>状态</th>
                  <th>备注</th>
                </tr>
              </thead>
              <tbody>
                {aiRows.map((row, index) => (
                  <tr key={`ai-${index}`}>
                    {row.map((cell, cellIndex) => {
                      if (cell && typeof cell === "object") {
                        return (
                          <td key={cellIndex} className={cell.className}>
                            {cell.text}
                          </td>
                        );
                      }
                      return <td key={cellIndex}>{cell}</td>;
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}

      {active === "专家复盘策略" && (
        <div className="panel">
          <div style={{ marginBottom: 8 }}>专家复盘策略</div>
          <table className="table">
            <thead>
              <tr>
                <th>日期</th>
                <th>推送时间</th>
                <th>类型</th>
                <th>股票</th>
                <th>策略详情</th>
                <th>金额</th>
                <th>胜负</th>
                <th>状态</th>
                <th>备注</th>
              </tr>
            </thead>
            <tbody>
              {expertRows.map((row, index) => (
                <tr key={`expert-${index}`}>
                  {row.map((cell, cellIndex) => (
                    <td key={cellIndex}>{cell}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
}
