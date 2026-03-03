import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function ElementSelector({
  element,
}: {
  element: string;
}) {
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
