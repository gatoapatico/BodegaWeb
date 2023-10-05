document.addEventListener('click', function(e){
    if(e.target.dataset.black){
        cerrarPopups();
    }
    else if(e.target.dataset.comprar){
        document.getElementById('bg-black-wall').classList.toggle('hidden');
        document.getElementById('popup-login').classList.toggle('hidden');
    }
    else if(e.target.dataset.registrate){
        document.getElementById('popup-login').classList.toggle('hidden');
        document.getElementById('popup-registrate').classList.toggle('hidden');
    }
    else if(e.target.dataset.carrito){
        document.getElementById('carrito-header').click();
    }
    else if(e.target.dataset.agregar){
        const productoid = e.target.dataset.productoid;

        document.getElementById('fixed').innerHTML = `
            <div class="popup-agregar-producto">
                <p>
                    <i class="bi bi-cart-check-fill"></i>
                    Se agregó <span>${productoid}</span><br>(S/ <span>8.90</span>) al carrito de compras!
                </p>
            </div>
        `;

        setTimeout(function(){
            document.getElementById('fixed').innerHTML = '';
        }, 3000);
    }
    else if(e.target.dataset.categoria){
        const categoria = e.target.dataset.categoria;
        const productos = document.getElementsByClassName('producto');

        for(let i = 0; i < productos.length; i++){
            if(productos[i].querySelector('#categoria').textContent === categoria){
                productos[i].classList.remove('hidden');
            }
            else {
                productos[i].classList.add('hidden');
            }
        }
    }
    else if(e.target.dataset.sub){
        const quantityValue = e.target.parentNode.querySelector('.num').textContent;
        if(quantityValue > 1){
            e.target.parentNode.querySelector('.num').textContent = quantityValue - 1;
        }
    }
    else if(e.target.dataset.add){
        const quantityValue = e.target.parentNode.querySelector('.num').textContent;
        e.target.parentNode.querySelector('.num').textContent = parseInt(quantityValue) + 1;
    }
    else if(e.target.dataset.remove){
        e.target.parentNode.parentNode.parentNode.remove();
    }
    else if(e.target.dataset.envio) {
        const datos = document.getElementById('ux-identificacion');
        const inputs = datos.querySelectorAll('input');
        let cont = 0;

        const correo = inputs.item(0).value;
        const nombre = inputs.item(1).value;
        const apellidos = inputs.item(2).value;
        const documento = inputs.item(3).value;
        const telefono = inputs.item(4).value;

        inputs.forEach(input => {
            if(input.value === ''){
                input.parentNode.querySelector('b').classList.remove('hidden');
            }
            else {
                input.parentNode.querySelector('b').classList.add('hidden');
                cont++;
            }
        });

        if(cont == inputs.length){
            document.getElementById('correo-resumen').textContent = correo;
            document.getElementById('nombre-resumen').textContent = nombre;
            document.getElementById('apellidos-resumen').textContent = apellidos;
            document.getElementById('documento-resumen').textContent = documento;
            document.getElementById('telefono-resumen').textContent = telefono;
            
            document.getElementById('identificacion').querySelector('.contenido1').classList.add('hidden');
            document.getElementById('identificacion').querySelector('.contenido2').classList.remove('hidden');

            document.getElementById('envio').querySelector('.contenido1').classList.remove('hidden');
        }
    }
    else if(e.target.dataset.metodo){
        const metodo = e.target.dataset.metodo;
        switch(metodo){
            case "domicilio":
                document.getElementById('metodo-domicilio').classList.add('metodo-activo');
                document.getElementById('metodo-tienda').classList.remove('metodo-activo');
                document.getElementById('contenido-domicilio').classList.remove('hidden');
                document.getElementById('contenido-tienda').classList.add('hidden');
                break;
            case "tienda":
                document.getElementById('metodo-tienda').classList.add('metodo-activo');
                document.getElementById('metodo-domicilio').classList.remove('metodo-activo');
                document.getElementById('contenido-tienda').classList.remove('hidden');
                document.getElementById('contenido-domicilio').classList.add('hidden');
                break;
        }
    }
    else if(e.target.dataset.mapa){
        document.getElementById('bg-black-wall').classList.remove('hidden');
        document.getElementById('popup-mapa').classList.remove('hidden');
    }
    else if(e.target.dataset.fecha) {
        document.getElementById('input-fecha-entrega').focus();
    }
    else if(e.target.dataset.inputfecha) {
        e.target.addEventListener('change', function(){
            document.getElementById('fecha-formateada').textContent = calcularFechaEntrega(e.target);
            document.getElementById('fecha').classList.add('hidden');
            document.getElementById('fecha-resumen').classList.remove('hidden');
        });
    }
    else if(e.target.dataset.cambiarfecha) {
        document.getElementById('fecha').classList.remove('hidden');
        document.getElementById('fecha-resumen').classList.add('hidden');
        document.getElementById('input-fecha-entrega').focus();
    }
    else if(e.target.dataset.abrircambioresponsable) {
        document.getElementById('bg-black-wall').classList.remove('hidden');
        document.getElementById('popup-cambio-responsable').classList.remove('hidden');
    }
    else if(e.target.dataset.cambiarresponsable) {
        const nuevoNombre = document.getElementById('nombre-responsable-nuevo').value;
        const nuevoDNI = document.getElementById('dni-responsable-nuevo').value;
        document.getElementById('dni-responsable-actual').textContent = nuevoDNI;
        document.getElementById('nombre-responsable-actual').textContent = nuevoNombre;
        cerrarPopups();
    }
    else if(e.target.dataset.pago) {
        const metodos = [...document.getElementById('envio-metodos').querySelectorAll('.metodo')];
        let currentMetodo = '';
        let isMetodoActivo = false;
        let contadorCampos = 0;

        metodos.forEach(metodo => {
            if(metodo.classList.contains('metodo-activo')) {
                currentMetodo = metodo.id;
                isMetodoActivo = true;
                contadorCampos++;
            }
        });

        if(isMetodoActivo) {
            document.getElementById('campo-fail-metodos').classList.add('hidden');

            switch(currentMetodo) {
                case 'metodo-domicilio':
                    const direccion = document.getElementById('direccion-domicilio').value;
                    if(direccion === '') {
                        document.getElementById('direccion-domicilio-fail').classList.remove('hidden');
                    }
                    else {
                        document.getElementById('direccion-domicilio-fail').classList.add('hidden');
                        document.getElementById('modalidad-resumen').textContent = 'ENTREGA A DOMICILIO'
                        document.getElementById('direccion-resumen').textContent = direccion;
                        contadorCampos++;
                    }
                    break;
                case 'metodo-tienda':
                    document.getElementById('modalidad-resumen').textContent = 'RECOJO EN TIENDA'
                    document.getElementById('direccion-resumen').textContent = 'bodega MARISOL - Calle García Rada 341';
                    contadorCampos++;
                    break;
            }
        }
        else {
            document.getElementById('campo-fail-metodos').classList.remove('hidden');
        }

        const date = document.getElementById('input-fecha-entrega').value;
        
        if(date === '') {
            document.getElementById('fecha-entrega-fail').classList.remove('hidden');
        }
        else {
            document.getElementById('fecha-entrega-fail').classList.add('hidden');
            document.getElementById('fecha-dia-resumen').textContent = calcularFechaEntrega(document.getElementById('input-fecha-entrega'));
            document.getElementById('fecha-hora-resumen').textContent = document.getElementById('hora').value;
            contadorCampos++;
        }

        if(contadorCampos === 3) {
            document.getElementById('envio').querySelector('.contenido1').classList.add('hidden');
            document.getElementById('envio').querySelector('.contenido2').classList.remove('hidden');
            document.getElementById('pago').querySelector('.contenido1').classList.remove('hidden');
            document.getElementById('pago').querySelector('.contenido2').classList.add('hidden');
            document.getElementById('btn-finalizar').classList.remove('hidden');
        }
    }
    else if(e.target.dataset.cambiarenvio) {
        document.getElementById('envio').querySelector('.contenido1').classList.remove('hidden');
        document.getElementById('envio').querySelector('.contenido2').classList.add('hidden');
        document.getElementById('pago').querySelector('.contenido1').classList.add('hidden');
        document.getElementById('pago').querySelector('.contenido2').classList.remove('hidden');
        document.getElementById('btn-finalizar').classList.add('hidden');
    }
    else if(e.target.dataset.finalizar){
        const inputs = document.getElementById('pago').querySelectorAll('input');

        [...inputs].forEach(input => {
            if(input.value === ''){
                input.parentNode.querySelector('b').classList.remove('hidden');
            }
            else {
                input.parentNode.querySelector('b').classList.add('hidden');
            }
        });

        console.log(inputs);

        /* document.getElementById('bg-black-wall').classList.toggle('hidden');
        document.getElementById('popup-star').classList.toggle('hidden'); */
    }
    else if(e.target.dataset.abrireditardatos) {
        document.getElementById('bg-black-wall').classList.remove('hidden');
        document.getElementById('popup-editar-datos').classList.remove('hidden');
    }
    else if(e.target.dataset.editardatos) {
        const password = e.target.parentNode.querySelector('#password-editar-datos').value;
        if(password !== '') {
            console.log("Hay algo");
        }
        else {
            console.log("No hay nadaaaaaa!");
        }
    }
});

seteoFechaMinima();

function seteoFechaMinima() {
    document.getElementById('input-fecha-entrega').min = new Date().toISOString().split('T')[0];
}

function calcularFechaEntrega(element) {

    const selectedDate = element.value;
    const date = new Date(selectedDate + "T00:00:00Z");

    const day = date.getUTCDate();
    const month = new Intl.DateTimeFormat('es', { month: 'long'}).format(date);
    const year = date.getUTCFullYear();

    const daysOfWeek = ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"];
    const dayOfWeek = daysOfWeek[date.getUTCDay()];
    const formattedDate = `${dayOfWeek}, ${day} de ${month} del ${year}`;

    return formattedDate;
}

function cerrarPopups() {
    document.getElementById('bg-black-wall').classList.add('hidden');

    [...document.getElementsByClassName('popup')].forEach(popup => {
        popup.classList.add('hidden');
    });
}