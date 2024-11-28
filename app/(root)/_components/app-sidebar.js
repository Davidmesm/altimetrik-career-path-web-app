import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarSeparator } from '@/components/ui/sidebar'
import { User } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

const AppSidebar = () => {
  return (
    <Sidebar>
        <SidebarHeader>   
            Altimetrik CPS 
        </SidebarHeader>
        <SidebarSeparator/>
        <SidebarContent>
            <SidebarMenu>
                <SidebarMenuItem>
                    <SidebarMenuButton asChild>
                        <Link href={"/"}>
                            <User />
                            <span>Profile</span>
                        </Link>
                    </SidebarMenuButton>
                </SidebarMenuItem>
            </SidebarMenu>
        </SidebarContent>
        <SidebarFooter/>
    </Sidebar>
  )
}

export default AppSidebar