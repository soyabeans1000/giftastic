
	
			 let toggle = true

			 let itemsArray = ["Gucci", "Prada", "Versace", "Louis Vuitton", "Hermes", "Chanel", "Rolex"]


			 function renderbuttons()
			 	 {

					document.querySelector('#btnsList').innerHTML = ""
					itemsArray.forEach(item =>{
				let btnElm = document.createElement('button')
        btnElm.innerHTML = item
        btnElm.className = 'btn shopping_btn'
        btnElm.setAttribute('brand', item)
        document.querySelector('#btnsList').append(btnElm)
			document.querySelector('#btnsList').append(document.createElement('br'))
   		 })

			}
			 function displayGifs(word,number)
			 {

			   document.querySelector('#gif_container').innerHTML = ""

			   fetch(`https://api.giphy.com/v1/gifs/search?q=${word}&api_key=V3b70ll8C9vGwtzZvbZAfCdMmTwdwX40&rating=g&limit=10`)
			   .then(r => r.json())
			   .then(r => {
			     r.data.forEach(gif => {

			      // console.log(gif)
					 let still = gif.images.fixed_height_still.url

					 let rating = gif.rating.toUpperCase();

					// console.log(r)					 					 
					// console.log( "Still?=?" + still + gif.images.fixed_width_still)
					 let { url: animated } = gif.images.fixed_height
					 
					 //console.log( "animate?=?" + animated + gif.images.fixed_width)

						let ratingElement = document.createElement('span')
						
						ratingElement.className = 'rating_text'
						

					
			       let gifElem = document.createElement('img')
						 gifElem.className = "gif_img"
						 gifElem.setAttribute('src', still)
						 gifElem.setAttribute('data-still', still)
			       gifElem.setAttribute('data-animated', animated)
			       gifElem.setAttribute('alt', word)
			       //document.querySelector('#gif_container').append(gifElem)

						 ratingElement.innerHTML = `Rating: ${rating}<br>`
						 //ratingElement.innerHTML = `Rating: ${rating}<br><img src=${still} alt="Test">`

						 ratingElement.appendChild(gifElem)

						 document.querySelector('#gif_container').append(ratingElement)

						console.log(ratingElement.innerHTML)
						 //document.querySelector('#gif_container').append(gifElem)

					
						


			     })

			      })
				 .catch(e => console.error(e))
			 }

			document.addEventListener('click', (event) => {

//				.catch(e => console.error(e))       

			console.log("Inside Event Listener")
			if (event.target.className === 'btn shopping_btn') {
					 console.log("Inside Event Listener")
			   let brand = event.target.getAttribute('brand')	 
			displayGifs(brand,10)
			   
			    } else if (event.target.className === 'gif_img') {
			     toggle = !toggle
				let { still, animated } = event.target.dataset
				console.log("Toggle=>" + toggle + "Still=> " + still + "animated=>" + animated )
			    if (toggle) {
					event.target.setAttribute('src', animated)
					console.log( "inside toggle true=> " + toggle + "Still=> " + still + "animated=>" + animated )
		      } else {
						event.target.setAttribute('src', still)
						console.log("Toggle false=> " + toggle + "Still=> " + still + "animated=>" + animated )
					}
			   }
						
		            if (event.target.className === 'btn btn-primary') {

                event.preventDefault()

                console.log("Submit Btn Pressed")

								let newItem = document.querySelector('#moreItems').value
								displayGifs(newItem, 10)
								
								itemsArray.push(newItem)
								renderbuttons()

             }


			})

			renderbuttons()
			displayGifs(itemsArray[0],10)
			