// ==========================================
// FLAT REGISTER
// JavaScript - Version 1
// 28 Flat Table + Flat Details
// ==========================================


// ==========================================
// START - 28 FLATS
// ==========================================

const FLATS = [

    // A BLOCK - 7 FLATS
    "A-2",
    "A-3",
    "A-4",
    "A-5",
    "A-6",
    "A-7",
    "A-8",

    // B BLOCK - 6 FLATS
    "B-2",
    "B-4",
    "B-5",
    "B-6",
    "B-7",
    "B-8",

    // C BLOCK - 7 FLATS
    "C-2",
    "C-3",
    "C-4",
    "C-5",
    "C-6",
    "C-7",
    "C-8",

    // D BLOCK - 8 FLATS
    "D-1",
    "D-2",
    "D-3",
    "D-4",
    "D-5",
    "D-6",
    "D-7",
    "D-8"

];

// ==========================================
// END - 28 FLATS
// ==========================================


let flatData = {};


// ==========================================
// START - CREATE EMPTY DATA FOR 28 FLATS
// ==========================================

function createFlatData() {

    FLATS.forEach((flat, index) => {

        flatData[flat] = {

            id: index + 1,

            flat: flat,

            tenant: "",

            rent: 0,

            other: 0,

            status: "VACANT"

        };

    });

}

// ==========================================
// END - CREATE EMPTY DATA FOR 28 FLATS
// ==========================================


// ==========================================
// START - HOME SCREEN
// ==========================================

function goHome() {

    document
        .getElementById("flatListScreen")
        .classList.add("hidden");

    document
        .getElementById("flatDetailsScreen")
        .classList.add("hidden");

    document
        .querySelector(".dashboard")
        .classList.remove("hidden");

}

// ==========================================
// END - HOME SCREEN
// ==========================================


// ==========================================
// START - SHOW FLAT LIST
// ==========================================

function showFlatList() {

    document
        .getElementById("flatDetailsScreen")
        .classList.add("hidden");

    document
        .getElementById("flatListScreen")
        .classList.remove("hidden");

    document
        .querySelector(".dashboard")
        .classList.add("hidden");

    renderFlatTable();

}

// ==========================================
// END - SHOW FLAT LIST
// ==========================================


// ==========================================
// START - CREATE FLAT TABLE
// ==========================================

function renderFlatTable() {

    const tableBody =
        document.getElementById("flatTableBody");

    tableBody.innerHTML = "";


    // Current Month
    const currentMonth =
        new Date().toISOString().slice(0, 7);


    FLATS.forEach((flat, index) => {

        const data = flatData[flat];

        const row =
            document.createElement("tr");


        // ======================================
        // SL
        // ======================================

        const slCell =
            document.createElement("td");

        slCell.textContent =
            String(index + 1).padStart(2, "0");


        // ======================================
        // FLAT
        // ======================================

        const flatCell =
            document.createElement("td");

        flatCell.textContent =
            data.flat;


        // ======================================
        // TENANT
        // ======================================

        const tenantCell =
            document.createElement("td");

        tenantCell.textContent =
            data.tenant || "—";


        // ======================================
        // RENT
        // ======================================

        const rentCell =
            document.createElement("td");

        const rent =
            Number(data.rent) || 0;

        rentCell.textContent =
            rent > 0
                ? rent.toLocaleString()
                : "—";


        // ======================================
        // OTHER BILLS
        // ======================================

        const otherCell =
            document.createElement("td");

        let otherTotal = 0;


        if (Array.isArray(data.otherBills)) {

            otherTotal =
                data.otherBills.reduce(
                    (sum, bill) =>
                        sum + (Number(bill.amount) || 0),
                    0
                );

        }

        else {

            otherTotal =
                Number(data.other) || 0;

        }


        // Keep old data.other updated
        data.other = otherTotal;


        otherCell.textContent =
            otherTotal > 0
                ? otherTotal.toLocaleString()
                : "—";


        // ======================================
        // TOTAL
        // ======================================

        const totalCell =
            document.createElement("td");

        const total =
            rent + otherTotal;

        totalCell.textContent =
            total > 0
                ? total.toLocaleString()
                : "—";


        // ======================================
        // PAYMENT STATUS
        // ======================================

        const statusCell =
            document.createElement("td");

        const currentMonth =
            new Date().toISOString().slice(0, 7);

        let currentStatus = "VACANT";


        // ======================================
        // NO TENANT = VACANT
        // ======================================

        if (
            data.tenant &&
            data.tenant.trim() !== ""
        ) {

            currentStatus = "DUE";


            // ==================================
            // CHECK CURRENT MONTH RENT
            // ==================================

            if (Array.isArray(data.rentHistory)) {

                const currentRent =
                    data.rentHistory.find(
                        item =>
                            item.month === currentMonth
                    );


                if (
                    currentRent &&
                    currentRent.status === "PAID"
                ) {

                    currentStatus = "PAID";

                }

            }

        }


        // ======================================
        // SHOW STATUS
        // ======================================

        if (currentStatus === "PAID") {

            statusCell.textContent =
                "🟢 PAID";

            statusCell.className =
                "status-paid";

        }

        else if (currentStatus === "DUE") {

            statusCell.textContent =
                "🔴 DUE";

            statusCell.className =
                "status-due";

        }

        else {

            statusCell.textContent =
                "⚪ VACANT";

            statusCell.className =
                "status-vacant";

        }


        // Save calculated status

        data.status =
            currentStatus;


        // ======================================
        // ADD CELLS
        // ======================================

        row.appendChild(slCell);

        row.appendChild(flatCell);

        row.appendChild(tenantCell);

        row.appendChild(rentCell);

        row.appendChild(otherCell);

        row.appendChild(totalCell);

        row.appendChild(statusCell);


        // ======================================
        // CLICK FLAT
        // ======================================

        row.addEventListener("click", function () {

            openFlat(flat);

        });


        tableBody.appendChild(row);

    });


    // Save updated status
    localStorage.setItem(
        "flatRegisterData",
        JSON.stringify(flatData)
    );


    updateDashboard();

}

