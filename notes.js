const fs = require('fs')
const chalk = require('chalk')

const addNote = (title, body) => {
    const notes = loadNotes()
    const duplicateNote = notes.find((note) => note.title === title)

    if (!duplicateNote) {
        notes.push({
            title: title,
            body: body
        })
        saveNotes(notes)
        console.log(chalk.green.inverse('New note added'))
    } else {
        console.log(chalk.red.inverse('Note title already exists'))
    }    
}

const removeNote =  (title) => {
    const notes = loadNotes()
    const notesToKeep = notes.filter((note) => note.title !== title)

    // const notesToKeep = notes.filter(function (note) {
    //     return note.title !== title
    // })
    if (notes.length === notesToKeep.length) {
        console.log(chalk.red.inverse('No note found with the title: ' + title))
    } else {
        console.log(chalk.green.inverse(title + ' was removed'))
        saveNotes(notesToKeep)
    }
}

const loadNotes = () => {
    try {
        const dataBuffer = fs.readFileSync('notes.json')
        const dataJSON = dataBuffer.toString()
        return JSON.parse(dataJSON)
    } catch (e) {
        return []
    }
}

const listNotes = () => {
    const notes = loadNotes()
    console.log(chalk.inverse("My notes"))
    notes.forEach(function (note) {
        console.log(note.title);
    })
}

const saveNotes = (notes) => {
    const dataJSON = JSON.stringify(notes)
    fs.writeFileSync('notes.json', dataJSON)
}

const readNotes = (title) => {
    const notes = loadNotes()
    const noteToRead = notes.find((note) => note.title === title)

    if (noteToRead) {
        console.log(chalk.green.inverse(title))
        console.log(noteToRead.body)
    } else {
        console.log(chalk.red.inverse("Note not found!"))
    }
}

module.exports = {
    addNote: addNote,
    removeNote: removeNote,
    listNotes: listNotes,
    readNotes: readNotes
}
