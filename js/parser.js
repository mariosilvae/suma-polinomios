// parser.js
// parsePolynomial(text) => [{coef:number, exp:number}, ...]
// Lanza Error si el formato no es válido.
(function (global) {
    function parsePolynomial(text) {
        if (!text || !text.trim()) return []
        // Normalizar: eliminar espacios y unificar signos
        const cleaned = text.replace(/\s+/g, '').replace(/\+\-/g, '-').replace(/\-\+/g, '-')
        const parts = cleaned.match(/[+-]?[^+-]+/g)
        if (!parts) throw new Error('No se encontraron términos válidos')
        const terms = parts.map(p => {
            // match: coef (opcional), variable (opcional), exponent (opcional)
            // ej: 3x^2, -x, +5
            const match = p.match(/^([+-]?\d*\.?\d*)([a-zA-Z]?)(?:\^(-?\d+))?$/)
            if (!match) throw new Error('Formato inválido en término: ' + p)
            let coefText = match[1]
            const variable = match[2]
            const expText = match[3]
            if (coefText === '' || coefText === '+') coefText = '1'
            if (coefText === '-') coefText = '-1'
            const coef = Number(coefText)
            const exp = variable ? (expText ? Number(expText) : 1) : 0
            if (Number.isNaN(coef) || Number.isNaN(exp)) throw new Error('Número inválido en ' + p)
            return { coef, exp }
        })
        return terms
    }

    // Exponer
    global.PolyParser = { parsePolynomial }
})(window);
