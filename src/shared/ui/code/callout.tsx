import { AnnotationHandler, InlineAnnotation } from "codehike/code";

export const callout: AnnotationHandler = {
  name: "callout",
  transform: (annotation: InlineAnnotation) => {
    const { name, query, lineNumber, fromColumn, toColumn, data } = annotation;
    return {
      name,
      query,
      fromLineNumber: lineNumber,
      toLineNumber: lineNumber,
      data: { ...data, column: (fromColumn + toColumn) / 2 },
    };
  },
  Block: ({ annotation, children }) => {
    const { column } = annotation.data;
    return (
      <>
        {children}
        <div
          style={{ minWidth: `${column + 4}ch` }}
          className="relative my-1 w-fit select-none whitespace-break-spaces rounded border border-zinc-500 bg-zinc-800 px-2.5 pb-0.5 pt-1 prose-p:mx-2 prose-p:my-1"
        >
          <div
            style={{ left: `${column}ch` }}
            className="absolute -top-[1px] h-2 w-2 -translate-y-1/2 rotate-45 border-l border-t border-zinc-500 bg-zinc-800"
          />
          {annotation.query}
        </div>
      </>
    );
  },
};
