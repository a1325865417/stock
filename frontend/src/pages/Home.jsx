import React from "react";

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
  { name: "航天发展", change: "2.04%", tags: ["亏", "R", "榜"] },
  { name: "华胜天成", change: "10.00%", tags: ["R", "榜"] },
  { name: "润泽科技", change: "18.19%", tags: ["R", "创"] },
];

export default function Home() {
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
        <div>13:38 周四</div>
      </div>

      <div className="panel">
        <div style={{ marginBottom: 8 }}>AI策略卡：可用 0 次</div>
        <table className="table">
          <thead>
            <tr>
              <th>类型</th>
              <th>时间</th>
              <th>股票</th>
              <th>收益</th>
              <th>仓位</th>
              <th>状态</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>竞价</td>
              <td>09:29</td>
              <td>点击查看</td>
              <td className="tag red">13.94%</td>
              <td>★★</td>
              <td>进行中</td>
            </tr>
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
            {hotRows.map((row, i) => (
              <tr key={row.name}>
                <td>{i + 1}</td>
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