// ==========================================
// END - CREATE FLAT TABLE
// ==========================================


// ==========================================
// START - OPEN INDIVIDUAL FLAT
// ==========================================

function openFlat(flat) {

    const data = flatData[flat];


    // Flat List hide
    document
        .getElementById("flatListScreen")
        .classList.add("hidden");


    // Details show
    document
        .getElementById("flatDetailsScreen")
        .classList.remove("hidden");


    // Flat Name
    document
        .getElementById("detailsFlatName")
        .textContent = data.flat;


    // Tenant Name
    document
        .getElementById("detailsTenantName")
        .textContent = data.tenant || "No Tenant";


    // Status
    const statusElement =
        document.getElementById("detailsStatus");


    if (data.status === "PAID") {

        statusElement.textContent =
            "🟢 PAID";

    }

    else if (data.status === "DUE") {

        statusElement.textContent =
            "🔴 DUE";

    }

    else {

        statusElement.textContent =
            "⚪ VACANT";

    }

}

// ==========================================
// END - OPEN INDIVIDUAL FLAT
// ==========================================


// ==========================================
// START - DASHBOARD COUNT
// ==========================================

function updateDashboard() {

    let paid = 0;

    let due = 0;

    let vacant = 0;


    FLATS.forEach(flat => {

        const status =
            flatData[flat].status;


        if (status === "PAID") {

            paid++;

        }

        else if (status === "DUE") {

            due++;

        }

        else {

            vacant++;

        }

    });


    document
        .getElementById("paidCount")
        .textContent = paid;


    document
        .getElementById("dueCount")
        .textContent = due;


    document
        .getElementById("vacantCount")
        .textContent = vacant;

}

// ==========================================
// END - DASHBOARD COUNT
// ==========================================


// ==========================================
// START - EDIT SYSTEM
// ==========================================

let selectedFlatForEdit = null;


function toggleEditMode() {

    const flatName =
        document
            .getElementById("detailsFlatName")
            .textContent
            .trim();


    selectedFlatForEdit =
        flatName;


    const data =
        flatData[flatName];


    if (!data) {

        alert("Flat data not found.");

        return;

    }


    // আগের Edit Box থাকলে remove
    const oldBox =
        document.getElementById("editBox");


    if (oldBox) {

        oldBox.remove();

    }


    const editBox =
        document.createElement("div");


    editBox.id =
        "editBox";


    editBox.innerHTML = `

        <div class="edit-overlay">

            <div class="edit-panel">

                <h2>
                    Edit ${data.flat}
                </h2>


                <!-- TENANT NAME -->

                <label>
                    Tenant Name
                </label>


                <input
                    type="text"
                    id="editTenant"
                    value="${data.tenant || ""}"
                    placeholder="Tenant name"
                >


                <!-- MOBILE NUMBER -->

                <label>
                    Mobile Number
                </label>


                <input
                    type="tel"
                    id="editPhone"
                    value="${data.tenantPhone || ""}"
                    placeholder="Mobile number"
                    inputmode="tel"
                >


                <!-- IDENTITY / NID -->

                <label>
                    NID / Identity Card Number
                </label>


                <input
                    type="text"
                    id="editIdentity"
                    value="${data.tenantIdentity || ""}"
                    placeholder="NID / Passport / Other"
                >


                <!-- JOINING DATE -->

                <label>
                    Joining Date
                </label>


                <input
                    type="date"
                    id="editJoinDate"
                    value="${data.tenantJoinDate || ""}"
                >


                <!-- RENT -->

                <label>
                    Monthly Rent
                </label>


                <input
                    type="number"
                    id="editRent"
                    value="${data.rent || ""}"
                    placeholder="Rent amount"
                    inputmode="numeric"
                >


                <!-- BUTTONS -->

                <div class="edit-actions">

                    <button
                        onclick="saveFlatEdit()"
                    >
                        💾 Save
                    </button>


                    <button
                        onclick="closeEditBox()"
                    >
                        ✖ Cancel
                    </button>

                </div>

            </div>

        </div>

    `;


    document.body.appendChild(editBox);

}

