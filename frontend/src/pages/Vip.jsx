import React, { useState } from "react";

const tabs = [
  "VIP商城",
  "会员信息",
  "在线充值",
  "我的订单",
  "个人资料",
  "修改密码",
  "常见问题",
  "VIP基础版",
  "通达信增值版",
  "AI策略卡",
  "合伙人权益",
  "VIP版本说明",
  "优惠活动",
];

const plans = [
  { name: "月度会员", price: "¥98", perks: "策略推送、盘前情报" },
  { name: "季度会员", price: "¥268", perks: "额外复盘、VIP人气榜" },
  { name: "年度会员", price: "¥899", perks: "专属策略、专线客服" },
];

const orders = [
  { id: "20260226001", plan: "季度会员", status: "已开通", expires: "2026-05-26" },
];

const rechargeRows = [
  { amount: "¥98", desc: "月度会员" },
  { amount: "¥268", desc: "季度会员" },
  { amount: "¥899", desc: "年度会员" },
];

const cardRows = [
  { name: "AI策略卡（10次）", price: "¥99", status: "可用" },
  { name: "AI策略卡（50次）", price: "¥399", status: "可用" },
];

export default function Vip() {
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
        <div>VIP商城</div>
      </div>

      {active === "VIP商城" && (
        <div className="panel">
          <table className="table">
            <thead>
              <tr>
                <th>套餐</th>
                <th>价格</th>
                <th>权益</th>
              </tr>
            </thead>
            <tbody>
              {plans.map((row) => (
                <tr key={row.name}>
                  <td>{row.name}</td>
                  <td className="tag red">{row.price}</td>
                  <td>{row.perks}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {active === "会员信息" && (
        <div className="panel">
          <div style={{ display: "grid", gap: 6, fontSize: 12 }}>
            <div>会员等级：VIP 1</div>
            <div>会员到期：2026-05-26</div>
            <div>策略卡次数：0 次</div>
            <div>签到状态：未签到</div>
          </div>
        </div>
      )}

      {active === "在线充值" && (
        <div className="panel">
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
            {rechargeRows.map((row) => (
              <div key={row.amount} className="tag" style={{ padding: "8px 12px" }}>
                <div>{row.amount}</div>
                <div style={{ fontSize: 11, color: "#9aa3b2" }}>{row.desc}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {active === "我的订单" && (
        <div className="panel">
          <table className="table">
            <thead>
              <tr>
                <th>订单号</th>
                <th>套餐</th>
                <th>状态</th>
                <th>到期时间</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((row) => (
                <tr key={row.id}>
                  <td>{row.id}</td>
                  <td>{row.plan}</td>
                  <td className="tag green">{row.status}</td>
                  <td>{row.expires}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {active === "个人资料" && (
        <div className="panel">
          <div style={{ display: "grid", gap: 6, fontSize: 12 }}>
            <div>昵称：打电话哈</div>
            <div>手机号：已绑定</div>
            <div>邮箱：未绑定</div>
          </div>
        </div>
      )}

      {active === "修改密码" && (
        <div className="panel">
          <div style={{ fontSize: 12, color: "#9aa3b2" }}>
            请在此处输入旧密码与新密码完成修改。
          </div>
        </div>
      )}

      {active === "常见问题" && (
        <div className="panel">
          <div style={{ fontSize: 12, color: "#9aa3b2", lineHeight: 1.6 }}>
            Q1：策略卡可以提现吗？<br />
            A1：策略卡为虚拟商品，不支持退款。<br />
            Q2：会员权益如何升级？<br />
            A2：通过在线充值升级对应套餐。
          </div>
        </div>
      )}

      {active === "VIP基础版" && (
        <div className="panel">
          <div style={{ fontSize: 12, color: "#9aa3b2" }}>
            包含盘前情报、策略提醒与基础榜单功能。
          </div>
        </div>
      )}

      {active === "通达信增值版" && (
        <div className="panel">
          <div style={{ fontSize: 12, color: "#9aa3b2" }}>
            包含基础版权益 + 通达信插件与专属策略。
          </div>
        </div>
      )}

      {active === "AI策略卡" && (
        <div className="panel">
          <table className="table">
            <thead>
              <tr>
                <th>策略卡</th>
                <th>价格</th>
                <th>状态</th>
              </tr>
            </thead>
            <tbody>
              {cardRows.map((row) => (
                <tr key={row.name}>
                  <td>{row.name}</td>
                  <td className="tag red">{row.price}</td>
                  <td className="tag blue">{row.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {active === "合伙人权益" && (
        <div className="panel">
          <div style={{ fontSize: 12, color: "#9aa3b2" }}>
            享有专属客服、返佣权益与活动优先参与资格。
          </div>
        </div>
      )}

      {active === "VIP版本说明" && (
        <div className="panel">
          <table className="table">
            <thead>
              <tr>
                <th>版本</th>
                <th>权益</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>基础版</td>
                <td>情报+榜单</td>
              </tr>
              <tr>
                <td>增值版</td>
                <td>通达信插件+策略服务</td>
              </tr>
            </tbody>
          </table>
        </div>
      )}

      {active === "优惠活动" && (
        <div className="panel">
          <div style={{ fontSize: 12, color: "#9aa3b2" }}>
            VIP复盘网新春优惠，开通年度会员享折扣。
          </div>
        </div>
      )}
    </>
  );
}
