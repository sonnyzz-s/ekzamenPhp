import React from 'react';
import { createInertiaApp } from '@inertiajs/react';
import { createRoot } from 'react-dom/client';

const appName = import.meta.env.VITE_APP_NAME || 'Laravel';

const pages = import.meta.glob('./pages/**/*.jsx', {
    eager: true,
});

createInertiaApp({
    title: (title) => (title ? `${title} - ${appName}` : appName),

    resolve: (name) => {
        const page = pages[`./pages/${name}.jsx`] as {
            default: React.ComponentType<any>;
        };

        return page.default;
    },

    setup({ el, App, props }) {
    createRoot(el).render(<App {...props} />);
},

    progress: {
        color: '#4B5563',
    },
});