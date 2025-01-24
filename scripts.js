const ageCalculatorForm = document.getElementById("ageCalculatorForm");
const resultDiv = document.getElementById("result");
const searchHistoryList = document.getElementById("searchHistory");

let recentSearches = [];

ageCalculatorForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const dobInput = document.getElementById("dob").value;
  if (!dobInput) {
    resultDiv.innerHTML = ""; // Clear previous result
    displayResult("Please enter a valid date.");
    return;
  }

  const dob = new Date(dobInput);
  const today = new Date();

  if (dob > today) {
    displayResult("Date of birth cannot be in the future.");
    return;
  }

  // Calculate years, months, and days
  let years = today.getFullYear() - dob.getFullYear();
  let months = today.getMonth() - dob.getMonth();
  let days = today.getDate() - dob.getDate();

  if (months < 0) {
    years--;
    months += 12;
  }
  if (days < 0) {
    months--;
    const lastMonth = new Date(today.getFullYear(), today.getMonth(), 0);
    days += lastMonth.getDate();
  }

  displayResult(`You are ${years} years, ${months} months, and ${days} days old.`);
  updateRecentSearches(dobInput, `${years} years, ${months} months, and ${days} days`);
});

function displayResult(message) {
  resultDiv.innerHTML = `<p>${message}</p>`;
}

function updateRecentSearches(dob, age) {
  if (recentSearches.length === 3) recentSearches.shift(); // Keep only the last 3 searches
  const formattedDob = new Date(dob).toLocaleDateString("en-GB"); // Format as dd-mm-yyyy
  recentSearches.push({ dob: formattedDob, age });

  searchHistoryList.innerHTML = recentSearches
    .map((search) => `<li>${search.dob} - ${search.age}</li>`)
    .join("");
}