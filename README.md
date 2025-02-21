# NoGas_BE
## En cadre avec le cours *Projet - Développement d'application IDO*
**Runs alongside the frontend [here](https://github.com/Yves-Shaheem/NoGas_FE)**

## Prerequisite
- NodeJS v22.13.1
- NPM 11.1.0
## Getting started
- Install dependencies
```bash
npm install
```
- Run the app
```bash
npm run start
// OR
npm run dev
```
## env.example
```
PORT=3001
JWT_SECRET=MY_SECRET
SERVICE_ACCOUNT_PATH=../../nogas-12f19-firebase-adminsdk-fbsvc-59100ce1ce.json
NODE_ENV=development
```
> [!NOTE]  
> Make sure SERVICE_ACCOUNT_PATH links to a firebase adminsdk file, if you do not have this key file or weren't given one, the application will not start.
