import { IMenuItem } from "@/types/samsung-somos/menu-items-type";

export const menuItemList: IMenuItem[] = [
  {
    groupId:1,
    groupName: "Outgoing Quality",
    menuName: "outgoing-quality-master",
    menuUrl: "/outgoing-quality-master",
    seq: 1,
  },
  {
    groupId:1,
    groupName: "Outgoing Quality",
    menuName: "outgoing-quality-detail",
    menuUrl: "/outgoing-quality-detail",
    seq: 2,
  },
  {
    groupId:1,
    groupName: "Outgoing Quality",
    menuName: "outgoing-quality-countermeasure",
    menuUrl: "/outgoing-quality-countermeasure",
    seq: 3,
  },
  {
    groupId:2,
    groupName: "Process Quality",
    menuName: "process-quality",
    menuUrl: "/process-quality",
    seq: 4,
  },
  {
    groupId:3,
    groupName: "Master Data",
    menuName: "product-info",
    menuUrl: "/product-info",
    seq: 5,
  },
];