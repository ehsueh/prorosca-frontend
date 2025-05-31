import { motion } from "framer-motion";

function Whale({
  fill = "#2c5282",
  delay = 0,
  positionClass,
}: {
  fill?: string;
  delay?: number;
  positionClass: string;
}) {
  return (
    <motion.div
      className={`absolute ${positionClass} opacity-20 pointer-events-none`}
      animate={{ y: [0, -15, 0], rotate: [0, 5, 0] }}
      transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay }}
      aria-hidden="true"
    >
      <svg viewBox="0 0 120 60" className="w-full h-full" aria-hidden="true">
        {/* Body */}
        <path
          d="M10,30 C20,10 50,5 80,15 C100,22 110,35 95,40 C90,45 60,50 30,45 C20,42 10,35 10,30 Z"
          fill={fill}
          className="drop-shadow-lg"
        />
        {/* Tail */}
        <path d="M95,35 L110,25 L110,45 Z" fill={fill} className="drop-shadow-lg" />
        {/* Fin */}
        <path d="M60,40 L70,50 L50,50 Z" fill={fill} className="drop-shadow" />
        {/* Eye */}
        <circle cx="25" cy="25" r="2" fill="#fff" />
      </svg>
    </motion.div>
  );
}

export function LowPolyScene() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
      {/* Medieval Ship */}
      <motion.div
        className="absolute right-[5%] top-[15%] w-[300px] h-[300px] md:w-[400px] md:h-[400px] opacity-20"
        initial={{ x: 100, opacity: 0 }}
        animate={{ x: 0, opacity: 0.2 }}
        transition={{ duration: 1, delay: 0.5 }}
        aria-hidden="true"
      >
        <svg viewBox="0 0 100 100" className="w-full h-full -rotate-[15deg]">
          {/* Ship Hull */}
          <path d="M20,60 L80,60 L70,80 L30,80 Z" fill="#2a4365" className="drop-shadow-lg" />
          {/* Sails */}
          <path d="M50,20 L50,60 L30,60 Z" fill="#1a365d" className="drop-shadow-lg" />
          <path d="M50,20 L50,60 L70,60 Z" fill="#2a4365" className="drop-shadow-lg" />
          {/* Mast */}
          <rect x="48" y="20" width="4" height="60" fill="#4a5568" />
        </svg>
      </motion.div>

      {/* Whales */}
      <Whale positionClass="left-[10%] bottom-[20%] w-[200px] h-[100px]" delay={0} />
      <Whale positionClass="right-[15%] bottom-[40%] w-[150px] h-[75px]" fill="#3182ce" delay={2} />

      {/* Waves */}
      <div className="absolute inset-0" aria-hidden="true">
        {Array.from({ length: 3 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute inset-0"
            style={{
              background: `radial-gradient(circle at ${50 + i * 20}% ${50 + i * 10}%, rgba(49, 130, 206, 0.1), transparent)`,
            }}
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.1, 0.3],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              delay: i * 2,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      {/* Low-poly texture overlay */}
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 0 L50 50 L100 0 L100 100 L0 100 Z' fill='%23ffffff'/%3E%3C/svg%3E")`,
          backgroundSize: "60px 60px",
        }}
        aria-hidden="true"
      />
    </div>
  );
}
