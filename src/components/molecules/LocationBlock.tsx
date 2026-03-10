import { Text } from "@/components/atoms/Text";
import { Icon } from "@/components/atoms/Icon";

type LocationBlockProps = {
  name: string;
  address: string;
  mapUrl?: string;
  className?: string;
  captionClassName?: string;
  linkClassName?: string;
};

export function LocationBlock({
  name,
  address,
  mapUrl,
  className = "",
  captionClassName = "",
  linkClassName = "text-sm text-primary underline hover:text-primary-dark",
}: LocationBlockProps) {
  return (
    <div
      className={`flex flex-col items-center gap-1 ${className}`}
      role="group"
      aria-label="Ubicación"
    >
      <div className="flex items-center gap-2">
        <Icon size="sm">
          <svg viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
          </svg>
        </Icon>
        <Text variant="body" className="font-medium">
          {name}
        </Text>
      </div>
      <Text variant="caption" as="p" className={captionClassName}>
        {address}
      </Text>
      {mapUrl && (
        <a
          href={mapUrl}
          target="_blank"
          rel="noopener noreferrer"
          className={linkClassName}
        >
          Ver mapa
        </a>
      )}
    </div>
  );
}
