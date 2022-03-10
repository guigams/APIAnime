const base_url = "https://api.jikan.moe/v3";


function pesquisaAnime(event){

    event.preventDefault();

    const form = new FormData(this);
    const query = form.get("search");

    fetch(`${base_url}/search/anime?q=${query}&page=1`)
    .then(res=>res.json())
    .then(atualiza)
    .catch(err=>console.warn(err.message));
}

function atualiza(data){

    const pesquisa = document.getElementById('search-results');

    const cartegoria = data.results
        .reduce((acc, anime)=>{

            const {type} = anime;
            if(acc[type] === undefined) acc[type] = [];
            acc[type].push(anime);
            return acc;

        }, {});

        pesquisa.innerHTML = Object.keys(cartegoria).map(key=>{

            const animesHTML = cartegoria[key]
            .sort((a,b)=>a.episodes-b.episodes)
            .map(anime=>{
                // esqueleto das informações da API dos animes
                return `
                    <div class="card">
                        <div class="card-image">
                            <img src="${anime.image_url}">
                        </div>
                        <div class="card-content">
                            <span class="card-title">${anime.title}</span>
                            <p>${anime.synopsis}</p>
                        </div>
                        <div class="card-action">
                            <a href="${anime.url}">Saiba mais</a>
                        </div>
                    </div>
                `
            }).join("");


            return `
                <section>
                    <h3>${key.toUpperCase()}</h3>
                    <div class="kemicofa-row">${animesHTML}</div>
                </section>
            `
        }).join("");
}

function resultado(){
    const form = document.getElementById('search_form');
    form.addEventListener("submit", pesquisaAnime);
}


window.addEventListener("load", resultado);