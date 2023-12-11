function calcularCuotas(monto, tasaInteres, plazo) {
    let tasaDecimal = tasaInteres / 100;
    let cuotaMensual = monto * (tasaDecimal / 12) / (1 - Math.pow(1 + tasaDecimal / 12, -plazo));
    let cuotas = [];
    let saldoPendiente = monto;

    for (let i = 1; i <= plazo; i++) {
        let interesMensual = saldoPendiente * tasaDecimal / 12;
        let amortizacionMensual = cuotaMensual - interesMensual;
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

let montoPrestamo = parseFloat(prompt("Ingrese el monto del préstamo:"));
let plazoEnMeses = parseInt(prompt("Ingrese el plazo del préstamo en meses:"));
let tasaInteres = 7;

if (isNaN(montoPrestamo) || isNaN(tasaInteres) || isNaN(plazoEnMeses) || montoPrestamo <= 0 || tasaInteres <= 0 || plazoEnMeses <= 0) {
    alert("Por favor, ingrese valores válidos y mayores que cero.");
} else {
    let cuotas = calcularCuotas(montoPrestamo, tasaInteres, plazoEnMeses);
    console.log(cuotas);
}





