
function OpeningCeremony(next) {
  console.log("Lets start the game!");
  setTimeout(() => {
    // Initialize scores for participants
    const score = {
      red: 0,
      blue: 0,
      green: 0,
      yellow: 0,
    };
    console.log("Opening Ceremony completed.");
    // Proceed to next event via next
    next(score, LongJump);
  }, 1000);
}

function Race100M(score, next) {
  console.log("Race 100M has started...");
  setTimeout(() => {
    // Generate random time (10–15 sec) for each team
    const times = {
      red: Math.floor(Math.random() * 6) + 10,
      blue: Math.floor(Math.random() * 6) + 10,
      green: Math.floor(Math.random() * 6) + 10,
      yellow: Math.floor(Math.random() * 6) + 10,
    };
    console.log("Race Times (sec):", times);

    // Sort teams based on time (ascending)
    const sorted = Object.entries(times).sort((a, b) => a[1] - b[1]);
    
    // Allocate scores: 1st → 50, 2nd → 25
    score[sorted[0][0]] += 50;
    score[sorted[1][0]] += 25;

    // Updated scores after Race100M events
    console.log("Race100M is finished! Updated Scores:", score);
    next(score, HighJump);
  }, 3000);
}

function LongJump(score, next) {
  console.log("Long Jump has started...");
  setTimeout(() => {
    const teams = ["red", "blue", "green", "yellow"];
    const winner = teams[Math.floor(Math.random() * teams.length)];

    // Winner gets 150 points
    score[winner] += 150;
    console.log(`Long Jump winner: ${winner.toUpperCase()} (+150 pts)`);
    // Updated scores after Long Jump event
    console.log("Updated Scores after Long Jump:", score);
    next(score, AwardCeremony);
  }, 2000);
}

function HighJump(score, next) {
  console.log("High Jump has started...");

  // Ask user for team name
  const userInput = prompt(
    "Which team secured the highest jump? (red/blue/green/yellow)"
  );

  if (userInput) {
    const color = userInput.toLowerCase();
    if (score[color] !== undefined) {
      score[color] += 100;
      console.log(`${color.toUpperCase()} received +100 points in High Jump`);
    } else {
      console.log("Invalid team name entered.");
    }
  } else {
    console.log("No input provided. Event skipped.");
  }
  // Updated scores after High Jump event
  console.log("Updated score after High Jump:", score);
  next(score);
}

function AwardCeremony(score) {
  console.log("Award Ceremony has started...");

  // Sort scores descending
  const ranking = Object.entries(score).sort((a, b) => b[1] - a[1]);

  console.log(
    `🏆 1st Place: ${ranking[0][0].toUpperCase()} with ${ranking[0][1]} pts`
  );
  console.log(
    `🥈 2nd Place: ${ranking[1][0].toUpperCase()} with ${ranking[1][1]} pts`
  );
  console.log(
    `🥉 3rd Place: ${ranking[2][0].toUpperCase()} with ${ranking[2][1]} pts`
  );
}
