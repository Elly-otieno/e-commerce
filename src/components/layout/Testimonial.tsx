import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Rating from "../general/Rating"; 

const testimonials = [
    {
      id: 1,
      name: "John Doe",
      review: "This product has been a game-changer for me! The quality is top-notch, and the customer service was extremely helpful. I would highly recommend this to anyone looking for a reliable solution.",
      rating: 5,
    },
    {
      id: 2,
      name: "Jane Smith",
      review: "I was hesitant at first, but this exceeded my expectations. The material feels premium, and it arrived earlier than expected. I will definitely be purchasing again in the future!",
      rating: 4,
    },
    {
      id: 3,
      name: "Michael Johnson",
      review: "I've tried similar products before, but nothing comes close to this one. The attention to detail and durability is impressive. A fantastic buy that I highly recommend.",
      rating: 5,
    },
    {
      id: 4,
      name: "Emily Brown",
      review: "Absolutely love this! The design is sleek, and it's so easy to use. I've already told my friends and family about it, and they’re just as excited as I am!",
      rating: 5,
    },
    {
      id: 5,
      name: "David Wilson",
      review: "Good overall, but I wish there were more color options available. That being said, the product itself is well-made and performs exactly as advertised.",
      rating: 3,
    },
    {
      id: 6,
      name: "Sophia Martinez",
      review: "This has quickly become one of my favorite purchases. The functionality is fantastic, and it’s clear that a lot of thought went into making this product great.",
      rating: 5,
    },
  ];

const Testimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1
    );
  };

  return (
    <div className="relative max-w-5xl mx-auto p-6"  data-aos="fade-up">
      <div className="flex overflow-hidden space-x-4 mx-6">
        {testimonials.slice(currentIndex, currentIndex + 3).map((testimonial) => (
          <div key={testimonial.id} className="w-1/3 p-4 bg-white shadow-lg rounded-lg flex flex-col items-center text-center">
            <p className="text-gray-700 italic">"{testimonial.review}"</p>
            <Rating number={testimonial.rating} />
            <p className="font-semibold text-lg mt-2">{testimonial.name}</p>
          </div>
        ))}
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-gray-200 p-2 rounded-full hover:bg-gray-300 "
      >
        <ChevronLeft size={24} />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-gray-200 p-2 rounded-full hover:bg-gray-300"
      >
        <ChevronRight size={24} />
      </button>

      {/* Dots Navigation */}
      <div className="flex justify-center mt-4 space-x-2">
        {Array.from({ length: Math.ceil(testimonials.length / 3) }).map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index * 3)}
            className={`h-3 w-3 rounded-full ${currentIndex === index * 3 ? "bg-gray-800" : "bg-gray-300"}`}
          />
        ))}
      </div>
    </div>
  );
};

export default Testimonials;

