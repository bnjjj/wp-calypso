import { createReducerStore } from 'lib/store'
import { actions as ActionTypes } from './constants'

const initialState = {
	// API request is being sent
	isRequesting: false,
	// API request has completed
	requested: false,
	// there was an error fulfillinng the request
	errorLevel: false,
	errorMessage: false
}

// If we receive an error that's not a needs_2fa then update state to reflect the error
// If the error was a needs_2fa from the API that means we successfully asked for an SMS
function handleSMSResponse( payload ) {
	const { data, error } = payload;

	// if it's 2fa error then we actually successfully requested an sms code
	if ( data && data.body && data.body.error === 'needs_2fa' ) return Object.assign( {}, initialState, { requested: true } );

	const errorMessage = data && data.body && data.body.error_description
												? data.body.error_description : error.message;

	// assign the error message from the response body, otherwise take it from the error object
	return Object.assign( {}, initialState, {
		requested: true,
		errorLevel: 'is-error',
		errorMessage
	} );
}

export default createReducerStore( function( state, payload ) {
	const { action } = payload;

	switch ( action.type ) {
		case ActionTypes.SMS_REQUEST:
			return { isRequesting: true, requested: false, errorLevel: false, errorMessage: false }
		case ActionTypes.RECEIVE_SMS_REQUEST:
			return handleSMSResponse( action );
		case ActionTypes.SMS_RESET:
			return initialState;
	}

	return state;
}, initialState );
