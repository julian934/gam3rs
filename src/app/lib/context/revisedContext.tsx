"use client";

/*
import React, { createContext, useState, useMemo, FC, ReactNode, SetStateAction } from "react";
import { getGames } from "../actions/connections";
import axios from "axios";

export type User = {
  username?: string | null;
  password?: string | null;
  wishlistItems?: any[] | null;
  cartItems?: any[] | null;
  settings?: any[] | null;
  videos?: { fileName: any; assetId: any; tags: any[]; user: any }[] | null;
  livestreams?: { fileName: any; assetId: any; tags: any[]; user: any }[] | null;
  uploadedGames?: { fileName: any; assetId: any; tags: any[]; user: any }[] | null;
  viewedContent?: { fileName: any; assetId: any; tags: any[]; user: any }[] | null;
  urlSet?: string | null;
  blobUrl?: string | null;
  file?: File | null;
  fileSet?: File | null;
};

const initialContext = {
  userCheck: (username: string, password: string) => {},
  getUser: (user?: User | string) => {},
  getUserData: () => {},
  getUserLives: (user?: User) => {},
  getUserVideos: (user?: User) => {},
  getUserGames: (user?: User) => {},
  getUserViews: (user?: User) => {},
  currUserData: () => {},
  userData: null as User | null,
  forumUpdate: (forum?: object) => {},
  infoUpdate: (newData?: object) => {},
  purchaseUpdate: (newData?: object) => {},
  wishlistUpdate: (wishlist?: object) => {},
  urlSet: (file?: string | null) => {},
  currUrl: null as string | null,
  blobUrl: null as string | null,
  file: null as File | null,
  fileSet: (file?: File | null) => {},
};

export const StoreStateContext = createContext<typeof initialContext>(initialContext);

interface StoreStateContextProviderProps {
  children: ReactNode;
}

export const StoreStateContextProvider: FC<StoreStateContextProviderProps> = ({ children }) => {
  const [userData, setUserData] = useState<User | null>(null);
  const [userConf, setUserConf] = useState('');
  const [currUser, setCurrUser] = useState<any>([]);
  const [blobUrl, setBlobUrl] = useState<string | null>(null);
  const [file, setFile] = useState<File | null>(null);

  const fileSet = (file: File | null) => {
    if (file) setFile(file);
  };

  const urlSet = (file: File | null) => {
    if (file) setBlobUrl(URL.createObjectURL(file));
  };

  const userCheck = (username: string, password: string) => {
    const userCheck = username.split(",");
    const passCheck = password.split(",");
    if (userCheck.length > 8 && userCheck.length < 99 && passCheck.length > 8 && passCheck.length < 99) {
      const message = { message: "Successful User" };
      setUserConf(message.message);
      return message;
    }
    return { message: "Invalid User" };
  };

  const getUser = (user?: User | string) => {
    const data = localStorage.getItem("userdata");
    if (data) setUserData(JSON.parse(data));
  };

  const getUserData = async () => {
    const data = localStorage.getItem("userdata");
    if (data) {
      const parsed = await JSON.parse(data);
      setCurrUser(parsed);
    }
    return { message: "Make sure to log in!" };
  };

  const currUserData = async () => currUser ?? { message: "No user selected" };

  const getUserGames = async (user?: User) => {
    if (user?.uploadedGames && user.uploadedGames.length > 0) return { flag: "User Logged In" };
    return { flag: "No logged in user", data: await getGames() };
  };

  const forumUpdate = async (forum?: object) => forum ? axios.post("/api/updates/userForumUpdate", { currData: forum }) : { message: "Invalid data" };
  const infoUpdate = async (newData?: object) => newData ? axios.post("/api/updates/userInfoUpdate", { currData: newData }) : { message: "Invalid Data" };
  const purchaseUpdate = async (purchase?: object) => purchase ? axios.post("/api/updates/userPurchseUpdate", { currPurchase: purchase }) : { message: "Invalid Data" };
  const wishlistUpdate = async (wishlist?: object) => wishlist ? axios.post("/api/updates/userWishListUpdate", { currWishList: wishlist }) : { message: "Invalid Data" };

  // Placeholder empty functions
  const getUserLives = (user?: User) => {};
  const getUserVideos = (user?: User) => {};
  const getUserViews = (user?: User) => {};

  const contextValue = useMemo(
    () => ({
      userData,
      setUserData,
      userCheck,
      getUser,
      getUserData,
      currUserData,
      getUserGames,
      getUserLives,
      getUserVideos,
      getUserViews,
      forumUpdate,
      infoUpdate,
      purchaseUpdate,
      wishlistUpdate,
      urlSet,
      blobUrl,
      fileSet,
      file,
      currUrl: null,
    }),
    [userData, blobUrl, file, currUser]
  );

  return <StoreStateContext.Provider value={contextValue}>{children}</StoreStateContext.Provider>;
};

export default StoreStateContextProvider;
*/
