export enum BannerVariant {
  Default = "default",
  Warning = "warning",
  Danger = "danger",
}

export interface BannerInstanceShowHandlerParams {
  variant: BannerVariant;
  message: string;
  duration: number;
}

type BannerInstanceShowHandler = (
  params: BannerInstanceShowHandlerParams,
) => void;

export interface BannerInstance {
  show: BannerInstanceShowHandler;
  hide: () => void;
}
