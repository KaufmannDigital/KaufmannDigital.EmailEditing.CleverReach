import manifest from '@neos-project/neos-ui-extensibility';
import CleverReachView from './CleverReachView';
import HintLinkView from './HintLinkView';

manifest('KaufmannDigital.EmailEditing.CleverReach', {}, (globalRegistry) => {
  const viewsRegistry = globalRegistry.get('inspector').get('views');

  viewsRegistry.set('KaufmannDigital.EmailEditing.CleverReach/Inspector/Views/CleverReachView', {
    component: CleverReachView,
  });

});

manifest('KaufmannDigital.EmailEditing.CleverReach', {}, (globalRegistry) => {
  const viewsRegistry = globalRegistry.get('inspector').get('views');

  viewsRegistry.set('KaufmannDigital.EmailEditing.CleverReach/Inspector/Views/HintLinkView', {
    component: HintLinkView,
  });

});
