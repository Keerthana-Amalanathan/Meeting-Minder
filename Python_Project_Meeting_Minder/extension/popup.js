// popup.js

document.addEventListener('DOMContentLoaded', function () {
 document.getElementById("inputText").addEventListener('keydown', function(event) {
  function isValidEmail(email) {
            // Simple email validation using a regular expression
            var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            return emailRegex.test(email);
        }
        if(event.key =="Enter"){
                // Get the value from the input text box
                var inputValue = document.getElementById('inputText').value;

                // Validate the email format
                if (isValidEmail(inputValue)) {
                    // Create a new input element
                    var newInput = document.createElement('input');
                    newInput.type = 'text';
                    newInput.value = inputValue;
                    newInput.textContent = inputValue;
                    newInput.disabled = true; // Make it disabled so the user can't edit it

                    // Create a close icon (X)
                    var closeIcon = document.createElement('button');
                    closeIcon.className = 'close-icon';
                    closeIcon.textContent = 'x';
                    closeIcon.onclick = function () {
                        // Remove the input and the close icon when clicked
                        newInput.remove();
                        closeIcon.remove();
                    };

                    // Append the new input and close icon to the output container
                    document.getElementById('emails').appendChild(newInput);
                    document.getElementById('emails').appendChild(closeIcon);

                    // Clear the input text box and error message
                    document.getElementById('inputText').value = '';
                    document.getElementById('error-message').textContent = '';

                } else {
                    // Display error message
                    document.getElementById('error-message').textContent = 'Invalid email format';
                }
                }


 });


    const startRecordingButton = document.getElementById('startRecording');
    const stopRecordingButton = document.getElementById('stopRecording');
    const mailSendButton = document.getElementById('sendMail');
    const mailingDiv = document.getElementById('mailing');

    // New div for displaying feedback
    const feedbackDiv = document.getElementById('feedback');

    const socket = new WebSocket('ws://localhost:8774');  // Update port as needed

    startRecordingButton.addEventListener('click', function () {
        console.log('Recording started...');
        socket.send(JSON.stringify({ action: 'startRecording' }));
stopRecordingButton.removeAttribute('disabled')
startRecordingButton.setAttribute("disabled", "true")
feedbackDiv.innerText = "Recording Started..."

    });

    stopRecordingButton.addEventListener('click', function () {
        console.log('Recording stopped...');
        feedbackDiv.innerText = "Recording Stopped. Converting audio to text is in progress..."

        socket.send(JSON.stringify({ action: 'stopRecording' }));
startRecordingButton.setAttribute('disabled', 'True')

    });

     mailSendButton.addEventListener('click', function () {
        console.log('Sending Mail');
        emails = getEmailIds()
        feedbackDiv.innerText = "Sending Mail"

        socket.send(JSON.stringify({ action: 'sendMail' , email:emails}));
        startRecordingButton.setAttribute('disabled', 'True')

    });

    socket.addEventListener('message', function (event) {
    console.log("message recieved lalalal: ", event)
        const data = JSON.parse(event.data);
        console.log('Received message from server:', data);

        // Update your extension UI with the received data
        if (data.message === 'stopped') {
            console.log('Notebook received the message');

            // Update the feedback div
            feedbackDiv.innerText = 'Summarizing';

        }
         if (data.message === 'summarized') {
            console.log('Notebook received the message');

            // Update the feedback div
            feedbackDiv.innerText = 'Summarizing Finished';
                mailingDiv.style.display ='block'
                }
         if (data.message === 'mailSent') {
            console.log('Notebook received the message');

            // Update the feedback div
            feedbackDiv.innerText = 'Mail Sent';
                mailingDiv.style.display ='none'
                startRecordingButton.removeAttribute('disabled')
                stopRecordingButton.setAttribute('disabled', 'True')

                setTimeout(function() {
                feedbackDiv.innerText = '';
                                  }, 3000);
                }


    });
    function getEmailIds() {
    // Get the div element by its ID
    var divElement = document.getElementById('emails');

    // Get all input elements within the div
    var inputElements = divElement.getElementsByTagName('input');

    // Create an array to store the text content of each input
    var textContentArray = [];

    // Iterate through the input elements
    for (var i = 0; i < inputElements.length; i++) {
        // Get the value of each input and add it to the array
        textContentArray.push(inputElements[i].textContent);
    }

    // Display the text content (you can modify this part based on your requirements)
    console.log(textContentArray);
    return textContentArray;
}

});