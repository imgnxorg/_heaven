import React from "react";
import { MDXProvider } from "@mdx-js/react";
import remarkMermaid from "remark-mermaidjs";

const Mermaid = () => import("./components/mermaid.js");

const components = {
  mermaid: Mermaid,
};

export default ({ children }) => (
  <MDXProvider components={components} remarkPlugins={[remarkMermaid]}>
    {children}
  </MDXProvider>
);
