const axios = require('axios');
const EventManager = require('./eventManager.js');
const ResponseWindow = require('./views/responseWindow');
const DetailsWindow = require('./views/detailsWindow');

// use to raise and listen to events on root Document
const globalEventManager = new EventManager();

const getUserInput = () => {
  const userForm = document.getElementById('userForm');
  userForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const inputField = document.getElementById('userInput');
    globalEventManager.dispatch('userInput', { 
      detail: inputField.value 
    });
  });
};

const getData = async (url) => {
  console.log('Sending GET Request to: ', url);
  const timer_start = performance.now();
  const res = await axios.get(url);
  const timer_end = performance.now();

  globalEventManager.dispatch('responseReceived', { 
    detail: {
      data: res.data,
      responseTime: parseInt(timer_end - timer_start),
      statusCode: res.status
    }
  });
};

const updateView = (viewObject) => {
  const viewLocation = document.getElementById('documentMainBody');
  viewLocation.innerHTML = viewObject.render();
};

const main = () => {
  getUserInput();

  globalEventManager.on('userInput', (event) => {
    getData(event.detail);
  });

  globalEventManager.on('responseReceived', (event) => {
    const responseString = JSON.stringify(event.detail.data, null, 2);

    const responseWindow = new ResponseWindow({ 
      jsonstring: responseString 
    });
    
    const detailsWindow = new DetailsWindow({ 
      statusCode: event.detail.statusCode, 
      responseTime: event.detail.responseTime 
    });

    // default view
    updateView(responseWindow);

    document.getElementById('LinkDetails').addEventListener('click', (event) => {
      updateView(detailsWindow);
    });

    document.getElementById('LinkReponseData').addEventListener('click', (event) => {
      updateView(responseWindow);
    });
  });
};

main();