CleverReach Adapter Package for KaufmannDigital.EmailEditing

Features:

- Transfer MJML from generated emails to CleverReach
- Assignment of CleverReach mailings to email nodes

This package requires kaufmanndigital/cleverreach 3.1.0 or higher.

Excerpt from the CleverReach Readme:

> You can create such credentials at https://www.cleverreach.com/login (Menu “My Account” -> “REST API”). You need credentials for REST API V3.

```yaml
KaufmannDigital:
  CleverReach:
    credentials:
      clientId: '<client-id>'
      clientSecret: '<client-secret>'
```

Build the view:

```bash
cd Resources/Private/NeosUI
yarn install
yarn build or yarn watch
```


Todos:
- [x] Extend Mail NodeType with properties:
  - [x] Subject
  - x] Sender name
  - [x] Recipient (Groups)
  - [x] Sender address
- [x] Create ActionController
- [x] Create view with button “Create CleverReach mailing”. Button addresses controller.
- [x] Translations
