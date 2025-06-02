function wrapEnglishWithLTR(text) {
  return text.replace(/[\u0000-\u007F]+/g, (match) => {
    return '\u202A' + match + '\u202C';
  });
}

document.getElementById("upload").addEventListener("change", function (event) {
  const reader = new FileReader();
  reader.onload = function (event) {
    const arrayBuffer = reader.result;
    mammoth
      .extractRawText({ arrayBuffer: arrayBuffer })
      .then((result) => {
        const fixedText = result.value
          .split("\n")
          .map((line) => wrapEnglishWithLTR(line))
          .join("\n");
        document.getElementById("output").value = fixedText;
      })
      .catch((err) => {
        alert("Error reading document: " + err.message);
      });
  };
  reader.readAsArrayBuffer(event.target.files[0]);
});
