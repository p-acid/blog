import { valueToEstree } from "estree-util-value-to-estree";
import GithubSlugger from "github-slugger";
import { visit } from "unist-util-visit";

const slugs = new GithubSlugger();

const extractText = (children) => {
  let result = "";
  for (const child of children) {
    if (child.type === "text" || child.type === "inlineCode") {
      result += child.value;
    } else if (Array.isArray(child.children)) {
      result += extractText(child.children);
    }
  }
  return result;
};

const remarkToc = () => {
  return (tree) => {
    const toc = [];
    slugs.reset();

    visit(tree, "heading", (node) => {
      const text = extractText(node.children);
      const id = slugs.slug(text);
      const depth = node.depth;

      const isValidHeading = id && text;

      if (isValidHeading) {
        toc.push({ id, text, depth });
      }
    });

    tree.children.unshift({
      type: "mdxjsEsm",
      value: "",
      data: {
        estree: {
          type: "Program",
          sourceType: "module",
          body: [
            {
              type: "ExportNamedDeclaration",
              specifiers: [],
              declaration: {
                type: "VariableDeclaration",
                kind: "const",
                declarations: [
                  {
                    type: "VariableDeclarator",
                    id: { type: "Identifier", name: "toc" },
                    init: valueToEstree(toc, { preserveReferences: true }),
                  },
                ],
              },
            },
          ],
        },
      },
    });
  };
};

export default remarkToc;
