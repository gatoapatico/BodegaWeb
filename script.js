document.addEventListener('click', function(e){
    if(e.target.dataset.black){
        document.getElementById('logo-header').click();
    }
    else if(e.target.dataset.comprar){
        document.getElementById('bg-black-wall').classList.toggle('hidden');
        document.getElementById('popup-login').classList.toggle('hidden');
    }
    else if(e.target.dataset.registrate){
        document.getElementById('popup-login').classList.toggle('hidden');
        document.getElementById('popup-registrate').classList.toggle('hidden');
    }
    else if(e.target.dataset.finalizar){
        document.getElementById('bg-black-wall').classList.toggle('hidden');
        document.getElementById('popup-star').classList.toggle('hidden');
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
                break;
            case "tienda":
                document.getElementById('metodo-tienda').classList.add('metodo-activo');
                document.getElementById('metodo-domicilio').classList.remove('metodo-activo');
                break;
        }
    }
});