const searchBook = () =>{
    // input value 
    let searchText = document.getElementById('search-book').value;
    // spiner and booksList display property
    visibility('spinner', 'block');
    visibility('booksList', 'none');
    visibility('search-count', 'none');
    booksList(searchText);
    document.getElementById('search-book').value ='';
}

const visibility = (ID, displayStyle) =>{
    document.getElementById(ID).style.display = displayStyle;
}

// book-archive api 
const booksList = (searchText)=>{   
    if(searchText ==''){
        alert("Please enter a valid book's name");
    }
    let url =`https://openlibrary.org/search.json?q=${searchText}`
    fetch(url)
    .then(response => response.json())
    .then(data => displayBooks(data.docs))   
}

const displayBooks = (book) =>{
    console.log(book);
    let searchResult = book.length;
    document.getElementById('counter').innerText = `${searchResult}`;
    let booksDiv = document.getElementById('booksList');
    booksDiv.textContent = '';
    if(searchResult === 0){
        booksDiv.innerHTML =`<h2 class="text-danger empty-result"> No result found </h2>`;
    }
    book?.forEach(bookDetails => {
        let img = bookDetails.cover_i;
        let bookDiv = document.createElement('div');
        bookDiv.classList.add('single-book');
        bookDiv.innerHTML = `
        <img src="https://covers.openlibrary.org/b/id/${img? img:10909258}-M.jpg">
        <h4 class="pt-3">Name: ${bookDetails.title}</h4>
        <p>Author: ${bookDetails.author_name? bookDetails.author_name[0]:''}</p>
        <p>Publisher: ${bookDetails.publisher? bookDetails.publisher[0]:''}</p>
        <p>First published: ${bookDetails.first_publish_year? bookDetails.first_publish_year:'' }</p>
        
        `;
        booksDiv.appendChild(bookDiv);
    });

    visibility('spinner', 'none');
    visibility('booksList', 'grid');
    visibility('search-count', 'block');
}
