import { FC, PropsWithChildren } from "react";

type BaseLayoutProps = PropsWithChildren;

const BaseLayout: FC<BaseLayoutProps> = ({ children }) => {
  return <div>{children}</div>;
};

export default BaseLayout;
