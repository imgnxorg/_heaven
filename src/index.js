import React from "react";
import { createRoot } from "react-dom/client";
import App from "./app.js";
import "./styles.css";

favorites = ["paypal"];

(async () => {
  // SSR

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

const root = createRoot(document.getElementById("root"));

root.render(<App />);
