<h1 align="center">
  World time lite
</h1>

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app). It's a lightweight app for checking different timezones.

## 🚀 Quick start

1.  **Clone this repo.**

    ```shell
    git clone https://github.com/DanMMX/worldtime.git
    ```

1.  **Start developing.**

    Navigate into your new site’s directory and start it up.

    ```shell
    cd worldtime/
    cp .env.template .env
    # modify that new .enf file with the Google API key
    npm i
    npm start
    ```

    You'll get your preferred browser opened with the live app

## 🧐 What's inside?

This project depends of 1 environment variable:

1. REACT_APP_GOOGLE_MAPS_API_KEY: Get a Google API key with `/geocode` and `/timezone` endpoints permissions

## 📝 TODO

1. Tests: Most of the components are tested, however the coverage is about 40% which can be improved.
1. Location could be detected so the home location would appear instantly and automatically as first picked location (Home).
1. Rearrangement with drag and drop for the locations.
1. Host it on SSH so Service worker can be enabled.
