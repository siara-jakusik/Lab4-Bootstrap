const pokemones = document.getElementById("pokemones");

const xhr = new XMLHttpRequest();
const xhrPokebola = new XMLHttpRequest();

//imagen de pokebola en el titulo
xhrPokebola.open("GET", "https://pokeapi.co/api/v2/item/poke-ball", true);

xhrPokebola.onload = function () {
  if (xhrPokebola.status === 200) {
    const pokebola = JSON.parse(xhrPokebola.responseText);

    const imagenPokebola = document.getElementById("pokebola");
    imagenPokebola.src = pokebola.sprites.default;
  }
};
xhrPokebola.send();

xhr.open("GET", "https://pokeapi.co/api/v2/pokemon?limit=30", true);

xhr.onload = function () {
  if (xhr.status === 200) {
    const datos = JSON.parse(xhr.responseText);

    for (let i = 0; i < datos.results.length; i++) {
      const xhrPokemon = new XMLHttpRequest();

      xhrPokemon.open("GET", datos.results[i].url, true);

      xhrPokemon.onload = function () {
        if (xhrPokemon.status === 200) {
          const pokemon = JSON.parse(xhrPokemon.responseText);

          const xhrEspecie = new XMLHttpRequest();
          xhrEspecie.open("GET", pokemon.species.url, true);

          xhrEspecie.onload = function () {
            if (xhrEspecie.status === 200) {
              const especie = JSON.parse(xhrEspecie.responseText);

              //colunma
              const columna = document.createElement("div");
              columna.className = "col-12 col-md-6 col-lg-3";

              //tarjeta
              const tarjeta = document.createElement("div");
              tarjeta.className = "card shadow text-center border-0";

              //imagen
              const imagen = document.createElement("img");
              imagen.src = pokemon.sprites.front_default;
              imagen.className ="w-50 mx-auto mt-4 bg-light rounded-circle p-2";

              //cuerpo de la tarjeta
              const cuerpo = document.createElement("div");
              cuerpo.className = "card-body";

              //nombre
              const nombre = document.createElement("h2");
              nombre.textContent = pokemon.name;
              nombre.className = "card-title text-capitalize fw-bold fs-3";
              //informacion adicional
              const verInformacion = document.createElement("p");
              verInformacion.textContent = "Ver mas >>";
              verInformacion.className = "text-primary fw-bold";
              verInformacion.style.cursor = "pointer";

              const informacion = document.createElement("div");
              informacion.className = "d-none";

              //categoria
              let categoriaTexto = "Sin categoría";

              for (let j = 0; j < especie.genera.length; j++) {
                if (especie.genera[j].language.name === "es") {
                  categoriaTexto = especie.genera[j].genus;
                }
              }

              const categoria = document.createElement("p");
              categoria.textContent = "Categoría: " + categoriaTexto;

              //tipo
              const tipo = document.createElement("p");
              tipo.textContent = "Tipo: " + pokemon.types[0].type.name;

              //altura
              const altura = document.createElement("p");
              altura.textContent = "Altura: " + pokemon.height / 10 + " m";

              //peso
              const peso = document.createElement("p");
              peso.textContent = "Peso: " + pokemon.weight / 10 + " kg";

              //estadisticas
              const tituloEstadisticas = document.createElement("h5");
              tituloEstadisticas.textContent = "Estadísticas";

              //fila de estadisticas
              const estadisticas = document.createElement("div");
              estadisticas.className = "row text-center mt-3";

              //hp
              const hp = document.createElement("div");
              hp.className = "col-6 mb-3";
              hp.innerHTML ="<strong>HP</strong><br>" + pokemon.stats[0].base_stat;

              //ataque
              const ataque = document.createElement("div");
              ataque.className = "col-6 mb-3";
              ataque.innerHTML = "<strong>Ataque</strong><br>" + pokemon.stats[1].base_stat;

              //defensa
              const defensa = document.createElement("div");
              defensa.className = "col-6 mb-3";
              defensa.innerHTML = "<strong>Defensa</strong><br>" + pokemon.stats[2].base_stat;

              //velocidad
              const velocidad = document.createElement("div");
              velocidad.className = "col-6 mb-3";
              velocidad.innerHTML ="<strong>Velocidad</strong><br>" + pokemon.stats[5].base_stat;
              //agregar a la fila de estadistica
              estadisticas.appendChild(hp);
              estadisticas.appendChild(ataque);
              estadisticas.appendChild(defensa);
              estadisticas.appendChild(velocidad);

              //agregar caracteristicas a informacion adicional
              informacion.appendChild(tipo);
              informacion.appendChild(altura);
              informacion.appendChild(peso);

              informacion.appendChild(tituloEstadisticas);
              informacion.appendChild(estadisticas);

              //boton para ver informacion adicional
              verInformacion.addEventListener("click", function () {
                if (informacion.classList.contains("d-none")) {
                  informacion.classList.remove("d-none");

                  verInformacion.textContent = "Ver menos <<";
                } else {
                  informacion.classList.add("d-none");

                  verInformacion.textContent = "Ver mas >>";
                }
              });

              //tarjeta completa
              cuerpo.appendChild(nombre);
              cuerpo.appendChild(verInformacion);
              cuerpo.appendChild(informacion);

              tarjeta.appendChild(imagen);
              tarjeta.appendChild(cuerpo);

              columna.appendChild(tarjeta);

              pokemones.appendChild(columna);
            }
          };
          xhrEspecie.send();
        }
      };
      xhrPokemon.send();
    }
  }
};
xhr.send();