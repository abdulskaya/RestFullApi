# RestFullApi



## Database Structure

<img src="https://i.hizliresim.com/qr3ut2w.png" width="50%">

## Routes

| Command | Description |
| --- | --- |
| `/api/register` | register |
| `/api/login` | login |
| `/api/logout` | logout |
| `/api/check-auth` | check auth status |
| `/api/messages` | see all messages (chats) from other users |
| `/api/messages/:username` | see all messages between a user |
| `/api/messages/delete/:message_id` | delete message |
| `/api/message/:username` | send message to user |
| `/api/block/:username` |  block a user |
| `/api/unblock/:username` |  unblock a user |
| `/api/is-blocked/:username` |  check user is blocked |
| `/api/block-list` | get all blocked user (only blocked from you) |

## Installation

```
npm i
```
## Migrating

```
cd src
sequelize db:migrate
```
## Database Config

```
cd src/config
config.json

"development": {
    "username": "root",
    "password": null,
    "database": "***database_name***",
    "host": "127.0.0.1",
    "dialect": "mysql"
  },
```


> **NOT:** Due to api incompatibility of Passport.js, "login" and "logout" responses may be "Cannot GET /login". The routes work fine, although the answers are problematic.
