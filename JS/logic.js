const firebaseConfig = config.firebase_config;

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore()

let message = db.collection('form')

let msgList = []

const init = () => {
    message.get().then((response) => {
        response.docs.forEach(item => {
            msgList.push(item)
        })
    })
}

function clr(){
    document.getElementById('name').value = ''
    document.getElementById('mail').value = ''
    document.getElementById('no-telp').value = ''
    document.getElementById('msg').value = ''
}

// function getInputVal(id){
//     return document.getElementById(id).value;
// }

// function validation(e){
//     e.preventDefault();
    
//     var name = getInputVal('name')
//     var email = getInputVal('mail')
//     var phnNumber = getInputVal('no-telp')
//     var msg = getInputVal('msg')
//     var wordCount = msg.match(/(\w+)/g).length;

//     if(!phnNumber.startsWith('08')){
//         alert('Please enter phone number starts with 08..')
//         clr()
//     }

//     else if(phnNumber.length > 14){
//         alert('Phone number must less than 14 digit')
//         clr()
//     }

//     if(wordCount < 5 || wordCount >100){
//         alert('Msg must more than 5 words and less than 100 words')
//         clr()
//     }

//     saveForm(name, email, phnNumber, msg)
// }

// function saveForm(name, email, phnNumber, msg){
//     message.push({
//         'Name': name,
//         'Email': email,
//         'Phone': phnNumber,
//         'Comment': msg
//     })
// }

$('#forms').submit((event) => {
    event.preventDefault()
    let pesan = {
        Name: $('#name').val(),
        Email: $('#mail').val(),
        Phone: $('#no-telp').val(),
        Comment: $('#msg').val()
    }
    let msg = $('#msg').val()
    let wordCount = msg.match(/(\w+)/g).length;
    if(!($('#no-telp').val().startsWith('08'))){
        alert('Please enter phone number starts with 08..')
        clr()
    }
    else if($('#no-telp').val().length > 14){
        alert('Phone number must less than 14 digit')
        clr()
    }

    else if(wordCount < 5 || wordCount >100){
        alert('Msg must more than 5 words and less than 100 words')
        clr()
    }

    if($('#name').val() !== '' && $('#mail').val() !== '' && $('#no-telp').val() !== '' && $('#msg').val() !== ''){
        message.add(pesan).then((response)=>{
            response.get().then((response)=>{
                msgList.push(response)
                alert('Your message has been sent')
                clr()
            })
        })    
    }
    
})

$(document).ready(function() {
    init()
})