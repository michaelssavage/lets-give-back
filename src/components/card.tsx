type CardProps = {
  title: string;
  subtitle: string;
  image: string;
  variant?: "overlay" | "stacked";
};

export const Card = ({
  title,
  subtitle,
  image,
  variant = "overlay",
}: CardProps) => {
  if (variant === "overlay") {
    return (
      <div className="group relative overflow-hidden rounded-2xl card-shadow aspect-4/3">
        <img
          src={image}
          alt={title}
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/20 to-transparent transition-all duration-300 group-hover:bg-black/80" />
        <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
          <h2 className="font-bold">{title}</h2>
          <p className="text-base md:text-lg text-white/80 mt-1">{subtitle}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col overflow-hidden rounded-2xl card-shadow">
      <div className="aspect-video w-full overflow-hidden">
        <img src={image} alt={title} className="w-full h-full object-cover" />
      </div>
      <div className="p-4 flex flex-col gap-1">
        <h2 className="text-lg md:text-xl font-bold">{title}</h2>
        <p className="text-sm text-muted-foreground">{subtitle}</p>
      </div>
    </div>
  );
};
