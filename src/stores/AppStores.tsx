import { atom } from "jotai";

export enum AppRoutes {
  Inbox,
  EmailManager,
  TempMail,
}

export const currentRouteAtom = atom<AppRoutes>(AppRoutes.Inbox);
