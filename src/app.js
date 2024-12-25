"use client";

import React from "react";
import mermaid from "mermaid";
import MermaidMDXContent from "./mermaid.mdx"; // Import the MDX content
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
      <MermaidMDXContent />
      <pre>From App.js</pre>
    </div>
  );
};

export default App;
