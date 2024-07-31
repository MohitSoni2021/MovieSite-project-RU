const allContainer = document.querySelectorAll(".movieCardOuter")
const Loader = document.getElementById("loaderContainer")
const CategoryContainer = document.getElementById("MovieCategory")
const HighlightMoviesContainer = document.getElementById("HighlightedMovies")


const autoScrollingMovieHighlights = ()=>{
    let counter = 0
    setInterval(() => {

        if (counter<Object.keys(HighlightMovies).length){
            HighlightMoviesContainer.children[1].scrollLeft += HighlightMoviesContainer.children[1].clientWidth
            console.log(HighlightMoviesContainer.children[1].scrollLeft)
            console.log(HighlightMoviesContainer.children[1].scrollWidth)
            counter+=1
        }else{
            HighlightMoviesContainer.children[1].scrollLeft = 0
            counter = 0
        }
        
    }, 2000);
}

autoScrollingMovieHighlights()

const HighlightMovies = {
    "Avengers Endgame": "https://img.youtube.com/vi/WhrWYNwEQRc/maxresdefault.jpg",
    "Interstellar": "https://images.hdqwalls.com/wallpapers/interstellar-movie-hd.jpg",
    "MoonFall": "https://cdn.thefpsreview.com/wp-content/uploads/2022/01/moonfall-poster-with-logo-and-tagline.jpg",
    "Lucifer": "https://rare-gallery.com/mocahbig/1359582-Lucifer-Morningstar-Tom-EllisLucifer-4k-Ultra-HD-Wallpaper.jpg",
    "The Duchess":  "https://i2.wp.com/www.plakatwelten.de/wp-content/uploads/2009/09/duchess_xlg.jpg?ssl=1"
}

Object.keys(HighlightMovies).forEach(ele =>{
    let tempChild = document.createElement("div")
    tempChild.setAttribute("class", "fullScreen")
    tempChild.setAttribute("class", "HighlightMoviePosterCover")
    tempChild.innerHTML = `<img src="${HighlightMovies[ele]}" alt="Imge added" class="HighlightedMoviePosterImage" loading="lazy">
                            <div class="NameCover">${ele}</div>`
    HighlightMoviesContainer.children[1].appendChild(tempChild)
})

HighlightMoviesContainer.children[0].addEventListener("click", ()=>{
    HighlightMoviesContainer.children[1].scrollLeft -= HighlightMoviesContainer.children[1].clientWidth
})

HighlightMoviesContainer.children[2].addEventListener("click", ()=>{
    HighlightMoviesContainer.children[1].scrollLeft += HighlightMoviesContainer.children[1].clientWidth
})

let Category = ["Marvel", "documentary", "Space", "series", "Anime"]
allContainer.forEach((element, index) => {
    const outerMovieCardContainer = [... element.children][1]
    console.log(outerMovieCardContainer)
    const getData = async()=>{
        
        const apiResponse = await fetch(`https://www.omdbapi.com/?apikey=fa6b266e&s=${Category[index]}&page=1`)
        const data = await apiResponse.json()
        Loader.style.display = "none";
        CategoryContainer.style.display = "flex"
        CategoryContainer.style.flexDirection = "column"
        for (let i of data.Search) {
            let tempChild = document.createElement("div")
            tempChild.innerHTML = ` <div class="movieCard">
                                        <div class="hoverDetails">
                                            ${i.Title}
                                            <a href="https://www.imdb.com/title/${i.imdbID}/">Details</a>
                                        </div>
                                        <img src="${i.Poster}" alt="https://covers.openlibrary.org/b/olid/${i.Poster}-M.jpg" class="bookImage">
                                    </div>`
            outerMovieCardContainer.children[1].appendChild(tempChild)
        }
    
        outerMovieCardContainer.children[0].addEventListener("click", ()=>{
            outerMovieCardContainer.children[1].scrollLeft -= outerMovieCardContainer.children[1].clientWidth - 150
        })
        
        outerMovieCardContainer.children[2].addEventListener("click", ()=>{
            outerMovieCardContainer.children[1].scrollLeft += outerMovieCardContainer.children[1].clientWidth - 150
        })

        

    }
    
    getData()

});


