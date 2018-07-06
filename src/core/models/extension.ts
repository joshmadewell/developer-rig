const ExtensionViewType = (window as any)['extension-coordinator'];

export type ExtensionView = {
  viewerUrl: string;
};

export type ComponentView = ExtensionView & {
  aspectHeight: number;
  aspectWidth: number;
  zoom: boolean;
  zoomPixels: number;
};
export type ConfigView = ExtensionView;
export type HiddenView = ExtensionView;
export type LiveConfigView = ExtensionView;
export type MobileView = ExtensionView;
export type PanelView = ExtensionView & {
  height: number;
};
export type VideoOverlayView = ExtensionView;

export type ExtensionViews = {
  component?: ComponentView;
  config?: ConfigView;
  hidden?: HiddenView;
  liveConfig?: LiveConfigView;
  mobile?: MobileView;
  panel?: PanelView;
  videoOverlay?: VideoOverlayView;
};
