let volume = 0;
let experimentStarted = false;
let trialNumber = 0;

function startExperiment() {
    experimentStarted = true;

    document.getElementById("experimentMessage").innerHTML =
        "🧪 Experiment started. Add titrant using the button.";

    volume = 0;

    document.getElementById("volumeDisplay").innerText =
        volume.toFixed(1) + " mL";
}

function addTitrant() {

    if (!experimentStarted) {
        document.getElementById("experimentMessage").innerHTML =
            "⚠️ Please click Start Experiment first.";
        return;
    }

    if (volume >= 25) {
        document.getElementById("experimentMessage").innerHTML =
            "⚠️ Maximum titrant volume reached.";
        return;
    }

    volume += 1;

    document.getElementById("volumeDisplay").innerText =
        volume.toFixed(1) + " mL";

    document.getElementById("experimentMessage").innerHTML =
        "🧪 Titrant added. Current volume: " +
        volume.toFixed(1) + " mL";
}

function recordObservation() {

    if (!experimentStarted) {
        document.getElementById("experimentMessage").innerHTML =
            "⚠️ Start the experiment first.";
        return;
    }

    if (volume === 0) {
        document.getElementById("experimentMessage").innerHTML =
            "⚠️ Add titrant before recording.";
        return;
    }

    trialNumber++;

    let table = document.getElementById("observationTable");

    let row = table.insertRow(-1);

    let cell1 = row.insertCell(0);
    let cell2 = row.insertCell(1);
    let cell3 = row.insertCell(2);

    cell1.innerText = trialNumber;
    cell2.innerText = volume.toFixed(1) + " mL";
    cell3.innerText = "Endpoint observed";

    document.getElementById("experimentMessage").innerHTML =
        "✅ Observation recorded successfully.";
}

function calculateResult() {

    if (volume === 0) {
        document.getElementById("experimentMessage").innerHTML =
            "⚠️ Add titrant before calculating.";
        return;
    }

    // Example values
    let knownConcentration = 0.1;
    let knownVolume = 10;

    let unknownConcentration =
        (knownConcentration * volume) / knownVolume;

    document.getElementById("result").innerHTML = `
        <p><strong>Calculated Result:</strong></p>
        <p>Volume of titrant = ${volume.toFixed(1)} mL</p>
        <p>Concentration of unknown solution =
        ${unknownConcentration.toFixed(3)} M</p>
    `;

    document.getElementById("experimentMessage").innerHTML =
        "✅ Result calculated successfully.";
}

function resetExperiment() {

    volume = 0;
    experimentStarted = false;
    trialNumber = 0;

    document.getElementById("volumeDisplay").innerText =
        "0.0 mL";

    document.getElementById("experimentMessage").innerHTML =
        "Ready to begin the experiment.";

    document.getElementById("result").innerHTML =
        "<p>No result calculated yet.</p>";

    let table = document.getElementById("observationTable");

    while (table.rows.length > 1) {
        table.deleteRow(1);
    }
}

function generateReport() {

    let reportWindow = window.open("", "_blank");

    if (!reportWindow) {
        alert("Please allow pop-ups for this website.");
        return;
    }

    let resultText =
        document.getElementById("result").innerText;

    let observationTable =
        document.getElementById("observationTable").outerHTML;

    reportWindow.document.write(`
<!DOCTYPE html>
<html>
<head>

<title>SRM Chemistry Virtual Lab Report</title>

<style>

body {
    font-family: Arial, sans-serif;
    margin: 40px;
    line-height: 1.6;
}

h1, h2 {
    text-align: center;
    color: #17365D;
}

.header {
    text-align: center;
}

.team {
    margin-top: 20px;
    border-collapse: collapse;
    width: 100%;
}

.team th,
.team td {
    border: 1px solid #777;
    padding: 10px;
    text-align: center;
}

table {
    border-collapse: collapse;
    width: 100%;
    margin-top: 15px;
}

th,
td {
    border: 1px solid #777;
    padding: 8px;
    text-align: center;
}

button {
    padding: 10px 20px;
    margin-top: 20px;
    font-size: 16px;
}

@media print {
    button {
        display: none;
    }
}

</style>

</head>

<body>

<div class="header">

<h1>SRM INSTITUTE OF SCIENCE AND TECHNOLOGY</h1>

<h2>TIRUCHIRAPPALLI</h2>

<h3>Department of Chemistry</h3>

<h2>CHEMISTRY VIRTUAL LAB</h2>

</div>

<hr>

<h2>FINAL PROJECT REPORT</h2>

<h3>Team Members</h3>

<table class="team">

<tr>
<th>Name</th>
<th>Registration Number</th>
</tr>

<tr>
<td>G. Likitha</td>
<td>RA2611030050100</td>
</tr>

<tr>
<td>B. Tarun Ram Keran</td>
<td>RA261103005086</td>
</tr>

</table>

<h3>1. Aim</h3>

<p>
To perform a virtual acid-base titration and determine
the concentration of an unknown solution.
</p>

<h3>2. Theory</h3>

<p>
Acid-base titration is a quantitative analytical technique
used to determine the concentration of an unknown solution
using a solution of known concentration.
</p>

<p><strong>C₁V₁ = C₂V₂</strong></p>

<h3>3. Apparatus</h3>

<ul>
<li>Burette</li>
<li>Conical flask</li>
<li>Acid solution</li>
<li>Base solution</li>
<li>Indicator</li>
<li>Distilled water</li>
</ul>

<h3>4. Observation</h3>

${observationTable}

<h3>5. Result</h3>

<p>
${resultText}
</p>

<h3>6. Conclusion</h3>

<p>
The Chemistry Virtual Lab successfully demonstrates
the basic procedure of acid-base titration using a
web-based interactive simulation.
</p>

<br>

<p>
<strong>G. Likitha</strong><br>
Registration No: RA2611030050100
</p>

<p>
<strong>B. Tarun Ram Keran</strong><br>
Registration No: RA261103005086
</p>

<button onclick="window.print()">🖨️ Print / Save as PDF</button>

</body>
</html>
`);

    reportWindow.document.close();
}
