import manifest from '@neos-project/neos-ui-extensibility';
import CleverReachView from './CleverReachView';

manifest('KaufmannDigital.EmailEditing.CleverReach', {}, (globalRegistry) => {
  const viewsRegistry = globalRegistry.get('inspector').get('views');

  viewsRegistry.set('KaufmannDigital.EmailEditing.CleverReach/Inspector/Views/CleverReachView', {
    component: CleverReachView,
  });

});
