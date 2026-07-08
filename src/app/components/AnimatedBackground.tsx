"use client";

export default function AnimatedBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none -z-10">

      {/* Aurora 1 */}
      <div
        className="absolute rounded-full blur-[200px] opacity-[0.07] animate-aurora"
        style={{
          width: 650,
          height: 650,
          left: "42%",
          top: "35%",
          background:
            "radial-gradient(circle, rgba(34,211,238,0.6), transparent 70%)",
        }}
      />

      {/* Aurora 2 */}
      <div
        className="absolute rounded-full blur-[220px] opacity-[0.05] animate-aurora-slow"
        style={{
          width: 550,
          height: 550,
          right: "-120px",
          bottom: "-120px",
          background:
            "radial-gradient(circle, rgba(124,58,237,0.6), transparent 70%)",
        }}
      />

      {/* Aurora 3 */}
      <div
        className="absolute rounded-full blur-[180px] opacity-[0.04] animate-aurora"
        style={{
          width: 450,
          height: 450,
          left: "-120px",
          top: "10%",
          background:
            "radial-gradient(circle, rgba(37,99,235,0.5), transparent 70%)",
        }}
      />

      {/* Aurora 4 */}
      <div
        className="absolute rounded-full blur-[180px] opacity-[0.03] animate-aurora-slow"
        style={{
          width: 400,
          height: 400,
          right: "20%",
          top: "-80px",
          background:
            "radial-gradient(circle, rgba(34,211,238,0.45), transparent 70%)",
        }}
      />

      {/* Aurora 5 */}
      <div
        className="absolute rounded-full blur-[220px] opacity-[0.04] animate-aurora"
        style={{
          width: 600,
          height: 600,
          left: "10%",
          bottom: "-200px",
          background:
            "radial-gradient(circle, rgba(124,58,237,0.4), transparent 70%)",
        }}
      />
    </div>
  );
}