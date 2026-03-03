import ErrorIllustration from "@/assets/error.svg"
export default function Error({ error }: { error: string }) {
  // Safely extract error message
  return (
      <div className="flex flex-col w-full h-full items-center justify-center gap-4">
          <img src={ErrorIllustration} alt="Illustration of sad smiley face representing error" className="h-40 w-auto" />
          <p className="dark:text-neutral-200">Oops! {error?(error):"Something went wrong!"}</p>
    </div>
  )
}
