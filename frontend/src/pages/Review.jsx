import React, { useState } from "react";

const tabs = ["板块核心", "涨停梯队", "龙头追踪"];

const tabData = {
  板块核心: [
    ["算力", "中科曙光", "5.3%", "高"],
    ["机器人", "埃斯顿", "3.8%", "中"],
    ["低空经济", "中直股份", "4.1%", "高"],
  ],
  涨停梯队: [
    ["2连板", "示例A", "题材A", "10.0%"],
    ["3连板", "示例B", "题材B", "10.0%"],
    ["首板", "示例C", "题材C", "10.0%"],
  ],
  龙头追踪: [
    ["算力", "中科曙光", "资金回流", "13:40"],
    ["机器人", "埃斯顿", "强势震荡", "13:10"],
    ["低空经济", "中直股份", "拉升", "12:50"],
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
        <table className="table">
          <thead>
            {active === "板块核心" && (
              <tr>
                <th>题材板块</th>
                <th>龙头</th>
                <th>日内涨幅</th>
                <th>热度</th>
              </tr>
            )}
            {active === "涨停梯队" && (
              <tr>
                <th>梯队</th>
                <th>股票</th>
                <th>题材</th>
                <th>涨幅</th>
              </tr>
            )}
            {active === "龙头追踪" && (
              <tr>
                <th>题材</th>
                <th>龙头</th>
                <th>状态</th>
                <th>时间</th>
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
