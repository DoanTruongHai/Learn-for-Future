/// <reference types="vite/client" />
/// <reference types="vite/client" />

interface Window {
  cardano?: {
    nami: {
      enable: () => Promise<any>;
    };
  };
}