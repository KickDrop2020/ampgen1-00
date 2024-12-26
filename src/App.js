import logo from './logo.svg';
import './App.css';
import { Amplify } from "aws-amplify";
import { withAuthenticator } from "@aws-amplify/ui-react";
import "@aws-amplify/ui-react/styles.css";
import awsExports from "./aws-exports";
import { useState } from "react";
import AppPrjA from "./AppPrjA"; // AppPrjAコンポーネントとhandler_PrjA関数をインポート

Amplify.configure(awsExports);

function App({ signOut, user }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [currentScreen, setCurrentScreen] = useState("home"); // 初期画面の状態管理

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const handleProjectAClick = () => {
    setCurrentScreen("AppPrjA"); // AppPrjA画面に切り替え
    setMenuOpen(false); // メニューを閉じる
  };

  const handleHomeClick = () => {
    setCurrentScreen("home"); // 初期画面に戻る
    setMenuOpen(false); // メニューを閉じる
  };

  return (
    <div className="App">
      <header>
        <div className="App-head">
          {/* ハンバーガーメニュー */}
          <div className="hamburger-menu" onClick={toggleMenu}>
            ☰
          </div>
        </div>
      </header>

      {/* サイドメニュー */}
      <div className={`side-menu ${menuOpen ? "open" : ""}`}>
        <ul>
          <li onClick={handleProjectAClick}>プロジェクトA</li>
          <li>プロジェクトB</li>
          <li onClick={handleHomeClick}>ホーム</li>
        </ul>
      </div>

      {/* 画面切り替え */}
      {currentScreen === "home" && (
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Hello React app with AWS</h2>
          {user ? (
            <>
              <h3>私は権限持っています：{user.username}</h3>
              <button onClick={signOut}>サインアウト</button>
            </>
          ) : (
            <h3>私は権限持っていません</h3>
          )}
        </div>
      )}

      {currentScreen === "AppPrjA" && <AppPrjA />} {/* プロジェクトA画面 */}
    </div>
  );
}

export default withAuthenticator(App);
