// Fills in the instance's own name and sign-in link from the consumer's
// /site-instance.json (contract section 4). The page holds no sign-in
// logic and makes no authenticated request; without this file, or with
// JavaScript off, the defaults in the HTML stand.

const SUPPORTED_CONTRACT = 1;

function sameOriginPath(value) {
  // Only a path on this origin: never an absolute URL, never "//host".
  return typeof value === "string" && value.startsWith("/") && !value.startsWith("//");
}

async function applyInstance() {
  let instance;
  try {
    const response = await fetch("/site-instance.json", { credentials: "omit", cache: "no-cache" });
    if (!response.ok) return;
    instance = await response.json();
  } catch {
    return;
  }
  if (!instance || typeof instance !== "object") return;
  if (instance.contract !== undefined && instance.contract !== SUPPORTED_CONTRACT) return;

  if (typeof instance.name === "string" && instance.name.trim()) {
    for (const el of document.querySelectorAll("[data-instance-name]")) {
      el.textContent = `· ${instance.name.trim()}`;
    }
  }
  if (sameOriginPath(instance.sign_in)) {
    for (const el of document.querySelectorAll("#sign-in, [data-sign-in]")) {
      el.setAttribute("href", instance.sign_in);
    }
  }
}

applyInstance();
