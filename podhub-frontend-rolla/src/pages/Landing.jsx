import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { SAMPLE_IMAGES } from "../assets/images";
import Navbar from "../components/common/Navbar";
import Footer from "../components/common/Footer";

const containerVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      damping: 10,
      stiffness: 100,
      staggerChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

function Landing() {
  return (
    <div className="w-full min-h-screen flex flex-col">
      {/* ✅ Responsive Navbar */}
      <Navbar />

      {/* Hero Section */}
      <section
        id="home"
        className="relative bg-gradient-to-r from-indigo-900 via-purple-800 to-indigo-900 text-white py-16 sm:py-24 md:py-32 lg:py-40 transition-all duration-700"
      >
        <div className="absolute inset-0 bg-black/40 pointer-events-none"></div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center z-10">
          <motion.h1
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold mb-6 drop-shadow-2xl text-yellow-300"
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: "spring", damping: 8, stiffness: 100 }}
          >
            PodHub: Your Daily Dose of Inspiration, In 3-Minute Bites 
          </motion.h1>

          <motion.p
            className="max-w-2xl mx-auto mb-10 text-base sm:text-lg md:text-xl text-gray-200 drop-shadow-lg px-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 1 }}
          >
            Binge-watch your favorite topics with bite-sized episodes. PodHub
            offers short-form podcasts on education, entertainment, personal
            growth, and more.
          </motion.p>

          {/* ✅ Single CTA Button */}
          <motion.div
            className="flex justify-center"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.5 }}
          >
         <Link
  to="/register"
  className="px-8 py-3 sm:px-10 sm:py-4 rounded-full bg-blue-600 text-white font-semibold shadow-md
  hover:bg-blue-700 hover:shadow-lg transition-all duration-300 ease-in-out text-sm sm:text-base"
>
  Get Started
</Link>

          </motion.div>
        </div>
      </section>

      {/* About Section */}
      <section
        id="about"
        className="py-16 sm:py-20 md:py-24 lg:py-28 bg-gray-50 dark:bg-gray-900 transition-all duration-700"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.h2
            className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-12 text-gray-800 dark:text-gray-100"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            Why PodHub? It’s All About You.
          </motion.h2>

          <motion.div
            className="grid gap-8 sm:gap-10 md:gap-12 sm:grid-cols-2 lg:grid-cols-3"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.4 }}
          >
            {[
              {
                title: "Bite-Sized Lessons",
                description:
                  "Learn something new in the time it takes to brew coffee. Perfect for busy schedules.",
              },
              {
                title: "Diverse Topics",
                description:
                  "From tech insights to mental wellness, our library is packed with content for every interest.",
              },
              {
                title: "Expert Voices",
                description:
                  "We collaborate with industry leaders and passionate creators to bring you authentic stories and knowledge.",
              },
            ].map((feature, i) => (
              <motion.div
                key={i}
                className="rounded-2xl shadow-xl overflow-hidden bg-white dark:bg-gray-800 p-6 flex flex-col items-center justify-center text-center
                transform hover:scale-105 transition-all duration-300 group"
                variants={itemVariants}
                whileHover={{ y: -10 }}
              >
                <img
                  src={SAMPLE_IMAGES[i]}
                  alt={`Feature ${i + 1}`}
                  className="h-32 sm:h-40 w-full object-cover rounded-xl mb-4 opacity-80 group-hover:opacity-100 transition-opacity"
                />
                <h3 className="font-bold text-lg sm:text-xl text-purple-700 dark:text-purple-300 mb-2">
                  {feature.title}
                </h3>
                <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
        <Footer />
    </div>
  );
}

export default Landing;
