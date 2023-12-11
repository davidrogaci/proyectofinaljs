function calcularCuotas(monto, tasaInteres, plazo) {
    var tasaDecimal = tasaInteres / 100;
    var cuotaMensual = monto * (tasaDecimal / 12) / (1 - Math.pow(1 + tasaDecimal / 12, -plazo));
    var cuotas = [];
    var saldoPendiente = monto;

    for (var i = 1; i <= plazo; i++) {
        var interesMensual = saldoPendiente * tasaDecimal / 12;
        var amortizacionMensual = cuotaMensual - interesMensual;
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

var montoPrestamo = parseFloat(prompt("Ingrese el monto del préstamo:"));
var plazoEnMeses = parseInt(prompt("Ingrese el plazo del préstamo en meses:"));
var tasaInteres = 7;

if (isNaN(montoPrestamo) || isNaN(tasaInteres) || isNaN(plazoEnMeses) || montoPrestamo <= 0 || tasaInteres <= 0 || plazoEnMeses <= 0) {
    alert("Por favor, ingrese valores válidos y mayores que cero.");
} else {
    var cuotas = calcularCuotas(montoPrestamo, tasaInteres, plazoEnMeses);
    console.log(cuotas);
}





