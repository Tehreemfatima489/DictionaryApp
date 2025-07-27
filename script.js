
function searchWord() {
  const word = document.getElementById("wordInput").value.trim();
  const resultDiv = document.getElementById("result");

  if (!word) {
    resultDiv.innerHTML = "<p>Please enter a word to search.</p>";
    return;
  }

  fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`)
    .then(response => {
      if (!response.ok) {
        throw new Error("Word not found");
      }
      return response.json();
    })
    .then(data => {
      let output = `<h2>${word}</h2>`;
      data[0].meanings.forEach(meaning => {
        output += `<p><strong>Part of Speech:</strong> ${meaning.partOfSpeech}</p>`;
        meaning.definitions.forEach((def, index) => {
          output += `<p><strong>Definition ${index + 1}:</strong> ${def.definition}</p>`;
          if (def.example) {
            output += `<p><em>Example:</em> ${def.example}</p>`;
          }
        });
        output += `<hr>`;
      });
      resultDiv.innerHTML = output;
    })
    .catch(error => {
      resultDiv.innerHTML = `<p>${error.message}</p>`;
    });
}
