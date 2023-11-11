const words = [
    {
        lang : "English",

        menu0 : "HOME",
        menu1 : "PROFILE",
        menu2 : "PROJECTS",
        menu3 : "ARTICLES",

        blog0 : "※Pinned",
        blog1 : "※This content currently does not support the language you've selected.",
        blog2 : "Click to view notes",

        home0 : "Welcome to David_Exmachina's official website!",
        home1 : "Since I've just started learning to make websites, this website is currently \\H\\UNDER CONSTRUCTION\\h\\.",
        home2 : "There will be more and more interesting stuff here as time goes by, so stay tuned! (≧▽≦)",

        pro00 : "\\H\\Name:\\h\\ David_Exmachina (/ˈdeɪvɪd ɛksˈmɑːkɪnə/)",
        pro01 : "\\H\\Gender:\\h\\ Male",
        pro02 : "\\H\\Birthday:\\h\\ May 23",
        pro03 : "\\H\\Country/Region:\\h\\ International",
        pro04 : "\\H\\Language:\\h\\ English, Chinese, Japanese (Studying)",
        pro05 : "\\H\\Hobbies and Interests:\\h\\ Games (Mainly RPG, Sandbox Games, Rhythm Games, Incremental Games, Chess), Anime, Music, Western Culture, Japanese Culture, Programming, Making Games, Composing, Writing, Mathematics (Mainly Set Theory, Googology and Computer Science), Natural Science， Linguistics, Cooking",
        pro06 : "\\H\\Things I Hate:\\h\\ Unreasonable Restrictions and Rules, Threats, Traumas, Politics, History, Some Music",
        pro07 : "I'm a netizen with wide interests,",
        pro08 : "and I like to share some of my ideas with everyone on the internet.",
        pro09 : "My dream is to make games. But I can only put my own ideas here due to my lack of ability.",
        pro10 : "I'm currently learning to make websites and have a keen interest in googology and chess.",

        prj0 : "Unfortunately, there's currently nothing here.",

        now_text : function (t){
            const mon = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
            return `${mon[t[1] - 1]} ${t[2]}, ${t[0]} ${z(t[3], 2)}:${z(t[4], 2)}:${z(t[5], 2)}.${z(t[6], 3)}`;
        },
        
        ago_text : function (t){
            const unit = ["yr", "mo", "w", "d", "hr", "min", "s", " ago"];
            if (t[0]) return `${t[0]}${unit[0]}` + (t[1] ? `${t[1]}${unit[1]}` : "") + unit[7];
            if (t[1]) return `${t[1]}${unit[1]}` + (t[2] >= 7 ? `${intdiv(t[2], 7)}${unit[2]}` : "") + unit[7];
            if (t[2] >= 7) return `${intdiv(t[2], 7)}${unit[2]}` + (t[2] % 7 ? `${t[2] % 7}${unit[3]}` : "") + unit[7];
            if (t[2]) return `${t[2]}${unit[3]}` + (t[3] ? `${z(t[3], 2)}${unit[4]}` : "") + unit[7];
            if (t[3]) return `${t[3]}${unit[4]}` + (t[4] ? `${z(t[4], 2)}${unit[5]}` : "") + unit[7];
            if (t[4]) return `${t[4]}${unit[5]}` + (t[5] ? `${z(t[5], 2)}${unit[6]}` : "") + unit[7];
            return `${t[5]}.${z(t[6], 3)}${unit[6]}${unit[7]}`;
        },
    },
    {
        lang : "简体中文",

        menu0 : "首页",
        menu1 : "简介",
        menu2 : "项目",
        menu3 : "文章",

        blog0 : "※已置顶",
        blog1 : "※该内容目前不支持所选语言。",
        blog2 : "点击以查看备注",

        home0 : "欢迎来到David_Exmachina的官方网站！",
        home1 : "由于本人刚开始学习网站制作，该网站目前\\H\\正在施工\\h\\。",
        home2 : "随着时间推移，此处会有越来越多有趣的东西，敬请期待！(≧▽≦)",

        pro00 : "\\H\\名称：\\h\\David_Exmachina（戴维_艾克斯马奇纳）",
        pro01 : "\\H\\性别：\\h\\男",
        pro02 : "\\H\\生日：\\h\\05月23日",
        pro03 : "\\H\\国家/地区：\\h\\国际",
        pro04 : "\\H\\语言：\\h\\英语、中文、日语（学习中）",
        pro05 : "\\H\\喜好与兴趣：\\h\\游戏（主要是RPG、沙盒类、音乐节奏类、放置类、国际象棋）、动漫、音乐、欧美文化、日本文化、编程、游戏制作、作曲、写作、数学（主要是集合论、巨数学以及计算机科学）、自然科学、语言学、烹饪",
        pro06 : "\\H\\憎恶的事物：\\h\\不合理的限制与规则、威胁、创伤、政治、历史、某些音乐",
        pro07 : "我是一个兴趣广泛的网友，",
        pro08 : "喜欢将自己的一些主意分享给互联网上的大家。",
        pro09 : "梦想是游戏制作。但是由于实力不足只能将自己的点子放在这里。",
        pro10 : "目前我在学习网站制作且对巨数学（Googology）以及国际象棋拥有浓厚的兴趣。",

        prj0 : "遗憾的是，现在这里什么都没有。",

        now_text : function (t){
            return `${t[0]}年${z(t[1], 2)}月${z(t[2], 2)}日 ${z(t[3], 2)}:${z(t[4], 2)}:${z(t[5], 2)}.${z(t[6], 3)}`;
        },
        
        ago_text : function (t){
            const unit = ["年", "个月", "周", "天", "小时", "分钟", "秒", "前"];
            if (t[0]) return `${t[0]}${unit[0]}` + (t[1] ? `${t[1]}${unit[1]}` : "") + unit[7];
            if (t[1]) return `${t[1]}${unit[1]}` + (t[2] >= 7 ? `${intdiv(t[2], 7)}${unit[2]}` : "") + unit[7];
            if (t[2] >= 7) return `${intdiv(t[2], 7)}${unit[2]}` + (t[2] % 7 ? `${t[2] % 7}${unit[3]}` : "") + unit[7];
            if (t[2]) return `${t[2]}${unit[3]}` + (t[3] ? `${z(t[3], 2)}${unit[4]}` : "") + unit[7];
            if (t[3]) return `${t[3]}${unit[4]}` + (t[4] ? `${z(t[4], 2)}${unit[5]}` : "") + unit[7];
            if (t[4]) return `${t[4]}${unit[5]}` + (t[5] ? `${z(t[5], 2)}${unit[6]}` : "") + unit[7];
            return `${t[5]}.${z(t[6], 3)}${unit[6]}${unit[7]}`;
        },
    },
    {
        lang : "繁體中文",

        menu0 : "首頁",
        menu1 : "簡介",
        menu2 : "項目",
        menu3 : "文章",

        blog0 : "※已置頂",
        blog1 : "※該內容目前不支持所選語言。",
        blog2 : "點擊以查看備註",

        home0 : "歡迎來到David_Exmachina的官方網站！",
        home1 : "由於本人剛開始學習網站製作，該網站目前\\H\\正在施工\\h\\。",
        home2 : "隨著時間推移，此處會有越來越多有趣的東西，敬請期待！(≧▽≦)",

        pro00 : "\\H\\名稱：\\h\\David_Exmachina（戴維_艾克斯馬奇納）",
        pro01 : "\\H\\性別：\\h\\男",
        pro02 : "\\H\\生日：\\h\\05月23日",
        pro03 : "\\H\\國家/地區：\\h\\國際",
        pro04 : "\\H\\語言：\\h\\英語、中文、日語（學習中）",
        pro05 : "\\H\\喜好與興趣：\\h\\遊戲（主要是RPG、沙盒類、音樂節奏類、放置類、國際象棋）、動漫、音樂、歐美文化、日本文化、編程、遊戲製作、作曲、寫作、數學（主要是集合論、巨數學以及計算機科學）、自然科學、语言学、烹飪",
        pro06 : "\\H\\憎惡的事物：\\h\\不合理的限制與規則、威脅、創傷、政治、歷史、某些音樂",
        pro07 : "我是一個興趣廣泛的網友，",
        pro08 : "喜歡將自己的一些主意分享給互聯網上的大家。",
        pro09 : "夢想是遊戲製作。但是由於實力不足只能將自己的點子放在這裡。",
        pro10 : "目前我在學習網站製作且對巨數學（Googology）以及國際象棋擁有濃厚的興趣。",

        prj0 : "遺憾的是，現在這裡什麼都沒有。",

        now_text : function (t){
            return `${t[0]}年${z(t[1], 2)}月${z(t[2], 2)}日 ${z(t[3], 2)}:${z(t[4], 2)}:${z(t[5], 2)}.${z(t[6], 3)}`;
        },
        
        ago_text : function (t){
            const unit = ["年", "個月", "週", "天", "小時", "分鐘", "秒", "前"];
            if (t[0]) return `${t[0]}${unit[0]}` + (t[1] ? `${t[1]}${unit[1]}` : "") + unit[7];
            if (t[1]) return `${t[1]}${unit[1]}` + (t[2] >= 7 ? `${intdiv(t[2], 7)}${unit[2]}` : "") + unit[7];
            if (t[2] >= 7) return `${intdiv(t[2], 7)}${unit[2]}` + (t[2] % 7 ? `${t[2] % 7}${unit[3]}` : "") + unit[7];
            if (t[2]) return `${t[2]}${unit[3]}` + (t[3] ? `${z(t[3], 2)}${unit[4]}` : "") + unit[7];
            if (t[3]) return `${t[3]}${unit[4]}` + (t[4] ? `${z(t[4], 2)}${unit[5]}` : "") + unit[7];
            if (t[4]) return `${t[4]}${unit[5]}` + (t[5] ? `${z(t[5], 2)}${unit[6]}` : "") + unit[7];
            return `${t[5]}.${z(t[6], 3)}${unit[6]}${unit[7]}`;
        },
    },
    {
        lang : "日本語",

        menu0 : "トップ",
        menu1 : "自己紹介",
        menu2 : "プロジェクト",
        menu3 : "記事",

        blog0 : "※固定された",
        blog1 : "※このコンテンツは現在設定されている言語に対応しておりません。",
        blog2 : "クリックしてメモを表示",

        home0 : "David_Exmachinaの公式HPへようこそ！",
        home1 : "ホームページ作成を学び始めたばかりので、このサイトは今\\H\\構築中\\h\\です。",
        home2 : "今後も面白いものはどんどん増えていくので、お楽しみに！(≧▽≦)",

        pro00 : "\\H\\名前：\\h\\David_Exmachina（ダヴィッド_エクスマキナ）",
        pro01 : "\\H\\性別：\\h\\男性",
        pro02 : "\\H\\誕生日：\\h\\05月23日",
        pro03 : "\\H\\国/地域：\\h\\国際的",
        pro04 : "\\H\\言語：\\h\\英語、中国語、日本語（勉強中）",
        pro05 : "\\H\\興味·趣味：\\h\\ゲーム（主にRPG、サンドボックス、リズム、放置ゲーム、チェス）、アニメ、音楽、欧米文化、日本文化、プログラミング、ゲーム制作、作曲、書くこと、数学（主に集合論、巨大数研究、計算機科学）、自然科学、言語学、料理",
        pro06 : "\\H\\嫌いなもの：\\h\\不当な制限やルール、脅威、トラウマ、政治、歴史、ある音楽",
        pro07 : "幅広い興味を持つネチズンです。",
        pro08 : "自分の考えをインターネットの皆様と共有したい。",
        pro09 : "夢はゲーム制作。だが能力不足のため、ここでは自分のアイデアを述べるしかない。",
        pro10 : "俺は今ホームページ作成を勉強しており、巨大数（Googology）とチェスに強い興味を持っている。",

        prj0 : "残念ながら、今ここには何もない。",

        now_text : function (t){
            return `${t[0]}年${z(t[1], 2)}月${z(t[2], 2)}日 ${z(t[3], 2)}:${z(t[4], 2)}:${z(t[5], 2)}.${z(t[6], 3)}`;
        },
        
        ago_text : function (t){
            const unit = ["年", "ヶ月", "週間", "日", "時間", "分", "秒", "前"];
            if (t[0]) return `${t[0]}${unit[0]}` + (t[1] ? `${t[1]}${unit[1]}` : "") + unit[7];
            if (t[1]) return `${t[1]}${unit[1]}` + (t[2] >= 7 ? `${intdiv(t[2], 7)}${unit[2]}` : "") + unit[7];
            if (t[2] >= 7) return `${intdiv(t[2], 7)}${unit[2]}` + (t[2] % 7 ? `${t[2] % 7}${unit[3]}` : "") + unit[7];
            if (t[2]) return `${t[2]}${unit[3]}` + (t[3] ? `${z(t[3], 2)}${unit[4]}` : "") + unit[7];
            if (t[3]) return `${t[3]}${unit[4]}` + (t[4] ? `${z(t[4], 2)}${unit[5]}` : "") + unit[7];
            if (t[4]) return `${t[4]}${unit[5]}` + (t[5] ? `${z(t[5], 2)}${unit[6]}` : "") + unit[7];
            return `${t[5]}.${z(t[6], 3)}${unit[6]}${unit[7]}`;
        },
    },
];