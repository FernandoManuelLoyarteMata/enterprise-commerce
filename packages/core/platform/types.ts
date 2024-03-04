export interface PlatformMenu {
  items: { title: string; url: string }[]
}

export interface PlatformProduct {
  id: string
  handle: string
  title: string
  description: string
  descriptionHtml: string
  options: PlatformProductOptions[]
  priceRange: PlatformPriceRange
  variants: PlatformVariant[]
  featuredImage: PlatformImage | undefined | null
  images: PlatformImage[]
  tags: string[]
  vendor: string
  minPrice: number
  updatedAt: string
  createdAt: string
  updatedAtTimestamp: number
  createdAtTimestamp: number
  flatOptions: Record<string, string[]>
  collections: PlatformCollection[]
  seo: {
    description?: string | null | undefined
    title?: string | null | undefined
  }
}

export interface PlatformProductOptions {
  id: string
  name: string
  values: string[]
}

export interface PlatformCollection {
  handle: string
  title: string
  description: string
  updatedAt: string
}

export interface PlatformPriceRange {
  maxVariantPrice: PlatformPrice
  minVariantPrice: PlatformPrice
}

export interface PlatformVariant {
  id: string
  title: string
  quantityAvailable?: number | null | undefined
  availableForSale: boolean
  selectedOptions: {
    name: string
    value: string
  }[]
  price: PlatformPrice
}

export interface PlatformImage {
  url: string
  altText?: string | undefined | null
  width?: number | undefined | null
  height?: number | undefined | null
}

export interface PlatformPage {
  id: string
  title: string
  handle: string
  body: any
  bodySummary: string
  createdAt: any
  updatedAt: any
  seo?:
    | {
        description?: string | null | undefined
        title?: string | null | undefined
      }
    | undefined
    | null
}

export interface PlatformProductStatus {
  status: "ACTIVE" | "ARCHIVED" | "DRAFT"
}

export interface PlatformCart {
  id: string
  checkoutUrl: string
  cost: {
    subtotalAmount?: PlatformPrice | null | undefined
    totalAmount?: PlatformPrice | null | undefined
    totalTaxAmount?: PlatformPrice | null | undefined
  }
  items: PlatformCartItem[]
  totalQuantity: number
}

export interface PlatformCartItem {
  id: string
  cost: { totalAmount?: PlatformPrice | null | undefined }
  quantity: number
  merchandise: Omit<PlatformVariant, "availableForSale" | "title"> & { product: PlatformProduct }
}

export interface PlatformItemInput {
  id?: string
  merchandiseId: string
  attributes?: Record<string, string>
  quantity: number
  sellingPlanId?: string
}

export interface PlatformPrice {
  amount: string
  currencyCode: string
}