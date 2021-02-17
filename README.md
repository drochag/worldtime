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

    This project depends of 1 environment variable:

    - REACT_APP_GOOGLE_MAPS_API_KEY: Get a Google API key with `/geocode` and `/timezone` endpoints permissions

## 🧐 What's inside?

1. Search for your preferred locations to see them on the list 🔎
1. Remove the desired locations with the trash icon at the left of each row 🗑️
1. Use the ruler to check equivalents in time while aligning other times 📏
1. Use it as a PWA and save it to your phone 😲
1. It automatically caches your search, so whenever you open the app/website you'll see your previous searches 😊

## 📝 TODO

1. Tests: Most of the components are tested, however the coverage is about 40% which can be improved.
1. Location could be detected so the home location would appear instantly and automatically as first picked location (Home).
1. Rearrangement with drag and drop for the locations.
