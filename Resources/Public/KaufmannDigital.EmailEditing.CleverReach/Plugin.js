(() => {
  var __create = Object.create;
  var __defProp = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __getProtoOf = Object.getPrototypeOf;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __esm = (fn, res) => function __init() {
    return fn && (res = (0, fn[__getOwnPropNames(fn)[0]])(fn = 0)), res;
  };
  var __commonJS = (cb, mod) => function __require() {
    return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
  };
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
    return to;
  };
  var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
    // If the importer is in node compatibility mode or this is not an ESM
    // file that has been converted to a CommonJS file using a Babel-
    // compatible transform (i.e. "__esModule" has not been set), then set
    // "default" to the CommonJS "module.exports" for node compatibility.
    isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
    mod
  ));
  var __decorateClass = (decorators, target, key, kind) => {
    var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc(target, key) : target;
    for (var i = decorators.length - 1, decorator; i >= 0; i--)
      if (decorator = decorators[i])
        result = (kind ? decorator(target, key, result) : decorator(result)) || result;
    if (kind && result)
      __defProp(target, key, result);
    return result;
  };

  // node_modules/@neos-project/neos-ui-extensibility/dist/readFromConsumerApi.js
  function readFromConsumerApi(key) {
    return (...args) => {
      if (window["@Neos:HostPluginAPI"] && window["@Neos:HostPluginAPI"][`@${key}`]) {
        return window["@Neos:HostPluginAPI"][`@${key}`](...args);
      }
      throw new Error("You are trying to read from a consumer api that hasn't been initialized yet!");
    };
  }
  var init_readFromConsumerApi = __esm({
    "node_modules/@neos-project/neos-ui-extensibility/dist/readFromConsumerApi.js"() {
    }
  });

  // node_modules/@neos-project/neos-ui-extensibility/dist/shims/vendor/react/index.js
  var require_react = __commonJS({
    "node_modules/@neos-project/neos-ui-extensibility/dist/shims/vendor/react/index.js"(exports, module) {
      init_readFromConsumerApi();
      module.exports = readFromConsumerApi("vendor")().React;
    }
  });

  // node_modules/@neos-project/neos-ui-extensibility/dist/shims/vendor/react-redux/index.js
  var require_react_redux = __commonJS({
    "node_modules/@neos-project/neos-ui-extensibility/dist/shims/vendor/react-redux/index.js"(exports, module) {
      init_readFromConsumerApi();
      module.exports = readFromConsumerApi("vendor")().reactRedux;
    }
  });

  // node_modules/@neos-project/neos-ui-extensibility/dist/shims/neosProjectPackages/neos-ui-decorators/index.js
  var require_neos_ui_decorators = __commonJS({
    "node_modules/@neos-project/neos-ui-extensibility/dist/shims/neosProjectPackages/neos-ui-decorators/index.js"(exports, module) {
      init_readFromConsumerApi();
      module.exports = readFromConsumerApi("NeosProjectPackages")().NeosUiDecorators;
    }
  });

  // node_modules/@neos-project/neos-ui-extensibility/dist/shims/neosProjectPackages/react-ui-components/index.js
  var require_react_ui_components = __commonJS({
    "node_modules/@neos-project/neos-ui-extensibility/dist/shims/neosProjectPackages/react-ui-components/index.js"(exports, module) {
      init_readFromConsumerApi();
      module.exports = readFromConsumerApi("NeosProjectPackages")().ReactUiComponents;
    }
  });

  // node_modules/@neos-project/neos-ui-extensibility/dist/shims/neosProjectPackages/neos-ui-redux-store/index.js
  var require_neos_ui_redux_store = __commonJS({
    "node_modules/@neos-project/neos-ui-extensibility/dist/shims/neosProjectPackages/neos-ui-redux-store/index.js"(exports, module) {
      init_readFromConsumerApi();
      module.exports = readFromConsumerApi("NeosProjectPackages")().NeosUiReduxStore;
    }
  });

  // node_modules/@neos-project/neos-ui-extensibility/dist/index.js
  init_readFromConsumerApi();
  var dist_default = readFromConsumerApi("manifest");

  // src/CleverReachView.js
  var import_react = __toESM(require_react());
  var import_react_redux = __toESM(require_react_redux());
  var import_neos_ui_decorators = __toESM(require_neos_ui_decorators());

  // node_modules/@neos-project/neos-ui-extensibility/dist/shims/neosProjectPackages/neos-ui-backend-connector/index.js
  init_readFromConsumerApi();
  var neos_ui_backend_connector_default = readFromConsumerApi("NeosProjectPackages")().NeosUiBackendConnectorDefault;
  var { fetchWithErrorHandling } = readFromConsumerApi("NeosProjectPackages")().NeosUiBackendConnector;

  // src/CleverReachView.js
  var import_react_ui_components = __toESM(require_react_ui_components());
  var import_neos_ui_redux_store = __toESM(require_neos_ui_redux_store());
  var CleverReachView = class extends import_react.PureComponent {
    constructor(props) {
      super(props);
      this.submitMailing = async (contextPath = null) => {
        this.setState((prev) => ({ ...prev, isFetching: true }));
        try {
          const response = await fetchWithErrorHandling.withCsrfToken((csrfToken) => ({
            url: "/email-editing/cleverreach/submit",
            method: "POST",
            credentials: "include",
            headers: {
              "X-Flow-Csrftoken": csrfToken,
              "Content-Type": "application/json"
            },
            body: JSON.stringify({
              node: contextPath || this.props.documentContextpath || this.props.focusedNodeContextPath
            })
          }));
          const responseJson = await response.json();
          this.props.dispatch(import_neos_ui_redux_store.actions.ServerFeedback.handleServerFeedback(responseJson.feedback));
          this.setState((prev) => ({ ...prev, isFetching: false, success: true }));
        } catch (e) {
          console.log(e);
          this.setState((prev) => ({ ...prev, isFetching: false, success: false }));
        }
      };
      this.submitMailing = this.submitMailing.bind(this);
      this.state = {
        isFetching: false,
        success: null
      };
    }
    render() {
      console.log(this.props.i18nRegistry);
      return /* @__PURE__ */ import_react.default.createElement("div", null, /* @__PURE__ */ import_react.default.createElement(import_react_ui_components.Button, { disabled: this.state.isFetching, onClick: () => {
        this.submitMailing();
      } }, this.state.isFetching ? this.props.i18nRegistry.translate("buttonSending", "", {}, "KaufmannDigital.EmailEditing.CleverReach", "Main") : this.props.i18nRegistry.translate("buttonIdle", "", {}, "KaufmannDigital.EmailEditing.CleverReach", "Main")), /* @__PURE__ */ import_react.default.createElement("p", null, this.state.success === true && /* @__PURE__ */ import_react.default.createElement("i", null, this.props.i18nRegistry.translate("submitSuccess", "", {}, "KaufmannDigital.EmailEditing.CleverReach", "Main")), this.state.success === false && /* @__PURE__ */ import_react.default.createElement("i", null, this.props.i18nRegistry.translate("submitError", "", {}, "KaufmannDigital.EmailEditing.CleverReach", "Main"))));
    }
  };
  CleverReachView = __decorateClass([
    (0, import_react_redux.connect)((state) => ({
      focusedNodeContextPath: import_neos_ui_redux_store.selectors.CR.Nodes.focusedNodePathSelector(state),
      documentContextpath: import_neos_ui_redux_store.selectors.CR.Nodes.documentNodeContextPathSelector(state)
    })),
    (0, import_neos_ui_decorators.neos)((globalRegistry) => ({
      i18nRegistry: globalRegistry.get("i18n"),
      serverFeedbackHandlers: globalRegistry.get("serverFeedbackHandlers")
    }))
  ], CleverReachView);

  // src/manifest.js
  dist_default("KaufmannDigital.EmailEditing.CleverReach", {}, (globalRegistry) => {
    const viewsRegistry = globalRegistry.get("inspector").get("views");
    viewsRegistry.set("KaufmannDigital.EmailEditing.CleverReach/Inspector/Views/CleverReachView", {
      component: CleverReachView
    });
  });
})();
