function calcularCuotas(monto, tasaInteres, plazo) {
    const tasaDecimal = tasaInteres / 100;
    const cuotas = [];
    let saldoPendiente = monto;

    for (let i = 1; i <= plazo; i++) {
        const interesMensual = saldoPendiente * tasaDecimal / 12;
        const cuotaMensual = monto * (tasaDecimal / 12) / (1 - Math.pow(1 + tasaDecimal / 12, -plazo));
        const amortizacionMensual = cuotaMensual - interesMensual;
        saldoPendiente -= amortizacionMensual;

        cuotas.push({
            mes: i,
            cuota: cuotaMensual.toFixed(2),
            interes: interesMensual.toFixed(2),
            amortizacion: amortizacionMensual.toFixed(2),
            saldoPendiente: saldoPendiente.toFixed(2)
        });
    }

    return cuotas;
}

function obtenerNumeroInput(mensaje) {
    let valor;
    do {
        valor = parseFloat(prompt(mensaje));
    } while (isNaN(valor) || valor <= 0);
    return valor;
}

const montoPrestamo = obtenerNumeroInput("Ingrese el monto del préstamo:");
const plazoEnMeses = parseInt(obtenerNumeroInput("Ingrese el plazo del préstamo en meses:"));
const tasaInteres = 7;

if (montoPrestamo && plazoEnMeses) {
    const cuotas = calcularCuotas(montoPrestamo, tasaInteres, plazoEnMeses);
    console.log(cuotas);

    const mesBuscado = 3;
    const cuotaEncontrada = cuotas.find(cuota => cuota.mes === mesBuscado);

    if (cuotaEncontrada) {
        console.log(`Detalles para el mes ${mesBuscado}:`, cuotaEncontrada);
    } else {
        console.log(`No se encontraron detalles para el mes ${mesBuscado}.`);
    }

    const saldosMayoresA500 = cuotas.filter(cuota => cuota.saldoPendiente > 500);
    console.log("Cuotas con saldos pendientes mayores a 500:", saldosMayoresA500);
} else {
    alert("Por favor, ingrese valores válidos y mayores que cero.");
}