import { type ElementType, type PropsWithChildren } from "react";

type ContainerProps = PropsWithChildren<{
  className?: string;
  as?: ElementType;
}>;

export default function Container({
  children,
  className = "",
  as: Tag = "div",
}: ContainerProps) {
  return (
    <Tag className={`mx-auto w-full max-w-[1320px] px-5 sm:px-8 lg:px-12 ${className}`}>
      {children}
    </Tag>
  );
}
