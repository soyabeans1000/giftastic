//set a few brands
let itemsArray = ["Gucci", "Prada", "Versace", "Louis Vuitton", "Hermes", "Chanel", "Rolex"]

//render buttons from array
function renderbuttons() {
    document.querySelector('#btnsList').innerHTML = ""
    itemsArray.forEach(item => {
        let btnElm = document.createElement('button')
        btnElm.innerHTML = item
        btnElm.className = 'btn shopping_btn'
        btnElm.setAttribute('brand', item)
        document.querySelector('#btnsList').append(btnElm)
        document.querySelector('#btnsList').append(document.createElement('br'))
    })
}

//Display gifs based on keyword, number is how many...
function displayGifs(word, number) {
    document.querySelector('#gif_container').innerHTML = ""
    fetch(`https://api.giphy.com/v1/gifs/search?q=${word}&api_key=V3b70ll8C9vGwtzZvbZAfCdMmTwdwX40&rating=g&limit=10`)
        .then(r => r.json())
        .then(r => {
            r.data.forEach(gif => {

                //get still URL from JSON
                let still = gif.images.fixed_height_still.url

                //get rating from the JSON object
                let rating = gif.rating.toUpperCase();
                let { url: animated
                } = gif.images.fixed_height

                let ratingElement = document.createElement('span')
                ratingElement.className = 'rating_text'
                let gifElem = document.createElement('img')
                gifElem.className = "gif_img img-fluid rounded"

                //set URL of still image
                gifElem.setAttribute('src', still)
                gifElem.setAttribute('data-still', still)
                gifElem.setAttribute('data-toggle', 'OFF')
                //set URL of animated image
                gifElem.setAttribute('data-animated', animated)
                gifElem.setAttribute('alt', word)  
                //Display Rating above the gif image              
                ratingElement.innerHTML = `Rating: ${rating}<br>`
                ratingElement.appendChild(gifElem)
                document.querySelector('#gif_container').append(ratingElement)
            })

        })
        //catch any errors
        .catch(e => console.error(e))
}

    //Event Listener for entire document
    document.addEventListener('click', (event) => {

        //if Brand Button clicked
    if (event.target.className === 'btn shopping_btn') {
      
        let brand = event.target.getAttribute('brand')
        displayGifs(brand, 10)

        //if gif image clicked
    } else if (event.target.className === 'gif_img img-fluid rounded') {

       
        let {
            still,
            animated, toggle
        } = event.target.dataset
        
        //Turn On and Off               
        if (toggle === 'OFF')
        toggle = 'ON';
        else 
        toggle = 'OFF';

        //Image needs to be animated
        if (toggle === 'ON') {
            event.target.setAttribute('src', animated)
           }
        else {
            event.target.setAttribute('src', still)
        }

        //Set Toggle Attribute of Image 
        event.target.setAttribute('data-toggle',toggle)   

    }

    //if Submit Button Clicked
    if (event.target.className === 'btn btn-warning') {
        event.preventDefault()
        let newItem = document.querySelector('#moreItems').value
        displayGifs(newItem, 10)
        //add new item to array
        itemsArray.push(newItem)
        //render all the buttons again
        renderbuttons()
    }
  })

//render brand buttons and initialize gif area with first item in array
renderbuttons()
displayGifs(itemsArray[0], 10)