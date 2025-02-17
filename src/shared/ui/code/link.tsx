import { AnnotationHandler } from "codehike/code";

export const link: AnnotationHandler = {
  name: "link",
  Inline: ({ annotation, children }) => {
    const { query } = annotation;
    return (
      <a href={query} target="_blank">
        {children}
      </a>
    );
  },
};
