/**
 * External dependencies
 */
import React from 'react'

/**
 * Internal Dependencies
 */
import { requestCode, resetCode } from './actions'
import Store from './store'
import Notice from 'notices/simple-notice'

export default React.createClass( {

	componentDidMount: function() {
		Store.on( 'change', this.refreshData );
	},

	componentWillUnmount: function() {
		Store.off( 'change', this.refreshData );
	},

	refreshData: function() {
		this.setState( Store.get() );
	},

	getInitialState: function() {
		return Store.get();
	},

	requestSMSCode: function( e ) {
		e.preventDefault();
		requestCode( this.props.username, this.props.password );
	},

	render: function() {
		const { isRequesting, requested, errorLevel, errorMessage } = this.state;

		var status = 'is-info';
		var showDismiss = false;
		var message = (
			<a href="#" onClick={ this.requestSMSCode }>{ this.translate( 'Send code via text message.' ) }</a>
		);

		if ( isRequesting ) {
			message = this.translate( 'Requesting code.' );
		}

		if ( requested ) {
			status = 'is-success';
			message = this.translate( 'Code sent.' );
		}

		if ( errorLevel !== false ) {
			status = errorLevel;
			message = errorMessage;
			showDismiss = true;
		}

		return (
			<Notice showDismiss={ showDismiss } status={ status } onClick={ resetCode } >
				{ message }
			</Notice>
		);
	}

} )
