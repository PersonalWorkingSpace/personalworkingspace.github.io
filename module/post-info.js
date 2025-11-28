const Posts = [
    {
        "file": "category/Hollow-Knight/idle.html",
        "created": "2025-11-23T00:00:00+08:00",
        "title": "空洞騎士重現 - IDLE Scene",
        "category": "Hollow-Knight",
        "tag": "GameMake",
        "thumbnail": "../../image/hw-idle-cover.png",
        "description": "第一次重現就先忽略腳色操作，單純重現空洞騎士的精髓 - 那無與倫比的美術層次，即便在沒有操作的情況下，整個場景依舊栩栩如生，除了腳色/環境的動畫外..."
    },
    {
        "file": "category/Hollow-Knight/sprite.html",
        "created": "2025-08-19T00:00:00+08:00",
        "title": "空洞騎士重現 - 素材準備",
        "category": "Hollow-Knight",
        "tag": "GameMake",
        "thumbnail": "../../image/hw-sprite.png",
        "description": "在開始重現空洞騎士中的場景與環節前，我們得先準備一下要用到的素材，如同上一篇提到的，我們會借助社群提供的 sprites 來..."
    },
    {
        "file": "category/Hollow-Knight/begin.html",
        "created": "2025-08-17T00:00:00+08:00",
        "title": "空洞騎士重現 - 初衷",
        "category": "Hollow-Knight",
        "tag": "GameMake",
        "thumbnail": "https://gaming-cdn.com/images/products/2198/orig/hollow-knight-pc-mac-game-steam-cover.jpg?v=1705490619",
        "description": "相信不少人小時候都有幻想過要做出自己的遊戲，我也不例外XDD，這次就來學學怎樣製作遊戲吧。但如果只是做做貪食蛇、下樓梯等小遊戲實在無法燃起我對遊戲的熱忱，也沒辦法幫助我深入遊戲製作的精隨，所以打算來學習如何重現一款我非常喜愛的神作: 那便是大名鼎鼎的空洞騎士..."
    },
    {
        "file": "category/Web-Design/RWD.html",
        "created": "2025-08-02T00:00:00+08:00",
        "title": "RWD 響應式網頁設計",
        "category": "Web-Design",
        "tag": "初學筆記, CSS",
        "thumbnail": "https://images.unsplash.com/photo-1640158616235-731aa6b43d38?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        "description": "在此文章中你會學到如何透過 CSS 的 @media 來設計出響應式網頁..."
    },
    {
        "file": "category/Web-Design/Github-Pages.html",
        "created": "2025-07-06T00:00:00+08:00",
        "title": "網頁部署 - Github Pages",
        "category": "Web-Design",
        "tag": "網頁部署, Github",
        "thumbnail": "https://images.unsplash.com/photo-1647166545674-ce28ce93bdca?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        "description": "介紹一下要如何透過 Github Pages 來發布個人網頁。"
    },
    {
        "file": "category/Web-Design/Javascript-Beginner.html",
        "created": "2025-06-21T00:00:00+08:00",
        "title": "Javascript 初學筆記",
        "category": "Web-Design",
        "tag": "初學筆記, Javascript",
        "thumbnail": "https://images.unsplash.com/photo-1518932945647-7a1c969f8be2?q=80&w=2064&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        "description": "要提供使用者動態回饋的話則要仰賴 Javascript，本篇文章簡單介紹一下 Javascript 如何讀取網頁的..."
    },
    {
        "file": "category/Web-Design/CSS-Beginner.html",
        "created": "2025-06-07T00:00:00+08:00",
        "title": "CSS 初學筆記",
        "category": "Web-Design",
        "tag": "初學筆記, CSS",
        "thumbnail": "https://images.unsplash.com/photo-1610986603166-f78428624e76?q=80&w=2658&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        "description": "本篇將會介紹CSS，這個用來美化網頁的語言，如果說HTML是網頁的建材，CSS則是..."
    },
    {
        "file": "category/Web-Design/HTML-Beginner.html",
        "created": "2025-05-11T00:00:00+08:00",
        "title": "HTML 初學筆記",
        "category": "Web-Design",
        "tag": "初學筆記, HTML",
        "thumbnail": "https://images.unsplash.com/photo-1583339793403-3d9b001b6008?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        "description": "本篇會簡短介紹HTML的功用以及關於此網頁的HTML框架，讓各位對於網頁的架構有個初步的理解，並能搭建屬於..."
    }
];

const Categories = {
    "Hollow-Knight": {
        "name": [
            "idle",
            "sprite",
            "begin"
        ],
        "postID": [
            0,
            1,
            2
        ]
    },
    "Web-Design": {
        "name": [
            "RWD",
            "Github-Pages",
            "Javascript-Beginner",
            "CSS-Beginner",
            "HTML-Beginner"
        ],
        "postID": [
            3,
            4,
            5,
            6,
            7
        ]
    }
};

const Tags = {
    "GameMake": {
        "name": [
            "idle",
            "sprite",
            "begin"
        ],
        "postID": [
            0,
            1,
            2
        ]
    },
    "初學筆記": {
        "name": [
            "RWD",
            "Javascript-Beginner",
            "CSS-Beginner",
            "HTML-Beginner"
        ],
        "postID": [
            3,
            5,
            6,
            7
        ]
    },
    "CSS": {
        "name": [
            "RWD",
            "CSS-Beginner"
        ],
        "postID": [
            3,
            6
        ]
    },
    "網頁部署": {
        "name": [
            "Github-Pages"
        ],
        "postID": [
            4
        ]
    },
    "Github": {
        "name": [
            "Github-Pages"
        ],
        "postID": [
            4
        ]
    },
    "Javascript": {
        "name": [
            "Javascript-Beginner"
        ],
        "postID": [
            5
        ]
    },
    "HTML": {
        "name": [
            "HTML-Beginner"
        ],
        "postID": [
            7
        ]
    }
};

export { Posts, Categories, Tags };
