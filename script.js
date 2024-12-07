const myAPIKey = 'zQtBDSJMkYdFdeiU4glPwJdKyMwqairBEOWWJY6C'

// Sets up a variable for the apod container that will hold our pictures
const apod = document.querySelector('#apod')

// Puts the datepicker inside the variable to make it dynamic
const datePicker = document.querySelector('#datePicker')
const randomButton = document.querySelector('#randomButton')

// Function to generate a random date between Jan 1, 2000 and Jan 1, 2024
function generateRandomDate() {
    const startDate = new Date('2000-01-01');
    const endDate = new Date('2024-01-01');
    const randomTimestamp = Math.floor(Math.random() * (endDate - startDate + 1)) + startDate.getTime();
    const randomDate = new Date(randomTimestamp);

    // Format the date in 'yyyy-mm-dd' format
    const randomDateString = randomDate.toISOString().split('T')[0];

    return randomDateString;
}

// Set the default value of the date picker to today's date
const today = new Date().toLocaleDateString('en-ca');
datePicker.max = today;
datePicker.value = today;

// When the user clicks the random button, generate and set a random date
randomButton.addEventListener('click', () => {
    const randomDate = generateRandomDate();
    datePicker.value = randomDate;
    getImage(randomDate);  // Fetch the image for the random date
})

// Whenever the user changes the date, we run a function
datePicker.addEventListener('change', (event) => {
    getImage(event.target.value);
})

// The function fetches data for a particular chosen date 
const getImage = (chosenDate) => {
    let url = new URL('https://api.nasa.gov/planetary/apod')
    url.searchParams.set('date', chosenDate)
    url.searchParams.set('api_key', myAPIKey)

    console.log(url.href)

    fetch(url.href)
      .then(response => response.json())   /* parse the response as JSON */
      .then(response => {  
        console.log(response);       

        apod.innerHTML = ""; 

        // Display the image if it's an image
        if (response.media_type == "image"){
            let img = document.createElement('img');
            img.src = response.url;
            apod.appendChild(img);

            // Add the explanation below the image
            let explanation = document.createElement('p');
            explanation.textContent = response.explanation;
            apod.appendChild(explanation);
        }
        // If it's a video, embed it in an iframe
        else if (response.media_type == "video"){
            let iframe = document.createElement('iframe'); 
            iframe.src = response.url;
            apod.appendChild(iframe);

            // Add the explanation below the video
            let explanation = document.createElement('p');
            explanation.textContent = response.explanation;
            apod.appendChild(explanation);
        }
      })
      .catch(error=> console.log(error))
}

// Begin by loading data for today
getImage(today);
