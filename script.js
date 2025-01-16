document.addEventListener("DOMContentLoaded", () => {
  const jsonInput = document.getElementById("jsonInput");
  const jsonOutput = document.getElementById("jsonOutput");
  const error = document.getElementById("error");
  const tabSpaceSelect = document.getElementById("tabSpaceSelect");
  const specificationSelect = document.getElementById("specificationSelect");
  const themeToggle = document.getElementById("themeToggle");
  const copyButton = document.getElementById("copyButton");
  const downloadButton = document.getElementById("downloadButton");
  const uploadButton = document.getElementById("uploadButton");
  const fileInput = document.createElement("input");
  fileInput.type = "file";
  fileInput.accept = ".json";

  document
    .getElementById("exampleButton")
    .addEventListener("click", loadExampleJSON);
  document.getElementById("clearButton").addEventListener("click", clearInput);
  document
    .querySelector(".buttons button:nth-child(1)")
    .addEventListener("click", formatJSON);
  document
    .querySelector(".buttons button:nth-child(2)")
    .addEventListener("click", minifyJSON);
  themeToggle.addEventListener("click", toggleTheme);
  copyButton.addEventListener("click", copyToClipboard);
  downloadButton.addEventListener("click", downloadFormattedJSON);

  uploadButton.addEventListener("click", () => fileInput.click());
  fileInput.addEventListener("change", handleFileUpload);

  function loadExampleJSON() {
    const specification = specificationSelect.value;
    jsonInput.value =
      specification === "JSON5"
        ? `{
  name: "Bob",
  age: 25,
  isEmployed: false,
  skills: ["HTML", "CSS", "React"],
  address: {
    city: "Somewhere",
    zipcode: "67890"
  }
}`
        : `{
  "name": "Alice",
  "age": 30,
  "isEmployed": true,
  "skills": ["JavaScript", "Python", "C++"],
  "address": {
    "city": "Wonderland",
    "zipcode": "12345"
  }
}`;
  }

  function parseJSONInput(input, specification) {
    try {
      return specification === "JSON5" ? JSON5.parse(input) : JSON.parse(input);
    } catch (e) {
      throw new Error(
        escapeHTML(
          `Oops! Something went wrong. Please check your JSON and the selected specification and try again. Here are more details about this error: ${e.message}`
        )
      );
    }
  }

  function stringifyJSON(json, specification, tabSpaces = null) {
    return specification === "JSON5"
      ? JSON5.stringify(json, null, tabSpaces)
      : JSON.stringify(json, null, tabSpaces);
  }

  function formatJSON() {
    const input = jsonInput.value;
    const tabSpaces = parseInt(tabSpaceSelect.value, 10);
    const specification = specificationSelect.value;

    try {
      const json = parseJSONInput(input, specification);
      jsonOutput.value = stringifyJSON(json, specification, tabSpaces);
      error.style.display = "none";
    } catch (e) {
      displayError(e.message);
    }
  }

  function minifyJSON() {
    const input = jsonInput.value;
    const specification = specificationSelect.value;

    try {
      const json = parseJSONInput(input, specification);
      jsonOutput.value = stringifyJSON(json, specification);
      error.style.display = "none";
    } catch (e) {
      displayError(e.message);
    }
  }

  function displayError(message) {
    error.textContent = message;
    error.style.display = "block";
    jsonOutput.value = "";
  }

  function clearInput() {
    jsonInput.value = "";
    jsonOutput.value = "";
    error.style.display = "none";
  }

  function copyToClipboard() {
    navigator.clipboard.writeText(jsonOutput.value).then(() => {
      copyButton.textContent = "Copied!";
      setTimeout(() => (copyButton.textContent = "Copy"), 2000);
    });
  }

  function downloadFormattedJSON() {
    const blob = new Blob([jsonOutput.value], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "formatted.json";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }

  function handleFileUpload(event) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => (jsonInput.value = e.target.result);
      reader.readAsText(file);
    }
  }

  function toggleTheme() {
    document.body.classList.toggle("dark");
    themeToggle.textContent = document.body.classList.contains("dark")
      ? "Dark"
      : "Light";
  }

  function escapeHTML(str) {
    const div = document.createElement("div");
    div.textContent = str;
    return div.innerHTML;
  }
});
