import EmptyIllustrationDark from "@/assets/empty_dark.svg"
import EmptyIllustration from "@/assets/empty.svg"
export default function Empty() {
  return (
     <div className="flex flex-col w-full h-full items-center justify-center gap-4">
      <img src={EmptyIllustration} alt="Illustration of sad smiley face representing error" className="h-40 w-auto dark:hidden" />
      <img src={EmptyIllustrationDark} alt="Illustration of sad smiley face representing error" className="h-40 w-auto hidden dark:inline" />
          <p className="dark:text-neutral-200">Enter an assessment ID to get started.</p>
    </div>
  )
}
