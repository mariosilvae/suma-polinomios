// engine.js
// Funciones puras para combinar términos y sumar polinomios
(function (global) {
    function combineTerms(terms) {
        const map = new Map()
        for (const t of terms) {
            const e = Number(t.exp)
            const c = Number(t.coef)
            if (Number.isNaN(e) || Number.isNaN(c)) throw new Error('Término con valores inválidos')
            map.set(e, (map.get(e) || 0) + c)
        }
        const res = Array.from(map.entries())
            .map(([exp, coef]) => ({ exp: Number(exp), coef: Number(coef) }))
            .filter(t => Math.abs(t.coef) > 1e-12)
            .sort((a, b) => b.exp - a.exp)
        return res
    }

    function addPolynomials(aTerms, bTerms) {
        return combineTerms([...(aTerms || []), ...(bTerms || [])])
    }

    // export
    global.PolyEngine = { combineTerms, addPolynomials }
})(window);
