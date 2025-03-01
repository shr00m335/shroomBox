import { atom } from "jotai";

export enum AppRoutes {
  Inbox,
  EmailManager,
}

export const currentRouteAtom = atom<AppRoutes>(AppRoutes.Inbox);
