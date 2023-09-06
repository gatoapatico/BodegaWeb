document.addEventListener('click', function(e){
    if(e.target.dataset.comprar){
        document.getElementById('bg-black-wall').classList.toggle('hidden');
        document.getElementById('popup-login').classList.toggle('hidden');
    }
    else if(e.target.dataset.registrate){
        document.getElementById('popup-login').classList.toggle('hidden');
        document.getElementById('popup-registrate').classList.toggle('hidden');
    }
});