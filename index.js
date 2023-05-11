const book = document.getElementById("bookName")
const writer = document.getElementById("writerName")
const btn = document.getElementById("addBtn")
const updateBtn = document.getElementById("updateBtn") 
let id= null

btn.addEventListener("click", async function addBook(){
    const res = await fetch("http://localhost:3000/books", {
            method: 'POST', 
            headers: {
                'Content-type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({
                name: book.value,
                writer:writer.value
            })
        })
        const data = await res.json()
        console.log(data)
        getAllBooks()
    })
const booksDiv = document.getElementById("books")

updateBtn.addEventListener("click", async function (){
    const update = await fetch(`http://localhost:3000/books/${id}`,{
            method: 'PATCH', 
            headers: {
                'Content-type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({
                name: book.value,
                writer:writer.value
            })
        })
        const data = await update.json()
        console.log(data)
        getAllBooks()
    })
const bookDiv = document.getElementById("book")

const getAllBooks = async function(){
    const res = await fetch("http://localhost:3000/books")
    const data = await res.json()
    while (booksDiv.firstChild) {
        booksDiv.removeChild(booksDiv.lastChild);
    }
    data.forEach((e)=>{
        const  p = document.createElement('p')
        p.innerText = `Id: ${e.id}, Book Name: ${e.name}, Writer: ${e.writer}`
        booksDiv.appendChild(p)
        
        const deleteBtn = document.createElement('button')
        deleteBtn.innerText = "delete"
        deleteBtn.addEventListener("click", async function(){
            await fetch(`http://localhost:3000/books/${e.id}`,{method: 'DELETE'})
            getAllBooks()
        })
        booksDiv.appendChild(deleteBtn)


        const editBtn = document.createElement('Button')
        editBtn.innerText = "editButton"
        editBtn.addEventListener("click", async function(){
            book.value = e.name
            writer.value = e.writer
            id = e.id
        })
        booksDiv.appendChild(editBtn)

    })
}

getAllBooks()