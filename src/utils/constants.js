import {
  HomeOutlined,
  AccountTreeOutlined,
  NotificationsNoneOutlined,
  SupervisorAccountOutlined,
} from "@material-ui/icons";

export const SUCs = ["Main", "Bustos", "Hagonoy", "Meneses"];

export const colleges = ["COE", "CON", "CSSP", "CAFA", "CS", "COED"];

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
];
