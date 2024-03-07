import { ChevronDown, ChevronUp, Clapperboard, Clock, History, Home, Library, List, PlaySquare, Repeat, ThumbsUp, User } from "lucide-react";
import { Children, ElementType, ReactNode, useState } from "react";
import Button, { buttonStyles } from "../components/Button";
import { twMerge } from "tailwind-merge";

export default function Sidebar(){
  return(
    <>
      <aside className="sticky top-0 overflow-y-auto scrollbar-hidden pb-4 flex flex-col ml-1 lg:hidden">
        <SmallSidebarItem Icon={Home} title="Home" url="/" />
        <SmallSidebarItem Icon={Repeat} title="Shorts" url="/shorts" />
        <SmallSidebarItem Icon={Clapperboard} title="Subscriptions" url="/subscriptions" />
        <SmallSidebarItem Icon={Library} title="Library" url="/library" />
      </aside>
      <aside className="w-56 lg:sticky absolute top-0 overflow-y-auto scrollbar-hidden pb-4 flex-col gap-2 px-2 flex">
        <LargeSidebarSection>
          <LargeSidebarItem isActive Icon={Home} title="Home" url="/" />
          <LargeSidebarItem Icon={Repeat} title="Shorts" url="/shorts" />
          <LargeSidebarItem Icon={Clapperboard} title="Subscriptions" url="/subscriptions" />
        </LargeSidebarSection>
        <hr />
        <LargeSidebarSection title="You" visibleItemCount={4}>
          <LargeSidebarItem Icon={User} title="Your channel" url="/library" />
          <LargeSidebarItem Icon={History} title="History" url="/history" />
          <LargeSidebarItem Icon={PlaySquare} title="Your videos" url="/your-videos" />
          <LargeSidebarItem Icon={Clock} title="Watch later" url="/playlist?list=WL" />
          <LargeSidebarItem Icon={ThumbsUp} title="Liked videos" url="/liked" />
          <LargeSidebarItem Icon={List} title="custom-list" url="/list" />
        </LargeSidebarSection>
        <hr />
        <LargeSidebarSection title="Subscriptions" visibleItemCount={3}>
          <LargeSidebarItem Icon={Home} title="Subscription #1" url="/channel" />
          <LargeSidebarItem Icon={Home} title="Subscription #2" url="/channel" />
          <LargeSidebarItem Icon={Home} title="Subscription #3" url="/channel" />
          <LargeSidebarItem Icon={Home} title="Watch later" url="/channel" />
          <LargeSidebarItem Icon={Home} title="Your Channel" url="/channel" />
          <LargeSidebarItem Icon={Home} title="Your Channel" url="/channel" />
          <LargeSidebarItem Icon={Home} title="Your Channel" url="/channel" />
          <LargeSidebarItem Icon={Home} title="Your Channel" url="/channel" />
        </LargeSidebarSection>
        <hr />
        <LargeSidebarSection title="Explore">
          <LargeSidebarItem Icon={Home} title="Trending" url="/trending" />
          <LargeSidebarItem Icon={Home} title="Music" url="/music" />
          <LargeSidebarItem Icon={Home} title="Movies" url="/movies" />
          <LargeSidebarItem Icon={Home} title="Gaming" url="/gaming" />
          <LargeSidebarItem Icon={Home} title="News" url="/news" />
          <LargeSidebarItem Icon={Home} title="Sports" url="/sports" />
          <LargeSidebarItem Icon={Home} title="Podcasts" url="/podcasts" />
        </LargeSidebarSection>
        <hr />
        <LargeSidebarSection title="More from WebTube">
          <LargeSidebarItem Icon={Home} title="WebTube Premium" url="/premium" />
          <LargeSidebarItem Icon={Home} title="WebTube Studio" url="/studio" />
          <LargeSidebarItem Icon={Home} title="WebTube Music" url="/music" />
          <LargeSidebarItem Icon={Home} title="WebTube Kids" url="/kids" />
        </LargeSidebarSection>
        <hr />
        <LargeSidebarSection>
          <LargeSidebarItem Icon={Home} title="Settings" url="/trending" />
          <LargeSidebarItem Icon={Home} title="Report history" url="/history" />
          <LargeSidebarItem Icon={Home} title="Help" url="/help" />
          <LargeSidebarItem Icon={Home} title="Send feedback" url="/feedback" />
        </LargeSidebarSection>
        <LargeSidebarSection>
          <div>
            <a href="/about">About</a>
            <a href="/press">Press</a>
            <a href="/copyright">Copyright</a>
            <a href="/contact">Contact us</a>
            <a href="/creators">Creators</a>
            <a href="/advertise">Advertise</a>
            <a href="/developers">Developers</a>
            <hr />
            <a href="/terms">Terms</a>
            <a href="/privacy">Privacy</a>
            <a href="/policy-and-safety">Policy & Safety</a>
            <a href="/how-youtube-works">How YouTube works</a>
            <a href="/test">Test new features</a>
            <hr />
            <span>© 2024 WebTube, built for learing purposes</span>
          </div>
        </LargeSidebarSection>

      </aside>
    </>
  );
}

type SmallSidebarItemProps = {
  Icon: ElementType
  title: string
  url: string
}

function SmallSidebarItem({Icon, title, url}: SmallSidebarItemProps){
  return (
    <a href={url} 
      className={twMerge(buttonStyles({ variant: "ghost"}),
      "py-4 px-1 flex flex-col items-center rounded-lg gap-1")}
    >
      <Icon className="w-6 h-6" />
      <div className="text-sm">{title}</div>
    </a>
  );
}

type LargeSidebarSectionProps = {
  children: ReactNode
  title?: string
  visibleItemCount?: number
}

function LargeSidebarSection({children, title, visibleItemCount = Number.POSITIVE_INFINITY} : LargeSidebarSectionProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const childrenArray = Children.toArray(children).flat();
  const showExpandButton =  childrenArray.length > visibleItemCount;
  const visibleChildren = isExpanded ? childrenArray : childrenArray.slice(0, visibleItemCount);
  const ButtonIcon = isExpanded ? ChevronUp : ChevronDown;

  return (
    <div>
      {title && <div className="ml-4 mt-2 text-lg mb-1">{title}</div> }
      {visibleChildren}
      {showExpandButton && 
        <Button variant="ghost" className="w-full flex items-center rounde-lg gap-4 p-3"
          onClick={() => setIsExpanded(e =>!e)}>
          <ButtonIcon className="w-6 h-6"/>
          <div>{isExpanded ? "Show Less" : "Show More"}</div>
        </Button>}
    </div>
  );
}

type LargeSidebarItemProps = {
  Icon: ElementType
  title: string
  url: string
  isActive?: boolean
}

function LargeSidebarItem({Icon, title, url, isActive = false}: LargeSidebarItemProps){
  return (
    <a href={url} className={twMerge(buttonStyles({ variant: "ghost"}), `w-full flex items-center rounde-lg gap-4 p-3 
    ${isActive ? "font-bold bg-neutral-100 hover:bg-secondary" : undefined}`)}>
      <Icon className="w-6 h-6" />
      <div className="whitespace-nowrap overflow-hidden text-ellipsis">
        {title}
      </div>
    </a>
  );
}