function loadGeoGebraApplet(containerId, options = {}) {
    const defaultOptions = {
        filename: 'geo/', // Varsayılan dosya yolu
        width: 600,
        height: 400,
        showToolbar: true,
        enableRightClick: false,
        showMenuBar: true,
        useBrowserForJS: true
    };

    const appletOptions = { ...defaultOptions, ...options };

    const applet = new GGBApplet(appletOptions, true); // true: Cache'i etkinleştir

    window.addEventListener('load', function() {
        applet.inject(containerId); // Belirtilen div'e enjekte et
    });

    window.resetGeoGebraApplet = function() {
        applet.setXML('');
        applet.evalCommand('');
    };
}

document.addEventListener('DOMContentLoaded', function() {
    const appletContainers = document.querySelectorAll('[data-geogebra]');
    appletContainers.forEach(container => {
        const filename = container.getAttribute('data-geogebra') || 'ggb/default.ggb';
        const width = container.getAttribute('data-width') || 1250;
        const height = container.getAttribute('data-height') || 600;

        loadGeoGebraApplet(container.id, {
            filename: filename,
            width: parseInt(width),
            height: parseInt(height)
        });
    });
});