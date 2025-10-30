import { motion } from "framer-motion";

export default function FloatingOrbs() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      <motion.div
        className="absolute -top-10 -left-10 w-72 h-72 rounded-full blur-3xl"
        style={{ background: "radial-gradient(closest-side, rgba(255,102,0,.35), transparent)" }}
        animate={{ y: [0, 20, 0], x: [0, 10, 0] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-0 right-0 w-80 h-80 rounded-full blur-3xl"
        style={{ background: "radial-gradient(closest-side, rgba(255,45,85,.30), transparent)" }}
        animate={{ y: [0, -15, 0], x: [0, -10, 0] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 1.2 }}
      />
    </div>
  );
}
