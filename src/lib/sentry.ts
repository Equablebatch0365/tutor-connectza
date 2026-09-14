// src/lib/sentry.ts
import * as Sentry from '@sentry/react';

// Only initialize in production (so we don't get spammed with dev errors)
const isProduction = import.meta.env.PROD;

// Hardcoded DSN (safe to be public - Sentry DSNs are meant to be visible)
const SENTRY_DSN = 'https://aaa327984237062c2cd2a2915f860d8f@o4512084535934976.ingest.de.sentry.io/4512084590002256';

if (isProduction) {
    Sentry.init({
        dsn: SENTRY_DSN,
        environment: import.meta.env.MODE,
        integrations: [
            Sentry.browserTracingIntegration(),
        ],
        tracesSampleRate: 0.1,
        beforeSend(event) {
            if (event.environment === 'development') {
                return null;
            }
            return event;
        },
    });
}

export default Sentry;