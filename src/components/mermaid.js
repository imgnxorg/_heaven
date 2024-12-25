import React, { useEffect } from "react";
import mermaid from "mermaid";

const Mermaid = ({ chart }) => {
  useEffect(() => {
    mermaid.initialize({ startOnLoad: true });
    mermaid.contentLoaded();
  }, [chart]);

  return <div className="mermaid">{chart}</div>;
};

export default Mermaid;
