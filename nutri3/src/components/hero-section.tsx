import Image from 'next/image';

export default function HeroSection() {
  return (
    <div className=" pt-[20px] md:pt-[30px] lg:pt-[60px] pb-[5px] md:pb-[25px] flex flex-col items-center justify-center text-center px-4">
        
      <Image
        src="/NutriKnowLetters.png" // Corrected path
        width={300}    // Desired width
        height={150}   // Desired height
        alt="Description"
        className="mb-4" // Alt text for accessibility
      />
      <h1 className="text-md md:text-xl lg:text-4xl font-bold mt-3 mb-3 leading-snug  max-w-4xl mt-2">
        Descentralized Food Reporting - Empowering Your Healthy Choices
      </h1>
     
      <p className="text-md md:text-lg lg:text-xl leading-snug max-w-4xl">
        Scan the barcode from a product, introduce your personal profile and get personalized assestment from an AI trained directly by nutricionists. 
      </p>
    </div>
  )
}
