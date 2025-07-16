import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './function/pages/login';
// import ItemStandard from './function/pages/itemStandard';
import Input from './function/pages/inputpage';
import Saving from './function/pages/savingpage';
import Debug from './function/pages/debug'; // 削除
import Registration from './function/pages/accountRegistration';
import ErrorPage from './function/pages/errorpage';
import TutorialPage from './function/pages/tutorialpage';
import BudgetPage from './function/pages/budgetPage';
import ReportPage from './function/pages/reportPage';
import EmailRegistration from './function/pages/emailRegistration';
import EmailLogin from './function/pages/emailLogin';
// import Donkit from './function/pages/SimpleSortablePage';

function App() {
    return (
        <BrowserRouter>
            <div className="App">
                <Routes>
                    {/* テスト用  */}
                    <Route path="/debug" element={<Debug />} /> {/* 削除 */}
                    {/* ログイン */}
                    <Route path="/" element={<Login />} />
                    {/* 金額入力 */}
                    <Route path="/record-input" element={<Input />} />
                    {/* 予算 */}
                    <Route path="/budget" element={<BudgetPage />} />
                    {/* レポート*/}
                    <Route path="/report" element={<ReportPage />} />
                    {/*保存確認  */}
                    <Route path="/saving-confirmation" element={<Saving />} />
                    {/*  */}
                    {/* エラーページ */}
                    <Route path="/errorpage" element={<ErrorPage />} />
                    {/* 初期設定ページ */}
                    <Route path="/tutorial" element={<TutorialPage />} />
                    {/* アカウント登録ページ */}
                    <Route
                        path="/account/registration"
                        element={<Registration />}
                    />
                    {/* Email登録ページ */}
                    <Route
                        path="/account/registration/email"
                        element={<EmailRegistration />}
                    />
                    <Route
                        path="/accout/email/login"
                        element={<EmailLogin />}
                    />
                    {/* <Route path="/donkit" element={<Donkit />} /> */}
                </Routes>
            </div>
        </BrowserRouter>
    );
}

export default App;
