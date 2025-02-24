import { AnnotationHandler, InnerLine } from "codehike/code";
import { PreWithFocus } from "./client";

export const focus: AnnotationHandler = {
  name: "focus",
  onlyIfAnnotated: true,
  PreWithRef: PreWithFocus,
  Line: (props) => (
    <InnerLine
      merge={props}
      className="px-2 opacity-50 data-[focus]:opacity-100"
    />
  ),
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  AnnotatedLine: ({ annotation, ...props }) => (
    <InnerLine merge={props} data-focus={true} className="bg-zinc-700/30" />
  ),
};
