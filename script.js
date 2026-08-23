// ==========================================
// FLAT REGISTER
// JavaScript - Version 1
// 28 Flat Table + Flat Details
// ==========================================


// ==========================================
// 28 FLATS
// ==========================================

const FLATS = [
    "A-2", "A-3", "A-4", "A-5", "A-6",
    "B-2", "B-3", "B-4", "B-5", "B-6",
    "C-2", "C-3", "C-4", "C-5", "C-6",
    "D-2", "D-3", "D-4", "D-5", "D-6",
    "E-2", "E-3", "E-4", "E-5", "E-6",
    "F-2", "F-3", "F-4"
];


// ==========================================
// FLAT DATA
// ==========================================

let flatData = {};


// ==========================================
// CREATE EMPTY DATA FOR 28 FLATS
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
// HOME SCREEN
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
// SHOW FLAT LIST
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
// CREATE FLAT TABLE
// ==========================================

function renderFlatTable() {

    const tableBody =
        document.getElementById("flatTableBody");

    tableBody.innerHTML = "";


    FLATS.forEach((flat, index) => {

        const data = flatData[flat];

        const row =
            document.createElement("tr");


        // SL
        const slCell =
            document.createElement("td");

        slCell.textContent =
            String(index + 1).padStart(2, "0");


        // FLAT
        const flatCell =
            document.createElement("td");

        flatCell.textContent =
            data.flat;


        // TENANT
        const tenantCell =
            document.createElement("td");

        tenantCell.textContent =
            data.tenant || "—";


        // RENT
        const rentCell =
            document.createElement("td");

        rentCell.textContent =
            data.rent > 0
                ? data.rent.toLocaleString()
                : "—";


        // OTHER
        const otherCell =
            document.createElement("td");

        otherCell.textContent =
            data.other > 0
                ? data.other.toLocaleString()
                : "—";


        // TOTAL
        const totalCell =
            document.createElement("td");

        const total =
            Number(data.rent) +
            Number(data.other);

        totalCell.textContent =
            total > 0
                ? total.toLocaleString()
                : "—";


        // STATUS
        const statusCell =
            document.createElement("td");


        if (data.status === "PAID") {

            statusCell.textContent =
                "🟢 PAID";

            statusCell.className =
                "status-paid";

        }

        else if (data.status === "DUE") {

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


        // ADD CELLS
        row.appendChild(slCell);
        row.appendChild(flatCell);
        row.appendChild(tenantCell);
        row.appendChild(rentCell);
        row.appendChild(otherCell);
        row.appendChild(totalCell);
        row.appendChild(statusCell);


        // CLICK FLAT
        row.addEventListener("click", function () {

            openFlat(flat);

        });


        tableBody.appendChild(row);

    });


    updateDashboard();

}


// ==========================================
// OPEN INDIVIDUAL FLAT
// ==========================================

// ==========================================
// OPEN INDIVIDUAL FLAT
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

        statusElement.textContent = "🟢 PAID";

    }

    else if (data.status === "DUE") {

        statusElement.textContent = "🔴 DUE";

    }

    else {

        statusElement.textContent = "⚪ VACANT";

    }

}

// ==========================================
// DASHBOARD COUNT
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


    document.getElementById("paidCount")
        .textContent = paid;


    document.getElementById("dueCount")
        .textContent = due;


    document.getElementById("vacantCount")
        .textContent = vacant;

}


// ==========================================
// EDIT MODE
// ==========================================

// ==========================================
// EDIT SYSTEM
// ==========================================

let selectedFlatForEdit = null;

function toggleEditMode() {

    // যদি Flat Details থেকে Edit চাপা হয়
    const flatName =
        document.getElementById("detailsFlatName").textContent;

    selectedFlatForEdit = flatName;

    const data = flatData[flatName];

    if (!data) {
        alert("Flat data not found.");
        return;
    }

    // Edit Box তৈরি
    const editBox = document.createElement("div");

    editBox.id = "editBox";

    editBox.innerHTML = `
        <div class="edit-overlay">

            <div class="edit-panel">

                <h2>Edit ${data.flat}</h2>

                <label>Tenant Name</label>
                <input
                    type="text"
                    id="editTenant"
                    value="${data.tenant}"
                    placeholder="Tenant name"
                >

                <label>Rent</label>
                <input
                    type="number"
                    id="editRent"
                    value="${data.rent || ""}"
                    placeholder="Rent amount"
                >

                <label>Other Bill</label>
                <input
                    type="number"
                    id="editOther"
                    value="${data.other || ""}"
                    placeholder="Other bill amount"
                >

                <label>Status</label>

                <select id="editStatus">

                    <option value="VACANT"
                        ${data.status === "VACANT" ? "selected" : ""}>
                        VACANT
                    </option>

                    <option value="PAID"
                        ${data.status === "PAID" ? "selected" : ""}>
                        PAID
                    </option>

                    <option value="DUE"
                        ${data.status === "DUE" ? "selected" : ""}>
                        DUE
                    </option>

                </select>

                <div class="edit-actions">

                    <button onclick="saveFlatEdit()">
                        💾 Save
                    </button>

                    <button onclick="closeEditBox()">
                        ✖ Cancel
                    </button>

                </div>

            </div>

        </div>
    `;

    document.body.appendChild(editBox);

}


// ==========================================
// SAVE EDITED DATA
// ==========================================

function saveFlatEdit() {

    const flat =
        flatData[selectedFlatForEdit];

    if (!flat) {
        return;
    }

    flat.tenant =
        document.getElementById("editTenant").value.trim();

    flat.rent =
        Number(document.getElementById("editRent").value) || 0;

    flat.other =
        Number(document.getElementById("editOther").value) || 0;

    flat.status =
        document.getElementById("editStatus").value;


    // ফোনের Storage-এ Save
    localStorage.setItem(
        "flatRegisterData",
        JSON.stringify(flatData)
    );


    closeEditBox();

    // Table update
    renderFlatTable();

    // Details update
    openFlat(selectedFlatForEdit);

}


// ==========================================
// CLOSE EDIT BOX
// ==========================================

function closeEditBox() {

    const editBox =
        document.getElementById("editBox");

    if (editBox) {
        editBox.remove();
    }

}

// ==========================================
// FUTURE OPTIONS
// ==========================================

function openTenant() {

    alert(
        "Tenant section will be added next."
    );

}


function openHistory() {

    alert(
        "History section will be added next."
    );

}


function openRent() {

    alert(
        "Rent section will be added next."
    );

}


function openOtherBills() {

    alert(
        "Other Bills section will be added next."
    );

}


function openReceipt() {

    alert(
        "Receipt section will be added next."
    );

}


// ==========================================
// START APP
// ==========================================

createFlatData();

updateDashboard();
