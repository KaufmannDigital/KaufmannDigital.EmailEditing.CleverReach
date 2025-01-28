// External generic dependencies
import React, {PureComponent} from 'react';
import {connect} from 'react-redux';

// External Neos dependencies
import {neos} from '@neos-project/neos-ui-decorators';
import {fetchWithErrorHandling} from '@neos-project/neos-ui-backend-connector';
import {Button} from '@neos-project/react-ui-components';
import {actions, selectors} from '@neos-project/neos-ui-redux-store';

@connect((state) => ({
    focusedNodeContextPath: selectors.CR.Nodes.focusedNodePathSelector(state),
    documentContextpath: selectors.CR.Nodes.documentNodeContextPathSelector(state),
}))

@neos((globalRegistry) => ({
    i18nRegistry: globalRegistry.get('i18n'),
    serverFeedbackHandlers: globalRegistry.get('serverFeedbackHandlers'),
}))


export default class CleverReachView extends PureComponent {

    constructor(props) {
        super(props);
        this.submitMailing = this.submitMailing.bind(this);

        this.state = {
            isFetching: false,
            success: null,
        };
    }

    submitMailing = async (contextPath = null) => {

        this.setState(prev => ({...prev, isFetching: true}));

        try {
            const response = await fetchWithErrorHandling
                .withCsrfToken((csrfToken) => ({
                    url: '/email-editing/cleverreach/submit', method: 'POST', credentials: 'include', headers: {
                        'X-Flow-Csrftoken': csrfToken, 'Content-Type': 'application/json',
                    }, body: JSON.stringify({
                        node: contextPath || this.props.documentContextpath || this.props.focusedNodeContextPath,
                    })
                }))

            const responseJson = await response.json();

            // show flash message
            this.props.dispatch(actions.ServerFeedback.handleServerFeedback(responseJson.feedback));
            this.setState(prev => ({...prev, isFetching: false, success: true}));
        } catch (e) {
            console.log(e)
            this.setState(prev => ({...prev, isFetching: false, success: false}));
        }
    }

    render() {
        console.log(this.props.i18nRegistry)
        return (<div>
                <Button disabled={this.state.isFetching} onClick={() => {
                    this.submitMailing();
                }}>
                    {this.state.isFetching
                        ? this.props.i18nRegistry.translate('buttonSending', '', {}, 'KaufmannDigital.EmailEditing.CleverReach', 'Main')
                        : this.props.i18nRegistry.translate('buttonIdle', '', {}, 'KaufmannDigital.EmailEditing.CleverReach', 'Main')
                    }
                </Button>
                <p>
                    {this.state.success === true &&
                        <i>{this.props.i18nRegistry.translate('submitSuccess', '', {}, 'KaufmannDigital.EmailEditing.CleverReach', 'Main')}</i>}
                    {this.state.success === false &&
                        <i>{this.props.i18nRegistry.translate('submitError', '', {}, 'KaufmannDigital.EmailEditing.CleverReach', 'Main')}</i>}
                </p>
            </div>
        );
    }
}

