import { ShowHideOptionalFields, ProcessRequestSubmit } from './event_functions.js';

// event listeners
// Show Hide Optional Fields
const http_methods_menu = document.querySelector('#http-method');
http_methods_menu.addEventListener('input', ShowHideOptionalFields);

// watch for request submit
const request_form = document.querySelector('#entry-form');
request_form.addEventListener('submit', ProcessRequestSubmit);