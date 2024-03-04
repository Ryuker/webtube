import Button from "./Button";

export default function CategoryPills() {
  return (
    <div className="overflow-x-hidden relative">
      <div className="flex whitespace-nowrap gap-3 transition-transform w-[max-content]">
        <Button variant="dark" 
          className="py-1 px-3 rounded-lg whitespace-nowrap">
          All
        </Button>
        <Button className="py-1 px-3 rounded-lg whitespace-nowrap">
          JavaScript
        </Button>
      </div>
    </div>
  );
}