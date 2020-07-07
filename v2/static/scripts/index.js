import Request from './request.js';

// helper functions
const $ = (elementID) => {
  const element = document.querySelector(elementID);
  if(!element) {
    throw `Element Not Found: ${elementID}`;
  }
  return element;
};

// global application state
const App = {
  RootElement: '#root',
  Event: (eventName, payload={}) => {
    const event = new CustomEvent(eventName, payload);
    document.querySelector(App.RootElement).dispatchEvent(event);
  }
};

// event handlers
// make new request dialogue visible
const handleCreateRequest = (event) => {
  event.preventDefault();
  $('#newRequest').classList.remove('d-none');
  // focus URL field
  $('#newRequestURL').focus();

  App.Event('RequestDialogueVisible');
};

// hide new request dialogue
const handleCloseRequestDialogue = (event) => {
  event.preventDefault();
  $('#newRequest').classList.add('d-none');
  App.Event('RequestDialogueNotVisible');
};

// reset form on new request dialogue hide
const handleFormReset = (event) => {
  event.preventDefault();

  $('#newRequestURL').value = "";
  $('#httpMethodMenu').value = "get";
  $('#newRequestJSONPayload').value = "";

  // reset submit button
  App.Event('NewRequestSubmitButtonReset');
};

// watch current HTTP Method selection in new request dialogue
const handleNewRequestHTTPMethod = (event) => {
  event.preventDefault();
  const selection = $('#httpMethodMenu').value;
  App.Event('NewRequestHTTPMethodSelection', { detail: selection });
};

// enable optional JSON field in new request dialogue
const handleNewRequestEnableOptionalFields = (event) => {
  event.preventDefault();
  const optionalField = $('#newRequestOptionalField');

  if(event.detail === 'post') {
    optionalField.style.display = 'contents';
    App.Event('RequestOptionalFieldEnabled', { detail: true });
  } else {
    optionalField.style.display = 'none';
    App.Event('RequestOptionalFieldEnabled', { detail: false });
  }
};

// get values on form submit
const handleFormSubmit = (event) => {
  event.preventDefault();

  const formData = {
    url: $('#newRequestURL').value,
    method: $('#httpMethodMenu').value,
  };

  if(formData.method === 'post') {
    formData.jsonPayload = $('#newRequestJSONPayload').value;
  }

  App.Event('FormSubmit', {detail: formData});
};

// validate new request form
const handleFormValidation = (event) => {
  event.preventDefault();

  // validate JSON field
  if(event.detail.method === 'post') {
    try {
      const json = JSON.parse(event.detail.jsonPayload);
    } catch (error) {
      // validation errors
      App.Event('NewRequestJSONInvalid');
      return;
    }
  }

  // if JSON field in error state, restore it
  App.Event('NewRequestJSONReset');

  // pass the validated form data to the next event handler
  App.Event('NewRequestFormValidated', { detail: event.detail });
};

// put the new request form JSON field in error state
const handleNewRequestJSONInvalid = (event) => {
  event.preventDefault();

  const jsonField = $('#newRequestOptionalField');
  jsonField.classList.add('error');

  const errorMsg = jsonField.querySelector('p');
  errorMsg.style.display = 'contents';
};

const handleNewRequestJSONReset = (event) => {
  event.preventDefault();

  const jsonField = $('#newRequestOptionalField');
  if(jsonField.classList.contains('error')) {
    jsonField.classList.remove('error');

    const errorMsg = jsonField.querySelector('p');
    errorMsg.style.display = 'none';
  }
};

const handleNewRequestSubmitButtonDisable = (event) => {
  event.preventDefault();

  const formSubmitButton = $('#newRequest').querySelector('input.button-primary');
  formSubmitButton.disabled = true;
  formSubmitButton.value = 'Sending';
};

const handleNewRequestSubmitButtonReset = (event) => {
  event.preventDefault();
  const submitButton = $('#newRequest').querySelector('input.button-primary');
  submitButton.disabled = false;
  submitButton.value = 'Send';
};

const handleValidatedForm = (event) => {
  event.preventDefault();

  // disable the submit button
  App.Event('NewRequestDisableSubmitButton');

  // send request
  switch (event.detail.method) {
    case 'get':
      try {
        Request.Get(event.detail.url, (responseObj) => {
          App.Event('APIResponseReceived', {detail: responseObj })
        });
      } catch (error) {
        App.Event('NewLogEntry', {detail: error})
      }
      break;

    case 'post':
      try {
        Request.Post(event.detail.url, event.detail.jsonPayload, (responseObj) => {
          App.Event('APIResponseReceived', {detail: responseObj })
        });
      } catch (error) {
        App.Event('NewLogEntry', {detail: error})
      }
      break;

    default:
      try {
        Request.Other(event.detail.url, event.detail.method, (responseObj) => {
          App.Event('APIResponseReceived', {detail: responseObj })
        });
      } catch (error) {
        App.Event('NewLogEntry', {detail: error})
      }
  }

  // create a log entry
  const LogEntry = `Sending ${event.detail.method.toUpperCase()} Request to ${event.detail.url}`;
  App.Event('NewLogEntry', {detail: LogEntry});
};

