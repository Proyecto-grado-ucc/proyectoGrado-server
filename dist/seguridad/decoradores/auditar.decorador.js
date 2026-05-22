"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Auditar = exports.AUDIT_ENTIDAD_KEY = void 0;
const common_1 = require("@nestjs/common");
exports.AUDIT_ENTIDAD_KEY = 'auditEntidad';
const Auditar = (entidad) => (0, common_1.SetMetadata)(exports.AUDIT_ENTIDAD_KEY, entidad);
exports.Auditar = Auditar;
//# sourceMappingURL=auditar.decorador.js.map