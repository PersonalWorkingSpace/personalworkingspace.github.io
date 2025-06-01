const NumberToMonth = {
    1: "Jan",
    2: "Feb",
    3: "Mar",
    4: "Apr",
    5: "May",
    6: "Jun",
    7: "Jul",
    8: "Aug",
    9: "Sep",
    10: "Oct",
    11: "Nov",
    12: "Dec"
}

const Pages = [ // order by created date
    {
        "created": new Date("2025-05-11T00:00:00+08:00"),
        "title": "HTML初學筆記",
        "category": "網頁設計",
        "tag": "初學筆記, HTML",
        "thumbnail": "https://images.unsplash.com/photo-1583339793403-3d9b001b6008?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        "description": "歡迎來到我隨筆記錄學習網頁製作的第一篇文章，本篇會簡短介紹HTML的功用以及關於此網頁的HTML框架，讓各位對於網頁的架構有個初步的理解，並能搭建屬於..."
    },
        {
        "created": new Date("2025-05-11T00:00:00+08:00"),
        "title": "HTML初學筆記",
        "category": "網頁設計",
        "tag": "初學筆記, HTML",
        "thumbnail": "https://images.unsplash.com/photo-1583339793403-3d9b001b6008?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        "description": "歡迎來到我隨筆記錄學習網頁製作的第一篇文章，本篇會簡短介紹HTML的功用以及關於此網頁的HTML框架，讓各位對於網頁的架構有個初步的理解，並能搭建屬於..."
    },
        {
        "created": new Date("2025-05-11T00:00:00+08:00"),
        "title": "HTML初學筆記",
        "category": "網頁設計",
        "tag": "初學筆記, HTML",
        "thumbnail": "https://images.unsplash.com/photo-1583339793403-3d9b001b6008?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        "description": "歡迎來到我隨筆記錄學習網頁製作的第一篇文章，本篇會簡短介紹HTML的功用以及關於此網頁的HTML框架，讓各位對於網頁的架構有個初步的理解，並能搭建屬於..."
    },
    {
        "created": new Date("2025-04-11T00:00:00+08:00"),
        "title": "HTML初學筆記",
        "category": "網頁設計",
        "tag": "初學筆記, HTML",
        "thumbnail": "https://images.unsplash.com/photo-1583339793403-3d9b001b6008?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        "description": "歡迎來到我隨筆記錄學習網頁製作的第一篇文章，本篇會簡短介紹HTML的功用以及關於此網頁的HTML框架，讓各位對於網頁的架構有個初步的理解，並能搭建屬於..."
    },
    {
        "created": new Date("2025-03-11T00:00:00+08:00"),
        "title": "HTML初學筆記",
        "category": "網頁設計",
        "tag": "初學筆記, HTML",
        "thumbnail": "https://images.unsplash.com/photo-1583339793403-3d9b001b6008?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        "description": "歡迎來到我隨筆記錄學習網頁製作的第一篇文章，本篇會簡短介紹HTML的功用以及關於此網頁的HTML框架，讓各位對於網頁的架構有個初步的理解，並能搭建屬於..."
    },
    {
        "created": new Date("2025-02-11T00:00:00+08:00"),
        "title": "HTML初學筆記",
        "category": "網頁設計",
        "tag": "初學筆記, HTML",
        "thumbnail": "https://images.unsplash.com/photo-1583339793403-3d9b001b6008?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        "description": "歡迎來到我隨筆記錄學習網頁製作的第一篇文章，本篇會簡短介紹HTML的功用以及關於此網頁的HTML框架，讓各位對於網頁的架構有個初步的理解，並能搭建屬於..."
    },
    {
        "created": new Date("2025-02-11T00:00:00+08:00"),
        "title": "HTML初學筆記",
        "category": "網頁設計",
        "tag": "初學筆記, HTML",
        "thumbnail": "https://images.unsplash.com/photo-1583339793403-3d9b001b6008?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        "description": "歡迎來到我隨筆記錄學習網頁製作的第一篇文章，本篇會簡短介紹HTML的功用以及關於此網頁的HTML框架，讓各位對於網頁的架構有個初步的理解，並能搭建屬於..."
    },
    {
        "created": new Date("2025-01-11T00:00:00+08:00"),
        "title": "HTML初學筆記",
        "category": "網頁設計",
        "tag": "初學筆記, HTML",
        "thumbnail": "https://images.unsplash.com/photo-1583339793403-3d9b001b6008?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        "description": "歡迎來到我隨筆記錄學習網頁製作的第一篇文章，本篇會簡短介紹HTML的功用以及關於此網頁的HTML框架，讓各位對於網頁的架構有個初步的理解，並能搭建屬於..."
    },
    {
        "created": new Date("2024-09-11T00:00:00+08:00"),
        "title": "HTML初學筆記",
        "category": "網頁設計",
        "tag": "初學筆記, HTML",
        "thumbnail": "https://images.unsplash.com/photo-1583339793403-3d9b001b6008?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        "description": "歡迎來到我隨筆記錄學習網頁製作的第一篇文章，本篇會簡短介紹HTML的功用以及關於此網頁的HTML框架，讓各位對於網頁的架構有個初步的理解，並能搭建屬於..."
    },
];

const Categories = {
    "網頁設計": ["HTML初學筆記.html"],
    "HTML": ["HTML初學筆記.html"],
    "初學筆記": ["HTML初學筆記.html", "2", "3"],
};

const Tags = {
    "初學筆記": ["HTML初學筆記.html"],
    "HTML": ["HTML初學筆記.html"]
};

export { NumberToMonth, Pages, Categories, Tags };