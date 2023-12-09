const form = document.getElementById('myForm');
form.addEventListener('submit',addBook);
const bookContainer = document.querySelector('.container');
const returnedBooksContainer = document.querySelector('.returned-books');
async function addBook(e){
    e.preventDefault();
    console.log(e.target.book.value);
    const bookDetails = {
        name:e.target.book.value,
        takenOn:new Date().toLocaleString(),
        returnDate: new Date(new Date().getTime() + 60 * 60 * 1000).toLocaleString(),
        fine:0,
    }
    const res = await axios.post('http://localhost:3000/add-book',bookDetails);

    console.log(res.data);
    showBook(res.data)
}
function showBook(bookDetails){
    
    const div = document.createElement('div');
    div.className='book-details';
    div.innerHTML=` <p>Book Name: ${bookDetails.name}</p>
    <p>Book taken on : ${bookDetails.takenOn}</p>
    <p>Book return date : ${bookDetails.returnDate}</p>
    <p>current fine : <span>${calculateFine(bookDetails.returnDate)}</span></p>
    <button id="${bookDetails.id}" onClick='returnBook(${bookDetails.id})'} class="btn btn-success">Return Book</button>`;
    bookContainer.append(div);
}
function calculateFine(returnDateString){
    const returnDate = new Date(returnDateString);

    const currentDate = new Date();
    const fineRate = 10;
    const timeDiff = Math.max(0,(currentDate - returnDate) / (1000*60));
    const fineAmount = fineRate*timeDiff;
    // console.log(fineAmount.toFixed(2));
    return fineAmount.toFixed(2)
}
async function returnBook(id){
    // console.log(id);
    const element = document.getElementById(id);
    // console.log(element.children[0]);
    const span = element.previousElementSibling.children[0];
    const fine = span.innerHTML;
    console.log(fine);
    if(fine!=='0.00'){
        // console.log('hello')
        
    }
    try{
        const res = await axios.get(`http://localhost:3000/return-book?id=${id}&fine=${fine}`);
        showReturnedBooks(res.data);
        bookContainer.removeChild(element.parentElement);
    }
    catch(error){console.log(error)}
}
window.addEventListener('DOMContentLoaded', async () =>{
    try {
        const res = await axios.get('http://localhost:3000/get-books');
        res.data.forEach((element) => {
            if(element.returnedBook){
                showReturnedBooks(element)
            }
            else showBook(element)
        })
    } catch (error) {
        console.log(error)
    }
})
function showReturnedBooks (book){
    const div = document.createElement('div');
    div.className='m-3 return';
    div.innerHTML=`<p>Book Name: ${book.name}</p>
    <p>Fine : ${book.fine}</p>
    <p>Returned on: ${book.returnedDate}</p>`
    returnedBooksContainer.appendChild(div);
}