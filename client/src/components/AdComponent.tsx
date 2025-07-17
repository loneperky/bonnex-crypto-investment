import { useEffect } from 'react';

declare global {
  interface Window {
    adsbygoogle: any[];
  }
}

export default function AdComponent() {
  useEffect(() => {
    // Add script if not already loaded
    const existingScript = document.querySelector(
      'script[src*="adsbygoogle.js"]'
    );

    if (!existingScript) {
      const script = document.createElement('script');
      script.src =
        'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js';
      script.async = true;
      script.setAttribute('data-ad-client', 'ca-pub-6665910549376467'); // Your ID
      script.crossOrigin = 'anonymous';
      document.head.appendChild(script);
    }

    // Call push only after script is ready
    try {
      if (window.adsbygoogle) {
        window.adsbygoogle.push({});
      }
    } catch (err) {
      console.error('Adsbygoogle error:', err);
    }
  }, []);

  return (
    <ins
      className="adsbygoogle"
      style={{ display: 'block' }}
      data-ad-client="ca-pub-6665910549376467"  // Replace with your Ad Client ID
      data-ad-slot="3712349379"                // Replace with your Ad Slot ID
      data-ad-format="auto"
      data-full-width-responsive="true"
    />
  );
}
