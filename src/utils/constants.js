import {
  HomeOutlined,
  AccountTreeOutlined,
  NotificationsNoneOutlined,
  SupervisorAccountOutlined,
} from "@material-ui/icons";

export const SUCs = ["Main", "Bustos", "Hagonoy", "Meneses"];

export const colleges = ["COE", "CON", "CSSP", "CAFA", "CS", "COED"];

export const menuItems = [
  {
    text: "Dashboard",
    icon: <HomeOutlined />,
    path: "/dashboard",
    for: "",
  },
  {
    text: "Projects",
    icon: <AccountTreeOutlined />,
    path: "/projects",
    for: "",
  },
  {
    text: "Notifications",
    icon: <NotificationsNoneOutlined />,
    path: "/notifications",
    for: "",
  },
  {
    text: "Accounts",
    icon: <SupervisorAccountOutlined />,
    path: "/accounts",
    for: "",
  },
];
