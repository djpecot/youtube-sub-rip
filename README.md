# youtube-sub-rip

MV3 Chrome Extension for ripping hard-coded/baked-in/non-CC subtitles from Youtube videos (Watch a lot of videos in Chinese? you'll love this). There are too many videos/youtubes that refuse to upload their subtitles to Youtube so that they can be parsed/translated for non-native speaking viewers :(. Rather than try to contact every single youtuber, probably easier (and arguably more fun) to create an extractor. Let's see how it goes.

![image](https://user-images.githubusercontent.com/8185181/180892201-1e4ff6b9-1e5d-4b32-8639-e0198b4fbcc7.png)
![image](https://user-images.githubusercontent.com/8185181/180892400-002953f1-7361-4263-af96-223851878da5.png)

## Onboarding

Install [Prettier extension](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)

### JS/Web

We will use `yarn` as our package manager for JS related stuff. Install for [whichever system](https://classic.yarnpkg.com/lang/en/docs/install/#windows-stable):

After installing yarn and cloning this repo, at the top level run `yarn install` to pull all the modules we need.

## 🥍Goals

-   Create an [MV3 Chrome Extension](https://developer.chrome.com/docs/extensions/mv3/intro/)
-   Scan images in YouTube videos for subtitles (see 1st image above) [(Example video without CC but has "baked" subs or whatever the term is)](https://www.youtube.com/watch?v=j92Wv3l89n8)
-   Extract subtitles and render as CC (basically want to force-add subtitles) (see 2nd image)
-   ! If necessary, figure out server-side CV solution that won't break our wallets
-   HAVE FUN WHILE DOING IT!
-   BONUS: Catch "pop-up" subtitles

## 📋🤯Planning + Brainstorming

### Feature Roadmap

-   [x] Pull in boilerplate and play around with MV3 @doug
-   [ ] Port extension to use React
-   [ ] Add ability to screenshot a YT image @doug
-   [ ] If possible, attempt to build a basic JavaScript subtitle extractor @paige
    -   [ ] Extract text from video
    -   [ ] Mark the begining and end timestamps, i.e. 1:00 - 1:03 (check VTT format)
-   [ ] ?SERVER: Build basic API for processing image data (Python, Django)
-   [ ] Pizza party?

### UI

-   Configuration-Settings:
    -   toggle on/off
    -   ? adjustments based on model
    -   ? Add a model

### 🤖CV Architecture

**Paige**, could use your input here. Core questions we can think about before running too far ahead would be:

-   Can we succesfully run a model in some dev environment (Python notebook, local JS etc.) that extracts the subtitles into txt/json format?
-   Are there any JS models that can do this job?
-   I think since this is a web environment, ideally we'd like to do client-side for speed's/price's sake if at all possible. I believe [Chrome Web Store is limited to 2GB size](https://stackoverflow.com/questions/17817631/is-there-a-size-limit-on-a-crx-for-a-chrome-app-thats-installed-manually#:~:text=Yes%2C%20There%20is%20a%20limit,this%20answer%20is%20being%20posted.) I think aiming initially for a size of 500MB would be a reasonable trade-off between speed to download and not too "heavy" of an extension, but let me know what you find!
-   If we can't run a JS model / client-side we can look into setting up our own cloud instance on GCP or something similar that won't be uber expensive. We could also even just create a "shell" extension and have our users download the model to their computer after installing

## Decisions

None so far 😅

## Resources

-   [Code Camp MV3 YT extension tutorial](https://www.youtube.com/watch?v=0n809nd4Zu4)
-   [MV2 YT Screenshot recorder](https://github.com/FutureMillennium/Screenshot-YouTube)
-   [tesseract.js, browser-side OCR solution (will need to presegment text)](https://tesseract.projectnaptha.com/)
-   [Software solutioin pretty similar to what we need](https://www.videoconverterfactory.com/tips/extract-hardcoded-subtitles.html)
-   [Chinese Repo using Python, includes bottom of subs pre-processing step](https://github.com/shenbo/video-subtitles-ocr)
