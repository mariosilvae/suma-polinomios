// formatter.js
// formatPolynomial(terms) => string legible
(function (global) {
    function formatPolynomial(terms) {
        if (!terms || terms.length === 0) return '0'
        return terms.map((t, i) => {
            const c = Number(t.coef)
            const e = Number(t.exp)
            const sign = c < 0 ? '-' : (i === 0 ? '' : '+')
            const absC = Math.abs(c)
            const coefStr = (absC === 1 && e !== 0) ? '' : String(absC)
            const varStr = e === 0 ? '' : 'x' + (e === 1 ? '' : '^' + e)
            return sign + coefStr + varStr
        }).join(' ').replace(/\+\-/g, '- ')
    }

    global.PolyFormatter = { formatPolynomial }
})(window);
