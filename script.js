let questions = [];
const builder = document.getElementById("builder");
const previewSection = document.getElementById("previewSection");

// Add Question
document.querySelectorAll(".controls button").forEach(btn => {
  btn.addEventListener("click", () => {
    const type = btn.dataset.type;
    questions.push({
      id: Date.now(),
      type,
      label: "Untitled Question",
      options: type === "radio" || type === "checkbox" || type === "select"
        ? ["Option 1"]
        : [],
      required: false
    });
    renderBuilder();
  });
});

// Render Builder
function renderBuilder(){
  builder.innerHTML = "";

  questions.forEach(q => {

    const card = document.createElement("div");
    card.className = "card";

    const labelInput = document.createElement("input");
    labelInput.type = "text";
    labelInput.value = q.label;
    labelInput.oninput = (e) => q.label = e.target.value;

    card.appendChild(labelInput);

    // Options for choice fields
    if(q.options.length > 0){
      q.options.forEach((opt, index) => {
        const optInput = document.createElement("input");
        optInput.type = "text";
        optInput.value = opt;
        optInput.oninput = (e) => q.options[index] = e.target.value;
        card.appendChild(optInput);
      });

      const addOpt = document.createElement("button");
      addOpt.textContent = "Add Option";
      addOpt.onclick = () => {
        q.options.push("New Option");
        renderBuilder();
      };
      card.appendChild(addOpt);
    }

    // Required toggle
    const requiredLabel = document.createElement("label");
    requiredLabel.className = "required";
    requiredLabel.innerHTML = `
      <input type="checkbox" ${q.required ? "checked" : ""}>
      Required
    `;
    requiredLabel.querySelector("input").onchange =
      (e) => q.required = e.target.checked;

    card.appendChild(requiredLabel);

    // Delete
    const del = document.createElement("span");
    del.className = "delete";
    del.textContent = "✖";
    del.onclick = () => {
      questions = questions.filter(item => item.id !== q.id);
      renderBuilder();
    };

    card.appendChild(del);

    builder.appendChild(card);
  });
}

// Preview Mode
document.getElementById("previewBtn").addEventListener("click", () => {
  previewSection.innerHTML = "";
  previewSection.classList.remove("hidden");

  const form = document.createElement("form");
  form.className = "preview-form";

  questions.forEach(q => {
    const label = document.createElement("label");
    label.textContent = q.label;
    form.appendChild(label);

    let input;

    if(q.type === "textarea"){
      input = document.createElement("textarea");
    }
    else if(q.type === "radio" || q.type === "checkbox"){
      q.options.forEach(opt => {
        const optionLabel = document.createElement("label");
        optionLabel.innerHTML = `
          <input type="${q.type}" name="${q.id}" value="${opt}" ${q.required ? "required" : ""}>
          ${opt}
        `;
        form.appendChild(optionLabel);
      });
      return;
    }
    else if(q.type === "select"){
      input = document.createElement("select");
      q.options.forEach(opt => {
        const option = document.createElement("option");
        option.textContent = opt;
        input.appendChild(option);
      });
    }
    else{
      input = document.createElement("input");
      input.type = q.type;
    }

    if(q.required) input.required = true;

    form.appendChild(input);
  });

  const submit = document.createElement("button");
  submit.textContent = "Submit";
  form.appendChild(submit);

  form.onsubmit = (e) => {
    e.preventDefault();
    alert("Form Submitted Successfully!");
  };

  previewSection.appendChild(form);
});
