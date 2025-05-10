import React, { useEffect, useState } from 'react';
import axios from 'axios';

const IconDisplay = () => {
    const [icons, setIcons] = useState([]); // 初期値は空配列で安全に

    useEffect(() => {
        axios
            .get('/api/common/icon/all')
            .then((res) => {
                console.log('レスポンス全体:', res);
                console.log('res.data:', res.data);
                // 構造に応じて以下を調整してください
                // 例：res.data.data.icons か res.data.icons か
                const fetchedIcons =
                    res.data.data?.icons || res.data.icons || [];
                setIcons(fetchedIcons);
            })
            .catch((err) => {
                console.error('アイコン取得エラー:', err);
            });
    }, []);

    return (
        <div>
            <h2>アイコン一覧</h2>
            {icons.length > 0 ? (
                icons.map((icon) => (
                    <div key={icon.id}>
                        <img
                            src={icon.url}
                            alt={icon.name}
                            width={50}
                            height={50}
                        />
                        <p>{icon.name}</p>
                    </div>
                ))
            ) : (
                <p>アイコンがありません。</p>
            )}
        </div>
    );
};

export default IconDisplay;
