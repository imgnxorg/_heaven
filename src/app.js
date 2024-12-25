"use client";

import mermaid from "mermaid";
import MDXContent from "./markdown.mdx"; // Import the MDX content
import { useEffect } from "react";

const App = () => {
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
    <div>
      <MDXContent />
      <pre>From App.js</pre>
    </div>
  );
};

export default App;
