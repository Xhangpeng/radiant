import { useEffect, useState } from "react";
import { toast } from "sonner";

declare global {
  interface Window {
    __pwaDeferredPrompt?: BeforeInstallPromptEvent | null;
    __pwaInstallPromptActive?: boolean;
    __pwaInstallToastShown?: boolean;
  }
}

interface BeforeInstallPromptEvent extends Event {
  readonly platforms?: string[];
  readonly userChoice: Promise<{
    outcome: "accepted" | "dismissed";
    platform?: string;
  }>;
  prompt(): Promise<void>;
}

const INSTALL_PROMPT_WAIT_MS = 1600;

const isStandalone = () =>
  window.matchMedia("(display-mode: standalone)").matches ||
  (navigator as any).standalone === true;

const showInstalledToastOnce = () => {
  if (window.__pwaInstallToastShown) return;
  window.__pwaInstallToastShown = true;
  toast.success("School app installed successfully.");
};

const waitForInstallPrompt = () =>
  new Promise<BeforeInstallPromptEvent | null>((resolve) => {
    if (window.__pwaDeferredPrompt) {
      resolve(window.__pwaDeferredPrompt);
      return;
    }

    const timer = window.setTimeout(() => {
      window.removeEventListener("pwaReadyToInstall", handleReady as EventListener);
      resolve(window.__pwaDeferredPrompt || null);
    }, INSTALL_PROMPT_WAIT_MS);

    const handleReady = (event: Event) => {
      const promptEvent = (event as CustomEvent<{ prompt?: BeforeInstallPromptEvent }>).detail?.prompt;
      window.clearTimeout(timer);
      window.removeEventListener("pwaReadyToInstall", handleReady as EventListener);
      resolve(promptEvent || window.__pwaDeferredPrompt || null);
    };

    window.addEventListener("pwaReadyToInstall", handleReady as EventListener, { once: true });
  });

export function usePWAInstall() {
  const [deferredPrompt, setDeferredPrompt] =
    useState<BeforeInstallPromptEvent | null>(null);
  const [isInstalled, setIsInstalled] = useState(false);

  useEffect(() => {
    if (isStandalone()) {
      setIsInstalled(true);
      return;
    }

    if (window.__pwaDeferredPrompt) {
      setDeferredPrompt(window.__pwaDeferredPrompt);
    }

    const handleBeforeInstallPrompt = (event: Event) => {
      event.preventDefault();
      const promptEvent = event as BeforeInstallPromptEvent;
      window.__pwaDeferredPrompt = promptEvent;
      setDeferredPrompt(promptEvent);
    };

    const handleAppInstalled = () => {
      setIsInstalled(true);
      window.__pwaDeferredPrompt = null;
      window.__pwaInstallPromptActive = false;
      setDeferredPrompt(null);
      showInstalledToastOnce();
    };

    const handlePWAReady = (event: Event) => {
      const promptEvent = (event as CustomEvent<{ prompt?: BeforeInstallPromptEvent }>).detail?.prompt;
      if (promptEvent) {
        window.__pwaDeferredPrompt = promptEvent;
        setDeferredPrompt(promptEvent);
      }
    };

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
    window.addEventListener("appinstalled", handleAppInstalled);
    window.addEventListener("pwaReadyToInstall", handlePWAReady as EventListener);
    window.addEventListener("pwaInstalled", handleAppInstalled);

    return () => {
      window.removeEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
      window.removeEventListener("appinstalled", handleAppInstalled);
      window.removeEventListener("pwaReadyToInstall", handlePWAReady as EventListener);
      window.removeEventListener("pwaInstalled", handleAppInstalled);
    };
  }, []);

  const promptInstall = async () => {
    if (isInstalled || isStandalone()) {
      setIsInstalled(true);
      showInstalledToastOnce();
      return false;
    }

    if (window.__pwaInstallPromptActive) {
      return false;
    }

    const promptEvent =
      window.__pwaDeferredPrompt || deferredPrompt || (await waitForInstallPrompt());

    if (!promptEvent) {
      return false;
    }

    try {
      window.__pwaInstallPromptActive = true;
      await promptEvent.prompt();
      const { outcome } = await promptEvent.userChoice;

      if (outcome === "accepted") {
        setIsInstalled(true);
        window.__pwaDeferredPrompt = null;
      }

      window.__pwaDeferredPrompt = null;
      setDeferredPrompt(null);
      return outcome === "accepted";
    } catch {
      window.__pwaDeferredPrompt = null;
      setDeferredPrompt(null);
      return false;
    } finally {
      window.__pwaInstallPromptActive = false;
    }
  };

  return {
    canInstall: Boolean(deferredPrompt) && !isInstalled,
    isInstalled,
    promptInstall,
  };
}
