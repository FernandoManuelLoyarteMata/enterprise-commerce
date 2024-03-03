"use client"

import { useWindowSize } from "@uidotdev/usehooks"
import { Skeleton } from "components/Skeleton"
import type { CategoriesDistribution } from "meilisearch"
import dynamic from "next/dynamic"
import { cn } from "utils/cn"

interface FacetsDesktopProps {
  facetDistribution: Record<string, CategoriesDistribution> | undefined
  className?: string
}

const FacetsContent = dynamic(() => import("views/Search/FacetsContent").then((m) => m.FacetsContent), { loading: FacetsContentSkeleton })

export function FacetsDesktop({ facetDistribution, className }: FacetsDesktopProps) {
  const { width = 0 } = useWindowSize()
  const isMobile = width! < 1024 && !!width

  return isMobile ? null : <FacetsContent facetDistribution={facetDistribution} className={cn(className, "sticky top-20 h-full")} />
}

function FacetsContentSkeleton() {
  return (
    <div className="hidden flex-col gap-0 md:mt-16 md:flex">
      <Skeleton className="mb-6 flex h-[35px] min-w-[250px] md:block" />
      <Skeleton className="flex h-[400px] min-w-[250px] md:block" />
    </div>
  )
}