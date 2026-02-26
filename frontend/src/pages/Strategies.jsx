import React from "react";

export default function Strategies() {
  return (
    <>
      <div className="toolbar">
        <div className="tabs">
          <div className="tab active">AI操盘策略</div>
          <div className="tab">专家复盘策略</div>
        </div>
        <div>策略中心</div>
      </div>

      <div className="panel">
        <div style={{ marginBottom: 8 }}>
          AI操盘策略（竞价/盘中/尾盘/复盘）
        </div>
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
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>2026-02-26</td>
              <td>09:29</td>
              <td>竞价</td>
              <td>示例股票</td>
              <td className="tag red">13.94%</td>
              <td className="tag green">5.20%</td>
              <td>★★</td>
              <td>¥0</td>
              <td>待结算</td>
              <td>进行中</td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
}
