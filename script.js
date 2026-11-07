let volume = 0;
let started = false;
let trialNumber = 0;

const ENDPOINT = 25.0;
const KNOWN_CONCENTRATION = 0.250;

function startExperiment() {

    started = true;

    document.getElementById("experimentMessage").innerHTML =
        "🟢 Experiment started. Add titrant slowly until the endpoint is reached.";

    document.getElementById("indicatorText").innerHTML =
        "Indicator added — ready for titration.";

    document.getElementById("experiment").scrollIntoView({
        behavior: "smooth"
    });
}


function addTitrant() {

    if (!started) {

        document.getElementById("experimentMessage").innerHTML =
            "⚠️ Please click Start Experiment first.";

        return;
    }

    if (volume >= 25) {

        document.getElementById("experimentMessage").innerHTML =
            "🎯 Endpoint reached! Do not add more titrant.";

        return;
    }

    volume += 1;

    updateExperiment();

    const drop = document.getElementById("drop");

    drop.classList.remove("animate");

    void drop.offsetWidth;

    drop.classList.add("animate");

    if (volume < 20) {

        document.getElementById("experimentMessage").innerHTML =
            "🧪 Titrant added. Continue carefully.";

    } else if (volume < 25) {

        document.getElementById("experimentMessage").innerHTML =
            "⚠️ Approaching endpoint. Add titrant carefully.";

    } else {

        document.getElementById("experimentMessage").innerHTML =
            "🎯 Endpoint observed at 25.0 mL.";
    }
}


function updateExperiment() {

    document.getElementById("volumeDisplay").innerText =
        volume.toFixed(1) + " mL";

    const liquid =
        document.getElementById("buretteLiquid");

    liquid.style.height =
        (100 - volume / 25 * 100) + "%";

    const flaskLiquid =
        document.getElementById("flaskLiquid");

    flaskLiquid.style.height =
        (45 + volume / 25 * 15) + "%";

    if (volume >= 25) {

        flaskLiquid.style.background = "#d86a9c";

        document.getElementById("indicatorText").innerHTML =
            "🎯 ENDPOINT DETECTED";

    }

    const percentage =
        Math.min((volume / 25) * 100, 100);

    document.getElementById("progress").style.width =
        percentage + "%";

    document.getElementById("progressText").innerText =
        Math.round(percentage) + "%";
}


function recordObservation() {

    if (!started) {

        document.getElementById("experimentMessage").innerHTML =
            "⚠️ Start the experiment first.";

        return;
    }

    if (volume === 0) {

        document.getElementById("experimentMessage").innerHTML =
            "⚠️ Add titrant before recording an observation.";

        return;
    }

    trialNumber++;

    const tbody =
        document.querySelector("#observationTable tbody");

    const row =
        document.createElement("tr");

    const observation =
        volume >= 25
            ? "Endpoint observed"
            : "Titrant added";

    row.innerHTML = `
        <td>${trialNumber}</td>
        <td>${volume.toFixed(1)} mL</td>
        <td>${observation}</td>
    `;

    tbody.appendChild(row);

    document.getElementById("experimentMessage").innerHTML =
        "📋 Observation recorded successfully.";
}


function calculateResult() {

    if (volume < 25) {

        document.getElementById("experimentMessage").innerHTML =
            "⚠️ Complete the titration up to the endpoint first.";

        return;
    }

    /*
       C1V1 = C2V2

       Known concentration = 0.250 M
       Titrant volume = 25.0 mL

       For this virtual experiment the unknown concentration
       is set to 0.250 M at the endpoint.
    */

    const unknownConcentration = 0.250;

    document.getElementById("resultText").innerHTML =
        `<b>Endpoint volume:</b> 25.0 mL<br>
         <b>Concentration of unknown solution:</b>
         ${unknownConcentration.toFixed(3)} M`;

    document.getElementById("experimentMessage").innerHTML =
        "✅ Calculation completed successfully.";

    document.getElementById("resultBox").style.border =
        "3px solid #16805c";

    document.getElementById("result").scrollIntoView({
        behavior: "smooth"
    });
}


function resetExperiment() {

    volume = 0;
    started = false;
    trialNumber = 0;

    document.getElementById("volumeDisplay").innerText =
        "0.0 mL";

    document.getElementById("buretteLiquid").style.height =
        "100%";

    document.getElementById("flaskLiquid").style.height =
        "45%";

    document.getElementById("flaskLiquid").style.background =
        "#f3c4d8";

    document.getElementById("progress").style.width =
        "0%";

    document.getElementById("progressText").innerText =
        "0%";

    document.getElementById("indicatorText").innerText =
        "Indicator + Unknown Solution";

    document.getElementById("experimentMessage").innerText =
        "Ready to begin the experiment.";

    document.getElementById("resultText").innerText =
        "Complete the experiment and click Calculate.";

    document.querySelector("#observationTable tbody").innerHTML =
        "";
}


function generateReport() {

    const reportWindow = window.open("", "_blank");

    if (!reportWindow) {

        alert("Please allow pop-ups for this website.");

        return;
    }

    reportWindow.document.write(`

        <!DOCTYPE html>

        <html>

        <head>

            <title>SRM Chemistry Virtual Lab Report</title>

            <style>

                body {
                    font-family: Arial;
                    padding: 50px;
                    color: #172033;
                }

                h1 {
                    color: #123f79;
                }

                h2 {
                    border-bottom: 2px solid #123f79;
                    padding-bottom: 5px;
                }

                .box {
                    padding: 20px;
                    background: #f1f5fa;
                    margin: 20px 0;
                }

                table {
                    width: 100%;
                    border-collapse: collapse;
                }

                th, td {
                    border: 1px solid #aaa;
                    padding: 10px;
                    text-align: center;
                }

                th {
                    background: #123f79;
                    color: white;
                }

            </style>

        </head>

        <body>

            <h1>🧪 SRM Chemistry Virtual Lab</h1>

            <p>
                <b>Department of Chemistry</b><br>
                SRM Institute of Science and Technology<br>
                Tiruchirappalli
            </p>

            <h2>Team Members</h2>

            <div class="box">

                <b>G. Likitha</b><br>
                Registration No: RA2611030050100

                <br><br>

                <b>B. Tarun Ram Keran</b><br>
                Registration No: RA261103005086

            </div>

            <h2>Experiment</h2>

            <p>
                Acid–Base Titration
            </p>

            <h2>Aim</h2>

            <p>
                To determine the concentration of an unknown
                solution using acid–base titration.
            </p>

            <h2>Observation</h2>

            <table>

                <tr>
                    <th>Parameter</th>
                    <th>Value</th>
                </tr>

                <tr>
                    <td>Endpoint Volume</td>
                    <td>${volume.toFixed(1)} mL</td>
                </tr>

                <tr>
                    <td>Endpoint</td>
                    <td>
                        ${volume >= 25 ? "Observed" : "Not reached"}
                    </td>
                </tr>

            </table>

            <h2>Result</h2>

            <div class="box">

                Concentration of unknown solution:
                <b>0.250 M</b>

            </div>

            <h2>Conclusion</h2>

            <p>
                The virtual experiment demonstrates the basic
                procedure of acid–base titration and the
                determination of an unknown concentration.
            </p>

            <br>

            <button onclick="window.print()">
                Print / Save as PDF
            </button>

        </body>

        </html>

    `);

    reportWindow.document.close();
}
