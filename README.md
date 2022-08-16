# Twone App

App for Twone.

# Pre-requisites

[Download Homebrew](https://brew.sh/)
[Download GitHub CLI](https://docs.github.com/en/github-cli/github-cli/quickstart)
[TWONE React-Native repo](https://github.com/Twone-app/twone-react-native)

1. Make computer user, root user

2. Download Homebrew

3. Login into GitHub CLI

4. Git clone repo

5. Checkout to dev branch `git checkout dev`

6. Git pull `git pull`

7. Make your new branch `git checkout -b $YOUR_NAME/$FEATURE_NAME`

## Running the project

Ensure you've followed the [Setting up the development environment](https://reactnative.dev/docs/environment-setup) doc.
Now you can setup and run the project by running:

- `yarn` to install the dependencies
- run the following steps for your platform
- copy`.env.example` file as `.env` and add your backend API

### Android

Open project using android studio and wait till project dependencies are initiallized, then run:

- `yarn start` to start the metro bundler, in a dedicated terminal
- `yarn android` to run the Android application

### iOS

Pods are installed automatically every time you run `yarn`

Manual Pods installation:

- `cd ios`
- `pod install` to install pod dependencies
- `cd ..` to come back to the root folder
- `yarn start` to start the metro bundler, in a dedicated terminal

To start the app run:

- `yarn ios` to run the iOS application

### Unit tests

```shell script
yarn test
```

## Scripts

- `android` runs the app on adroid
- `android:clean` runs gradle clean
- `clean` deletes all pods and node modules and installs them from scratch
- `delivery-check` runs linter, typescript compiler and unit tests, should finish successfully before the delivery (push)
- `postinstall` this script will always be ran after `yarn` or `npm i`
- `ios` runs the app on ios
- `lint` runs linter
- `sort` sorts `package.json` and stages it
- `start` starts react-native's metro bundler
- `test` runs unit tests
- `tsc` runs typescript compiler
