import React, { useState } from "react";

function Input() {
  const [name, setName] = useState("");

  const handleChange = (e) => setName(e.target.value);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", { name });
    // Add your form submission logic here
  };
  return (
    <div>
      <h2>INPUT</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <input
            type="text"
            id="name"
            name="name"
            value={name}
            onChange={handleChange}
            required
            placeholder="type something"
          />
        </div>
      </form>
    </div>
  );
}

export default Input;
