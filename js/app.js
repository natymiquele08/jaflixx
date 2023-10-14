document.addEventListener("DOMContentLoaded", async () => {
    
  let title;
  let tagline;
  let vote_average; 
  let divs; 
  
 
  async function fetchURL(url) {
    try {
      const response = await fetch(url);
      if (response.ok) {
        return response.json();
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      throw error;
    }
  }

  const pelis = await fetchURL(
    "https://japceibal.github.io/japflix_api/movies-data.json"
  );
  

  let btnBuscar = document.getElementById("btnBuscar");
  btnBuscar.addEventListener("click", () => {
  divs = document.createElement("div");
  
  function searchFilter() {
    let searchBar = document.getElementById("inputBuscar").value.trim().toLowerCase();
    if(searchBar !== " ") {
      
        const peliFiltrada = pelis.filter((peli => 
            peli.title.toLowerCase().includes(searchBar) ||
            peli.tagline.toLowerCase().includes(searchBar) ||
            peli.overview.toLowerCase().includes(searchBar) ||
            peli.genres.filter(({ name }) => name.toLowerCase().includes(searchBar)).length > 0

    ));
    
    let lista = document.getElementById("lista");
    lista.innerHTML = '';
      for (let i = 0; i < peliFiltrada.length; i++) {
        title = peliFiltrada[i].title;
        tagline = peliFiltrada[i].tagline;
        vote_average = parseInt(peliFiltrada[i].vote_average)
        divs.style.display = "block";
        let estrellas = `<div class=" vote_average">`;
        estrellas.innerHTML = '';
        for (let j = 0; j < Math.floor(vote_average / 2); j++) {
          estrellas += `<i class="fa fa-star checked"></i>`;
        }
        let estrellasVacias = (10 - vote_average) / 2;
        for (let k = 0; k < estrellasVacias; k++) {
          estrellas += `<i class="fa fa-star"></i>`;
        }
        estrellas += "</div> ";
       
        divs.innerHTML += `
                <div class="text-bg-dark me-sm-3 pt-5 px-3 pt-md-5 px-md-5">
                    <div class="my-2 py-2">
                          <div class="d-flex shadow justify-content-between ">
                              <p class="h2 fw-normal text-white" >${title}</p> 
                              <p class="text-white">${tagline}</p>
                              <small class="me-3 mt-2 text-white"> ${estrellas}</small>
                          </div>   
                      </div>     
                  </div>
                `;
        lista.appendChild(divs);
      }
    };
  }; searchFilter()
});
    
  /* function mostrarPelicula(peliculas) {
    
    let lista = document.getElementById("lista");
    for (let i = 0; i < peliculas.length; i++) {
      title = peliculas[i].title;
      tagline = peliculas[i].tagline;
      vote_average = parseInt(peliculas[i].vote_average)
      divs = document.createElement("div");
      divs.style.display = "none";
      
      let estrellas = `<div class=" vote_average">`;
      for (let j = 0; j < Math.floor(vote_average / 2); j++) {
        estrellas += `<i class="fa fa-star checked"></i>`;
      }
      let estrellasVacias = (10 - vote_average) / 2;
      for (let k = 0; k < estrellasVacias; k++) {
        estrellas += `<i class="fa fa-star"></i>`;
      }
      estrellas += "</div> ";

      divs.innerHTML += `
              <div class="text-bg-dark me-sm-3 pt-5 px-3 pt-md-5 px-md-5">
                  <div class="my-2 py-2">
                        <div class="d-flex shadow justify-content-between ">
                            <p class="h2 fw-normal text-white" >${title}</p> 
                            <p class="text-white">${tagline}</p>
                            <small class="me-3 mt-2 text-white"> ${estrellas}</small>
                        </div>   
                    </div>     
                </div>
              `;
      lista.appendChild(divs);
    }
  } */

  // Al clickear cada pelicula abrir offcanvas y mostrar: title, overview y lista de genres.
  /*OFFCANVAS: MOSTRAR DATOS DE LA PELI ARRIBA:
    
    <div class="offcanvas offcanvas-top" tabindex="-1" id="offcanvasTop" aria-labelledby="offcanvasTopLabel">
      <div class="offcanvas-header">
        <h5 class="offcanvas-title" id="offcanvasTopLabel"> ${title} </h5>
        <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
      </div>
      <div class="offcanvas-body">
        <p>${overview}</p>
        <hr>
        <p>${genres}</p>
          <div id="menuPelis" class="dropdown">
          <button class="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
          More
          </button>
          <ul class="dropdown-menu">
            <li>Year: ${year}</li>
            <li>Runtime: ${runtime}</li>
            <li>Budget: ${budget} </li>
            <li>Revenue: ${revenue} </li>
          </ul>
      </div>
      </div>
    </div>
    
    
    */
});
