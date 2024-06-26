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
- added map call in App to render a `VideoGridItem` for each video
  - Passed down the video props using `...` operator

## FormatDuration utils function
- Added `utils` folder with `formatDuration` function
  - formats the time using an instance of `numberFormat` class from `Intl`
  - calculates the hours, minutes and seconds
  - returns a template string using the numberFormat instance

- called the function in videoGridItem to display the duration 

## Video info
- Added a div with a bunch of a tags to display the profile icon, title, account and views
  - views are formatted using an instance of `Intl.NumberFormat(undefined, { notation: "compact"})`
    - this formats it when it with a M or K depending on the views.

- Profile images are currently loaded from the profileUrl
  - added this to index.html to make sure they are loaded correctly
``` HTML
<meta name="referrer" content="no-referrer" />
```
- added `Views •` behind the views count and time ago using formatTimeAgo()
  - formatTimeAgo() is a new utils function
    - it's explained more in depth here: [link to article](https://blog.webdevsimplified.com/2020-07/relative-time-format/)

## Video player on mouse hover
- added a `isVideoPlaying` state
- added useEffect to:
  - play the video from the start when the state is changed.
  - pauses video when state is set to false
- added `onMouseEnter` and `onMouseLeave` listeners to the grid item container 
  - these toggle the state
- added video item with appropriate styling and some other attributes
``` JS
<video 
  ref={videoRef} muted playsInline src={videoUrl} 
  className={`block h-full object-cover absolute inset-0 transition-opacity duration-200 
  ${isVideoPlaying ? "opacity-100 delay-200" : "opacity-0"}`}
/>
```
- Tweaked image to unround the borders when video is playing
``` JS
<img src={thumbnailUrl} alt={title}
  className={`block w-full h-full object-cover transition-[border-radius] duration-200 
  ${isVideoPlaying ? "rounded-none" : "rounded-xl" }`} 
/>
```

# 13. Sidebar Component
- Added `Sidebar` to layouts and imported into app
  - specified some styling

## Small Side Bar 
- in Sidebar added `SmallSideBarItem` component
  - this renders an `a` element with `icon`, `title` and `url`
- populated Sidebar component with SmallSideBarItem items

## Large Side Bar
- added a new `aside` element for this with bunch of styling
- added a `LargeSidebarSection` component in this file
  - this renders its children
  - it's props are:
    - children: of type `ReactNode`
    - `title` and `visibleItemCount` as optional props
  - visibleItemCount is set to `Number.POSITIVE_INFINITY` by default
  - in the component we get a new array of the children matching the visibleItemCount
    - `.flat` make sure we have a 1 dimensional array
    - we then slice it to the correct length
    ``` JS
    const childrenArray = Children.toArray(children).flat();
    const visibleChildren = childrenArray.slice(0, visibleItemCount);
    ```
  - we then render the visibleChildren and the title

- added `LargeSidebarItems` component in this file with props type
  - this is nested in `LargeSideBarSection`
  - contains an `a` element with `icon`, `title`, `url` 
  - there's an optional `isActive` prop on the type which is used to change the button appearance.

- added `isExpanded` state 
- added Button to toggleShowMore and showLess of `LargeSideBar`
  - button is displayed when there's more in the section that is currently displayed

- Populated sidebar with elements matching YouTube to explore the implementation
- in the 'You' section mapped over playlist data to display the playlist buttons
  - added `sidebar.ts` to the data folder with the mock data

## Supporting image in LargeSidebarItem
- changed Icon to `IconOrImgUrl`, type can be either `ElementType` or `string`
- added ternary to display an image when it's a string and else render the Icon
- populated subscriptions using mock subscriptions data

## Large Side Bar scroll bar styling
- this is done through custom css
``` CSS index.css
@tailwind base;
@tailwind components;
@tailwind utilities;

* {
  scrollbar-width: thin;
}

*::-webkit-scrollbar {
  @apply bg-transparent w-2;
}  
*::-webkit-scrollbar-thumb {
  @apply bg-secondary-dark rounded-full;
}

.scrollbar-hidden::-webkit-scrollbar-thumb {
  @apply bg-transparent;
}

.scrollbar-hover::-webkit-scrollbar-thumb {
  @apply bg-secondary-border;
}
```

## Hiding the LargeSideBar
- specified to styling `lg:flex hidden`
  - this hides it on other sizes lg > higher sizes

# 14. Expand and Collapsing the Large Side Bar on button click
- added `contexts` folder with a `SideBarContext.tsx` file
  - code is fairly simple:
    - we specify a context and an exported `SidebarProdider` function which takes in the children and renders them. 
      - we specify a type for the props
      - we specify functions to toggle and close the sidebar, these take into account if it's on large or small screen sizes.
      - we specify states to tracks if the bar is open on large or small sizes.
    - we'll wrap the Sidebar component in this.
  
  - Added an exported function that prevents use of the context outside of the SidebarProvider.
  ``` JS 
  export function useSideBarContext() {
  const value = useContext(SidebarContext)
  if (value == null) throw Error("Cannot use outside of SidebarProvider");

  return value;
  }
  ```

## Wrapping All the app components in the SideBarProvider
- in `App.tsx` we wrapped all the div into the `SidebarProvider`
  - this allows access in all of the components.

## Toggling the Sidebar in the PageHeader
- in `PageHeader` imported the `toggle` function from use `useSideBarContext()`
- added onClick listener button with the hamburger icon to toggle the sidebar

## Opening and Closing the Side Bar in the Sidebar component
- destructured `isLargeOpen` and `isSmallOpen` from `useSidebarContent`

## Open behavior on both screen sizes
- in `Sidebar` component:
  - added conditional styling to both bars
    - Small Side Bar
    ```JS 
    ${
      isLargeOpen ? "lg:hidden" : "lg:flex"
    }
    ```
    
    - Large Side Bar
    ``` JS
    ${isLargeOpen ? "lg:flex" : "lg:hidden"} 
    ${isSmallOpen ? "flex z-[999] bg-white max-h-screen" : "hidden"}
    ```

## PageHeaderFirstSection Component
- Moved this div into it's own exported component `PageHeaderFirstSection`, 
  - but still in the same file
- this is used in both the PageHeader and Large Sidebar 
- in LargeSidebar wrapped this in a div with styling for padding, stickyness etc
``` JS
className="lg:hidden pt-2 pb-4 px-2 sticky-top-0 bg-white"
```

## Page background when small side bar is open
- between the sidebars added conditional to show a dark background on small sizes behind the bar
  - closes the bar when we click on the background
``` JS Sidebar.tsx
{isSmallOpen && (
  <div onClick={close} 
    className="lg:hidden fixed inset-0 z-[999] bg-secondary-dark opacity-50" 
  />
)}
```

## Auto closing LargeSideBar when shifting from small to large screen sizes
- added a useEffect that run once with a event listener on the `resize` event  
``` JS SideBarContext
// Make sure the large bar is closed when window is of the large size
useEffect(() => {
  const handler = () => {
    if (window.innerWidth >= 1024) setIsSmallOpen(false)
  };

  window.addEventListener("resize", handler);

  return () => {
    window.removeEventListener("resize", handler);
  }
},[])
```

# Project is now complete
- Can still add:
  - proper styling for the small links below in the bar
  - appropriate icons for the sections in the sidebar that the tutorial doesn't cover



# Deploy to GitHub pages
[how to deploy to GHP](https://medium.com/@aishwaryaparab1/deploying-vite-deploying-vite-app-to-github-pages-166fff40ffd3)





  
 
















