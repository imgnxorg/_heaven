"use server";

import React from "react";
import { createRoot } from "react-dom/client";
import "./styles.css";

const App = () => import("./app.js");

(async () => {
  // SSR
  const favorites = ["paypal"];
  try {
    const meta = favorites.map(async (site) => {
      if (!site.includes(".")) site = site + ".com";
      return await getMetaDescription(site);
    });

    console.log(meta);
  } catch (err) {
    console.error(err);
  }
})();

async function getMetaDescription(url) {
  try {
    const response = await fetch(`https://${url}`);

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
