import { Text } from "@/components/atoms/Text";
import { Icon } from "@/components/atoms/Icon";

type DateTimeBlockProps = {
  date: string;
  time: string;
  className?: string;
};

export function DateTimeBlock({
  date,
  time,
  className = "",
}: DateTimeBlockProps) {
  return (
    <div
      className={`flex flex-col items-center gap-1 ${className}`}
      role="group"
      aria-label="Fecha y hora"
    >
      <div className="flex items-center gap-2">
        <Icon size="sm">
          <svg viewBox="0 0 24 24" fill="currentColor">
            <path d="M19 4h-1V2h-2v2H8V2H6v2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 16H5V10h14v10zm0-12H5V6h14v2z" />
          </svg>
        </Icon>
        <Text variant="body">{date}</Text>
      </div>
      <div className="flex items-center gap-2">
        <Icon size="sm">
          <svg viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2zm0 18c-4.4 0-8-3.6-8-8s3.6-8 8-8 8 3.6 8 8-3.6 8-8 8zm.5-13H11v6l5.2 3.2.8-1.3-4.5-2.7V7z" />
          </svg>
        </Icon>
        <Text variant="body">{time}</Text>
      </div>
    </div>
  );
}
