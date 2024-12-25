import mermaid from "mermaid";
import React from "react";
import ReactDOM from "react-dom";
import MDXContent from "./markdown.mdx"; // Import the MDX content

mermaid.initialize({
  startOnLoad: true,
  theme: "default",
  securityLevel: "loose",
  flowchart: {
    useMaxWidth: true,
    htmlLabels: true,
  },
});

favorites = ["paypal"];

(async () => {
  const meta = await favorites.map(async (site) => {
    if (!site.includes(".")) site = site + ".com";
    return await getMetaDescription(site);
  });
  console.log(meta);
})();

async function getMetaDescription(url) {
  try {
    const response = await fetch(url);

    const html = await response.text();

    const parser = new DOMParser();

    const doc = parser.parseFromString(html, "text/html");

    const metaDescription = doc.querySelector('meta[name="description"]');

    return metaDescription ? metaDescription.getAttribute("content") : null;
  } catch (error) {
    console.error("Error fetching meta description:", error);

    return null;
  }
}

const App = () => (
  <div>
    <MDXContent />
  </div>
);

ReactDOM.render(<App />, document.getElementById("root"));  
