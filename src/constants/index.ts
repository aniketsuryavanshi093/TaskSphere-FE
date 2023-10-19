export const dataItems = [
    {
        name: 'Home',
        link: '/dashboard',
        logo: '/images/icons/category.png',
    },
    {
        name: 'Messages',
        link: '/dashboard/messages',
        logo: '/images/icons/message.svg',
    },
    {
        name: 'Tasks',
        link: '/dashboard/tasks',
        logo: '/images/icons/task.svg',
    },
    {
        name: 'Members',
        link: '/dashboard/members',
        logo: '/images/icons/user.svg',
    },
    {
        name: 'Settings',
        link: '/dashboard/setting',
        logo: '/images/icons/setting.svg',
    },
];
export const Administratortype = ["organization", "member"]
export const priority = [{ label: 'low', value: "low", img: "https://jira.solulab.com/images/icons/priorities/low.svg" }, { label: 'medium', value: "medium", img: "https://jira.solulab.com/images/icons/priorities/medium.svg" }, { label: 'high', value: "high", img: "https://jira.solulab.com/images/icons/priorities/highest.svg" }]
export const label = [{ label: 'BE', value: "BE" }, { label: 'FE', value: "FE" }, { label: 'QA', value: "QA" }]

export const initialdata = [
    {
        id: '1',
        Task: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent.',
        // Assigned_To: 'Beltran',
        // Assignee: 'Romona',
        // Status: 'To-do',
        // Priority: 'Low',
        priority: "high",
        label: "FE",
        Due_Date: '25-May-2020',
    },
    {
        id: '2',
        label: "BE",
        Task: 'Fix Styling',
        // Assigned_To: 'Dave',
        // Assignee: 'Romona',
        // Status: 'To-do',
        // Priority: 'Low',
        priority: "low",
        Due_Date: '26-May-2020',
    },
    {
        id: '3',
        label: "QA",
        Task: 'Handle Door Specs',
        // Assigned_To: 'Roman',
        // Assignee: 'Romona',
        // Status: 'To-do',
        priority: "medium",
        // Priority: 'Low',
        Due_Date: '27-May-2020',
    },
    {
        id: '4',
        Task: 'morbi',
        // Assigned_To: 'Gawen',
        label: "FE",
        // Assignee: 'Kai',
        // Status: 'Done',
        // Priority: 'High',
        priority: "low",
        Due_Date: '23-Aug-2020',
    },
    {
        id: '5',
        label: "BE",
        Task: 'proin',
        // Assigned_To: 'Bondon',
        // Assignee: 'Antoinette',
        // Status: 'In Progress',
        priority: "high",
        // Priority: 'Medium',
        Due_Date: '05-Jan-2021',
    },
];
export const ticketfilter = [{
    value: "isforUser",
    label: "Only My Issue"
}, {
    value: "",
    label: "All Tasks"
}, {
    value: "-1",
    label: "Latest issued"
}, {
    value: "1",
    label: "Old issued"
}]
export const columnsFromBackend = {
    1: {
        title: 'To Do',
        color: "#5030E5",
        items: initialdata,
    },
    2: {
        title: 'On Progress',
        items: [],
        color: "#FFA500"
    },
    3: {
        title: 'Done',
        items: [],
        color: "#8BC48A"
    },
};

export const statusoptions = [
    {
        value: 'pending',
        label: "To Do",
        color: "#c1b4ff",
    },
    {
        value: 'progress',
        color: "#ffd280",
        label: "On Progress",
    },
    {
        value: 'done',
        color: "#9fd89e",
        label: "Done",
    }
]