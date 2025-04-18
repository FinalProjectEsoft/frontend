import React from 'react';

const AboutPage: React.FC = () => {
  return (
    <div className="bg-white">
      {/* Hero Section */}
      <div className="relative bg-blue-700">
        <div className="absolute inset-0">
          <img
            className="w-full h-full object-cover"
            src="https://images.pexels.com/photos/2166711/pexels-photo-2166711.jpeg"
            alt="Sri Lanka landscape"
          />
          <div className="absolute inset-0 bg-blue-700 mix-blend-multiply" aria-hidden="true"></div>
        </div>
        <div className="relative max-w-7xl mx-auto py-24 px-4 sm:py-32 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl">About Us</h1>
          <p className="mt-6 text-xl text-indigo-100 max-w-3xl">
            Connecting travelers with authentic Sri Lankan adventures since 2022.
          </p>
        </div>
      </div>

      {/* Mission Section */}
      <div className="relative py-16 bg-white overflow-hidden">
        <div className="relative px-4 sm:px-6 lg:px-8">
          <div className="text-lg max-w-prose mx-auto">
            <h2 className="text-3xl text-center leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
              Our Mission
            </h2>
            <p className="mt-8 text-xl text-gray-500 leading-8">
              At SriLanka Adventures, our mission is to showcase the incredible diversity of adventure tourism in Sri Lanka 
              while supporting local communities and promoting sustainable tourism practices. We believe that travel should 
              be transformative, educational, and beneficial for both travelers and destinations.
            </p>
            <p className="mt-6 text-lg text-gray-500 leading-8">
              We carefully select and vet all our adventure providers to ensure they meet our standards for safety, 
              quality, and environmental responsibility. By connecting travelers directly with local experts, we create 
              authentic experiences that showcase the true spirit of Sri Lanka.
            </p>
          </div>
        </div>
      </div>

      {/* Image Carousel Section */}
      <div className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-extrabold text-gray-900 text-center mb-12">
            Discover Sri Lanka's Beauty
          </h2>
          
          <div className="relative overflow-hidden">
            <div className="flex flex-nowrap overflow-x-auto pb-4 snap-x scrollbar-hide">
              <div className="min-w-full sm:min-w-[50%] lg:min-w-[33.333%] px-2 snap-center">
                <div className="h-64 rounded-lg overflow-hidden">
                  <img 
                    src="https://images.pexels.com/photos/5243594/pexels-photo-5243594.jpeg" 
                    alt="Ella, Sri Lanka" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <p className="mt-2 text-center text-lg font-medium text-gray-900">Ella</p>
              </div>
              <div className="min-w-full sm:min-w-[50%] lg:min-w-[33.333%] px-2 snap-center">
                <div className="h-64 rounded-lg overflow-hidden">
                  <img 
                    src="https://images.pexels.com/photos/4254555/pexels-photo-4254555.jpeg" 
                    alt="Arugam Bay, Sri Lanka" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <p className="mt-2 text-center text-lg font-medium text-gray-900">Arugam Bay</p>
              </div>
              <div className="min-w-full sm:min-w-[50%] lg:min-w-[33.333%] px-2 snap-center">
                <div className="h-64 rounded-lg overflow-hidden">
                  <img 
                    src="https://images.pexels.com/photos/4534200/pexels-photo-4534200.jpeg" 
                    alt="Knuckles Mountain Range, Sri Lanka" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <p className="mt-2 text-center text-lg font-medium text-gray-900">Knuckles Range</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Team Section */}
      <div className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-gray-900">Our Team</h2>
            <p className="mt-4 max-w-2xl text-xl text-gray-500 mx-auto">
              A passionate group of adventure enthusiasts dedicated to showcasing the best of Sri Lanka.
            </p>
          </div>

          <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {/* Team Member 1 */}
            <div className="text-center">
              <div className="mx-auto h-40 w-40 rounded-full overflow-hidden">
                <img
                  src="https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg"
                  alt="Team member"
                  className="h-full w-full object-cover"
                />
              </div>
              <h3 className="mt-6 text-xl font-medium text-gray-900">Sanjay Perera</h3>
              <p className="text-blue-600">Founder & CEO</p>
              <p className="mt-2 text-gray-500 text-sm">
                Born and raised in Sri Lanka with a passion for showcasing the country's natural beauty.
              </p>
            </div>

            {/* Team Member 2 */}
            <div className="text-center">
              <div className="mx-auto h-40 w-40 rounded-full overflow-hidden">
                <img
                  src="https://images.pexels.com/photos/1036623/pexels-photo-1036623.jpeg"
                  alt="Team member"
                  className="h-full w-full object-cover"
                />
              </div>
              <h3 className="mt-6 text-xl font-medium text-gray-900">Amaya Fernando</h3>
              <p className="text-blue-600">Adventure Director</p>
              <p className="mt-2 text-gray-500 text-sm">
                Professional trekking guide with extensive knowledge of Sri Lanka's wilderness.
              </p>
            </div>

            {/* Team Member 3 */}
            <div className="text-center">
              <div className="mx-auto h-40 w-40 rounded-full overflow-hidden">
                <img
                  src="https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg"
                  alt="Team member"
                  className="h-full w-full object-cover"
                />
              </div>
              <h3 className="mt-6 text-xl font-medium text-gray-900">Raj Mehta</h3>
              <p className="text-blue-600">Technology Lead</p>
              <p className="mt-2 text-gray-500 text-sm">
                Ensuring the platform connects travelers and providers seamlessly.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;