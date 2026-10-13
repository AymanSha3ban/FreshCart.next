import slider from "@/assets/images/slider-2.jpeg";
import Image from "next/image";

export default function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <div className="relative w-full h-75 md:h-100 overflow-hidden">
        <Image
          src={slider}
          alt="SLIDER"
          fill
          priority
          className="object-cover"
        />
      </div>

      {children}
    </div>
  );
}