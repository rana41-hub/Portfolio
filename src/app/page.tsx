import HomeClient from "@/components/HomeClient";
import { getSequenceMetadata } from "@/utils/sequence";

export default function Home() {
  const metadata = getSequenceMetadata();
  return <HomeClient sequenceMeta={metadata} />;
}
