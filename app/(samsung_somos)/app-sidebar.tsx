"use client";
import Link from "next/link";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { usePathname } from "next/navigation";
import { useMemo } from "react";
import { menuItemList } from "@/lib/helpers/menuList";

export function AppSidebar() {
  const pathname = usePathname();
  const groups = useMemo(() => {
    const map = new Map<number, { groupName: string; items: typeof menuItemList }>();
    menuItemList.forEach((item) => {
      const entry = map.get(item.groupId) || { groupName: item.groupName, items: [] };
      entry.items.push(item);
      map.set(item.groupId, entry);
    });
    return Array.from(map.entries())
      .map(([groupId, v]) => ({ groupId, groupName: v.groupName, items: v.items.sort((a, b) => a.seq - b.seq) }))
      .sort((a, b) => a.groupId - b.groupId);
  }, []);

  return (
    <Sidebar>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>SAMSUNG SOMOS</SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        {groups.map((g) => (
          <SidebarGroup key={g.groupId} title={g.groupName}>
            <SidebarGroupLabel>{g.groupName}</SidebarGroupLabel>
            <SidebarMenu>
              {g.items.map((item) => (
                <SidebarMenuItem key={item.menuUrl}>
                  <SidebarMenuButton asChild isActive={pathname === item.menuUrl}>
                    <Link href={item.menuUrl}>{item.menuName}</Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroup>
        ))}
      </SidebarContent>
    </Sidebar>
  );
}
