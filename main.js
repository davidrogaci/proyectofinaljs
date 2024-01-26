class Cuota {
    constructor(mes, cuota, interes, amortizacion, saldoPendiente) {
        this.mes = mes;
        this.cuotaItem = cuota;
        this.interes = interes;
        this.amortizacion = amortizacion;
        this.saldoPendiente = saldoPendiente;
    }
}

function mostrarCuotaDetallada(cuota) {
    const { mes, cuotaItem, interes, amortizacion, saldoPendiente } = cuota;
    const modalContent = `
        <h3>Detalles de la Cuota ${mes}</h3>
        <p>Cuota: $${cuotaItem}</p>
        <p>Interés: $${interes}</p>
        <p>Amortización: $${amortizacion}</p>
        <p>Saldo Pendiente: $${saldoPendiente}</p>
    `;

    // Crear modal
    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.innerHTML = modalContent;

    // Botón para cerrar el modal
    const closeButton = document.createElement('button');
    closeButton.innerText = 'Cerrar';
    closeButton.addEventListener('click', () => {
        modal.classList.remove('active'); // Quita la clase 'active' para ocultar la ventana modal
        setTimeout(() => {
            modal.remove(); // Elimina el modal después de la transición
        }, 300); // Ajusta el tiempo de la transición
    });

    modal.appendChild(closeButton);

    // Agregar el modal al cuerpo del documento
    document.body.appendChild(modal);

    // Agregar la clase 'active' después de un breve retraso para activar la transición
    setTimeout(() => {
        modal.classList.add('active');
    }, 50);
}

function mostrarResultados(cuotas) {
    const resultContainer = document.getElementById('result');
    resultContainer.innerHTML = "<h3>Detalles de las cuotas:</h3>";

    cuotas.forEach(cuota => {
        const { mes } = cuota;
        const cuotaDetails = `
            <p>
                Mes ${mes} -
                <button class="verDetalleBtn" data-mes="${mes}">Ver Detalle</button>
            </p>
        `;
        resultContainer.innerHTML += cuotaDetails;
    });

    // Agregar eventos a los botones "Ver Detalle"
    const botonesDetalle = document.querySelectorAll('.verDetalleBtn');
    botonesDetalle.forEach(boton => {
        boton.addEventListener('click', function () {
            const mes = parseInt(this.getAttribute('data-mes'));
            const cuotaSeleccionada = cuotas.find(cuota => cuota.mes === mes);
            cuotaSeleccionada && mostrarCuotaDetallada(cuotaSeleccionada);
        });
    });
}

// Mostrando ejemplos de cuotas usando API Local
function cargarCuotasDesdeAPI() {
    fetch('data.json')
        .then(response => response.json())
        .then(data => {
            const cuotas = data.map(item => new Cuota(
                item.mes,
                item.cuota,
                item.interes,
                item.amortizacion,
                item.saldoPendiente
            ));

            mostrarResultadosEjemplos(cuotas);
        })
        .catch(error => {
            console.error('Error al cargar datos desde la API:', error);
        });
}

// Llamada a la función para cargar cuotas desde la API al cargar la página
window.addEventListener('load', cargarCuotasDesdeAPI);

function mostrarResultadosEjemplos(cuotas) {
    const resultContainer = document.getElementById('result');
    resultContainer.innerHTML = "<h3>Ejemplo de Cuotas</h3>";

    cuotas.forEach(cuota => {
        const { mes } = cuota;
        const cuotaDetails = `
            <p>
                Mes ${mes} -
                <button class="verDetalleBtn" data-mes="${mes}">Ver Detalle</button>
            </p>
        `;
        resultContainer.innerHTML += cuotaDetails;
    });

    // Agregar eventos a los botones "Ver Detalle"
    const botonesDetalle = document.querySelectorAll('.verDetalleBtn');
    botonesDetalle.forEach(boton => {
        boton.addEventListener('click', function () {
            const mes = parseInt(this.getAttribute('data-mes'));
            const cuotaSeleccionada = cuotas.find(cuota => cuota.mes === mes);
            cuotaSeleccionada && mostrarCuotaDetallada(cuotaSeleccionada);
        });
    });
}

function calcularCuotas() {
    const montoInput = document.getElementById('monto');
    const tasaInput = document.getElementById('tasa');
    const plazoInput = document.getElementById('plazo');

    const monto = parseFloat(montoInput.value);
    const tasaInteres = parseFloat(tasaInput.value);
    const plazo = parseInt(plazoInput.value);

    if (!monto || !tasaInteres || !plazo || monto <= 0 || tasaInteres <= 0 || plazo <= 0) {
        Swal.fire({
            title: "Error",
            text: "Por favor, ingrese valores válidos y mayores que cero.",
            icon: "error"
        });
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