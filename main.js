
window.addEventListener("DOMContentLoaded", load);

function load(){
	// add onclick elvent to the button
	document.querySelector("#btn-add").onclick = add_btn_clicked;

	// fetch all notes from localstorage.
	load_notes()
}

function add_btn_clicked(){
	// get the notes content
	let editor = document.querySelector("#editor-text");

	// check if the contents are less than specified length.
	if(editor.value.length < 4){
		// ask user for confirm
		let status = confirm("Do you want to save note less than 4 characters.");

		if(!status){
			alert("Note saving cancelled. Thanks for confirming.");
			return;
		}
	}

	// get the notes
	let notes = JSON.parse(localStorage.getItem('notes'));

	// get the note id
	let note_id = (notes == null) ? 1 : notes.length + 1;

	// create a new note
	let note = {
		"id": note_id,
		"content": editor.value,
		"date": new Date().toDateString()
	}

	// save the note
	save_note(note);

	// clear the editor
	editor.value = "";

	// alert the user.
	alert("Note added successfully.");
}


function save_note(note){

	// replace the newline with br tags.
	note.content = note.content.replace(/\n/g, "<br />");

	// get all notes
	let notes = JSON.parse(localStorage.getItem('notes')) || [];

	// update the notes
	notes.push(note);

	// update the localstorage
	localStorage.setItem('notes', JSON.stringify(notes));

	// update the sidebar with the provided note.
	add_note_to_sidebar(note);
}

function load_notes(){
	// get all notes
	let notes = localStorage.getItem("notes");

	// check if the notes exists
	if(notes === undefined){
		localStorage.setItem('notes', "")
	}

	// parse the notes
	notes = JSON.parse(notes);

	// check if notes do not exist.
	if(notes == null){
		return;
	}

	// add notes to the sidebar
	notes.forEach(add_note_to_sidebar);
}

function add_note_to_sidebar(note){
	// create note
	let note_html = `<div class="note">
				<div class="note-header">
					<h2>Note #${note.id}</h2>
					<time>${note.date}</time>
				</div>
				<div class="note-body">
					<p>${note.content}</p>
				</div>
				<button class="note-btn" onclick="remove_note(${note.id})">Remove Note</button>
			</div>`

	// append note to the sidebar
	document.querySelector('#info').innerHTML += note_html;
}

function remove_note(note_id){
	// get all notes
	let notes = JSON.parse(localStorage.getItem('notes'));

	// remove the note
	notes = notes.filter(note=> note.id !== parseInt(note_id));

	// update the localstorage
	localStorage.setItem('notes', JSON.stringify(notes));

	// reload the page.
	document.location.reload();
}

