import HomeClient from "@/components/HomeClient";
import { getSequenceMetadata } from "@/utils/sequence";

export default async function Home() {
  const metadata = await getSequenceMetadata();
  return <HomeClient sequenceMeta={metadata} />;
}
