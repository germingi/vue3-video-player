# vue3-video-player

Vue 3 video player component with subtitle support. 

![image](https://github.com/user-attachments/assets/0a977a7a-15a4-4cfc-85c5-b2ab4513d95f)

Based on [this repo](https://github.com/Devuelopers/vue-player).

## Usage 
1. Install the package:
   ```
   npm install @germingi/vue3-video-player
   ```
1. Import the component:
    ```js
    import VideoPlayer from "@germingi/vue3-video-player";
    import "@germingi/vue3-video-player/style.css";
    ```
1. Use the component:
    ```vue
    <VideoPlayer
      video-url="https://archive.org/download/BigBuckBunny_124/Content/big_buck_bunny_720p_surround.mp4"
    />

### VideoPlayer props

|prop|type|required|notes|
|---|---|---|---|
|subtitles|see [Subtitle props](https://github.com/gsproston/vue3-video-player/edit/6-update-readme/README.md#subtitle-props)|optional||
|videoHeight|number|optional|height of the video in pixels|
|videoWidth|number|optional|width of the video in pixels|
|videoUrl|string|required|url to the video|

### Subtitle props

|prop|type|required|notes|
|---|---|---|---|
|enabled|boolean|required|toggles the subtitle functionality|
|deleteFunc|(subtitleId: number) => void|required|deletes the subtitle with the id|
|downloadFunc|(subtitleId: number) => void|required|downloads the subtitle with the id|
|deselectFunc|(subtitleId: number) => void|required|deselects the subtitle with the id|
|selectFunc|(subtitleId: number) => void|required|selects the subtitle with the id|
|searchFunc|(searchTerm: string, language: string) => void|required|searches for subtitles|
|subtitles|[SubtitleInfo](https://github.com/gsproston/vue3-video-player/blob/6-update-readme/lib/models/Subtitles.ts)[]|required|list of subtitles to display|
|cues|[SubtitleCue](https://github.com/gsproston/vue3-video-player/blob/6-update-readme/lib/models/Subtitles.ts)[]|optional|subtitle cues to render|
|defaultSearchLanguage|string|optional|the default subtitle search language (default 'en')|
|secondSearchLanguage|string|optional|the alternative subtitle search language|

### Theme configuration

If you're not a fan of the default theme, you can customise it by changing these CSS variables

|name|default|
|---|---|
|--germingi-background-colour|![#000](https://placehold.co/15x15/000/000.png) `#000`|
|--germingi-video-control-colour|![#2d2d2d](https://placehold.co/15x15/2d2d2d/2d2d2d.png) `#2d2d2d`|
|--germingi-text-colour|![#eee](https://placehold.co/15x15/eee/eee.png) `#eee`|
|--germingi-lang-select-colour|![#904efc](https://placehold.co/15x15/904efc/904efc.png) `#904efc`|
|--germingi-sub-search-colour|![#222](https://placehold.co/15x15/222/222.png) `#222`|
|--germingi-sub-border-colour|![#888](https://placehold.co/15x15/888/888.png) `#888`|
|--germingi-sub-entry-colour|![#444](https://placehold.co/15x15/444/444.png) `#444`|
|--germingi-sub-entry-active-colour|![#666](https://placehold.co/15x15/666/666.png) `#666`|
|--germingi-sub-entry-hover-colour|![#333](https://placehold.co/15x15/333/333.png) `#333`|

## Demo

To see the component in action without installing it, you can use this repo! Here's what you need to do:
1. Clone this repo using `git clone`.
1. Change directory to the newly cloned repo.
1. Install the required packages with `npm install`.
1. Build the component with `npm run build`.
1. Deploy with `npm run dev`.
1. Check out the component in the browser of your choice! 😎
