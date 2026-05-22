"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoggerJson = void 0;
const PII_KEYS = new Set(['email', 'passwordHash', 'password', 'token', 'evaluadorId']);
function stripPii(val) {
    if (val === null || typeof val !== 'object')
        return val;
    if (Array.isArray(val))
        return val.map(stripPii);
    const out = {};
    for (const [k, v] of Object.entries(val)) {
        out[k] = PII_KEYS.has(k) ? '[REDACTED]' : stripPii(v);
    }
    return out;
}
function sanitizar(message) {
    if (typeof message === 'string') {
        try {
            return stripPii(JSON.parse(message));
        }
        catch {
            return message;
        }
    }
    return stripPii(message);
}
class LoggerJson {
    escribir(level, message, context) {
        const linea = JSON.stringify({
            timestamp: new Date().toISOString(),
            level,
            context: context ?? 'App',
            message: sanitizar(message),
        });
        process.stdout.write(linea + '\n');
    }
    log(message, context) {
        this.escribir('info', message, context);
    }
    error(message, trace, context) {
        this.escribir('error', message, context);
        if (trace) {
            process.stderr.write(JSON.stringify({ timestamp: new Date().toISOString(), level: 'error', trace }) + '\n');
        }
    }
    warn(message, context) {
        this.escribir('warn', message, context);
    }
    debug(message, context) {
        this.escribir('debug', message, context);
    }
    verbose(message, context) {
        this.escribir('verbose', message, context);
    }
}
exports.LoggerJson = LoggerJson;
//# sourceMappingURL=logger-json.js.map