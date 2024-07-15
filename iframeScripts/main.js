(function() {
    function logToParent(level, message) {
        window.parent.postMessage({ level }, '*');
    }

    // Save original console methods
    const originalLog = console.log;
    const originalWarn = console.warn;
    const originalError = console.error;

    // Override console.log
    console.log = function(...args) {
        originalLog.apply(console, args); // Call original
        logToParent({...args}); // Send to parent
    };

    // Override console.warn
    console.warn = function(...args) {
        originalWarn.apply(console, args); // Call original
        logToParent({...args}); // Send to parent
    };

    // Override console.error
    console.error = function(...args) {
        originalError.apply(console, args); // Call original
        logToParent({...args}); // Send to parent
    };
})();
