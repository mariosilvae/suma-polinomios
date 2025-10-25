// ui.js
// Orquesta la interacción entre DOM, parser, engine, formatter y storage
(function () {
    // Helpers para DOM
    function $(id) { return document.getElementById(id) }

    // Crear un nodo de término (coeficiente, variable readonly, exponente)
    function createTermNode(containerId, coef = '', variable = 'x', exp = '') {
        const container = $(containerId)
        const wrapper = document.createElement('div')
        wrapper.className = 'term'
        const coefInput = document.createElement('input'); coefInput.placeholder = 'coef.'; coefInput.value = coef; coefInput.type = 'text'
        const varInput = document.createElement('input'); varInput.value = variable; varInput.readOnly = true; varInput.setAttribute('aria-label', 'variable'); varInput.style.width = '40px'
        const expInput = document.createElement('input'); expInput.placeholder = 'exp.'; expInput.value = exp; expInput.type = 'text'
        const delBtn = document.createElement('button'); delBtn.className = 'del'; delBtn.textContent = '✖'; delBtn.type = 'button'
        delBtn.addEventListener('click', () => wrapper.remove())
        wrapper.appendChild(coefInput); wrapper.appendChild(varInput); wrapper.appendChild(expInput); wrapper.appendChild(delBtn)
        container.appendChild(wrapper)
        return wrapper
    }

    function readTerms(containerId) {
        const c = $(containerId)
        const nodes = Array.from(c.querySelectorAll('.term'))
        const terms = []
        for (const n of nodes) {
            const inputs = n.querySelectorAll('input')
            const coefText = (inputs[0].value || '').trim() || '0'
            const expText = (inputs[2].value || '').trim() || '0'
            const coef = Number(coefText)
            const exp = Number(expText)
            if (Number.isNaN(coef) || Number.isNaN(exp)) throw new Error('Coeficiente o exponente inválido en entrada manual')
            terms.push({ coef, exp })
        }
        return terms
    }

    // UI rendering
    function renderResult(text) {
        $('result').textContent = text
    }
    function renderSteps(lines) {
        const box = $('steps')
        box.textContent = ''
        if (!lines || lines.length === 0) { box.textContent = '--'; return }
        box.textContent = lines.join('\n')
    }

    function renderHistory() {
        const hist = PolyStorage.loadHistory()
        const node = $('history')
        node.innerHTML = ''
        if (!hist || hist.length === 0) {
            node.textContent = 'Sin ejercicios guardados'
            return
        }
        hist.forEach(item => {
            const d = document.createElement('div')
            d.className = 'history-item'
            d.style.padding = '6px 0'
            d.innerHTML = `<div style="font-weight:600">${escapeHtml(item.result)}</div><div class="small">${new Date(item.date).toLocaleString()}</div>`
            d.addEventListener('click', () => {
                if (item.a) $('textA').value = item.a && typeof item.a === 'string' ? item.a : ''
                if (item.b) $('textB').value = item.b && typeof item.b === 'string' ? item.b : ''
            })
            node.appendChild(d)
        })
    }

    function escapeHtml(s) { return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;') }

    // Bind events
    function bind() {
        $('addTermA').addEventListener('click', () => createTermNode('termsA'))
        $('addTermB')?.addEventListener('click', () => createTermNode('termsB'))
        $('pasteA').addEventListener('click', () => { const v = prompt('Pega el polinomio A'); if (v) $('textA').value = v })
        $('pasteB')?.addEventListener('click', () => { const v = prompt('Pega el polinomio B'); if (v) $('textB').value = v })

        $('clearBtn').addEventListener('click', () => {
            $('termsA').innerHTML = ''; $('termsB') && ($('termsB').innerHTML = '')
            $('textA').value = ''; $('textB') && ($('textB').value = '')
            renderResult('--'); renderSteps(['--'])
        })

        $('sumBtn').addEventListener('click', () => {
            try {
                let termsA = []
                let termsB = []
                // Prefer text input if present
                if (($('textA').value || '').trim()) {
                    termsA = PolyParser.parsePolynomial($('textA').value)
                } else {
                    termsA = readTerms('termsA')
                }
                if (($('textB') && ($('textB').value || '').trim())) {
                    termsB = PolyParser.parsePolynomial($('textB').value)
                } else if ($('termsB')) {
                    termsB = readTerms('termsB')
                }

                const steps = []
                steps.push('Términos A: ' + JSON.stringify(termsA))
                steps.push('Términos B: ' + JSON.stringify(termsB))

                const combined = PolyEngine.addPolynomials(termsA, termsB)
                steps.push('Combinar y simplificar: ' + JSON.stringify(combined))

                const formatted = PolyFormatter.formatPolynomial(combined)
                renderResult(formatted)
                renderSteps(steps)

                PolyStorage.pushHistory({ a: $('textA').value || '', b: $('textB') ? $('textB').value : '', result: formatted, date: new Date().toISOString() })
                renderHistory()
            } catch (err) {
                alert('Error: ' + err.message)
            }
        })

        $('saveBtn').addEventListener('click', () => {
            const formatted = $('result').textContent
            if (!formatted || formatted === '--') { alert('No hay resultado para guardar.'); return }
            PolyStorage.pushHistory({ a: $('textA').value || '', b: $('textB') ? $('textB').value : '', result: formatted, date: new Date().toISOString() })
            renderHistory()
            alert('Ejercicio guardado localmente.')
        })
    }

    // Init
    function init() {
        // crear 2 términos por defecto en A y B para ayudar al usuario
        createTermNode('termsA', '', 'x', '')
        if ($('termsB')) createTermNode('termsB', '', 'x', '')
        bind()
        renderHistory()
    }

    document.addEventListener('DOMContentLoaded', init)
})();
