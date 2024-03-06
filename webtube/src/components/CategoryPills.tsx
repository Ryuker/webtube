import { ChevronLeft, ChevronRight } from "lucide-react";
import Button from "./Button";
import { useEffect, useRef, useState } from "react";

type CategoryPillProps = {
  categories: string[],
  selectedCategory: string,
  onSelect: (category: string) => void 
}

const TRANSLATE_AMOUNT = 200;

export default function CategoryPills({ categories, selectedCategory, onSelect }: CategoryPillProps ) {
  const [translate, setTranslate] = useState(800);
  const [isLeftVisible, setIsLeftVisible] = useState(false);
  const [isRightVisible, setIsRightVisible] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // check if buttons should be visible
  // - uses an observer
  useEffect(() => {
    if (containerRef.current == null) return;
    
    const observer = new ResizeObserver(entries => {
      const container = entries[0]?.target;

      if (container == null) return;

      setIsLeftVisible(translate > 0);
      
      setIsRightVisible(
        translate + container.clientWidth < container.scrollWidth
      );
    })

    observer.observe(containerRef.current);

    return () => {
      observer.disconnect();
    }

  },[categories, translate]);

  function handleTranslateLeft() {
    const newTranslate = translate - TRANSLATE_AMOUNT;

    if(newTranslate <= 0) // Clamp the value to 0 or up
      return 0;

    return newTranslate;
  }

  function handleTranslateRight() {
    if (containerRef.current === null) return translate;

    const newTranslate = translate + TRANSLATE_AMOUNT;

    // How wide the container is from the left right when scrolled all the way
    const edge = containerRef.current.scrollWidth;
    // The visible width of the container
    const width = containerRef.current.clientWidth;
    
    // Make sure we don't overshoot the max scroll width
    if(newTranslate + width >= edge) { 
      return edge - width;
    } 
      
    return newTranslate;
  }
  
  return (
    <div ref={containerRef} className="overflow-x-hidden relative">
      <div 
        className="flex whitespace-nowrap gap-3 transition-transform w-[max-content]"
        style={{transform: `translateX(-${translate}px)`}}
        // style={{ transform: `translateX(-${translate})px`}}
        >
        {categories.map(category => (
          <Button 
            key={category}
            onClick={() => onSelect(category)} 
            variant={selectedCategory === category ? "dark" : "default"}
            className="py-1 px-3 rounded-lg whitespace-nowrap">
            {category}
          </Button>
        ))}
      </div>

      {isLeftVisible && (
        <div className="absolute left-0 top-1/2 -translate-y-1/2 bg-gradient-to-r from-white from-50% to-transparent w-24 h-full">
          <Button variant="ghost" size="icon" 
            className="h-full aspect-square w-auto p-1.5"
            onClick={() => setTranslate(() => handleTranslateLeft())}
          >
            <ChevronLeft />
          </Button>
        </div>
      )}

      {isRightVisible && (
        <div className="absolute flex justify-end right-0 top-1/2 -translate-y-1/2 bg-gradient-to-l from-white from-50% to-transparent w-24 h-full">
          <Button variant="ghost" size="icon" 
            className="h-full aspect-square w-auto p-1.5"
            onClick={() => {
                setTranslate(handleTranslateRight());
              }
            }
            >
            <ChevronRight />
          </Button>
        </div>
      )}

    </div>
  );
}