// ==========================================
// END - EDIT SYSTEM
// ==========================================


// ==========================================
// START - SAVE EDITED DATA
// ==========================================

function saveFlatEdit() {

    if (!selectedFlatForEdit) {

        alert("Flat not selected.");

        return;

    }


    // Exact flat key
    const flatKey =
        FLATS.find(
            flat =>
                flat === selectedFlatForEdit
        );


    if (!flatKey) {

        alert("Flat not found.");

        return;

    }


    const data =
        flatData[flatKey];


    if (!data) {

        alert("Flat data not found.");

        return;

    }


    // ==========================================
    // GET EDITED INFORMATION
    // ==========================================

    const tenant =
        document
            .getElementById("editTenant")
            .value
            .trim();


    const phone =
        document
            .getElementById("editPhone")
            .value
            .trim();


    const identity =
        document
            .getElementById("editIdentity")
            .value
            .trim();


    const joinDate =
        document
            .getElementById("editJoinDate")
            .value;


    const rent =
        Number(
            document
                .getElementById("editRent")
                .value
        ) || 0;


    // ==========================================
    // SAVE INFORMATION
    // ==========================================

    data.tenant =
        tenant;


    data.tenantPhone =
        phone;


    data.tenantIdentity =
        identity;


    data.tenantJoinDate =
        joinDate;


    data.rent =
        rent;


    // ==========================================
    // SAVE TO LOCAL STORAGE
    // ==========================================

    localStorage.setItem(
        "flatRegisterData",
        JSON.stringify(flatData)
    );


    // ==========================================
    // CLOSE EDIT BOX
    // ==========================================

    closeEditBox();


    // ==========================================
    // UPDATE DETAILS SCREEN
    // ==========================================

    const tenantNameElement =
        document.getElementById(
            "detailsTenantName"
        );


    if (tenantNameElement) {

        tenantNameElement.textContent =
            data.tenant || "VACANT";

    }


    // ==========================================
    // UPDATE FLAT STATUS
    // ==========================================

    let status =
        "VACANT";


    if (data.tenant) {

        status =
            "DUE";


        // Check rent history
        if (
            data.rentHistory &&
            data.rentHistory.length > 0
        ) {

            const latestPayment =
                data.rentHistory[
                    data.rentHistory.length - 1
                ];


            if (
                latestPayment &&
                latestPayment.status === "PAID"
            ) {

                status =
                    "PAID";

            }

        }

    }


    data.status =
        status;


    // ==========================================
    // REFRESH TABLE & DASHBOARD
    // ==========================================

    renderFlatTable();

    updateDashboard();

}

// ==========================================
// END - SAVE EDITED DATA
// ==========================================


// ==========================================
// START - CLOSE EDIT BOX
// ==========================================

function closeEditBox() {

    const box =
        document.getElementById(
            "editBox"
        );


    if (box) {

        box.remove();

    }

}

// ==========================================
// END - CLOSE EDIT BOX
// ==========================================


// ==========================================
// START - TENANT INFORMATION
// ==========================================

function openTenant() {

    const flatName =
        document
            .getElementById("detailsFlatName")
            .textContent
            .trim();


    const data =
        flatData[flatName];


    if (!data) {

        alert("Flat data not found.");

        return;

    }


    const box =
        document.createElement("div");


    box.id =
        "tenantBox";


    box.innerHTML = `

        <div class="tenant-overlay">

            <div class="tenant-panel">

                <div class="tenant-header">

                    <button
                        onclick="closeTenant()"
                    >
                        ← Back
                    </button>


                    <h2>
                        Tenant Information
                    </h2>


                    <span></span>

                </div>


                <h3>
                    ${escapeHTML(data.flat)}
                </h3>


                <label>
                    Tenant Name
                </label>


                <input
                    type="text"
                    id="tenantName"
                    value="${escapeHTML(data.tenant || "")}"
                    placeholder="Tenant name"
                >


                <label>
                    Mobile Number
                </label>


                <input
                    type="tel"
                    id="tenantPhone"
                    value="${escapeHTML(data.tenantPhone || "")}"
                    placeholder="Mobile number"
                    inputmode="tel"
                >


                <label>
                    NID / Identity Card Number
                </label>


                <input
                    type="text"
                    id="tenantIdentity"
                    value="${escapeHTML(data.tenantIdentity || "")}"
                    placeholder="NID / Passport / Other"
                >


                <label>
                    Joining Date
                </label>


                <input
                    type="date"
                    id="tenantJoinDate"
                    value="${data.tenantJoinDate || ""}"
                >


                <div class="tenant-actions">

                    <button
                        onclick="saveTenant()"
                    >
                        💾 Save
                    </button>


                    <button
                        onclick="closeTenant()"
                    >
                        ✖ Cancel
                    </button>

                </div>

            </div>

        </div>

    `;


    document.body.appendChild(box);

}

// ==========================================
// END - TENANT INFORMATION
// ==========================================
