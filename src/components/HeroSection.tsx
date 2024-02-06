// components/HeroSection.tsx
import Image from "next/image";
import React from "react";

interface HeroSectionProps {
  title: string;
  description: string;
  imageUrl: string;
}

const HeroSection: React.FC<HeroSectionProps> = ({
  title,
  description,
  imageUrl,
}) => {
  return (
    <div className="w-full bg-[#F2EAD3] pt-20 md:pt-0">
      <div className="md:flex items-center">
        <div className="text-black text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-4 mx-6">{title}</h1>
          <p className="text-lg md:text-2xl mb-8 mx-10 md:mx-20">
            {description}
          </p>
          {/* Add any additional elements or buttons as needed */}
        </div>
        <div className="mx-auto">
          <Image
            src={imageUrl}
            alt="Hero Image"
            className="object-cover w-full"
            width={400}
            height={200}
          />
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
