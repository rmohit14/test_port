import { type ElementType, type PropsWithChildren } from "react";

type ContainerProps = PropsWithChildren<{
  className?: string;
  as?: ElementType;
}>;

export default function Container({
  children,
  className = "",
  as: rawTag = "div",
}: ContainerProps) {
  // Cast through `any` rather than the bare `ElementType` prop: with
  // @react-three/fiber's global JSX.IntrinsicElements augmentation in the
  // program, the broad ElementType union collapses `children` to `never`
  // for this polymorphic tag.
  const Tag = rawTag as any;

  return (
    <Tag className={`mx-auto w-full max-w-[1320px] px-5 sm:px-8 lg:px-12 ${className}`}>
      {children}
    </Tag>
  );
}
