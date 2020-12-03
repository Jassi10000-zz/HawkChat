const socket = io();

const msgText = document.querySelector('#msg')
const btnSend = document.querySelector('#btn-send')
const chatBox = document.querySelector('.chat-content')
const displayMsg = document.querySelector('.message')

let name;

var userTwoName;

function getName(){
    name = prompt("What's ur name ? ")
    document.querySelector('#name').textContent = name;
    msgText.focus();


    socket.emit("sending name" , name || "user")  
}

btnSend.addEventListener('click' , (e) => {
    e.preventDefault()
    sendMsg(msgText.value);
    msgText.value = '';
    msgText.focus()
    chatBox.scrollTop = chatBox.scrollHeight;
}) 


const sendMsg = message => {
    let msg = {
        name: name,
        message: message.trim()
    }

    display(msg, 'my-message', name)

    socket.emit('sendMessage' , msg)

}

socket.on('sendToAll' , msg => { 
    display(msg , 'other-message', userTwoName)
})
socket.on('sendNameToAll' , obj => { 
    console.log(obj);
    // display(name , 'other-message')
    userTwoName = obj.name;
    let tempIndex = obj.users.findIndex(i=>i==name)
    console.log(tempIndex)

    if(tempIndex == 0){
        userTwoName = obj.users[1];
    }
    else{
        userTwoName = obj.users[0];
    }
})

getName();


const display = (msg, type, displayName) =>{
    const msgDiv = document.createElement('div')
    let className = type
    msgDiv.classList.add(className, 'message-row')
    let times = new Date().toLocaleTimeString()

    let innerText = `
    <div class="message-title">
    👲<span>${displayName}</span>
    </div>
    <div class="message-text">
        ${msg.message}
    </div>
    <div class="message-time">
        ${times}
    </div>
    `;

    msgDiv.innerHTML = innerText;
    displayMsg.appendChild(msgDiv)
    chatBox.scrollTop = chatBox.scrollHeight;
}
