import {
  Calendar,
  Car,
  Home,
  Inbox,
  Menu,
  Search,
  Settings,
} from "lucide-react";
import Link from "next/link"; // Import Link from react-router-dom
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { useRouter } from "next/router";

// Menu items.
const items = [
  {
    title: "Food Menu",
    url: "/food-menu", // Adjust URL to be a valid route
    icon: Menu,
  },
  {
    title: "Orders",
    url: "admin/order", // Adjust URL to be a valid route
    icon: Car,
  },
  {
    title: "Settings",
    url: "/settings", // Adjust URL to be a valid route
    icon: Settings,
  },
];

export function AppSidebar() {
  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Application</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <Link href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
