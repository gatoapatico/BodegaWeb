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
});