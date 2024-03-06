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
- Added Mic Button
- Added Form with input
  - Added search button 
  - added search input styling
  - added search button styling

- made the form dissapear through tailwind classes on small screen sizes
  - extra classes on form - `md:flex hidden`

# 9. Responsive changes
- added Search and Mic buttons to Righ Hand Section
  - they are hidden on md or larger sizes

# 10. Mobile Search Bar
- added state and state toggle to search button to toggle the form with the search bar
  - if this state is true we hide the other navbar elements
- added back button to toggle the state back to false
! - The above still has a UX oversight when you resize the window
  - all the elements should show when we hit md or above screen size apart from the mobile only icons

# 11. Video Card Container Grid Layout
## Container grid for the cards
  - added grid styling to the container div for the video cards and categories
# 12. Category Pills
- Added CategoryPills component with buttons
- added new variant to make one of the buttons dark
- added data folder with `home.ts` to export an array of categories
- called map to display a button for each category

## Setting category conditional variant for selected category display
- added a state to store the current selected category
- passed down the setState function to the CategoryPills component and the category
- added ternary to set the correct variant based on the category
- added onClick call to the buttons to change the selected category, this is done using a callBack to `setSelectedCategory` with the category passed in

## Scrolling
- removed horizontal scrolling using tailwind classes
`overflow-x-hidden px-8 pb-4`

## Chevron Arrows to navigate through category pills
- Added DIV in `CategoryPills`
- added `Button` with `ChevronLeft` in it, specified variant and size
- specified div tailwind classes to position the Button and add a soft gradient to transparent

- repeated the above for the right hand button

- added 2 states to display Chevron Buttons when they are visible
  - made sure buttons are only displayed when this state is true

## Navigation through category pills bar
- Added `TRANSLATE_AMOUNT` constant above component
- Added `translate` state
- Added onClick callbacks to `setTranslate`
  - added functions to handle translate updates
    - left calculates a new value by decrementing `translate` with `TRANSLATE_AMOUNT`
      - left makes sure value doesn't go below 0

    - right calculates a new value by decrementing `translate` with `TRANSLATE_AMOUNT`
      - right gets the max scrollable width and the current visible width.
        - these are aquired using a ref of the categoryPills container
        - `edge:` = `containerRef.current.scrollWidth` 
        - `width:` = `containerRef.current.clientWidth`

      - right makes sure `newTranslate` + `width` doesn't go over edge
        - if it does it returns: `edge` - `width`

- added `useEffect()` with an resizeObserver
  - this handles the button display
  - this runs everytime categories or translate changes

- The aboves makes sure the navigation through the Pills works properly through button input.

# 12. Video Container Section

## Video Container Grid
- In `App` added new div with the grid styling
- `grid-cols-[repeat(auto-fill,minmax(300px,1fr))]` handles the repeat of the grid
  - Makes sure the items are never less than 300px wide
  - If there's room for more items on the row it adds them.
  
``` HTML 
<div className="grid gap-4 
  grid-cols-[repeat(auto-fill,minmax(300px,1fr))]"></div>
```

## VideoItem Component
- Added `VideoGridItem` component
  - Specified `VideoGridItemProps` type
  - added `a` with nested:
    - video `img` and specified attributes and styling
    - video info with specified attributes and styling
  - added mock video data to `home.ts` in data folder















