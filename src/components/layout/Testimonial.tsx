import React, { useState, useEffect, useRef } from 'react';
import { Star } from 'lucide-react';
import { Product } from '../../types/types';

const Testimonials: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [testimonials, setTestimonials] = useState<any[]>([]); // Array to hold testimonials
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const testimonialsToShow = 3; // Number of testimonials to show at a time
  const intervalRef = useRef(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('https://fakestoreapi.com/products');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data: Product[] = await response.json();
        setProducts(data);

        // Generate testimonials based on fetched products
        const generatedTestimonials = data.map((product) => ({
          name: `Customer ${Math.floor(Math.random() * 1000)}`, // Random customer name
          review: generateReview(product),
          rating: Math.floor(product.rating.rate), // Use product rating or generate random
          product: product.title // Associate with the product
        }));
        setTestimonials(generatedTestimonials);

      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  const generateReview = (product: Product): string => {
    const reviews = [
      `I'm absolutely in love with the ${product.title}! It's even better than I expected.`,
      `The ${product.title} is a great value for the price. I'm very happy with my purchase.`,
      `I've been using the ${product.title} for a few weeks now, and it's been fantastic. Highly recommend it!`,
      `The quality of the ${product.title} is top-notch. I can tell it's built to last.`,
      `This ${product.title} has made my life so much easier. I can't imagine going back to my old one.`,
      `I was hesitant at first, but the ${product.title} has exceeded all my expectations.`,
      `The customer service was excellent when I had a question about the ${product.title}.`,
      `I'm already planning to buy another ${product.title} as a gift for my friend.`,
      `The design of the ${product.title} is sleek and modern. It looks great!`,
      `I'm not usually one to write reviews, but the ${product.title} is so good, I had to share my experience.`,
    ];
    return reviews[Math.floor(Math.random() * reviews.length)];
  };

  useEffect(() => {
    // Set up auto-scrolling
    intervalRef.current = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000); // Adjust interval duration as needed (e.g., 5000 for 5 seconds)

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current); // Clear interval on unmount
      }
    };
  }, [testimonials]);

  const handleNextTestimonial = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current); // Stop auto-scroll on manual navigation
    }
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    intervalRef.current = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);
  };

  const handlePrevTestimonial = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current); // Stop auto-scroll on manual navigation
    }
    setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length);
    intervalRef.current = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);
  };

  const renderStars = (rating: number) => {
    const stars = [];
    for (let i = 0; i < 5; i++) {
      stars.push(
        <Star
          key={i}
          className={`h-5 w-5 ${i < rating ? "text-yellow-400" : "text-gray-400"}`}
        />
      );
    }
    return stars;
  };

  if (testimonials.length === 0) {
    return <div>Loading testimonials...</div>;
  }


return (
    <div className="bg-gray-100 py-12 px-6 md:px-12 lg:px-24">
      <div className="container mx-auto">
        <h2 className="text-3xl font-bold mb-8 text-center">Testimonials</h2>
        <div className="relative">
          <div className="bg-white rounded-lg shadow-md p-8 text-center flex flex-row space-x-4"> {/* Flex row container */}
            {testimonials
              .slice(currentTestimonial, currentTestimonial + testimonialsToShow)
              .map((testimonial, index) => (
                <div key={index} className="w-1/3"> {/* Individual testimonial div with width */}
                  <p className="text-lg mb-4 italic">"{testimonial.review}"</p>
                  <div className="flex items-center justify-center mb-4">
                    {renderStars(testimonial.rating)}
                  </div>
                  <p className="text-gray-600 font-medium">
                    - {testimonial.name} ({testimonial.product})
                  </p>
                </div>
              ))}
          </div>

          {/* Navigation Buttons */}
          <div className="absolute top-1/2 -translate-y-1/2 w-full flex justify-between px-4">
            <button
              onClick={handlePrevTestimonial}
              className="bg-gray-200 rounded-full p-2 hover:bg-gray-300"
            >
              &lt;
            </button>
            <button
              onClick={handleNextTestimonial}
              className="bg-gray-200 rounded-full p-2 hover:bg-gray-300"
            >
              &gt;
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Testimonials;