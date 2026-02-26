import React, { useState } from "react";

const tabs = ["会员分享", "合伙人计划", "我的合伙信息", "我的直属下线"];

const statRows = [
  { label: "本月新增", value: "18 人" },
  { label: "累计合伙人", value: "326 人" },
  { label: "预计佣金", value: "¥2,640" },
  { label: "今日邀请", value: "3 人" },
];

const inviteRows = [
  { name: "张**", level: "一级", joined: "2026-02-25", status: "活跃" },
  { name: "李**", level: "二级", joined: "2026-02-23", status: "待开通" },
  { name: "王**", level: "一级", joined: "2026-02-21", status: "活跃" },
];

export default function Partner() {
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
        <div>加入合伙人</div>
      </div>

      {active === "会员分享" && (
        <div className="panel">
          <div style={{ marginBottom: 8 }}>分享邀请码</div>
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
            <span className="tag blue">邀请码：FPW-3827</span>
            <span className="tag">复制链接</span>
            <span className="tag">生成二维码</span>
          </div>
          <div style={{ marginTop: 10, color: "#9aa3b2", fontSize: 12 }}>
            分享链接：https://vip.fupanwang.com/#/partner
          </div>
        </div>
      )}

      {active === "合伙人计划" && (
        <div className="panel">
          <div style={{ marginBottom: 8 }}>合伙人计划说明</div>
          <div style={{ fontSize: 12, color: "#9aa3b2", lineHeight: 1.6 }}>
            1）一级/二级返佣规则按月结算。<br />
            2）邀请用户开通会员后自动计入收益。<br />
            3）合伙人权益含专属客服与活动优先权。
          </div>
        </div>
      )}

      {active === "我的合伙信息" && (
        <div className="panel">
          <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
            {statRows.map((row) => (
              <div key={row.label} className="tag" style={{ padding: "8px 12px" }}>
                <div style={{ fontSize: 12, color: "#9aa3b2" }}>{row.label}</div>
                <div style={{ fontSize: 16, marginTop: 4 }}>{row.value}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {active === "我的直属下线" && (
        <div className="panel">
          <div style={{ marginBottom: 8 }}>直属下线列表</div>
          <table className="table">
            <thead>
              <tr>
                <th>昵称</th>
                <th>层级</th>
                <th>加入时间</th>
                <th>状态</th>
              </tr>
            </thead>
            <tbody>
              {inviteRows.map((row) => (
                <tr key={row.name}>
                  <td>{row.name}</td>
                  <td>{row.level}</td>
                  <td>{row.joined}</td>
                  <td className={row.status === "活跃" ? "tag green" : "tag blue"}>
                    {row.status}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
}
