import React from "react";

const tabs = [
  "大盘直播",
  "监管停牌",
  "公告中心",
  "情报盘点",
  "外围市场",
  "财经头条",
  "明天炒什么",
  "题材推荐",
  "投资日历",
  "股市快讯",
];

export default function Intel() {
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
        <div>盘前必看</div>
      </div>

      <div className="panel">
        <table className="table">
          <thead>
            <tr>
              <th>标题</th>
              <th>来源</th>
              <th>时间</th>
              <th>标签</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>芯片概念异动拉升，欧莱新材、圣晖集成逼近涨停</td>
              <td>AI生成</td>
              <td>13:26</td>
              <td className="tag blue">热点</td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
}
