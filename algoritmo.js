const divContenedorProductos = document.querySelector("#contenedor-productos");
const selectCantProductosMostrar = document.querySelector("#opc-cant");
const selectCantProdPermitida = document.querySelector("#opc-cant-permitida");
const selectColorConfig = document.querySelector("#opc-color");
const pInfoConfProd = document.querySelector("#info-opc-prod p");

const vectImg = [
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSuqAwUgV130FuvVB0Qq6PEiA3MPkCY_vawXWHkzaTOE0qVrjm3-WBBMgs5sBFh2CiNpCk&usqp=CAU",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcThHO1Nft5229i95idKSE_rO-mUGKdoEuGpOQ&usqp=CAU",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTuMRaxeHn-FC0LRPYkI2C-fU9T0dXX5TTxDw&usqp=CAU",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSiKXuB1ajyggGzTv8LEPuKdjevePdjK_Hmog&usqp=CAU",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSf1L3j1Qpl5c54RT1YGmswM34UbXk7bUCD2g&usqp=CAU",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTVgQERHhSlClBvezwQJsFdMr0hC7800u3hAQ&usqp=CAU",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQM1ZNLuzA_tQwSHuzuSpzlaX3JPyqdKWjnzvzw2QybyU0Rjp8oDKvljrEdNmArmfHfOvM&usqp=CAU",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS-bTNPvkIn3jv28MHIgMnrTYfpJ4zC9G4Ktw&usqp=CAU",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQr8_jIwst8QqpxIGH--oIUdRMaiX1d18XLwSC-5qe4Pny7TPhVRcAJDc-00LwYaSMRLX0&usqp=CAU",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSfbeMe6kytRpOmjvNr1jLC2eXghIAnmKsGfw&usqp=CAU" 
];

const CSS_CLASE_CONFIG = "conf-color-";

/**
 * Inicia el reinicio de productos a mostrar en la pagina
 */
function reiniciarProdMostrar(){
    let cantProdMostrar = parseInt(selectCantProductosMostrar.value);
    let cantProdPermitidos = parseInt(selectCantProdPermitida.value);
    let confColorProd = parseInt(selectColorConfig.value);
    htmlGenerarProductos(cantProdMostrar, cantProdPermitidos, confColorProd);
    mostrarInfoConfProd(cantProdMostrar, cantProdPermitidos, confColorProd);
}


/**
 * Muestra en la pagina la info seleccionada por el usuario para los productos
 * @param {Number} cantProdMostrar en la pagina
 * @param {Number} cantProdPermitidos a comprar en la pagina por producto
 * @param {Number} confColorProd en valor numerico correspondiente a la opcion de color seleccionada
 */
function mostrarInfoConfProd(cantProdMostrar, cantProdPermitidos, confColorProd) {
    pInfoConfProd.innerHTML = `
        La cantidad de productos a mostrar es: ${cantProdMostrar}<br>
        La cantidad de productos permitidos por compra es: ${cantProdPermitidos}<br>
        Los colores seleccionados a usar son: ${selectColorConfig[confColorProd].innerHTML}
    `;
}

/**
 * Genera el html para agregar productos segun los valores requeridos
 * @param {Number} cantidadProd a agregar en la pagina
 * @param {Number} cantPermitida a comprar de cada producto
 * @param {Number} confColorProd en valor numero correspondiente a la opcion de color seleccionada
 */
function htmlGenerarProductos(cantidadProd, cantPermitida, confColorProd){
    let claseCssUsar = CSS_CLASE_CONFIG + confColorProd + "-";
    divContenedorProductos.innerHTML = "";
    for (let i = 0; i < cantidadProd; i++) {
        divContenedorProductos.innerHTML +=`
            <div class="producto ${(alternarColores(i, claseCssUsar))}" id="producto-${i}">
                <p>Producto ${i+1}</p>
                <div class="producto-img">
                    <img src="${vectImg[i]}" alt="producto ${i}">
                </div>
                ${htmlGenerarOpcionesPago(i)}
                ${htmlGenerarOpcionesCant(i, cantPermitida)}
                <button>Comprar</button>
            </div>
        `;        
   }
}

/**
 * Genera el html necesario para mostrar una lista con las cantidades permitidas por compra
 * @param {Number} i numero del producto
 * @param {Number} cantPermitida para compras del producto
 * @returns el elemento para mostrar opciones de cantidad permitida por compra
 */
function htmlGenerarOpcionesCant(i, cantPermitida){
    return `
        <label for="cantidad-compra-prod-${i}">Seleccione cantidades</label>
        <select id="cantidad-compra-prod-${i}">
            ${htmlGenerarOpciones(cantPermitida)}
        </select>
    `;
}



/**
 * Devuelve el html necesario para agregar una lista de opciones de pago
 * @param {Number} i numero del producto
 * @returns el html necesario para agregar una lista de opciones de pago
 */
function htmlGenerarOpcionesPago(i){
    return `
        <label for="producto${i}-tipo-pago">Seleccione pago</label>
        <select id="producto${i}-tipo-pago">
            <option value="">Efectivo</option>
            <option value="">Debito</option>
            <option value="">Credito</option>
        </select>
    `;
}

/**
 * Devuelve el html de la cantidad de opciones requeridas
 * @param {Number} cant de opciones a generar
 * @returns el html con la cantidad de opciones generadas correspondientes
 */
function htmlGenerarOpciones(cant){
    let opcionesHtml = "";
    for (let i = 0; i < cant; i++) {
        opcionesHtml += `
            <option value="${i+1}">${i+1}</option>
        `;
    }
    return opcionesHtml;
}

/**
 * Modifica la clase de css a la correspondiente dependinedo del numero de
 * producto a agregar
 * @param {Number} i numero del producto actual a agregar
 * @param {String} claseCssUsar que necesita ser modificada
 * @returns la clase de css correspondiente a agregar para el producto
 */
function alternarColores(i, claseCssUsar){
    return ((i%2) ? claseCssUsar+"b" : claseCssUsar+"a");
}