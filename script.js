document.getElementById("computeBtn").addEventListener("click", function() {
    // Get input values
    let empNum = document.getElementById("empNum").value;
    let lastName = document.getElementById("lastName").value;
    let firstName = document.getElementById("firstName").value;
    let position = document.getElementById("position").value;
    let nhw = parseFloat(document.getElementById("nhw").value); // Number of hours worked

    // Validate inputs
    if (!empNum || !lastName || !firstName || isNaN(nhw) || nhw <= 0) {
        alert("Please fill in all fields correctly.");
        return;
    }

    // Define hourly rates based on position (from Excel)
    let rate;
    if (position === "Manager") {
        rate = 500;
    } else if (position === "Supervisor") {
        rate = 400;
    } else {
        rate = 300;
    }

    // Compute Gross Pay
    let grossPay = rate * nhw;

    // Compute Bonus based on Gross Pay (Excel bonus table)
    let bonus = 0;
    if (grossPay >= 15000) {
        bonus = grossPay * 0.30;
    } else if (grossPay >= 10000) {
        bonus = grossPay * 0.25;
    } else if (grossPay >= 5000) {
        bonus = grossPay * 0.20;
    } else if (grossPay >= 3000) {
        bonus = grossPay * 0.15;
    }

    // Compute SSS (3% of Gross Pay)
    let sss = grossPay * 0.03;

    // Compute Tax based on Gross Pay (Excel tax table)
    let tax = 0;
    if (grossPay >= 15000) {
        tax = grossPay * 0.32;
    } else if (grossPay >= 8000) {
        tax = grossPay * 0.25;
    } else if (grossPay >= 4000) {
        tax = grossPay * 0.23;
    } else if (grossPay >= 2000) {
        tax = grossPay * 0.18;
    }

    // Compute Pag-IBIG (Always 10% of Gross Pay)
    let pagibig = grossPay * 0.10;

    // Compute Total Deduction
    let totalDeductions = sss + tax + pagibig;

    // Compute Net Pay (Final Take-home Income)
    let netPay = grossPay + bonus - totalDeductions;

    // Update Results Display
    document.getElementById("rate").textContent = `₱${rate.toFixed(2)}`;
    document.getElementById("grossPay").textContent = `₱${grossPay.toFixed(2)}`;
    document.getElementById("bonus").textContent = `₱${bonus.toFixed(2)}`;
    document.getElementById("tax").textContent = `₱${tax.toFixed(2)}`;
    document.getElementById("sss").textContent = `₱${sss.toFixed(2)}`;
    document.getElementById("pagibig").textContent = `₱${pagibig.toFixed(2)}`;
    document.getElementById("totalDeductions").textContent = `₱${totalDeductions.toFixed(2)}`;
    document.getElementById("netPay").textContent = `₱${netPay.toFixed(2)}`;

    // Show the results box with a smooth transition
    let resultsBox = document.querySelector(".results");
    resultsBox.style.display = "block";
    setTimeout(() => {
        resultsBox.style.opacity = "1"; // Fade-in effect
    }, 100);
});
