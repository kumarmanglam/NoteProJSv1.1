
let notes = [];
const init = () => {
  const data = localStorage.getItem("notes");
  notes = data ? JSON.parse(data) : [];
  notesView();
  // emptyView(data);
}

const handleSubmit = (event) => {
  event.preventDefault();
  const title = document.querySelector(".title");
  const text = document.querySelector(".text");
  if (title.value || text.value) {
    const note = {
      'id': Date.now(),
      'title': title.value,
      'text': text.value,
      'type': "note"
    }
    notes.push(note);
    localStorage.setItem("notes", JSON.stringify(notes));
    title.value = "";
    text.value = "";
    const main = document.querySelector(".main");
    main.appendChild(createCard(note))
  }
}

const createCard = (note) => {
  const card = document.createElement("div");
  card.classList.add("card");
  card.setAttribute("data-id", note.id);
  card.setAttribute("draggable", true);
  const cardContent = document.createElement("div");
  cardContent.classList.add("card-content");
  const head = document.createElement("p");
  head.classList.add("head");
  head.textContent = note.title;
  const body = document.createElement("p");
  body.classList.add("body");
  body.textContent = note.text;
  const cardActions = document.createElement("div");
  cardActions.classList.add("card-actions");

  const editBtn = document.createElement("button");
  editBtn.classList.add("edit-btn");
  editBtn.classList.add("btn");
  editBtn.textContent="Edit"
  editBtn.setAttribute("onclick", "handleEdit(event)");

  const delBtn = document.createElement("button");
  delBtn.classList.add("del-btn");
  delBtn.classList.add("btn");
  const deleteIcon = document.createElement('img');
  deleteIcon.src = "./icons/delete-icon.svg";
  deleteIcon.classList.add("delete-icon");
  delBtn.setAttribute("onclick", "handleDelete(event)");

  const archiveBtn = document.createElement("button");
  archiveBtn.classList.add("arc-btn");
  archiveBtn.classList.add("btn");
  archiveBtn.setAttribute("onclick", "handeNoteToArchive(event)");
  const arcIcon = document.createElement('img');
  arcIcon.src = "./icons/archive.svg";
  arcIcon.classList.add("arcIcon");

  card.appendChild(cardContent);
  cardContent.appendChild(head);
  cardContent.appendChild(body);
  card.appendChild(cardActions);
  cardActions.appendChild(editBtn);
  cardActions.appendChild(delBtn);
  delBtn.appendChild(deleteIcon);
  cardActions.appendChild(archiveBtn);
  archiveBtn.appendChild(arcIcon);
  return card;
}

const notesView = () => {
  const main = document.querySelector(".main");
  main.innerHTML = "";
  notes.forEach(
    note => {
      if(note.type == "note"){
        const newNote = createCard(note);
        main.appendChild(newNote);
      }
    }
  )
}
const handleDelete = (event) => {
  // console.log("hi");
  // console.log(event.target.parentElement.parentElement.parentElement);
  const currCard = event.target.parentElement.parentElement.parentElement
  const currId = currCard.getAttribute("data-id")
  // console.log(currId);
  const newNotes = notes.filter(note => note.id != currId);
  // console.log(newNotes);
  notes = newNotes;
  localStorage.setItem("notes", JSON.stringify(notes));
  notesView();
}
const handleEdit = (event) => {
  const currCard = event.target.parentElement.parentElement;
  const currId = currCard.getAttribute("data-id");
  const dialogueBox = document.querySelector(".dialogue-box");
  dialogueBox.setAttribute("data-card-id",currId);
  // console.log(currId);
  // const wrapper = document.querySelector(".wrapper");
  // wrapper.classList.add("fade-out");
  const dialBox = document.querySelector(".dialogue-box");
  dialBox.classList.add("dialogue-active");

  
  const dialHead = dialBox.querySelector(".dial-head");
  const dialText = dialBox.querySelector(".dial-text");
  notes.forEach(note => {
    if(note.id == currId){
      dialHead.textContent = note.title;
      dialText.textContent = note.text;
    }
  })

}
const handeNoteToArchive = (event) => {
  const currCard = event.target.parentElement.parentElement.parentElement;
  const currId = currCard.getAttribute("data-id");
  // console.log(event.target.parentElement.parentElement.parentElement);
  notes.forEach(note => {
    if(note.id == currId){
      note.type = "archive";
    }
  });
  localStorage.setItem("notes", JSON.stringify(notes));
  notesView();
}

const closeDialogue = (event) => {
  const dialBox = document.querySelector(".dialogue-box");
  dialBox.classList.remove("dialogue-active");
  // const wrapper = document.querySelector(".wrapper");
  // wrapper.classList.remove("fade-out");

  
  const dialogueBox = document.querySelector(".dialogue-box");
  const currId = dialogueBox.getAttribute("data-card-id");
  console.log(currId);
  const dialHead = dialBox.querySelector(".dial-head");
  const dialText = dialBox.querySelector(".dial-text");

  notes.forEach(note => {
    if(note.id == currId){
      note.title = dialHead.textContent;
      note.text = dialText.textContent;
    }
  })
  localStorage.setItem("notes", JSON.stringify(notes));
  console.log(notes);
  notesView();
}
// const emptyView = (data) => {
//   const empty = document.createElement("div");
//   empty.classList.add("empty")
//   const p = document.createElement("p");
//   p.textContent = "Notes you add appear here"
//   empty.appendChild(p);

//   const main = document.querySelector(".main");
//   if(!data){
//     main.appendChild(empty);
//   }
// }

function showTitle() {
  const titleInput = document.querySelector('.input.title');
  titleInput.classList.add('focus-visible');
}
// function hideTitle() {
//   console.log("hiis")
//   const titleInput = document.querySelector('.input.title');
//   // titleInput.classList.remove('focus-visible');
//   titleInput.style.display = "none"; 
// }


// const openSidebar = () =>{

// }
// const closeSidebar = () => {

// }

const toggleSidebar = () => {
  const sidebar = document.querySelector(".sidebar");
  const listItemTexts = document.querySelectorAll(".list-item-text");
  sidebar.classList.toggle("sidebarOpen");
  listItemTexts.forEach(itemText => itemText.classList.toggle("sidebarOpen"));
}


// function handleMouseMovement(event) {
//   const mouseX = event.clientX;
//   console.log(mouseX);
//   if (mouseX < 80) {
//     toggleSidebar();
//   }
//   if (mouseX > 240) {
//     toggleSidebar();
//   }
// }

// document.addEventListener("mousemove", handleMouseMovement);



init();

