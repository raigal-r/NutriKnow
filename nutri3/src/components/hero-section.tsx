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
        Scan, Understand, Thrive - Empowering Your Healthy Choices
      </h1>
      <p className="mb-2 md:mb-12 text-md md:text-lg lg:text-xl leading-snug max-w-4xl">
      NutriKnow utilizes advanced AI to translate expert nutritional guidelines into personalized, healthy food choices. Nutritionists set the standards for what iss healthy, and our AI applies these criteria to guide your daily eating decisions.
      </p>
      <Image
          src="/NutriKnow.png" // Corrected path
          width={500}    // Desired width
          height={300}   // Desired heights
          alt="Description" // Alt text for accessibility
        />
    </div>
  )
}
