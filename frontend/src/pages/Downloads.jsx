import React, { useState } from "react";
import { useTask } from "../lib/task";

const tabs = ["VIP软件下载", "通达信插件", "实战视频"];
const pluginTabs = ["插件基本介绍", "如何使用插件？", "如何安装插件？"];

const videoRows = [
  { title: "插件安装入门", duration: "05:32", level: "入门" },
  { title: "盘中热点追踪", duration: "12:45", level: "进阶" },
  { title: "策略卡使用技巧", duration: "08:10", level: "实战" },
];

export default function Downloads() {
  const [active, setActive] = useState(tabs[0]);
  const [activePlugin, setActivePlugin] = useState(pluginTabs[0]);
  const { data: task } = useTask();
  const soft = task?.soft;
  const app = task?.app;

  const downloadRows = [
    {
      name: "VIP复盘客户端",
      version: soft?.version || app?.version || "v3.9.1",
      size: "62MB",
      updated: "2026-02-20",
      status: "推荐",
      url: soft?.url,
    },
    {
      name: "通达信插件",
      version: soft?.version || "v2.1.0",
      size: "38MB",
      updated: "2026-02-18",
      status: "稳定",
      url: soft?.tdx_url,
    },
    {
      name: "移动端安装包",
      version: "v3.0.1",
      size: "45MB",
      updated: "2026-02-12",
      status: "最新",
      url: soft?.url,
    },
  ];

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
        <div>通达信插件</div>
      </div>

      {active === "VIP软件下载" && (
        <>
          <div className="panel">
            <div className="section-title">版本与更新</div>
            <div className="card-grid">
              <div className="card">
                <div className="card-title">当前版本</div>
                <div className="card-value">{soft?.version || app?.version || "v3.9.1"}</div>
                <div className="note">官方客户端 / 全端通用</div>
              </div>
              <div className="card">
                <div className="card-title">更新提示</div>
                <div className="card-value">{soft?.notice ? "重要" : "正常"}</div>
                <div className="note">{soft?.notice || "最新版本已发布"}</div>
              </div>
              <div className="card">
                <div className="card-title">安装说明</div>
                <div className="card-value">安全提示</div>
                <div className="note">{soft?.desc || "如遇安全软件拦截，请允许运行"}</div>
              </div>
            </div>
          </div>

          <div className="panel">
            <table className="table">
              <thead>
                <tr>
                  <th>名称</th>
                  <th>版本</th>
                  <th>大小</th>
                  <th>更新时间</th>
                  <th>状态</th>
                  <th>下载</th>
                </tr>
              </thead>
              <tbody>
                {downloadRows.map((row) => (
                  <tr key={row.name}>
                    <td>{row.name}</td>
                    <td>{row.version}</td>
                    <td>{row.size}</td>
                    <td>{row.updated}</td>
                    <td className="tag blue">{row.status}</td>
                    <td>{row.url ? <span className="tag gold">{row.url}</span> : "-"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}

      {active === "通达信插件" && (
        <>
          <div className="panel">
            <div className="tabs" style={{ marginBottom: 10 }}>
              {pluginTabs.map((tab) => (
                <div
                  key={tab}
                  className={`tab ${tab === activePlugin ? "active" : ""}`}
                  onClick={() => setActivePlugin(tab)}
                >
                  {tab}
                </div>
              ))}
            </div>

            {activePlugin === "插件基本介绍" && (
              <div className="note">
                插件包含日内热点、强势题材、交易辅助等模块。<br />
                下载地址：
                <span className="tag gold" style={{ marginLeft: 6 }}>
                  {soft?.tdx_url || "https://soft.fupanwang.com/tdx.fupanwang.zip"}
                </span>
              </div>
            )}

            {activePlugin === "如何使用插件？" && (
              <div className="note">
                1）导入自定义版面。<br />
                2）关注盘中热点与情绪指标。<br />
                3）结合策略卡提示进行模拟练习。
              </div>
            )}

            {activePlugin === "如何安装插件？" && (
              <div className="note">
                1）解压下载包。<br />
                2）将版面导入通达信客户端。<br />
                3）按教程图示完成配置。
              </div>
            )}
          </div>
        </>
      )}

      {active === "实战视频" && (
        <div className="panel">
          <table className="table">
            <thead>
              <tr>
                <th>标题</th>
                <th>时长</th>
                <th>级别</th>
              </tr>
            </thead>
            <tbody>
              {videoRows.map((row) => (
                <tr key={row.title}>
                  <td>{row.title}</td>
                  <td>{row.duration}</td>
                  <td className="tag blue">{row.level}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
}
