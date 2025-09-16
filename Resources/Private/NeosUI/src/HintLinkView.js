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


export default class HintLinkView extends PureComponent {

    render() {
        return (<div>
                <Button onClick={() => {
                    window.open('https://support.cleverreach.com/hc/de/articles/202372531-Personalisierung-und-Platzhalter-in-Ihren-Mailings', '_blank');
                }}>
                    Verfügbare Platzhalter (CleverReach)
                </Button>
            </div>
        );
    }
}

