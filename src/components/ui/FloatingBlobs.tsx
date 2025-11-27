import React from "react";

export default function FloatingBlobs() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden -z-10">
      <div className="blob blob-1" />
      <div className="blob blob-2" />
      <div className="blob blob-3" />
    </div>
  );
}
