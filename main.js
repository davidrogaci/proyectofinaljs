class Cuota {
    constructor(mes, cuota, interes, amortizacion, saldoPendiente) {
        this.mes = mes;
        this.cuota = cuota;
        this.interes = interes;
        this.amortizacion = amortizacion;
        this.saldoPendiente = saldoPendiente;
    }
}

function calcularCuotas() {
    const montoInput = document.getElementById('monto');
    const tasaInput = document.getElementById('tasa');
    const plazoInput = document.getElementById('plazo');

    const monto = parseFloat(montoInput.value);
    const tasaInteres = parseFloat(tasaInput.value);
    const plazo = parseInt(plazoInput.value);

    if (isNaN(monto) || isNaN(tasaInteres) || isNaN(plazo) || monto <= 0 || tasaInteres <= 0 || plazo <= 0) {
        mostrarError("Por favor, ingrese valores válidos y mayores que cero.");
        return;
    }

    const tasaDecimal = tasaInteres / 100;
    const cuotas = [];

    let saldoPendiente = monto;

    for (let i = 1; i <= plazo; i++) {
        const interesMensual = saldoPendiente * tasaDecimal / 12;
        const cuotaMensual = monto * (tasaDecimal / 12) / (1 - Math.pow(1 + tasaDecimal / 12, -plazo));
        const amortizacionMensual = cuotaMensual - interesMensual;

        saldoPendiente -= amortizacionMensual;

        cuotas.push(new Cuota(
            i,
            cuotaMensual.toFixed(2),
            interesMensual.toFixed(2),
            amortizacionMensual.toFixed(2),
            saldoPendiente.toFixed(2)
        ));
    }

    mostrarResultados(cuotas);
    guardarEnLocalStorage(monto, tasaInteres, plazo);
}

function mostrarResultados(cuotas) {
    const resultContainer = document.getElementById('result');
    resultContainer.innerHTML = "<h3>Detalles de las cuotas:</h3>";

    cuotas.forEach(cuota => {
        const cuotaDetails = `
            <p>Mes ${cuota.mes} - Cuota: $${cuota.cuota} | Interés: $${cuota.interes} | Amortización: $${cuota.amortizacion} | Saldo Pendiente: $${cuota.saldoPendiente}</p>
        `;
        resultContainer.innerHTML += cuotaDetails;
    });
}

function mostrarError(mensaje) {
    const errorContainer = document.getElementById('error');
    errorContainer.innerHTML = `<p>${mensaje}</p>`;
}

function guardarEnLocalStorage(monto, tasa, plazo) {
    const datos = { monto, tasa, plazo };
    localStorage.setItem('prestamoDatos', JSON.stringify(datos));
}

function cargarDesdeLocalStorage() {
    const prestamoDatos = localStorage.getItem('prestamoDatos');
    if (prestamoDatos) {
        const { monto, tasa, plazo } = JSON.parse(prestamoDatos);
        document.getElementById('monto').value = monto;
        document.getElementById('tasa').value = tasa;
        document.getElementById('plazo').value = plazo;
    }
}

document.getElementById('calcularBtn').addEventListener('click', () => {
    mostrarError(""); // Limpiar mensajes de error
    calcularCuotas();
});

window.addEventListener('load', cargarDesdeLocalStorage);