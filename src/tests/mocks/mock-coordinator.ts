export interface ExtensionMode {
  Viewer: string;
  Dashboard: string;
  Config: string;
}

export interface ExtensionViewType {
  Component: string;
  Config: string;
  Hidden: string;
  LiveConfig: string;
  Mobile: string;
  Panel: string;
  VideoOverlay: string;
}
export interface ExtensionPlatform {
  Web: string;
  Mobile: string;
}

export interface ExtensionAnchor {
  Panel: string;
  Overlay: string;
  Component: string;
}

export interface ExtensionCoordinator {
  ExtensionMode: ExtensionMode;
  ExtensionViewType: ExtensionViewType;
  ExtensionPlatform: ExtensionPlatform;
  ExtensionFrame: Function;
  ExtensionAnchor: ExtensionAnchor;
  getComponentPositionFromView: Function;
  getComponentSizeFromView: Function;
}

export function newMockCoordinator(): ExtensionCoordinator {
  let coordinator: ExtensionCoordinator;
  coordinator.ExtensionMode = {
    Viewer: 'viewer',
    Dashboard: 'dashboard',
    Config: 'config',
  };

  coordinator.ExtensionViewType = {
    Component: 'component',
    Config: 'config',
    Hidden: 'hidden',
    LiveConfig: 'liveConfig',
    Mobile: 'mobile',
    Panel: 'panel',
    VideoOverlay: 'videoOverlay',
  };

  coordinator.ExtensionPlatform = {
    Web: 'web',
    Mobile: 'mobile'
  };

  coordinator.ExtensionFrame = function () {
    return {
      on: () => { },
    }
  };

  coordinator.ExtensionAnchor = {
    Panel: 'panel',
    Overlay: 'video_overlay',
    Component: 'component',
  };

  coordinator.getComponentPositionFromView = function () {
    return {
      x: 20,
      y: 20,
    }
  }

  coordinator.getComponentSizeFromView = function () {
    return {
      width: 10,
      height: 10,
      zoomScale: 1024,
    }
  }
  return coordinator;
}
