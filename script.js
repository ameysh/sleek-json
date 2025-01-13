const jsonInput = document.getElementById("jsonInput");
const jsonOutput = document.getElementById("jsonOutput");
const error = document.getElementById("error");
const tabSpaceSelect = document.getElementById("tabSpaceSelect");
const specificationSelect = document.getElementById("specificationSelect");
const themeToggle = document.getElementById("themeToggle");
const copyButton = document.getElementById("copyButton");

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
    ? "🌙"
    : "☀️";
}

copyButton.addEventListener("click", () => {
  jsonOutput.select();
  document.execCommand("copy");
  copyButton.textContent = "Copied!";
  setTimeout(() => {
    copyButton.textContent = "Copy";
  }, 2000);
});
