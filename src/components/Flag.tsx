export default function Flag({ code }: { code: string }) {
  return (
    <img
      src={`/flags/${code}.svg`}
      alt={code}
      className="w-6 h-6 rounded-full shadow-sm"
      draggable="false"
    />
  );
}
