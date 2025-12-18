import { motion, useScroll, useTransform } from "motion/react";
import {
  Wallet,
  TrendingUp,
  BarChart3,
  Plus,
  Eye,
  CheckCircle,
  Edit,
  Database,
  Zap,
  Shield,
} from "lucide-react";

export default function Home({ onGoToDashboard, onAddLoan }) {
  const { scrollYProgress } = useScroll();
  const heroY = useTransform(scrollYProgress, [0, 0.3], [0, 100]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0]);

  return (
    <div className="bg-white overflow-hidden">
      {/* HERO SECTION */}
      <section className="relative min-h-screen flex items-center bg-white overflow-hidden ">
        {/* Soft radial background */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_left,rgba(59,130,246,0.08),transparent_45%),radial-gradient(circle_at_right,rgba(34,197,94,0.12),transparent_45%)]" />

        <div className="relative z-10 max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* LEFT */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="inline-flex items-center px-5 py-2 rounded-full bg-blue-50 text-blue-600 text-sm mb-6">
              Smart Fintech Solution
            </span>

            <h1 className="text-[42px] leading-tight font-semibold text-gray-900 mb-6">
              Manage Loans. <br />
              Track Payments. <br />
              Stay in Control.
            </h1>

            <p className="text-gray-600 max-w-xl mb-10">
              LoanLog is a smart loan tracking application that helps users manage loans,
              monitor payments, and view balances effortlessly. Built for simplicity and efficiency.
            </p>

            <div className="flex gap-6">
              <motion.button
                onClick={onGoToDashboard}
                whileHover={{ scale: 1.05 }}
                className="px-10 py-4 rounded-full bg-green-500 text-white shadow-[0_15px_40px_rgba(34,197,94,0.35)]"
              >
                Get Started
              </motion.button>

              <motion.button
                onClick={onGoToDashboard}
                whileHover={{ scale: 1.05 }}
                className="px-10 py-4 rounded-full border-2 border-blue-500 text-blue-600"
              >
                View Dashboard
              </motion.button>
            </div>
          </motion.div>

          {/* RIGHT CARD */}
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="relative"
          >
            {/* Floating check */}
            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 3, repeat: Infinity }}
              className="absolute -top-6 -right-6 w-14 h-14 bg-green-500 rounded-2xl flex items-center justify-center shadow-xl"
            >
              <CheckCircle className="text-white" />
            </motion.div>

            {/* Dashboard Card */}
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              className="bg-white rounded-3xl p-8 shadow-[0_40px_80px_rgba(0,0,0,0.12)]"
            >
              <div className="grid grid-cols-3 gap-6 mb-8">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="rounded-2xl bg-green-50 p-4">
                    <div className="h-2 w-16 bg-blue-300 rounded mb-3" />
                    <div className="h-4 w-20 bg-green-400 rounded-full" />
                  </div>
                ))}
              </div>

              {[1, 2, 3].map((i) => (
                <div key={i} className="h-4 bg-gray-200 rounded-full mb-4" />
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-center text-3xl font-semibold mb-12">How LoanLog Works</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <StepCard number="01" title="Add Loan" description="Enter loan details" icon={<Plus />} />
            <StepCard number="02" title="Track Payments" description="Monitor EMI and balance" icon={<TrendingUp />} />
            <StepCard number="03" title="View Status" description="Check loan progress" icon={<Eye />} />
            <StepCard number="04" title="Manage Records" description="Edit or delete loans" icon={<Edit />} />
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section className="py-24 bg-gradient-to-b from-slate-50 to-white">
        <div className="max-w-7xl mx-auto px-6">
          {/* Section Heading */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl font-semibold text-gray-900 mb-4">Powerful Features</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Everything you need to manage loans efficiently with a modern SaaS experience
            </p>
          </motion.div>

          {/* Feature Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            <FeatureCard
              title="Loan Management"
              description="Add, edit, and delete loans with an intuitive interface"
              icon={<Wallet />}
              gradient="from-blue-500 to-blue-600"
              delay={0.1}
            />
            <FeatureCard
              title="Payment Tracking"
              description="Monitor all payments and remaining balances in real-time"
              icon={<CheckCircle />}
              gradient="from-green-500 to-green-600"
              delay={0.2}
            />
            <FeatureCard
              title="Clear Dashboard"
              description="View comprehensive statistics and loan overview at a glance"
              icon={<BarChart3 />}
              gradient="from-cyan-500 to-blue-500"
              delay={0.3}
            />
            <FeatureCard
              title="Simple CRUD"
              description="Create, read, update, and delete operations made easy"
              icon={<Database />}
              gradient="from-emerald-500 to-green-500"
              delay={0.4}
            />
            <FeatureCard
              title="Fast Performance"
              description="Built with React for lightning-fast user experience"
              icon={<Zap />}
              gradient="from-indigo-500 to-blue-500"
              delay={0.5}
            />
            <FeatureCard
              title="Secure & Reliable"
              description="Your loan data is stored securely and reliably"
              icon={<Shield />}
              gradient="from-teal-500 to-emerald-500"
              delay={0.6}
            />
          </div>
        </div>
      </section>

      {/* CTA */}
    </div>
  );
}

/* ================= COMPONENTS ================= */

function StepCard({ number, title, description, icon }) {
  return (
    <motion.div
      className="bg-white rounded-3xl p-6 shadow-lg text-center"
      whileHover={{ y: -10 }}
    >
      <div className="text-blue-200 mb-4">{number}</div>
      <div className="w-14 h-14 mx-auto bg-blue-100 rounded-2xl flex items-center justify-center mb-4">
        {icon}
      </div>
      <h3 className="mb-2 font-semibold">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </motion.div>
  );
}

function FeatureCard({ title, description, icon, gradient, delay = 0 }) {
  return (
    <motion.div
      className="bg-white rounded-3xl p-8 shadow-lg"
      whileHover={{ y: -10 }}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
    >
      <div
        className={`w-16 h-16 bg-gradient-to-br ${gradient} text-white rounded-2xl flex items-center justify-center mb-6`}
      >
        {icon}
      </div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </motion.div>
  );
}
