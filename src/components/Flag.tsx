import React from "react";

export default function Flag({ code }: { code: string }) {
  return (
<img
  src={`/flags/${code}.png`}
  alt={code}
  className="w-7 h-auto rounded-[4px] shadow-sm block"
/>



  );
}
