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
        // SAVE CURRENT STATUS
        // ======================================

   

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

    const flatName =
        document.getElementById("detailsFlatName").textContent;

    selectedFlatForEdit = flatName;

    const data = flatData[flatName];

    if (!data) {
        alert("Flat data not found.");
        return;
    }

    const editBox =
        document.createElement("div");

    editBox.id = "editBox";

    editBox.innerHTML = `
        <div class="edit-overlay">

            <div class="edit-panel">

                <h2>Edit ${data.flat}</h2>

                <label>Tenant Name</label>

                <input
                    type="text"
                    id="editTenant"
                    value="${data.tenant || ""}"
                    placeholder="Tenant name"
                >

                <label>Rent</label>

                <input
                    type="number"
                    id="editRent"
                    value="${data.rent || ""}"
                    placeholder="Rent amount"
                    inputmode="numeric"
                >

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

    // Get the selected flat safely
    let flatName = selectedFlatForEdit;

    if (!flatName) {

        flatName =
            document
                .getElementById("detailsFlatName")
                .textContent
                .trim();

    }

    // Find the exact flat name from FLATS
    const flatKey =
        FLATS.find(
            flat =>
                flat.trim() === flatName.trim()
        );

    if (!flatKey) {

        alert(
            "Flat name not found: " + flatName
        );

        return;
    }

    // Get flat data
    const flat =
        flatData[flatKey];

    if (!flat) {

        alert(
            "Flat data not found: " + flatKey
        );

        return;
    }

    // Keep selected flat correct
    selectedFlatForEdit = flatKey;


    // ======================================
    // TENANT NAME
    // ======================================

    const tenantInput =
        document.getElementById("editTenant");

    if (tenantInput) {

        flat.tenant =
            tenantInput.value.trim();

    }


    // ======================================
    // RENT
    // ======================================

    const rentInput =
        document.getElementById("editRent");

    if (rentInput) {

        flat.rent =
            Number(rentInput.value) || 0;

    }


    // ======================================
    // SAVE DATA
    // ======================================

    localStorage.setItem(
        "flatRegisterData",
        JSON.stringify(flatData)
    );


    // ======================================
    // CLOSE EDIT
    // ======================================

    closeEditBox();


    // ======================================
    // UPDATE TENANT NAME
    // ======================================

    document
        .getElementById("detailsTenantName")
        .textContent =
        flat.tenant || "No Tenant";


    // ======================================
    // UPDATE PAYMENT STATUS
    // ======================================

    const statusElement =
        document.getElementById("detailsStatus");


    if (!flat.tenant) {

        flat.status = "VACANT";

        statusElement.textContent =
            "⚪ VACANT";

    }

    else {

        let currentMonthPaid = false;


        if (Array.isArray(flat.rentHistory)) {

            const currentMonth =
                new Date()
                .toISOString()
                .slice(0, 7);


            const currentRent =
                flat.rentHistory.find(
                    item =>
                        item.month === currentMonth
                );


            if (
                currentRent &&
                currentRent.status === "PAID"
            ) {

                currentMonthPaid = true;

            }

        }


        if (currentMonthPaid) {

            flat.status = "PAID";

            statusElement.textContent =
                "🟢 PAID";

        }

        else {

            flat.status = "DUE";

            statusElement.textContent =
                "🔴 DUE";

        }

    }


    // ======================================
    // FINAL SAVE
    // ======================================

    localStorage.setItem(
        "flatRegisterData",
        JSON.stringify(flatData)
    );

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

// ==========================================
// TENANT INFORMATION
// ==========================================

function openTenant() {

    const flatName =
        document.getElementById("detailsFlatName").textContent;

    const data = flatData[flatName];

    if (!data) {
        alert("Flat data not found.");
        return;
    }

    const box = document.createElement("div");

    box.id = "tenantBox";

    box.innerHTML = `
        <div class="tenant-overlay">

            <div class="tenant-panel">

                <div class="tenant-header">

                    <button onclick="closeTenant()">
                        ← Back
                    </button>

                    <h2>Tenant</h2>

                    <span></span>

                </div>

                <h3>${escapeHTML(data.flat)}</h3>

                <div class="tenant-form">

                    <label>Tenant Name</label>

                    <input
                        type="text"
                        id="tenantName"
                        value="${escapeHTML(data.tenant || "")}"
                        placeholder="Tenant name"
                    >

                    <label>Mobile Number</label>

                    <input
                        type="tel"
                        id="tenantPhone"
                        value="${escapeHTML(data.tenantPhone || "")}"
                        placeholder="Mobile number"
                        inputmode="tel"
                    >

                    <label>Identity</label>

                    <input
                        type="text"
                        id="tenantIdentity"
                        value="${escapeHTML(data.tenantIdentity || "")}"
                        placeholder="NID / Passport / Other"
                    >

                    <label>Joining Date</label>

                    <input
                        type="date"
                        id="tenantJoinDate"
                        value="${data.tenantJoinDate || ""}"
                    >

                    <div class="tenant-buttons">

                        <button onclick="saveTenant()">
                            💾 Save
                        </button>

                        <button onclick="closeTenant()">
                            ✖ Cancel
                        </button>

                    </div>

                </div>

            </div>

        </div>
    `;

    document.body.appendChild(box);
}


// ==========================================
// SAVE TENANT
// ==========================================

function saveTenant() {

    const flatName =
        document.getElementById("detailsFlatName").textContent;

    const data =
        flatData[flatName];

    if (!data) {
        return;
    }

    const name =
        document.getElementById("tenantName").value.trim();

    const phone =
        document.getElementById("tenantPhone").value.trim();

    const identity =
        document.getElementById("tenantIdentity").value.trim();

    const joinDate =
        document.getElementById("tenantJoinDate").value;


    if (!name) {

        alert("Please enter tenant name.");

        return;
    }


    data.tenant = name;

    data.tenantPhone = phone;

    data.tenantIdentity = identity;

    data.tenantJoinDate = joinDate;

    // Tenant থাকলে Flat আর Vacant থাকবে না
    if (data.status === "VACANT") {
        data.status = "DUE";
    }


    // ফোনের Storage-এ Save
    localStorage.setItem(
        "flatRegisterData",
        JSON.stringify(flatData)
    );


    // Details screen update
    document
        .getElementById("detailsTenantName")
        .textContent = data.tenant;


    const statusElement =
        document.getElementById("detailsStatus");


    if (data.status === "PAID") {

        statusElement.textContent = "🟢 PAID";

    } else {

        statusElement.textContent = "🔴 DUE";

    }


    closeTenant();

    renderFlatTable();

}


// ==========================================
// CLOSE TENANT
// ==========================================

function closeTenant() {

    const box =
        document.getElementById("tenantBox");

    if (box) {
        box.remove();
    }

}





function openRent() {

    const flatName =
        document.getElementById("detailsFlatName").textContent;

    const data = flatData[flatName];

    if (!data) {
        alert("Flat data not found.");
        return;
    }

    if (!Array.isArray(data.rentHistory)) {
        data.rentHistory = [];
    }

    const box = document.createElement("div");

    box.id = "rentHistoryBox";

    box.innerHTML = `
        <div class="rent-overlay">

            <div class="rent-panel">

                <div class="rent-header">

                    <button onclick="closeRentHistory()">
                        ← Back
                    </button>

                    <h2>Rent History</h2>

                    <span></span>

                </div>

                <h3>${escapeHTML(data.flat)}</h3>

                <div class="current-rent-box">

                    <span>Monthly Rent</span>

                    <strong>
                        ৳${Number(data.rent || 0).toLocaleString()}
                    </strong>

                </div>

                <div id="rentHistoryList"></div>

                <button
                    class="add-rent-btn"
                    onclick="showRentForm()">

                    ➕ Add Rent

                </button>

            </div>

        </div>
    `;

    document.body.appendChild(box);

    renderRentHistory(flatName);
}


function openOtherBills() {

    alert(
        "Other Bills section will be added next."
    );

}




// ==========================================
// START APP
// ==========================================

// ==========================================
// LOAD DATA FROM PHONE STORAGE
// ==========================================

const savedData =
    localStorage.getItem("flatRegisterData");


if (savedData) {

    flatData =
        JSON.parse(savedData);

}

else {

    createFlatData();

    localStorage.setItem(
        "flatRegisterData",
        JSON.stringify(flatData)
    );

}


updateDashboard();



// ==========================================
// OTHER BILLS SYSTEM
// ==========================================

function openOtherBills() {

    const flatName =
        document.getElementById("detailsFlatName").textContent;

    const data = flatData[flatName];

    if (!data) {
        alert("Flat data not found.");
        return;
    }

    // পুরোনো ডাটায় otherBills না থাকলে তৈরি
    if (!Array.isArray(data.otherBills)) {
        data.otherBills = [];
    }

    let oldBox = document.getElementById("otherBillsBox");

    if (oldBox) {
        oldBox.remove();
    }

    const box = document.createElement("div");

    box.id = "otherBillsBox";

    box.innerHTML = `
        <div class="other-bills-overlay">

            <div class="other-bills-panel">

                <div class="other-bills-header">

                    <button onclick="closeOtherBills()">
                        ← Back
                    </button>

                    <h2>Other Bills</h2>

                    <span></span>

                </div>

                <h3>${data.flat}</h3>

                <div id="billList"></div>

                <button
                    class="add-bill-btn"
                    onclick="showAddBillForm()">
                    ➕ Add Bill
                </button>

                <div class="other-bill-total">
                    Total Other Bills:
                    ৳<span id="otherBillTotal">0</span>
                </div>

            </div>

        </div>
    `;

    document.body.appendChild(box);

    renderOtherBills(flatName);
}


// ==========================================
// SHOW BILL LIST
// ==========================================

function renderOtherBills(flatName) {

    const data = flatData[flatName];

    const list =
        document.getElementById("billList");

    const totalElement =
        document.getElementById("otherBillTotal");

    if (!list || !data) {
        return;
    }

    list.innerHTML = "";

    let total = 0;

    data.otherBills.forEach((bill, index) => {

        total += Number(bill.amount) || 0;

        const item =
            document.createElement("div");

        item.className = "bill-item";

        item.innerHTML = `
            <div class="bill-info">
                <strong>${escapeHTML(bill.name)}</strong>
                <span>৳${Number(bill.amount).toLocaleString()}</span>
            </div>

            <button
                class="delete-bill-btn"
                onclick="deleteOtherBill(${index})">
                🗑️
            </button>
        `;

        list.appendChild(item);

    });

    totalElement.textContent =
        total.toLocaleString();

    // মূল Flat-এর Other total update
    data.other = total;

    // ফোনের Storage-এ Save
    localStorage.setItem(
        "flatRegisterData",
        JSON.stringify(flatData)
    );
}


// ==========================================
// ADD BILL FORM
// ==========================================

function showAddBillForm() {

    const form =
        document.createElement("div");

    form.id = "addBillForm";

    form.innerHTML = `
        <div class="add-bill-form">

            <h3>Add Other Bill</h3>

            <label>Bill Name</label>

            <input
                type="text"
                id="newBillName"
                placeholder="যেমন: Waste Collection Charge"
            >

            <label>Amount</label>

            <input
                type="number"
                id="newBillAmount"
                placeholder="Amount"
                inputmode="numeric"
            >

            <div class="bill-form-buttons">

                <button onclick="saveOtherBill()">
                    💾 Save
                </button>

                <button onclick="closeAddBillForm()">
                    ✖ Cancel
                </button>

            </div>

        </div>
    `;

    document
        .getElementById("otherBillsBox")
        .querySelector(".other-bills-panel")
        .appendChild(form);

}


// ==========================================
// SAVE BILL
// ==========================================

function saveOtherBill() {

    const flatName =
        document.getElementById("detailsFlatName").textContent;

    const data =
        flatData[flatName];

    const name =
        document.getElementById("newBillName").value.trim();

    const amount =
        Number(
            document.getElementById("newBillAmount").value
        ) || 0;

    if (!name) {

        alert("Please enter bill name.");

        return;
    }

    if (amount <= 0) {

        alert("Please enter a valid amount.");

        return;
    }


    if (!Array.isArray(data.otherBills)) {
        data.otherBills = [];
    }


    data.otherBills.push({

        name: name,

        amount: amount,

        date: new Date().toISOString()

    });


    // Save
    localStorage.setItem(
        "flatRegisterData",
        JSON.stringify(flatData)
    );


    closeAddBillForm();

    renderOtherBills(flatName);

    // Flat Table update
    renderFlatTable();

}


// ==========================================
// DELETE BILL
// ==========================================

function deleteOtherBill(index) {

    const flatName =
        document.getElementById("detailsFlatName").textContent;

    const data =
        flatData[flatName];

    if (!data || !data.otherBills[index]) {
        return;
    }

    const billName =
        data.otherBills[index].name;

    const confirmDelete =
        confirm(
            `Delete "${billName}"?`
        );

    if (!confirmDelete) {
        return;
    }


    data.otherBills.splice(index, 1);


    localStorage.setItem(
        "flatRegisterData",
        JSON.stringify(flatData)
    );


    renderOtherBills(flatName);

    renderFlatTable();

}


// ==========================================
// CLOSE OTHER BILLS
// ==========================================

function closeOtherBills() {

    const box =
        document.getElementById("otherBillsBox");

    if (box) {
        box.remove();
    }

    renderFlatTable();

}


// ==========================================
// CLOSE ADD BILL FORM
// ==========================================

function closeAddBillForm() {

    const form =
        document.getElementById("addBillForm");

    if (form) {
        form.remove();
    }

}


// ==========================================
// SAFE TEXT
// ==========================================

function escapeHTML(text) {

    return String(text)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");

}


// ==========================================
// TENANT HISTORY SYSTEM
// ==========================================

function openHistory() {

    const flatName =
        document.getElementById("detailsFlatName").textContent;

    const data = flatData[flatName];

    if (!data) {
        alert("Flat data not found.");
        return;
    }

    // Old data হলে history তৈরি
    if (!Array.isArray(data.tenantHistory)) {
        data.tenantHistory = [];
    }

    const box = document.createElement("div");

    box.id = "historyBox";

    box.innerHTML = `
        <div class="history-overlay">

            <div class="history-panel">

                <div class="history-header">

                    <button onclick="closeHistory()">
                        ← Back
                    </button>

                    <h2>Tenant History</h2>

                    <span></span>

                </div>

                <h3>${data.flat}</h3>

                <div class="current-tenant-box">

                    <h4>Current Tenant</h4>

                    <p>
                        ${escapeHTML(data.tenant || "No Tenant")}
                    </p>

                </div>

                <h4 class="history-title">
                    Previous Tenants
                </h4>

                <div id="tenantHistoryList"></div>

                <button
                    class="add-history-btn"
                    onclick="showTenantHistoryForm()">

                    ➕ Add Previous Tenant

                </button>

            </div>

        </div>
    `;

    document.body.appendChild(box);

    renderTenantHistory(flatName);
}


// ==========================================
// SHOW HISTORY
// ==========================================

function renderTenantHistory(flatName) {

    const data = flatData[flatName];

    const list =
        document.getElementById("tenantHistoryList");

    if (!list) {
        return;
    }

    list.innerHTML = "";

    if (data.tenantHistory.length === 0) {

        list.innerHTML = `
            <div class="empty-history">
                No previous tenant history
            </div>
        `;

        return;
    }


    data.tenantHistory.forEach((tenant, index) => {

        const item =
            document.createElement("div");

        item.className = "history-item";

        item.innerHTML = `

            <div class="history-info">

                <strong>
                    ${escapeHTML(tenant.name)}
                </strong>

                <span>
                    📱 ${escapeHTML(tenant.phone || "—")}
                </span>

                <span>
                    🪪 ${escapeHTML(tenant.identity || "—")}
                </span>

                <span>
                    📅 ${escapeHTML(tenant.joinDate || "—")}
                    →
                    ${escapeHTML(tenant.leaveDate || "—")}
                </span>

            </div>

            <button
                class="delete-history-btn"
                onclick="deleteTenantHistory(${index})">

                🗑️

            </button>

        `;

        list.appendChild(item);

    });

}


// ==========================================
// ADD HISTORY FORM
// ==========================================

function showTenantHistoryForm() {

    const form =
        document.createElement("div");

    form.id = "tenantHistoryForm";

    form.innerHTML = `

        <div class="history-form">

            <h3>Add Previous Tenant</h3>

            <label>Tenant Name</label>

            <input
                type="text"
                id="historyName"
                placeholder="Tenant name"
            >

            <label>Mobile Number</label>

            <input
                type="tel"
                id="historyPhone"
                placeholder="Mobile number"
            >

            <label>Identity</label>

            <input
                type="text"
                id="historyIdentity"
                placeholder="NID / Passport / Other"
            >

            <label>Join Date</label>

            <input
                type="date"
                id="historyJoinDate"
            >

            <label>Leave Date</label>

            <input
                type="date"
                id="historyLeaveDate"
            >

            <div class="history-form-buttons">

                <button onclick="saveTenantHistory()">
                    💾 Save
                </button>

                <button onclick="closeTenantHistoryForm()">
                    ✖ Cancel
                </button>

            </div>

        </div>
    `;

    document
        .getElementById("historyBox")
        .querySelector(".history-panel")
        .appendChild(form);

}


// ==========================================
// SAVE HISTORY
// ==========================================

function saveTenantHistory() {

    const flatName =
        document.getElementById("detailsFlatName").textContent;

    const data =
        flatData[flatName];

    const name =
        document.getElementById("historyName").value.trim();

    const phone =
        document.getElementById("historyPhone").value.trim();

    const identity =
        document.getElementById("historyIdentity").value.trim();

    const joinDate =
        document.getElementById("historyJoinDate").value;

    const leaveDate =
        document.getElementById("historyLeaveDate").value;


    if (!name) {

        alert("Please enter tenant name.");

        return;
    }


    data.tenantHistory.push({

        name: name,

        phone: phone,

        identity: identity,

        joinDate: joinDate,

        leaveDate: leaveDate

    });


    localStorage.setItem(
        "flatRegisterData",
        JSON.stringify(flatData)
    );


    closeTenantHistoryForm();

    renderTenantHistory(flatName);

}


// ==========================================
// DELETE HISTORY
// ==========================================

function deleteTenantHistory(index) {

    const flatName =
        document.getElementById("detailsFlatName").textContent;

    const data =
        flatData[flatName];


    if (!data || !data.tenantHistory[index]) {
        return;
    }


    const tenantName =
        data.tenantHistory[index].name;


    if (!confirm(
        `Delete history of "${tenantName}"?`
    )) {

        return;
    }


    data.tenantHistory.splice(index, 1);


    localStorage.setItem(
        "flatRegisterData",
        JSON.stringify(flatData)
    );


    renderTenantHistory(flatName);

}


// ==========================================
// CLOSE HISTORY
// ==========================================

function closeHistory() {

    const box =
        document.getElementById("historyBox");

    if (box) {
        box.remove();
    }

}


// ==========================================
// CLOSE HISTORY FORM
// ==========================================

function closeTenantHistoryForm() {

    const form =
        document.getElementById("tenantHistoryForm");

    if (form) {
        form.remove();
    }

                                }
// ==========================================
// RENT HISTORY SYSTEM
// ==========================================

function openRent() {

    const flatName =
        document.getElementById("detailsFlatName").textContent;

    const data = flatData[flatName];

    if (!data) {
        alert("Flat data not found.");
        return;
    }

    if (!Array.isArray(data.rentHistory)) {
        data.rentHistory = [];
    }

    const box = document.createElement("div");

    box.id = "rentHistoryBox";

    box.innerHTML = `
        <div class="rent-overlay">

            <div class="rent-panel">

                <div class="rent-header">

                    <button onclick="closeRentHistory()">
                        ← Back
                    </button>

                    <h2>Rent History</h2>

                    <span></span>

                </div>

                <h3>${escapeHTML(data.flat)}</h3>

                <div class="current-rent-box">

                    <span>Monthly Rent</span>

                    <strong>
                        ৳${Number(data.rent || 0).toLocaleString()}
                    </strong>

                </div>

                <div id="rentHistoryList"></div>

                <button
                    class="add-rent-btn"
                    onclick="showRentForm()">

                    ➕ Add Rent

                </button>

            </div>

        </div>
    `;

    document.body.appendChild(box);

    renderRentHistory(flatName);
}


// ==========================================
// SHOW RENT HISTORY
// ==========================================

function renderRentHistory(flatName) {

    const data = flatData[flatName];

    const list =
        document.getElementById("rentHistoryList");

    if (!list) {
        return;
    }

    list.innerHTML = "";

    if (data.rentHistory.length === 0) {

        list.innerHTML = `
            <div class="empty-rent">
                No rent history
            </div>
        `;

        return;
    }


    data.rentHistory.forEach((rent, index) => {

        const item =
            document.createElement("div");

        item.className = "rent-item";

        const statusClass =
            rent.status === "PAID"
                ? "rent-paid"
                : "rent-due";

        const statusText =
            rent.status === "PAID"
                ? "🟢 PAID"
                : "🔴 DUE";

        item.innerHTML = `

            <div class="rent-info">

                <strong>
                    ${escapeHTML(rent.month)}
                </strong>

                <span>
                    Rent: ৳${Number(rent.amount).toLocaleString()}
                </span>

                ${
                    rent.paidDate
                    ? `<span>Paid: ${escapeHTML(rent.paidDate)}</span>`
                    : ""
                }

            </div>

            <div class="rent-right">

                <span class="${statusClass}">
                    ${statusText}
                </span>

                <button
                    class="delete-rent-btn"
                    onclick="deleteRentHistory(${index})">

                    🗑️

                </button>

            </div>
        `;

        list.appendChild(item);

    });

}


// ==========================================
// ADD RENT FORM
// ==========================================

function showRentForm() {

    const form =
        document.createElement("div");

    form.id = "rentForm";

    form.innerHTML = `

        <div class="rent-form">

            <h3>Add Rent</h3>

            <label>Month</label>

            <input
                type="month"
                id="rentMonth"
            >

            <label>Rent Amount</label>

            <input
                type="number"
                id="rentAmount"
                placeholder="Rent amount"
                inputmode="numeric"
            >

            <label>Status</label>

            <select id="rentStatus">

                <option value="DUE">
                    🔴 DUE
                </option>

                <option value="PAID">
                    🟢 PAID
                </option>

            </select>

            <label>Paid Date</label>

            <input
                type="date"
                id="rentPaidDate"
            >

            <div class="rent-form-buttons">

                <button onclick="saveRentHistory()">
                    💾 Save
                </button>

                <button onclick="closeRentForm()">
                    ✖ Cancel
                </button>

            </div>

        </div>
    `;

    document
        .getElementById("rentHistoryBox")
        .querySelector(".rent-panel")
        .appendChild(form);

}


// ==========================================
// SAVE RENT
// ==========================================

function saveRentHistory() {

    const flatName =
        document.getElementById("detailsFlatName").textContent;

    const data =
        flatData[flatName];

    const month =
        document.getElementById("rentMonth").value;

    const amount =
        Number(
            document.getElementById("rentAmount").value
        ) || 0;

    const status =
        document.getElementById("rentStatus").value;

    const paidDate =
        document.getElementById("rentPaidDate").value;


    if (!month) {

        alert("Please select month.");

        return;
    }

    if (amount <= 0) {

        alert("Please enter rent amount.");

        return;
    }


    if (status === "PAID" && !paidDate) {

        alert("Please select paid date.");

        return;
    }


    if (!Array.isArray(data.rentHistory)) {
        data.rentHistory = [];
    }


    // একই মাস আগে আছে কিনা
    const existing =
        data.rentHistory.find(
            item => item.month === month
        );


    if (existing) {

        alert(
            "This month's rent already exists."
        );

        return;
    }


    data.rentHistory.push({

        month: month,

        amount: amount,

        status: status,

        paidDate:
            status === "PAID"
                ? paidDate
                : ""

    });


    // নতুন করে সাজানো
    data.rentHistory.sort(
        (a, b) =>
            b.month.localeCompare(a.month)
    );


    localStorage.setItem(
        "flatRegisterData",
        JSON.stringify(flatData)
    );


    closeRentForm();

    renderRentHistory(flatName);

}


// ==========================================
// DELETE RENT
// ==========================================

function deleteRentHistory(index) {

    const flatName =
        document.getElementById("detailsFlatName").textContent;

    const data =
        flatData[flatName];

    if (!data || !data.rentHistory[index]) {
        return;
    }


    const month =
        data.rentHistory[index].month;


    if (!confirm(
        `Delete rent for ${month}?`
    )) {

        return;
    }


    data.rentHistory.splice(index, 1);


    localStorage.setItem(
        "flatRegisterData",
        JSON.stringify(flatData)
    );


    renderRentHistory(flatName);

}


// ==========================================
// CLOSE RENT HISTORY
// ==========================================

function closeRentHistory() {

    const box =
        document.getElementById("rentHistoryBox");

    if (box) {
        box.remove();
    }

}


// ==========================================
// CLOSE RENT FORM
// ==========================================

function closeRentForm() {

    const form =
        document.getElementById("rentForm");

    if (form) {
        form.remove();
    }

            }

// ==========================================
// RECEIPT SYSTEM
// ==========================================

function openReceipt() {

    const flatName =
        document.getElementById("detailsFlatName").textContent;

    const data = flatData[flatName];

    if (!data) {
        alert("Flat data not found.");
        return;
    }

    if (!Array.isArray(data.otherBills)) {
        data.otherBills = [];
    }

    const otherTotal =
        data.otherBills.reduce(
            (sum, bill) => sum + (Number(bill.amount) || 0),
            0
        );

    const rent =
        Number(data.rent) || 0;

    const total =
        rent + otherTotal;

    const receiptDate =
        new Date().toLocaleDateString("en-GB");


    const box = document.createElement("div");

    box.id = "receiptBox";

    box.innerHTML = `

        <div class="receipt-overlay">

            <div class="receipt-panel">

                <div class="receipt-top">

                    <button onclick="closeReceipt()">
                        ← Back
                    </button>

                    <h2>Receipt</h2>

                    <span></span>

                </div>


                <div id="receiptContent">

                    <div class="receipt-paper">

                        <h1>JAMILA BHAVAN</h1>

                        <h3>RENT & BILL RECEIPT</h3>

                        <div class="receipt-line"></div>


                        <div class="receipt-row">
                            <span>Flat</span>
                            <strong>
                                ${escapeHTML(data.flat)}
                            </strong>
                        </div>


                        <div class="receipt-row">
                            <span>Tenant</span>
                            <strong>
                                ${escapeHTML(data.tenant || "No Tenant")}
                            </strong>
                        </div>


                        <div class="receipt-row">
                            <span>Date</span>
                            <strong>
                                ${receiptDate}
                            </strong>
                        </div>


                        <div class="receipt-line"></div>


                        <div class="receipt-row">
                            <span>Rent</span>
                            <strong>
                                ৳${rent.toLocaleString()}
                            </strong>
                        </div>


                        <h4 class="receipt-subtitle">
                            Other Bills
                        </h4>


                        ${
                            data.otherBills.length > 0
                            ?
                            data.otherBills.map(bill => `
                                <div class="receipt-row">
                                    <span>
                                        ${escapeHTML(bill.name)}
                                    </span>

                                    <strong>
                                        ৳${Number(bill.amount).toLocaleString()}
                                    </strong>
                                </div>
                            `).join("")
                            :
                            `
                            <div class="receipt-empty">
                                No Other Bills
                            </div>
                            `
                        }


                        <div class="receipt-line"></div>


                        <div class="receipt-total">

                            <span>TOTAL</span>

                            <strong>
                                ৳${total.toLocaleString()}
                            </strong>

                        </div>


                        <div class="receipt-status">

                            ${
                                data.status === "PAID"
                                ? "🟢 PAID"
                                : data.status === "DUE"
                                ? "🔴 DUE"
                                : "⚪ VACANT"
                            }

                        </div>


                        <div class="receipt-footer">

                            Thank you

                        </div>

                    </div>

                </div>


                <div class="receipt-actions">

                    <button
                        onclick="sendReceiptWhatsApp()">

                        📱 WhatsApp

                    </button>

                </div>

            </div>

        </div>
    `;

    document.body.appendChild(box);
}


// ==========================================
// WHATSAPP RECEIPT
// ==========================================

function sendReceiptWhatsApp() {

    const flatName =
        document.getElementById("detailsFlatName").textContent;

    const data = flatData[flatName];

    if (!data) {
        alert("Flat data not found.");
        return;
    }


    const rent =
        Number(data.rent) || 0;


    const otherTotal =
        Array.isArray(data.otherBills)
        ?
        data.otherBills.reduce(
            (sum, bill) =>
                sum + (Number(bill.amount) || 0),
            0
        )
        :
        0;


    const total =
        rent + otherTotal;


    const date =
        new Date().toLocaleDateString("en-GB");


    let message = "";

    message += "🏢 *JAMILA BHAVAN*%0A";
    message += "🧾 *RENT & BILL RECEIPT*%0A";
    message += "--------------------------%0A";

    message +=
        "Flat: " +
        (data.flat || "") +
        "%0A";

    message +=
        "Tenant: " +
        (data.tenant || "No Tenant") +
        "%0A";

    message +=
        "Date: " +
        date +
        "%0A";

    message += "--------------------------%0A";

    message +=
        "Rent: ৳" +
        rent.toLocaleString() +
        "%0A";


    if (
        Array.isArray(data.otherBills) &&
        data.otherBills.length > 0
    ) {

        message += "%0A*Other Bills*%0A";

        data.otherBills.forEach(bill => {

            message +=
                bill.name +
                ": ৳" +
                Number(bill.amount).toLocaleString() +
                "%0A";

        });

    }


    message += "--------------------------%0A";

    message +=
        "*TOTAL: ৳" +
        total.toLocaleString() +
        "*%0A";


    if (data.status === "PAID") {

        message += "🟢 PAID%0A";

    }

    else if (data.status === "DUE") {

        message += "🔴 DUE%0A";

    }


    message += "--------------------------%0A";
    message += "Thank you.";


    const whatsappURL =
        "https://wa.me/?text=" + message;


    window.location.href =
        whatsappURL;
}


// ==========================================
// CLOSE RECEIPT
// ==========================================

function closeReceipt() {

    const box =
        document.getElementById("receiptBox");

    if (box) {
        box.remove();
    }

}







