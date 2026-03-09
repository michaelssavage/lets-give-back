import { buttonStyles } from "@/components/button/button.styles";
import { Link } from "@tanstack/react-router";

export const NotFound = () => {
  return (
    <div className="text-center p-4 min-h-[70vh] flex flex-col items-center justify-center">
      <h2 className="text-2xl mt-2">Oops! Page not found</h2>
      <p className="text-secondary mb-4">
        The page you&apos;re looking for doesn&apos;t exist or has been moved.
      </p>
      <Link to="/" className={buttonStyles({ variant: "primary" })}>
        Go home
      </Link>
    </div>
  );
};
