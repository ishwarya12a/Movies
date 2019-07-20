// Include form validation functions here
let movieList = [{ title: 'Avatar', box: '$2,787,965,087', active: 'Yes', date: '15/03/2017', genre: 'Science Fiction', teaser: 'Yes' },
{ title: 'The Avengers', box: '$1,787,965,087', active: 'Yes', date: '23/12/2017', genre: 'Superhero', teaser: 'No' },
{ title: 'titanic', box: '$2,787,965,087', active: 'Yes', date: '21/08/2017', genre: 'romance', teaser: 'No' },
{ title: 'Jurasic World', box: '$2,787,965,087', active: 'No', date: '02/07/2017', genre: 'Science Fiction', teaser: 'No' },
{ title: 'Avengers End Game', box: '$2,787,965,087', active: 'No', date: '02/11/2017', genre: 'Superhero', teaser: 'Yes' },];

let favorites = [];
let movieFromStorage = localStorage.getItem('movieList');
if (movieFromStorage === null) {
    localStorage.setItem("movieList", JSON.stringify(movieList));
}
movieFromStorage = JSON.parse(movieFromStorage);

let favoriteFromStorage=localStorage.getItem('favorites');
if(favoriteFromStorage === null){
    localStorage.setItem("favorites",JSON.stringify(favorites));
}
favoriteFromStorage = JSON.parse(favoriteFromStorage);

//admin
const addMovieList = function (movieFromStorage) {
    movieFromStorage.forEach(function (movie) {
        let table = document.querySelector('#admin-table');
        let tr = document.createElement('tr');
        let td1 = document.createElement('td');
        td1.textContent = movie.title;
        let td2 = document.createElement('td');
        td2.textContent = movie.box;
        let td3 = document.createElement('td');
        td3.textContent = movie.active;
        let td4 = document.createElement('td');
        td4.textContent = movie.date;
        let td5 = document.createElement('td');
        td5.textContent = movie.genre;
        let td6 = document.createElement('td');
        td6.textContent = movie.teaser;
        let td7 = document.createElement('td');
        let a = document.createElement('a');
        a.href = "edit-movie.html?title=" + movie.title + "&box=" + movie.box + "&active=" + movie.active +
            "&date=" + movie.date + "&genre=" + movie.genre + "&teaser=" + movie.teaser;
        a.textContent = "Edit";
        td7.appendChild(a);
        tr.appendChild(td1);
        tr.appendChild(td2);
        tr.appendChild(td3);
        tr.appendChild(td4);
        tr.appendChild(td5);
        tr.appendChild(td6);
        tr.appendChild(td7);
        table.appendChild(tr);

    });
}

//customer

function customer(movieList) {
    movieList.forEach(function (movie) {
        let table = document.querySelector('#customer-table');
        let tr = document.createElement('tr');
        let td1 = document.createElement('td');
        td1.textContent = movie.title;
        let td2 = document.createElement('td');
        td2.textContent = movie.box;
        let td3 = document.createElement('td');
        td3.textContent = movie.genre;
        let td4 = document.createElement('td');
        td4.textContent = movie.teaser;
        let td5 = document.createElement('td');
        let a = document.createElement('a');
        a.href = "movie-list-customer-notification.html?title=" + movie.title;
        a.textContent = "Add to Favorite";
        td5.appendChild(a);
        tr.appendChild(td1);
        tr.appendChild(td2);
        tr.appendChild(td3);
        tr.appendChild(td4);
        tr.appendChild(td5);
        table.appendChild(tr);

    });
}


//Edit Movie

function editMovie() {
    var url_string = window.location.href;
    var url = new URL(url_string);
    let title = url.searchParams.get('title');
    let box = url.searchParams.get('box');
    let active = url.searchParams.get('active');
    let date = url.searchParams.get('date');
    let genre = url.searchParams.get('genre');
    let teaser = url.searchParams.get('teaser');
    let titleText = document.querySelector('#title');
    let boxText = document.querySelector('#box');
    let activeText1 = document.querySelector('#activeYes');
    let activeText2 = document.querySelector('#activeNo');
    if (active == "yes")
        document.getElementById("activeYes").checked = true;
    else
        document.getElementById("activeNo").checked = true;
    let dateText = document.querySelector('#date');
    let genreText = document.querySelector('#genre');
    let teaserText = document.querySelector('#teaser');
    if (teaser === "yes")
        document.getElementById("teaser").checked = true;
    else
        document.getElementById("teaser").checked = false;
    titleText.setAttribute('value', title);
    boxText.setAttribute('value', box);
    dateText.setAttribute('value', date);
    genreText.setAttribute('value', genre);
    teaserText.setAttribute('value', teaser);

    document.querySelector('#save').addEventListener('click', function () {
        var title = titleText.value;
        var box = boxText.value;
        var date = dateText.value;
        var genre = genreText.value;
        var teaser = teaserText.value;
        var active;
        if (activeText1.checked) {
            active = activeText1.value;
        }
        if (activeText2.checked) {
            active = activeText2.value;
        }
        var teaser;
        if (teaserText.checked) {
            teaser = 'yes';
        } else {
            teaser = 'no';
        }
        let movieString = localStorage.getItem('movieList');
        let movieList = JSON.parse(movieString);
        let movie = movieList.find(function (movie) {
            return movie.title == title;
        })
        movie.box = box;
        movie.active = active;
        movie.date = date;
        movie.genre = genre;
        movie.teaser = teaser;
        localStorage.removeItem('movieList');
        localStorage.setItem('movieList', JSON.stringify(movieList));
        window.location = "file://D:/final-check/WebContent/edit-movie-status.html";
    })
}


//Add Favorites
function addFavorites() {
    var url_string = window.location.href;
    var url = new URL(url_string);
    let title = url.searchParams.get('title');
    let favorite = movieList.find(function (favorite) {
        return favorite.title === title;
    });
    favoriteFromStorage .push(favorite);
    localStorage.removeItem('favorites');
    localStorage.setItem('favorites', JSON.stringify(favoriteFromStorage ));
}

// view Favorite

function viewFavorite() {
    let table = document.querySelector('#favorite-table');
    favoriteFromStorage.forEach(function (favorite) {
        let tr = document.createElement('tr');
        let td1 = document.createElement('td');
        td1.textContent = favorite.title;
        tr.appendChild(td1);
        let td2 = document.createElement('td');
        td2.textContent = favorite.box;
        tr.appendChild(td2);
        let td3 = document.createElement('td');
        td3.textContent = favorite.genre;
        tr.appendChild(td3);
        let td5 = document.createElement('td');
        let delLink = document.createElement('a');
        delLink.href = "favorites-notification.html?title=" + favorite.title;
        delLink.textContent = "delete";
        td5.appendChild(delLink);
        tr.appendChild(td5);
        table.appendChild(tr);
        console.log(favorites.length);

    });
    let tr1 = document.createElement('tr');
    let tdtotal = document.createElement('td');
    let tdvalue = document.createElement('td');
    tdtotal.textContent = 'No. of Favorite:';
    tdvalue.textContent =tr1.appendChild(tdtotal);
    table.appendChild(tr1);
}
var title = document.title;
if (title === 'Admin') {
    addMovieList(movieFromStorage);
} 
else if (title === 'Edit') {
    editMovie();
}
else if (title === 'Customer') {

    customer(movieList);
}
else if(title === 'Customer-Notification'){
    addFavorites();
    customer(movieList);
}
else if(title === 'Favorites'){
    viewFavorite(movieList);
}
else if(title === 'Favorites Notification'){
    viewFavorite(movieList);
}

