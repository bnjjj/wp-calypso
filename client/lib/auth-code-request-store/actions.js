import request from 'superagent'

import Dispatcher from 'dispatcher'
import { actions } from './constants'

var timeout;

export function resetCode() {
	Dispatcher.handleViewAction( {
		type: actions.SMS_RESET
	} );
}

export function requestCode( username, password ) {
	Dispatcher.handleViewAction( {
		type: actions.SMS_REQUEST
	} );

	clearTimeout( timeout );

	request.post( '/sms' )
		.send( { username, password } )
		.end( ( error, data ) => {
			timeout = setTimeout( resetCode, 1000 * 30 );

			Dispatcher.handleServerAction( {
				type: actions.RECEIVE_SMS_REQUEST,
				data,
				error
			} );
		} );
}
