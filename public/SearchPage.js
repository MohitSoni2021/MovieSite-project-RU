const SearchComponent = document.getElementById('SearchComponent')
const ResultWindow = document.getElementById('ResultWindow')

SearchComponent.children[1].addEventListener('click', async()=>{
    const SearthQuery = SearchComponent.children[0].value
    ResultWindow.innerHTML = '' 
    ResultWindow.innerHTML = `  <div id="loaderContainer">
                                    <div class="loader"></div>
                                </div>`
    const apiResponse = await fetch(`https://www.omdbapi.com/?apikey=fa6b266e&s=${SearthQuery}&page=1`)
    const data = await apiResponse.json()
    ResultWindow.innerHTML = ""
    if (data.Response == "True"){
        data.Search.forEach(element => {
            let dummyElement = document.createElement('div')
            dummyElement.setAttribute('class', 'MovieCardOuterShell relative')
            dummyElement.innerHTML = `<div class="infoContainer absolute flex">${element.Title} <a href="https://www.imdb.com/title/${element.imdbID}/">IMDB link</a></div>
                            <img class="ImageFull" src="${element.Poster}" alt="${element.Title}">`
            ResultWindow.appendChild(dummyElement)
        });
    }
    else {
        let errorBox =  document.createElement('div')
        errorBox.setAttribute('class', 'EmptyDisplayMessage')
        errorBox.style.color = 'red';
        errorBox.innerHTML = 'No movie found. 😞'
        ResultWindow.appendChild(errorBox)
    }
    
})