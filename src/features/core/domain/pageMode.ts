export const PAGE_MODE = {
  new: "new",
  edit: "edit",
  view: "view",
} as const;

export type PageMode = keyof typeof PAGE_MODE;
