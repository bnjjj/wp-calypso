/**
 * External dependencies
 */
import keyMirror from 'react/lib/keyMirror';

export const actions = keyMirror( {
	// Sending a request for an SMS auth code
	SMS_REQUEST: null,
	// Request for an SMS auth code has completed
	RECEIVE_SMS_REQUEST: null,
	// Reset the SMS state
	SMS_RESET: null
} );
