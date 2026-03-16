import { HeartIcon } from "@/components/icons/heart.icon";
import { useFireworks } from "@/hooks/use-fireworks.hook";
import { AnimatePresence, motion } from "motion/react";

export const Fireworks = () => {
  const { bursts, trigger } = useFireworks();

  return (
    <div className="relative inline-block">
      <HeartIcon
        color="var(--color-primary-orange)"
        className="size-12 md:size-16"
        onClick={trigger}
      />

      <AnimatePresence>
        {bursts.map((burst) => (
          <div
            key={burst.id}
            className="pointer-events-none absolute -top-4 -right-4 size-12 md:size-16"
            aria-hidden
          >
            {burst.particles.map((p) => {
              const rad = (p.angle * Math.PI) / 180;
              const tx = Math.cos(rad) * p.distance;
              const ty = Math.sin(rad) * p.distance;

              return (
                <motion.span
                  key={p.id}
                  initial={{ opacity: 1, x: 0, y: 0, scale: 1 }}
                  animate={{ opacity: 0, x: tx, y: ty, scale: 0 }}
                  exit={{}}
                  transition={{ duration: 0.6, ease: "easeOut" }}
                  style={{
                    position: "absolute",
                    top: "50%",
                    left: "20%",
                    width: p.size,
                    height: p.size,
                    marginTop: -p.size / 2,
                    marginLeft: -p.size / 2,
                    borderRadius: "50%",
                    backgroundColor: p.color,
                  }}
                />
              );
            })}
          </div>
        ))}
      </AnimatePresence>
    </div>
  );
};
