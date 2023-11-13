"use client";

import Link from "next/link";

import {
  NavigationMenu as _NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { CategoryEntity } from "@/models";
import { cn } from "@/lib/utils";

export interface NavigationMenuProps {
  categories: CategoryEntity[];
  currentCategoryId?: string;
}
export function NavigationMenu({
  categories,
  currentCategoryId,
}: NavigationMenuProps) {
  const navigationMenuTriggerStyleWithActive = (active: boolean) =>
    cn(navigationMenuTriggerStyle(), active ? "bg-blue-900" : "");

  return (
    <div className="flex bg-slate-100 py-2">
      <_NavigationMenu>
        <NavigationMenuList>
          {categories.map((category) => (
            <NavigationMenuItem key={category.id}>
              <Link href={`/${category.id}`} legacyBehavior passHref>
                <NavigationMenuLink
                  className={navigationMenuTriggerStyleWithActive(
                    currentCategoryId === category.id
                  )}
                >
                  {category.name}
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
          ))}
        </NavigationMenuList>
      </_NavigationMenu>
    </div>
  );
}
