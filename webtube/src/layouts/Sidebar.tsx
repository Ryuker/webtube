import { ChevronDown, ChevronUp, Clapperboard, Clock, Film, Flame, Gamepad2, History, Home, Library, Lightbulb, List, ListVideo, Music, Newspaper, PlaySquare, Podcast, Repeat, ThumbsUp, Trophy, User } from "lucide-react";
import { Children, ElementType, ReactNode, useState } from "react";
import Button, { buttonStyles } from "../components/Button";
import { twMerge } from "tailwind-merge";
import { playlists, subscriptions } from "../data/sidebar";
import { useSidebarContext } from "../contexts/SideBarContext";
import { PageHeaderFirstSection } from "./PageHeader";

export default function Sidebar(){
  const { isSmallOpen, isLargeOpen} = useSidebarContext();
  return(
    <>
      <aside 
      className={`sticky top-0 overflow-y-auto scrollbar-hidden pb-4 flex flex-col ml-1 
        ${
          isLargeOpen ? "lg:hidden" : "lg:flex"
        }`}
      >
        <SmallSidebarItem IconOrImgUrl={Home} title="Home" url="/" />
        <SmallSidebarItem IconOrImgUrl={Repeat} title="Shorts" url="/shorts" />
        <SmallSidebarItem IconOrImgUrl={Clapperboard} title="Subscriptions" url="/subscriptions" />
        <SmallSidebarItem IconOrImgUrl={Library} title="Library" url="/library" />
      </aside>
      <aside 
        className={`w-56 lg:sticky absolute top-0 overflow-y-auto scrollbar-hidden pb-4 flex-col gap-2 px-2 
        ${isLargeOpen ? "lg:flex" : "lg:hidden"} 
        ${isSmallOpen ? "flex z-[999] bg-white max-h-screen" : "hidden"}`}
      >
        <div className="lg:hidden pt-2 pb-4 px-2 sticky-top-0 bg-white">
          <PageHeaderFirstSection />
        </div>
        <LargeSidebarSection>
          <LargeSidebarItem isActive IconOrImgUrl={Home} title="Home" url="/" />
          <LargeSidebarItem IconOrImgUrl={Repeat} title="Shorts" url="/shorts" />
          <LargeSidebarItem IconOrImgUrl={Clapperboard} title="Subscriptions" url="/subscriptions" />
        </LargeSidebarSection>
        <hr />
        <LargeSidebarSection title="You" visibleItemCount={4}>
          <LargeSidebarItem IconOrImgUrl={User} title="Your channel" url="/library" />
          <LargeSidebarItem IconOrImgUrl={History} title="History" url="/history" />
          <LargeSidebarItem IconOrImgUrl={PlaySquare} title="Your videos" url="/your-videos" />
          <LargeSidebarItem IconOrImgUrl={Clock} title="Watch later" url="/playlist?list=WL" />
          <LargeSidebarItem IconOrImgUrl={ThumbsUp} title="Liked videos" url="/liked" />
          {playlists.map(playlist => (
            <LargeSidebarItem key={playlist.id} IconOrImgUrl={ListVideo} title={playlist.name} url={`/playlist?list=${playlist.id}`} />
          ))}
          
        </LargeSidebarSection>
        <hr />
        <LargeSidebarSection title="Subscriptions" visibleItemCount={3}>
          {subscriptions.map(subscription => 
            <LargeSidebarItem 
            key={subscription.id} IconOrImgUrl={subscription.imgUrl} 
            title={subscription.channelName} url={`/@${subscription.id}`} />
          )}
          
        </LargeSidebarSection>
        <hr />
        <LargeSidebarSection title="Explore">
          <LargeSidebarItem IconOrImgUrl={Flame} title="Trending" url="/trending" />
          <LargeSidebarItem IconOrImgUrl={Music} title="Music" url="/music" />
          <LargeSidebarItem IconOrImgUrl={Film} title="Movies" url="/movies" />
          <LargeSidebarItem IconOrImgUrl={Gamepad2} title="Gaming" url="/gaming" />
          <LargeSidebarItem IconOrImgUrl={Newspaper} title="News" url="/news" />
          <LargeSidebarItem IconOrImgUrl={Trophy} title="Sports" url="/sports" />
          <LargeSidebarItem IconOrImgUrl={Podcast} title="Podcasts" url="/podcasts" />
        </LargeSidebarSection>
        <hr />
        <LargeSidebarSection title="More from WebTube">
          <LargeSidebarItem IconOrImgUrl={Home} title="WebTube Premium" url="/premium" />
          <LargeSidebarItem IconOrImgUrl={Home} title="WebTube Studio" url="/studio" />
          <LargeSidebarItem IconOrImgUrl={Home} title="WebTube Music" url="/music" />
          <LargeSidebarItem IconOrImgUrl={Home} title="WebTube Kids" url="/kids" />
        </LargeSidebarSection>
        <hr />
        <LargeSidebarSection>
          <LargeSidebarItem IconOrImgUrl={Home} title="Settings" url="/trending" />
          <LargeSidebarItem IconOrImgUrl={Home} title="Report history" url="/history" />
          <LargeSidebarItem IconOrImgUrl={Home} title="Help" url="/help" />
          <LargeSidebarItem IconOrImgUrl={Home} title="Send feedback" url="/feedback" />
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
  IconOrImgUrl: ElementType
  title: string
  url: string
}

function SmallSidebarItem({IconOrImgUrl, title, url}: SmallSidebarItemProps){
  return (
    <a href={url} 
      className={twMerge(buttonStyles({ variant: "ghost"}),
      "py-4 px-1 flex flex-col items-center rounded-lg gap-1")}
    >
      <IconOrImgUrl className="w-6 h-6" />
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
  const ButtonIconOrImgUrl = isExpanded ? ChevronUp : ChevronDown;

  return (
    <div>
      {title && <div className="ml-4 mt-2 text-lg mb-1">{title}</div> }
      {visibleChildren}
      {showExpandButton && 
        <Button variant="ghost" className="w-full flex items-center rounde-lg gap-4 p-3"
          onClick={() => setIsExpanded(e =>!e)}>
          <ButtonIconOrImgUrl className="w-6 h-6"/>
          <div>{isExpanded ? "Show Less" : "Show More"}</div>
        </Button>}
    </div>
  );
}

type LargeSidebarItemProps = {
  IconOrImgUrl: ElementType | string
  title: string
  url: string
  isActive?: boolean
}

function LargeSidebarItem({IconOrImgUrl, title, url, isActive = false}: LargeSidebarItemProps){
  return (
    <a href={url} className={twMerge(buttonStyles({ variant: "ghost"}), `w-full flex items-center rounde-lg gap-4 p-3 
    ${isActive ? "font-bold bg-neutral-100 hover:bg-secondary" : undefined}`)}>
      
      {typeof IconOrImgUrl === "string" 
        ? <img src={IconOrImgUrl} className="w-6 h-6 rounded-full" />
        : <IconOrImgUrl className="w-6 h-6" />
      }

      <div className="whitespace-nowrap overflow-hidden text-ellipsis">
        {title}
      </div>
    </a>
  );
}