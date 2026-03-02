import ElementSelector from "./ElementSelector";
import { Button } from "./ui/button";

export default function PageActions() {
  return (
      <div className="w-full flex items-center justify-between mt-2">
          <ElementSelector/>
          <Button>Export</Button>
    </div>
  )
}
