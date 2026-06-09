// All processing is local. Nothing is sent anywhere.
(function () {
  "use strict";

  const $ = (id) => document.getElementById(id);

  function buildSheet() {
    const topic = $("topic").value.trim();
    const goal = $("goal").value.trim();
    const questions = $("questions").value
      .split("\n")
      .map((q) => q.trim())
      .filter(Boolean);

    const parts = [];
    if (topic) parts.push(`<p><strong>Topic:</strong> ${escapeHtml(topic)}</p>`);
    if (goal) parts.push(`<p><strong>Goal:</strong> ${escapeHtml(goal)}</p>`);

    if (questions.length) {
      const items = questions.map((q) => `<li>${escapeHtml(q)}</li>`).join("");
      parts.push(`<p><strong>Questions for my clinician:</strong></p><ul>${items}</ul>`);
    } else {
      parts.push("<p><em>Add at least one question above.</em></p>");
    }

    $("output-content").innerHTML = parts.join("");
    $("output").classList.remove("hidden");
    $("output").scrollIntoView({ behavior: "smooth" });
  }

  function escapeHtml(str) {
    const div = document.createElement("div");
    div.textContent = str;
    return div.innerHTML;
  }

  function copySheet() {
    const text = $("output-content").innerText;
    navigator.clipboard.writeText(text).then(
      () => alert("Copied to clipboard."),
      () => alert("Copy failed — you can select the text manually.")
    );
  }

  $("generate").addEventListener("click", buildSheet);
  $("copy").addEventListener("click", copySheet);
  $("print").addEventListener("click", () => window.print());
})();
