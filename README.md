CleverReach Adapter Package für KaufmannDigital.EmailEditing

Features:

- MJML aus generierten E-Mails an CleverReach übermitteln
- Zuweisung von CleverReach Mailings zu Email Nodes

Dieses Package benötigt kaufmanndigital/cleverreach 3.1.0 oder höher.

Auszug aus der CleverReach Readme:

> You can create such credentials at https://www.cleverreach.com/login (Menu "My Account" -> "REST API"). You need credentials for REST API V3.

```yaml
KaufmannDigital:
  CleverReach:
    credentials:
      clientId: '<client-id>'
      clientSecret: '<client-secret>'
```

Builden der View:

```bash
cd Resources/Private/NeosUI
yarn install
yarn build oder yarn watch
```


Todos:
- [x] Mail NodeType mit Properties erweitern:
  - [x] Betreff
  - [x] Absender Name
  - [x] Empfänger (Groups)
  - [x] Absender Adresse
- [x] ActionController erstellen 
- [x] View erstellen mit Button "CleverReach Mailing erstellen". Button spricht Controller an.
- [ ] Translations
