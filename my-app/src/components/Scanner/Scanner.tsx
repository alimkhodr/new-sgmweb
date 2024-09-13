import { useRef } from 'react';

const Scanner = () => {
    const iframeRef = useRef<HTMLIFrameElement>(null);
    return (
        <iframe
            ref={iframeRef}
            src="/services/Scanner.html" // Adjust path if necessary
            style={{ width: '100%', height: '200px', border: 'none', borderRadius: 5 }}
            title="Scanner"
        />
    );
};

export default Scanner;
