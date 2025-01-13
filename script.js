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

uploadButton.addEventListener("click", () => {
  fileInput.click();
});

fileInput.addEventListener("change", (event) => {
  const file = event.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = (e) => {
      jsonInput.value = e.target.result;
    };
    reader.readAsText(file);
  }
});

function parseJSONInput(input, specification) {
  try {
    return specification === "JSON5" ? JSON5.parse(input) : JSON.parse(input);
  } catch (e) {
    throw new Error(
      "Oops! It looks like your JSON is invalid. Please check the syntax and try again. Here are more details for your reference: " +
        e.message
    );
  }
}

function formatJSON() {
  const input = jsonInput.value;
  const tabSpaces = parseInt(tabSpaceSelect.value, 10);
  const specification = specificationSelect.value;

  try {
    const json = parseJSONInput(input, specification);
    jsonOutput.value = JSON.stringify(json, null, tabSpaces);
    error.style.display = "none";
  } catch (e) {
    error.textContent = e.message;
    error.style.display = "block";
    jsonOutput.value = "";
  }
}

function minifyJSON() {
  const input = jsonInput.value;
  const specification = specificationSelect.value;

  try {
    const json = parseJSONInput(input, specification);
    jsonOutput.value = JSON.stringify(json);
    error.style.display = "none";
  } catch (e) {
    error.textContent = e.message;
    error.style.display = "block";
    jsonOutput.value = "";
  }
}

function clearInput() {
  jsonInput.value = "";
  jsonOutput.value = "";
  error.style.display = "none";
}

function toggleTheme() {
  document.body.classList.toggle("dark");
  themeToggle.textContent = document.body.classList.contains("dark")
    ? "Dark"
    : "Light";
}

copyButton.addEventListener("click", () => {
  jsonOutput.select();
  document.execCommand("copy");
  copyButton.textContent = "Copied!";
  setTimeout(() => {
    copyButton.textContent = "Copy";
  }, 2000);
});

downloadButton.addEventListener("click", () => {
  const blob = new Blob([jsonOutput.value], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "formatted.json";
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
});
