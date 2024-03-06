type VideoGridItemProps = {
  id: string
  title: string
  channel: {
    id: string
    name: string
    profileUrl: string
  }
  views: number
  postedAt: Date
  duration: number
  thumbnailUrl: string
  videoUrl: string
};

export default function VideoGridItem({
  id, title, channel, views, postedAt, duration, thumbnailUrl, videoUrl 
}: VideoGridItemProps){
  return ( 
    <div className="flex flex-col gap-2">
      VideoGridItem
      <a href={`/watch?v=${id}`}
        className="relative aspect-video"
      >
        <img src={thumbnailUrl} alt={title}
          className="block w-full h-full object-cover rounded-xl" />
      </a>
    </div>
  );
}