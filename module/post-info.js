const Posts = [
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
    "Web-Design": {
        "name": [
            "RWD",
            "Github-Pages",
            "Javascript-Beginner",
            "CSS-Beginner",
            "HTML-Beginner"
        ],
        "postID": [
            0,
            1,
            2,
            3,
            4
        ]
    }
};

const Tags = {
    "初學筆記": {
        "name": [
            "RWD",
            "Javascript-Beginner",
            "CSS-Beginner",
            "HTML-Beginner"
        ],
        "postID": [
            0,
            2,
            3,
            4
        ]
    },
    "CSS": {
        "name": [
            "RWD",
            "CSS-Beginner"
        ],
        "postID": [
            0,
            3
        ]
    },
    "網頁部署": {
        "name": [
            "Github-Pages"
        ],
        "postID": [
            1
        ]
    },
    "Github": {
        "name": [
            "Github-Pages"
        ],
        "postID": [
            1
        ]
    },
    "Javascript": {
        "name": [
            "Javascript-Beginner"
        ],
        "postID": [
            2
        ]
    },
    "HTML": {
        "name": [
            "HTML-Beginner"
        ],
        "postID": [
            4
        ]
    }
};

export { Posts, Categories, Tags };
