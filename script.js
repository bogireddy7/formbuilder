const addBtns = document.querySelectorAll(".add-btn");
const formPreview = document.getElementById("form-preview");

// Counter for unique IDs
let fieldCounter = 0;

// Add field to form
addBtns.forEach(btn => {
  btn.addEventListener("click", () => {
    const type = btn.dataset.type;
    fieldCounter++;

    let fieldWrapper = document.createElement("div");
    fieldWrapper.classList.add("form-field");
    fieldWrapper.id = `field-${fieldCounter}`;

    let input;
    switch(type){
      case "text":
        input = document.createElement("input");
        input.type = "text";
        input.placeholder = "Text Field";
        break;
      case "email":
        input = document.createElement("input");
        input.type = "email";
        input.placeholder = "Email";
        break;
      case "phone":
        input = document.createElement("input");
        input.type = "tel";
        input.placeholder = "Phone Number";
        break;
      case "dob":
        input = document.createElement("input");
        input.type = "date";
        break;
      case "textarea":
        input = document.createElement("textarea");
        input.placeholder = "Enter text...";
        break;
    }

    // Remove button
    let removeBtn = document.createElement("button");
    removeBtn.type = "button";
    removeBtn.classList.add("remove-btn");
    removeBtn.innerText = "Remove";
    removeBtn.addEventListener("click", () => {
      fieldWrapper.remove();
    });

    fieldWrapper.appendChild(input);
    fieldWrapper.appendChild(removeBtn);

    // Insert before submit button
    formPreview.insertBefore(fieldWrapper, document.getElementById("submit-btn"));
  });
});

// Handle form submit
formPreview.addEventListener("submit", e => {
  e.preventDefault();
  let data = {};
  const fields = formPreview.querySelectorAll(".form-field");
  fields.forEach((f, index) => {
    const input = f.querySelector("input, textarea");
    data[`field_${index+1}`] = input.value;
  });
  alert("Form Data Submitted:\n" + JSON.stringify(data, null, 2));
});
