import JSON5 from "json5";

function formatJSON() {
  const input = document.getElementById("jsonInput").value;
  const output = document.getElementById("jsonOutput");
  const error = document.getElementById("error");
  const tabSpaces = parseInt(
    document.getElementById("tabSpaceSelect").value,
    10
  );
  const specification = document.getElementById("specificationSelect").value;

  try {
    let json;
    if (specification === "JSON5") {
      json = JSON5.parse(input);
    } else {
      json = JSON.parse(input);
    }
    output.value = JSON.stringify(json, null, tabSpaces);
    error.style.display = "none";
  } catch (e) {
    error.textContent = "Invalid JSON: " + e.message;
    error.style.display = "block";
    output.value = "";
  }
}

function minifyJSON() {
  const input = document.getElementById("jsonInput").value;
  const output = document.getElementById("jsonOutput");
  const error = document.getElementById("error");

  try {
    const json = JSON.parse(input);
    output.value = JSON.stringify(json);
    error.style.display = "none";
  } catch (e) {
    error.textContent = "Invalid JSON: " + e.message;
    error.style.display = "block";
    output.value = "";
  }
}

function clearInput() {
  document.getElementById("jsonInput").value = "";
  document.getElementById("jsonOutput").value = "";
  document.getElementById("error").style.display = "none";
}

function toggleTheme() {
  document.body.classList.toggle("dark");
}
