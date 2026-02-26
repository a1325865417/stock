import React, { useState } from "react";

const tabs = ["板块核心", "涨停梯队", "龙头追踪"];

const tabData = {
  板块核心: [
    ["算力", "中科曙光", "5.3%", "高", "热度上行"],
    ["机器人", "埃斯顿", "3.8%", "中", "资金回流"],
    ["低空经济", "中直股份", "4.1%", "高", "情绪共振"],
  ],
  涨停梯队: [
    ["2连板", "示例A", "题材A", "10.0%", "换手稳"],
    ["3连板", "示例B", "题材B", "10.0%", "情绪强"],
    ["首板", "示例C", "题材C", "10.0%", "潜伏"],
  ],
  龙头追踪: [
    ["算力", "中科曙光", "资金回流", "13:40", "偏强"],
    ["机器人", "埃斯顿", "强势震荡", "13:10", "观望"],
    ["低空经济", "中直股份", "拉升", "12:50", "冲高"],
  ],
};

export default function Review() {
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
        <div>板块核心</div>
      </div>

      <div className="panel">
        <div className="section-title">盘后复盘摘要</div>
        <div className="stat-grid">
          <div className="stat-card">
            <div className="stat-label">情绪温度</div>
            <div className="stat-value">73</div>
            <div className="note">短线情绪回暖</div>
          </div>
          <div className="stat-card">
            <div className="stat-label">主线强度</div>
            <div className="stat-value">AI算力</div>
            <div className="note">资金回流明显</div>
          </div>
          <div className="stat-card">
            <div className="stat-label">活跃题材</div>
            <div className="stat-value">机器人</div>
            <div className="note">多点扩散</div>
          </div>
          <div className="stat-card">
            <div className="stat-label">次日策略</div>
            <div className="stat-value">低位补涨</div>
            <div className="note">关注量能拐点</div>
          </div>
        </div>
      </div>

      <div className="panel">
        <table className="table">
          <thead>
            {active === "板块核心" && (
              <tr>
                <th>题材板块</th>
                <th>龙头</th>
                <th>日内涨幅</th>
                <th>热度</th>
                <th>备注</th>
              </tr>
            )}
            {active === "涨停梯队" && (
              <tr>
                <th>梯队</th>
                <th>股票</th>
                <th>题材</th>
                <th>涨幅</th>
                <th>评价</th>
              </tr>
            )}
            {active === "龙头追踪" && (
              <tr>
                <th>题材</th>
                <th>龙头</th>
                <th>状态</th>
                <th>时间</th>
                <th>趋势</th>
              </tr>
            )}
          </thead>
          <tbody>
            {tabData[active].map((row) => (
              <tr key={row.join("-")}> 
                {row.map((cell, index) => {
                  if (active === "板块核心" && index === 2) {
                    return (
                      <td key={index} className="tag red">
                        {cell}
                      </td>
                    );
                  }
                  if (active === "板块核心" && index === 3) {
                    return (
                      <td
                        key={index}
                        className={cell === "高" ? "tag red" : "tag blue"}
                      >
                        {cell}
                      </td>
                    );
                  }
                  if (active === "涨停梯队" && index === 3) {
                    return (
                      <td key={index} className="tag red">
                        {cell}
                      </td>
                    );
                  }
                  if (active === "龙头追踪" && index === 4) {
                    return (
                      <td key={index} className="tag blue">
                        {cell}
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
    </>
  );
}
