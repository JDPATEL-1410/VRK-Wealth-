import { motion } from 'framer-motion';

interface TimelineStep {
  title: string;
  description: string;
  icon: React.ReactNode;
}

interface ProcessTimelineProps {
  steps: TimelineStep[];
}

export function ProcessTimeline({ steps }: ProcessTimelineProps) {
  return (
    <div className="relative">
      {/* Connection Line */}
      <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-teal-500 via-navy-600 to-teal-500"></div>

      {steps.map((step, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
          viewport={{ once: true }}
          className={`relative flex items-center mb-12 md:mb-16 ${
            index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
          }`}
        >
          {/* Content Card */}
          <div className="flex-1 md:w-1/2">
            <div
              className={`bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow ${
                index % 2 === 0 ? 'md:mr-8' : 'md:ml-8'
              }`}
            >
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-teal-500 to-navy-600 rounded-lg flex items-center justify-center text-white">
                  {step.icon}
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{step.title}</h3>
                  <p className="text-gray-600">{step.description}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Center Circle */}
          <div className="hidden md:flex absolute left-1/2 transform -translate-x-1/2 w-16 h-16 bg-gradient-to-br from-teal-500 to-navy-600 rounded-full items-center justify-center shadow-lg z-10">
            <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center">
              <span className="text-xl font-bold text-navy-900">{index + 1}</span>
            </div>
          </div>

          {/* Mobile Circle */}
          <div className="md:hidden absolute left-0 w-10 h-10 bg-gradient-to-br from-teal-500 to-navy-600 rounded-full flex items-center justify-center shadow-lg">
            <span className="text-white font-bold">{index + 1}</span>
          </div>

          {/* Spacer for alternating layout */}
          <div className="hidden md:block flex-1 md:w-1/2"></div>
        </motion.div>
      ))}
    </div>
  );
}
