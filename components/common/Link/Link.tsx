import NextLink from "next/link";
import { ComponentProps } from "react";
import clsx from "clsx";
import styles from "./Link.module.css";

// interface AppLinkProps {
//   href: string;
//   children: React.ReactNode;
//   variant?: "text" | "icon";
//   disabled?: boolean;
//   className?: string;
// }

interface AppLinkProps extends ComponentProps<typeof NextLink> {
  variant?: "text" | "icon";
  disabled?: boolean;
}

export const Link = ({
  variant = "text",
  disabled = false,
  className,
  children,
  ...props
}: AppLinkProps) => {
  if (disabled) {
    return (
      <span
        className={clsx(
          styles.link,
          styles[variant],
          styles.disabled,
          className,
        )}
        aria-disabled="true"
      >
        {children}
      </span>
    );
  }

  return (
    <NextLink
      {...props}
      className={clsx(styles.link, styles[variant], className)}
    >
      {children}
    </NextLink>
  );
};
