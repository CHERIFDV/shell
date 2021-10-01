import React from "react";
import { Spin } from 'antd';
import { SettingOutlined} from '@ant-design/icons';
import "./LoadingPage.scss";
export default function LoadingPage() {
  const antIcon = <SettingOutlined style={{ fontSize: 54 ,color:"gold"}}  spin />;

  return (
    <div className="loading-page">
      <div>
      <Spin indicator={antIcon} />

        <h2 className="loading-text">Loading...</h2>
      </div>
    </div>
  );
}
