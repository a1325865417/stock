import React from "react";

export default function Placeholder({ title }) {
  return (
    <div className="panel">
      <div style={{ fontSize: 14, marginBottom: 6 }}>{title}</div>
      <div style={{ color: "#9aa3b2", fontSize: 12 }}>
        页面结构已创建，后续补齐数据与交互。
      </div>
    </div>
  );
}
