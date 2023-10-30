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

export interface NavigationMenuProps {
  categories: CategoryEntity[];
}
export function NavigationMenu({ categories }: NavigationMenuProps) {
  return (
    <div className="flex overflow-x-auto pb-2">
      <_NavigationMenu>
        <NavigationMenuList>
          {categories.map((category) => (
            <NavigationMenuItem key={category.id}>
              <Link href={`/${category.id}`} legacyBehavior passHref>
                <NavigationMenuLink className={navigationMenuTriggerStyle()}>
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
