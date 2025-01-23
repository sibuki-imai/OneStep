import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
// import Login from './function/pages/login';
import ItemStandard from './function/pages/itemStandard';
import Input from './function/pages/inputpage';
import Saving from './function/pages/savingpage';

function App() {
    return (
        <BrowserRouter>
            <div className="App">
                <Routes>
                    {/* テスト用  */}
                    <Route path="/" element={<Input />} />

                    {/* <Route path="/" element={<Login />} /> */}
                    <Route path="/average-price" element={<ItemStandard />} />
                    {/* <Route path="/record-input" element={<Input />} /> */}
                    <Route path="/saving-confirmation" element={<Saving />} />
                </Routes>
            </div>
        </BrowserRouter>
    );
}

export default App;
