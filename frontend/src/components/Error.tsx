import ErrorIllustration from "@/assets/error.svg"

type ErrorProps = {
  /** Error message to display to the user */
  error: string;
};
/**
 * <Error />
 *
 * Displays a user-friendly error state with an illustration and message.
 *
 * Responsibilities:
 * - Renders a visual error illustration.
 * - Displays a contextual error message.
 * - Falls back to a generic message if none is provided.
 *
 * Notes:
 * - Pure presentational component.
 * - Intended for use in data-fetching or failure states.
 */
export default function Error({ error }:ErrorProps) {
  // Safely extract error message
  return (
      <div className="flex flex-col w-full h-full items-center justify-center gap-4">
          <img src={ErrorIllustration} alt="Illustration of sad smiley face representing error" className="h-40 w-auto" />
          <p className="dark:text-neutral-200">Oops! {error?(error):"Something went wrong!"}</p>
    </div>
  )
}
