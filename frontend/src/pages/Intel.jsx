import React, { useState } from "react";

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

const tabRows = {
  大盘直播: [
    ["指数冲高回落，短线情绪分化", "盘面", "13:26", { text: "直播", className: "tag blue" }],
    ["北向资金回流，权重支撑", "盘面", "12:58", { text: "资金", className: "tag red" }],
  ],
  监管停牌: [
    ["某某科技停牌核查", "监管", "12:20", { text: "停牌", className: "tag red" }],
    ["某某股份恢复交易", "监管", "11:10", { text: "复牌", className: "tag green" }],
  ],
  公告中心: [
    ["公司发布业绩快报", "公告", "10:30", { text: "业绩", className: "tag blue" }],
    ["股东减持计划披露", "公告", "09:50", { text: "减持", className: "tag red" }],
  ],
  情报盘点: [
    ["午间热点盘点：算力+机器人", "情报", "12:05", { text: "盘点", className: "tag blue" }],
    ["收盘前热点：低空经济回流", "情报", "14:50", { text: "盘点", className: "tag blue" }],
  ],
  外围市场: [
    ["美股科技股走强", "外盘", "09:10", { text: "外盘", className: "tag blue" }],
    ["原油价格小幅上行", "外盘", "08:40", { text: "大宗", className: "tag green" }],
  ],
  财经头条: [
    ["政策预期升温，资金关注主线", "头条", "09:00", { text: "头条", className: "tag red" }],
    ["行业景气度回暖，机构调研增多", "头条", "08:30", { text: "头条", className: "tag red" }],
  ],
  明天炒什么: [
    ["关注算力与低空经济叠加", "策略", "15:20", { text: "预判", className: "tag blue" }],
    ["题材轮动，优选低位补涨", "策略", "15:05", { text: "预判", className: "tag blue" }],
  ],
  题材推荐: [
    ["机器人概念持续走强", "题材", "11:40", { text: "推荐", className: "tag red" }],
    ["AI应用拓展加速", "题材", "10:25", { text: "推荐", className: "tag red" }],
  ],
  投资日历: [
    ["本周宏观数据公布", "日历", "08:15", { text: "日历", className: "tag blue" }],
    ["行业会议：人工智能大会", "日历", "07:50", { text: "会议", className: "tag green" }],
  ],
  股市快讯: [
    ["某概念异动拉升", "快讯", "13:45", { text: "快讯", className: "tag blue" }],
    ["资金异动提示", "快讯", "13:12", { text: "快讯", className: "tag blue" }],
  ],
};

export default function Intel() {
  const [active, setActive] = useState(tabs[0]);

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
            {tabRows[active].map((row, index) => (
              <tr key={`${active}-${index}`}>
                <td>{row[0]}</td>
                <td>{row[1]}</td>
                <td>{row[2]}</td>
                <td className={row[3].className}>{row[3].text}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
