# KaufmannDigital.EmailEditing.CleverReach

A companion package for [`kaufmanndigital/email-editing`](https://github.com/KaufmannDigital/KaufmannDigital.EmailEditing) that adds [CleverReach](https://www.cleverreach.com/) integration. Submit emails created in the Neos backend directly to CleverReach as mailings — without leaving the CMS.

## Features

- **Submit Mailings** — Transfer emails directly from Neos to CleverReach with a single click
- **Receiver Groups** — Select CleverReach recipient groups from within the Neos inspector
- **Sender Configuration** — Set subject, sender name, and sender email per email
- **Mailing Updates** — Re-submit to update an existing mailing in CleverReach
- **Full i18n Support** — All labels available in English and German

## Requirements

- [`kaufmanndigital/email-editing`](https://github.com/KaufmannDigital/KaufmannDigital.EmailEditing) >= 1.2.0
- [`kaufmanndigital/cleverreach`](https://github.com/KaufmannDigital/KaufmannDigital.CleverReach) >= 3.2.0

## Installation

Install via Composer:

```sh
composer require kaufmanndigital/email-editing-cleverreach
```

## Configuration

This package requires configured CleverReach API credentials. See the [KaufmannDigital.CleverReach README](https://github.com/KaufmannDigital/CleverReach#configuration) for setup instructions.

## Usage

Once installed and configured, a **CleverReach** inspector panel appears on every Email document. Fill in the required fields and click **Submit mailing to CleverReach**:

| Field              | Description                                         |
|--------------------|-----------------------------------------------------|
| **Subject**        | The email subject line                              |
| **Sender Name**    | Display name shown to recipients                    |
| **Sender Mail**    | Sender email address                                |
| **Receiver Group** | Target recipient group (loaded from CleverReach)    |

After submission, the mailing is available in your CleverReach account for review and dispatch.

## UI Development

```sh
cd Resources/Private/NeosUI
yarn install
yarn build
```

Use `yarn watch` for development with automatic rebuilds.
