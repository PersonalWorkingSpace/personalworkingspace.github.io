const Pages = [
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
    "Web-Design": {
        "name": [
            "Github-Pages",
            "Javascript-Beginner",
            "CSS-Beginner",
            "HTML-Beginner"
        ],
        "pageID": [
            0,
            1,
            2,
            3
        ]
    }
};

const Tags = {
    "網頁部署": {
        "name": [
            "Github-Pages"
        ],
        "pageID": [
            0
        ]
    },
    "Github": {
        "name": [
            "Github-Pages"
        ],
        "pageID": [
            0
        ]
    },
    "初學筆記": {
        "name": [
            "Javascript-Beginner",
            "CSS-Beginner",
            "HTML-Beginner"
        ],
        "pageID": [
            1,
            2,
            3
        ]
    },
    "Javascript": {
        "name": [
            "Javascript-Beginner"
        ],
        "pageID": [
            1
        ]
    },
    "CSS": {
        "name": [
            "CSS-Beginner"
        ],
        "pageID": [
            2
        ]
    },
    "HTML": {
        "name": [
            "HTML-Beginner"
        ],
        "pageID": [
            3
        ]
    }
};

export { Pages, Categories, Tags };
