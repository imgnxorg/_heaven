import React from "react";
import { useEffect } from "react";
import remarkMermaid from "remark-mermaidjs";
import Markdown from "./mkdwn.md";
import Mermaid from "./mrmd.md";
import mermaid from "mermaid";
import { MDXProvider } from "@mdx-js/react";

const components = {
  em(properties) {
    return <i {...properties} />;
  },
};

const MDX = ({ content }) => {
  useEffect(() => {
    mermaid.initialize({
      startOnLoad: true,
      theme: "default",
      securityLevel: "loose",
      flowchart: {
        useMaxWidth: true,
        htmlLabels: true,
      },
    });
    mermaid.contentLoaded();
  }, []);
  return (
    <MDXProvider components={components}>
      <Markdown />
      <Mermaid />
    </MDXProvider>
  );
};

export default MDX;
