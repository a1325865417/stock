import React, { useState } from "react";
import { useTask } from "../lib/task";

const tabs = ["会员分享", "合伙人计划", "我的合伙信息", "我的直属下线"];

const statRows = [
  { label: "本月新增", value: "18 人" },
  { label: "累计合伙人", value: "326 人" },
  { label: "预计佣金", value: "¥2,640" },
  { label: "今日邀请", value: "3 人" },
];

const inviteRows = [
  { name: "张**", level: "一级", joined: "2026-02-25", status: "活跃", amount: "¥268" },
  { name: "李**", level: "二级", joined: "2026-02-23", status: "待开通", amount: "¥98" },
  { name: "王**", level: "一级", joined: "2026-02-21", status: "活跃", amount: "¥899" },
];

export default function Partner() {
  const [active, setActive] = useState(tabs[0]);
  const { data: task } = useTask();
  const proxyPics = [task?.proxy?.pic1, task?.proxy?.pic2, task?.proxy?.pic3].filter(Boolean);
  const shareReward = task?.youhui?.share_money ? `¥${task.youhui.share_money}` : "¥5";

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
        <>
          <div className="panel">
            <div className="section-title">邀请中心</div>
            <div className="stat-grid">
              <div className="stat-card">
                <div className="stat-label">邀请奖励</div>
                <div className="stat-value">{shareReward}</div>
              </div>
              <div className="stat-card">
                <div className="stat-label">专属邀请码</div>
                <div className="stat-value">FPW-3827</div>
              </div>
              <div className="stat-card">
                <div className="stat-label">分享链接</div>
                <div className="stat-value" style={{ fontSize: 12 }}>
                  vip.fupanwang.com/#/partner
                </div>
              </div>
              <div className="stat-card">
                <div className="stat-label">当前等级</div>
                <div className="stat-value">合伙人·L1</div>
              </div>
            </div>
          </div>

          <div className="panel">
            <div className="section-title">快捷操作</div>
            <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
              <div className="btn">复制邀请码</div>
              <div className="btn">生成分享海报</div>
              <div className="btn">邀请记录</div>
              <span className="tag ghost">邀请开通后自动入账</span>
            </div>
          </div>
        </>
      )}

      {active === "合伙人计划" && (
        <>
          <div className="panel">
            <div className="section-title">合伙人计划说明</div>
            <div className="note">
              1）一级/二级返佣按月结算，邀请用户开通会员后自动计入收益。<br />
              2）佣金可用于会员续费、策略卡兑换或提现申请。<br />
              3）合伙人享有专属客服、活动优先权与渠道资源支持。
            </div>
          </div>
          {proxyPics.length > 0 && (
            <div className="panel">
              <div className="section-title">计划宣传资料</div>
              <div className="card-grid">
                {proxyPics.map((pic, index) => (
                  <div key={pic || index} className="card">
                    <div className="card-title">官方素材 {index + 1}</div>
                    <div className="media-box">
                      <img src={pic} alt={`宣传素材${index + 1}`} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </>
      )}

      {active === "我的合伙信息" && (
        <div className="panel">
          <div className="section-title">数据概览</div>
          <div className="stat-grid">
            {statRows.map((row) => (
              <div key={row.label} className="stat-card">
                <div className="stat-label">{row.label}</div>
                <div className="stat-value">{row.value}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {active === "我的直属下线" && (
        <div className="panel">
          <div className="section-title">直属下线列表</div>
          <table className="table">
            <thead>
              <tr>
                <th>昵称</th>
                <th>层级</th>
                <th>加入时间</th>
                <th>状态</th>
                <th>贡献金额</th>
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
                  <td className="tag gold">{row.amount}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
}
