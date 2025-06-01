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
        "thumbnail": "https://preview.redd.it/3d-printed-gawr-gura-v0-95fe3vmcjbwc1.jpg?width=1080&crop=smart&auto=webp&s=f8b9d6c27451aba92d2f102211bacdf91c88fe94",
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
        "thumbnail": "https://scontent.ftpe3-2.fna.fbcdn.net/v/t39.30808-6/498534979_1270518051743683_2627570062812567176_n.jpg?_nc_cat=103&ccb=1-7&_nc_sid=127cfc&_nc_ohc=nMEHitdJIhUQ7kNvwH0-oS_&_nc_oc=Adl79_GA_wUnupL0Faz25FmIFXuxQIdgPpeX4aHU9C5r8YdhFRjjkV_2gej-1eULzRE&_nc_zt=23&_nc_ht=scontent.ftpe3-2.fna&_nc_gid=sWLmi9oVqLQsuohsFbLU9Q&oh=00_AfKDxfXzknG0v3T0WcsidMc3gDgPnA3ztqwz-CF188c3dw&oe=6842182C",
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