import {
  HomeOutlined,
  AccountTreeOutlined,
  NotificationsNoneOutlined,
  SupervisorAccountOutlined,
  AccountCircleOutlined,
} from "@material-ui/icons";

export const SUCs = ["Main", "Bustos", "Hagonoy", "Meneses"];

export const colleges = ["COE", "COED", "CHTM", "CIT", "CICT", "CBA", "CS", "CSER", "CSSP", "CAL", "CAFA", "CCJE", "CON"];

export const accountTypes = ["Admin", "Client"];

export const menuItems = [
  {
    text: "Dashboard",
    icon: <HomeOutlined />,
    path: "/dashboard",
    for: ["Admin", "Client"],
  },
  {
    text: "Projects",
    icon: <AccountTreeOutlined />,
    path: "/projects",
    for: ["Admin", "Client"],
  },
  {
    text: "Notifications",
    icon: <NotificationsNoneOutlined />,
    path: "/notifications",
    for: ["Admin", "Client"],
  },
  {
    text: "Accounts",
    icon: <SupervisorAccountOutlined />,
    path: "/accounts",
    for: ["Admin"],
  },
  {
    text: "My Account",
    icon: <AccountCircleOutlined />,
    path: "/myaccount",
    for: ["Admin", "Client"],
  },
];
