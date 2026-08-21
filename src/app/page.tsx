import HomeClient from "@/components/HomeClient";
import { preload } from "react-dom";

export default function Home() {
  preload("/optimized-hero.mp4", { as: "video", fetchPriority: "high" });

  return <HomeClient />;
}
