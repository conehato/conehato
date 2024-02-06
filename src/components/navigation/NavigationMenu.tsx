"use client";

import Link from "next/link";

import {
  NavigationMenu as _NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";
import { CategoryEntity } from "@/models";

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
    <div className="flex justify-center bg-slate-200 py-2">
      <_NavigationMenu>
        <NavigationMenuList className="px-4">
          {categories.map((category) => (
            <NavigationMenuItem key={category.id}>
              <Link href={`/${category.href}`} legacyBehavior passHref>
                <NavigationMenuLink
                  className={cn(
                    navigationMenuTriggerStyleWithActive(
                      currentCategoryId === category.id
                    ),
                    "px-2 py-1 h-auto"
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
