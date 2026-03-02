import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemMedia,
  ItemTitle,
} from "@/components/ui/item"
import { Button } from "./ui/button"

export default function QuestionAndAnswerList() {
  return (
    <Item className="p-0 w-full mt-2">
  <ItemContent className="p-2 rounded-md w-full bg-gray-100 gap-2">
    <ItemTitle>Title</ItemTitle>
  </ItemContent>
</Item>
  )
}
