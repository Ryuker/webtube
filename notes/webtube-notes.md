# Webtube

# 1. Setup 

## Vite
``` JS Terminal
$npm create vite@latest
```
## Tailwind
```JS Webtube Terminal
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```
- setup `tailwind.config` according to docs
- copied to index.css
``` CSS index.css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

# 2. Cleanup before start
- cleaned out App.tsx

# 3. Layouts folder
1. Added `layouts` folder in `src`

## Page Header
1. Added `PageHeader.tsx` component in layouts folder and imported into `App`

### Logo

# 4. Icons - Lucide React
- installed `lucide-react` icons
```JS Webtube terminal
npm i lucide-react
```
- imported `Menu` icon from lucide-react into `Header` and displayed in the button

# 5. Button
- added components folder and added Button component

## Installing Some Packages
``` Webtube terminal
npm i class-variance-authority tailwind-merge
```
- this is used to specify button styles across the app

## Specifying App Colors
- import colors from tailwind
```JS tailwind.config.js
import colors from "tailwindcss/colors";
```
- specified colors in `extend` key of theme

## Button styles
1. specified a buttonStyles object with variants that we are using in the render function
  - variants allow to control what kind of variations the button can have
    - this gives a lot of control of what is and isn't possible in terms of look with the button
2.  added ButtonProps type to pass some props to the button
3. added import of `twMerge` in Button to merge classNames we pass to the button , gives more control

# 6. Spacing
1. added some padding and margins to main div of `PageHeader`

# 7. Righhand Section of PageHeader
- imported Icons from Lucide
- reused the Button component with the Icons nested into it
- added flex styling to main RighHand section div to align the buttons horizontally with some dynamic margins

# 8. Search Bar
21:46 in the video











