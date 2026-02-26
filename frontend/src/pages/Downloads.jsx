import React, { useState } from "react";

const tabs = ["VIP软件下载", "通达信插件", "实战视频"];
const pluginTabs = ["插件基本介绍", "如何使用插件？", "如何安装插件？"];

const downloadRows = [
  { name: "通达信插件", version: "v2.1.0", size: "38MB", updated: "2026-02-20", status: "推荐" },
  { name: "桌面客户端", version: "v1.9.3", size: "62MB", updated: "2026-02-18", status: "稳定" },
  { name: "移动端安装包", version: "v3.0.1", size: "45MB", updated: "2026-02-12", status: "最新" },
];

const videoRows = [
  { title: "插件安装入门", duration: "05:32", level: "入门" },
  { title: "盘中热点追踪", duration: "12:45", level: "进阶" },
  { title: "策略卡使用技巧", duration: "08:10", level: "实战" },
];

export default function Downloads() {
  const [active, setActive] = useState(tabs[0]);
  const [activePlugin, setActivePlugin] = useState(pluginTabs[0]);

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
        <div className="panel">
          <table className="table">
            <thead>
              <tr>
                <th>名称</th>
                <th>版本</th>
                <th>大小</th>
                <th>更新时间</th>
                <th>状态</th>
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
                </tr>
              ))}
            </tbody>
          </table>
        </div>
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
              <div style={{ fontSize: 12, color: "#9aa3b2", lineHeight: 1.6 }}>
                插件包含日内热点、强势题材、交易辅助等模块。<br />
                下载地址：
                <span className="tag blue" style={{ marginLeft: 6 }}>
                  https://soft.fupanwang.com/tdx.fupanwang.zip
                </span>
              </div>
            )}

            {activePlugin === "如何使用插件？" && (
              <div style={{ fontSize: 12, color: "#9aa3b2", lineHeight: 1.6 }}>
                1）导入自定义版面。<br />
                2）关注盘中热点与情绪指标。<br />
                3）结合策略卡提示进行模拟练习。
              </div>
            )}

            {activePlugin === "如何安装插件？" && (
              <div style={{ fontSize: 12, color: "#9aa3b2", lineHeight: 1.6 }}>
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
