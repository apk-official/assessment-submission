import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
type ElementSelectorProps = {
  /** Currently selected assessment element */
  element: string;
};
/**
 * <ElementSelector />
 *
 * Displays a dropdown selector for the current assessment element.
 *
 * Responsibilities:
 * - Renders a styled select input for element selection.
 * - Displays the active element value inside the dropdown.
 *
 * Notes:
 * - Currently renders a single selectable item.
 * - Does not manage or emit selection changes (read-only UI at present).
 * - Intended to support multiple element options in future iterations.
 */
export default function ElementSelector({ element }: ElementSelectorProps) {
  return (
    <Select defaultValue="Element 1.1">
      <SelectTrigger className="w-45 shadow-none border-blue-500 dark:text-gray-100">
        <SelectValue placeholder="Element" />
      </SelectTrigger>
      <SelectContent className="border-none outline-none">
        <SelectGroup>
          <SelectItem value="Element 1.1">Element {element}</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
