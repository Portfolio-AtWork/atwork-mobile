import { StatusBar } from "expo-status-bar";

import { Routes } from "./routes";

import "./global.css";

export default function App() {
  return (
    <>
      <Routes />
      <StatusBar style="auto" />
    </>
  );
}