const handleAPIResponseReceived = (event) => {
  event.preventDefault();

  // close new request dialogue
  App.Event('CloseNewRequestDialogue');

  // enable response status details
  App.Event('EnableResponseStatus', { detail: event.detail });

  // write response body
  App.Event('WriteResponseBody', {detail: event.detail.body});

  // create log entry
  App.Event('NewLogEntry', {detail: 'Response Received'});
};

const handleEnableResponseStatus = (event) => {
  event.preventDefault();

  const resStatus = $('#responseStatus');
  resStatus.classList.remove('d-none');

  resStatus.querySelector('#httpStatus').innerHTML = event.detail.status;
  resStatus.querySelector('#responseDelay').innerHTML = event.detail.timeElapsed;
};

const handleWriteResponseBody = (event) => {
  event.preventDefault();
  const responseArea = $('#responseBody');
  responseArea.innerHTML = JSON.stringify(event.detail, false, 2);
};

const handleNewLogEntry = (event) => {
  event.preventDefault();

  const time = new Date();
  const currentTime = `[${time.getHours()}:${time.getMinutes()}:${time.getSeconds()}]  `;

  const logOutput = $('#logOutput');
  logOutput.innerHTML += `${currentTime} ${event.detail}\n`;
};

// register events and handlers here
const eventHandlers = [
  {
    target: '#buttonCreateRequest',
    eventName: 'click',
    eventHandler: handleCreateRequest
  },
  {
    target: '#closeRequestDialogue_1',
    eventName: 'click',
    eventHandler: handleCloseRequestDialogue
  },
  {
    target: '#closeRequestDialogue_2',
    eventName: 'click',
    eventHandler: handleCloseRequestDialogue
  },
  {
    target: App.RootElement,
    eventName: 'RequestDialogueNotVisible',
    eventHandler: handleFormReset
  },
  {
    target: '#httpMethodMenu',
    eventName: 'change',
    eventHandler: handleNewRequestHTTPMethod
  },
  {
    target: App.RootElement,
    eventName: 'NewRequestHTTPMethodSelection',
    eventHandler: handleNewRequestEnableOptionalFields
  },
  {
    target: '#newRequestForm',
    eventName: 'submit',
    eventHandler: handleFormSubmit
  },
  {
    target: App.RootElement,
    eventName: 'FormSubmit',
    eventHandler: handleFormValidation
  },
  {
    target: App.RootElement,
    eventName: 'NewRequestJSONInvalid',
    eventHandler: handleNewRequestJSONInvalid
  },
  {
    target: App.RootElement,
    eventName: 'NewRequestJSONReset',
    eventHandler: handleNewRequestJSONReset
  },
  {
    target: App.RootElement,
    eventName: 'NewRequestDisableSubmitButton',
    eventHandler: handleNewRequestSubmitButtonDisable
  },
  {
    target: App.RootElement,
    eventName: 'NewRequestSubmitButtonReset',
    eventHandler: handleNewRequestSubmitButtonReset
  },
  {
    target: App.RootElement,
    eventName: 'NewRequestFormValidated',
    eventHandler: handleValidatedForm
  },
  {
    target: App.RootElement,
    eventName: 'APIResponseReceived',
    eventHandler: handleAPIResponseReceived
  },
  {
    target: App.RootElement,
    eventName: 'CloseNewRequestDialogue',
    eventHandler: handleCloseRequestDialogue
  },
  {
    target: App.RootElement,
    eventName: 'EnableResponseStatus',
    eventHandler: handleEnableResponseStatus
  },
  {
    target: App.RootElement,
    eventName: 'WriteResponseBody',
    eventHandler: handleWriteResponseBody
  },
  {
    target: App.RootElement,
    eventName: 'NewLogEntry',
    eventHandler: handleNewLogEntry
  }
];

for(const handler of eventHandlers) {
  const target = $(handler.target);
  target.addEventListener(handler.eventName, handler.eventHandler);
}

// keyboard shortcuts
window.onkeyup = (event) => {
  const key = event.key;
  // console.log(key);

  switch(key) {
    case 'n':
      handleCreateRequest(event);
      break;

    case 'Escape':
      App.Event('CloseNewRequestDialogue');
      break
  }
};