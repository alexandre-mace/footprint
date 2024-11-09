import Image from "next/image";
import { useEffect, useState } from "react";

const Loader = () => {
  const [doDisplayEmoji, setDoDisplayEmoji] = useState(false);
  useEffect(() => {
    setTimeout(() => {
      setDoDisplayEmoji(true);
    }, 0);
  }, []);
  return (
    <div
      className={
        "absolute left-0 top-0 z-10 flex h-screen w-screen items-center justify-center overflow-hidden bg-project-bg"
      }
    >
      <div className="horizontal-scroll-infinite flex gap-10">
        {Array.from(Array(100).keys()).map((item, key) => (
          <div
            key={key}
            className={`shrink-0 transition-all ${doDisplayEmoji ? "opacity-100" : "opacity-0"}`}
          >
            <Image
              height={40}
              width={40}
              className={"h-10 w-auto"}
              src="https://em-content.zobj.net/thumbs/120/apple/285/foot_1f9b6.png"
              alt="Emoji pied vu de dessous"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Loader;
