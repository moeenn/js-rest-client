// logger module
// logging messaging throughout the application can be enabled or disabled
// without having to add or remove console.log statements

// enable disable logging globally
let is_logging_enabled = true;

export function LoggingEnabled(bool_choice) {
	is_logging_enabled = bool_choice;
}

export default function Log(msg, details) {
	if(is_logging_enabled) {
		console.log(msg, details);
	}
}