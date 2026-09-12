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
// START - INITIALIZE FLAT DATA
// ==========================================

function initializeFlatData() {

    const savedData =
        localStorage.getItem("flatRegisterData");

    let oldData = {};

    // Old saved data থাকলে load করবে
    if (savedData) {

        try {

            oldData =
                JSON.parse(savedData);

        }

        catch (error) {

            oldData = {};

        }

    }


    // সব 28টি Flat নিশ্চিতভাবে তৈরি করবে
    FLATS.forEach((flat, index) => {

        const old =
            oldData[flat] || {};


        flatData[flat] = {

            id:
                index + 1,

            flat:
                flat,

            tenant:
                old.tenant || "",

            tenantPhone:
                old.tenantPhone || "",

            tenantIdentity:
                old.tenantIdentity || "",

            tenantJoinDate:
                old.tenantJoinDate || "",

            rent:
                Number(old.rent) || 0,

            other:
                Number(old.other) || 0,

            otherBills:
                Array.isArray(old.otherBills)
                    ? old.otherBills
                    : [],

            rentHistory:
                Array.isArray(old.rentHistory)
                    ? old.rentHistory
                    : [],

            tenantHistory:
                Array.isArray(old.tenantHistory)
                    ? old.tenantHistory
                    : [],

            status:
                old.status || "VACANT"

        };

    });


    // Save updated 28-flat data
    localStorage.setItem(
        "flatRegisterData",
        JSON.stringify(flatData)
    );

}

// ==========================================
// END - INITIALIZE FLAT DATA
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


```javascript
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

                <div class="tenant-form">

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

                    <div class="tenant-buttons">

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

        </div>

    `;

    document.body.appendChild(box);
}


// ==========================================
// END - TENANT INFORMATION
// ==========================================
```





// ==========================================
// START - SAVE TENANT
// ==========================================

function saveTenant() {

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


    const name =
        document
            .getElementById("tenantName")
            .value
            .trim();


    const phone =
        document
            .getElementById("tenantPhone")
            .value
            .trim();


    const identity =
        document
            .getElementById("tenantIdentity")
            .value
            .trim();


    const joinDate =
        document
            .getElementById("tenantJoinDate")
            .value;


    if (!name) {

        alert("Please enter tenant name.");

        return;

    }


    // ======================================
    // SAVE TENANT INFORMATION
    // ======================================

    data.tenant =
        name;

    data.tenantPhone =
        phone;

    data.tenantIdentity =
        identity;

    data.tenantJoinDate =
        joinDate;


    // Tenant থাকলে Flat আর Vacant থাকবে না

    if (data.status === "VACANT") {

        data.status =
            "DUE";

    }


    // ======================================
    // SAVE TO LOCAL STORAGE
    // ======================================

    localStorage.setItem(
        "flatRegisterData",
        JSON.stringify(flatData)
    );


    // ======================================
    // UPDATE DETAILS SCREEN
    // ======================================

    document
        .getElementById("detailsTenantName")
        .textContent =
            data.tenant;


    const statusElement =
        document.getElementById(
            "detailsStatus"
        );


    if (data.status === "PAID") {

        statusElement.textContent =
            "🟢 PAID";

    }

    else {

        statusElement.textContent =
            "🔴 DUE";

    }


    // ======================================
    // CLOSE TENANT BOX
    // ======================================

    closeTenant();


    // ======================================
    // REFRESH TABLE
    // ======================================

    renderFlatTable();

}

// ==========================================
// END - SAVE TENANT
// ==========================================


// ==========================================
// START - CLOSE TENANT
// ==========================================

function closeTenant() {

    const box =
        document.getElementById(
            "tenantBox"
        );


    if (box) {

        box.remove();

    }

}

// ==========================================
// END - CLOSE TENANT
// ==========================================


// ==========================================
// START - RENT HISTORY SYSTEM
// ==========================================

function openRent() {

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


    if (!Array.isArray(data.rentHistory)) {

        data.rentHistory = [];

    }


    const box =
        document.createElement("div");


    box.id =
        "rentHistoryBox";


    box.innerHTML = `

        <div class="rent-overlay">

            <div class="rent-panel">

                <div class="rent-header">

                    <button
                        onclick="closeRentHistory()"
                    >
                        ← Back
                    </button>


                    <h2>
                        Rent History
                    </h2>


                    <span></span>

                </div>


                <h3>
                    ${escapeHTML(data.flat)}
                </h3>


                <div class="current-rent-box">

                    <span>
                        Monthly Rent
                    </span>


                    <strong>
                        ৳${Number(
                            data.rent || 0
                        ).toLocaleString()}
                    </strong>

                </div>


                <div id="rentHistoryList"></div>


                <button
                    class="add-rent-btn"
                    onclick="showRentForm()"
                >
                    ➕ Add Rent
                </button>

            </div>

        </div>

    `;


    document.body.appendChild(box);


    renderRentHistory(flatName);

}

// ==========================================
// END - RENT HISTORY SYSTEM
// ==========================================


// ==========================================
// START - OTHER BILLS SYSTEM
// ==========================================

function openOtherBills() {

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


    // পুরোনো ডাটায় otherBills না থাকলে তৈরি

    if (!Array.isArray(data.otherBills)) {

        data.otherBills = [];

    }


    const oldBox =
        document.getElementById(
            "otherBillsBox"
        );


    if (oldBox) {

        oldBox.remove();

    }


    const box =
        document.createElement("div");


    box.id =
        "otherBillsBox";


    box.innerHTML = `

        <div class="other-bills-overlay">

            <div class="other-bills-panel">

                <div class="other-bills-header">

                    <button
                        onclick="closeOtherBills()"
                    >
                        ← Back
                    </button>


                    <h2>
                        Other Bills
                    </h2>


                    <span></span>

                </div>


                <h3>
                    ${escapeHTML(data.flat)}
                </h3>


                <div id="billList"></div>


                <button
                    class="add-bill-btn"
                    onclick="showAddBillForm()"
                >
                    ➕ Add Bill
                </button>


                <div class="other-bill-total">

                    Total Other Bills:

                    ৳<span id="otherBillTotal">
                        0
                    </span>

                </div>

            </div>

        </div>

    `;


    document.body.appendChild(box);


    renderOtherBills(flatName);

}

// ==========================================
// END - OTHER BILLS SYSTEM
// ==========================================


// ==========================================
// START - SHOW BILL LIST
// ==========================================

function renderOtherBills(flatName) {

    const data =
        flatData[flatName];


    const list =
        document.getElementById(
            "billList"
        );


    const totalElement =
        document.getElementById(
            "otherBillTotal"
        );


    if (!list || !data) {

        return;

    }


    list.innerHTML =
        "";


    let total =
        0;


    data.otherBills.forEach(
        (bill, index) => {

            total +=
                Number(bill.amount) || 0;


            const item =
                document.createElement("div");


            item.className =
                "bill-item";


            item.innerHTML = `

                <div class="bill-info">

                    <strong>
                        ${escapeHTML(bill.name)}
                    </strong>


                    <span>
                        ৳${Number(
                            bill.amount
                        ).toLocaleString()}
                    </span>

                </div>


                <button
                    class="delete-bill-btn"
                    onclick="deleteOtherBill(${index})"
                >
                    🗑️
                </button>

            `;


            list.appendChild(item);

        }
    );


    totalElement.textContent =
        total.toLocaleString();


    // মূল Flat-এর Other total update

    data.other =
        total;


    // Save

    localStorage.setItem(
        "flatRegisterData",
        JSON.stringify(flatData)
    );

}

// ==========================================
// END - SHOW BILL LIST
// ==========================================


// ==========================================
// START - ADD BILL FORM
// ==========================================

function showAddBillForm() {

    const form =
        document.createElement("div");


    form.id =
        "addBillForm";


    form.innerHTML = `

        <div class="add-bill-form">

            <h3>
                Add Other Bill
            </h3>


            <label>
                Bill Name
            </label>


            <input
                type="text"
                id="newBillName"
                placeholder="যেমন: Waste Collection Charge"
            >


            <label>
                Amount
            </label>


            <input
                type="number"
                id="newBillAmount"
                placeholder="Amount"
                inputmode="numeric"
            >


            <div class="bill-form-buttons">

                <button
                    onclick="saveOtherBill()"
                >
                    💾 Save
                </button>


                <button
                    onclick="closeAddBillForm()"
                >
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
// END - ADD BILL FORM
// ==========================================


// ==========================================
// START - SAVE OTHER BILL
// ==========================================

function saveOtherBill() {

    const flatName =
        document
            .getElementById("detailsFlatName")
            .textContent
            .trim();


    const data =
        flatData[flatName];


    const name =
        document
            .getElementById("newBillName")
            .value
            .trim();


    const amount =
        Number(
            document
                .getElementById("newBillAmount")
                .value
        ) || 0;


    if (!name) {

        alert(
            "Please enter bill name."
        );

        return;

    }


    if (amount <= 0) {

        alert(
            "Please enter a valid amount."
        );

        return;

    }


    if (!Array.isArray(data.otherBills)) {

        data.otherBills = [];

    }


    data.otherBills.push({

        name:
            name,

        amount:
            amount,

        date:
            new Date().toISOString()

    });


    // ======================================
    // SAVE
    // ======================================

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
// END - SAVE OTHER BILL
// ==========================================


// ==========================================
// START - DELETE OTHER BILL
// ==========================================

function deleteOtherBill(index) {

    const flatName =
        document
            .getElementById("detailsFlatName")
            .textContent
            .trim();


    const data =
        flatData[flatName];


    if (
        !data ||
        !data.otherBills[index]
    ) {

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


    data.otherBills.splice(
        index,
        1
    );


    // ======================================
    // SAVE
    // ======================================

    localStorage.setItem(
        "flatRegisterData",
        JSON.stringify(flatData)
    );


    renderOtherBills(flatName);


    renderFlatTable();

}

// ==========================================
// END - DELETE OTHER BILL
// ==========================================


// ==========================================
// START - CLOSE OTHER BILLS
// ==========================================

function closeOtherBills() {

    const box =
        document.getElementById(
            "otherBillsBox"
        );


    if (box) {

        box.remove();

    }


    renderFlatTable();

}

// ==========================================
// END - CLOSE OTHER BILLS
// ==========================================


// ==========================================
// START - CLOSE ADD BILL FORM
// ==========================================

function closeAddBillForm() {

    const form =
        document.getElementById(
            "addBillForm"
        );


    if (form) {

        form.remove();

    }

}

// ==========================================
// END - CLOSE ADD BILL FORM
// ==========================================


// ==========================================
// START - SAFE TEXT
// ==========================================

function escapeHTML(text) {

    return String(text)

        .replace(
            /&/g,
            "&amp;"
        )

        .replace(
            /</g,
            "&lt;"
        )

        .replace(
            />/g,
            "&gt;"
        )

        .replace(
            /"/g,
            "&quot;"
        )

        .replace(
            /'/g,
            "&#039;"
        );

}

// ==========================================
// END - SAFE TEXT
// ==========================================


// ==========================================
// START - TENANT HISTORY SYSTEM
// ==========================================

function openHistory() {

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


    // Old data হলে history তৈরি

    if (!Array.isArray(data.tenantHistory)) {

        data.tenantHistory = [];

    }


    const box =
        document.createElement("div");


    box.id =
        "historyBox";


    box.innerHTML = `

        <div class="history-overlay">

            <div class="history-panel">

                <div class="history-header">

                    <button
                        onclick="closeHistory()"
                    >
                        ← Back
                    </button>


                    <h2>
                        Tenant History
                    </h2>


                    <span></span>

                </div>


                <h3>
                    ${escapeHTML(data.flat)}
                </h3>


                <div class="current-tenant-box">

                    <h4>
                        Current Tenant
                    </h4>


                    <p>
                        ${escapeHTML(
                            data.tenant ||
                            "No Tenant"
                        )}
                    </p>

                </div>


                <h4 class="history-title">
                    Previous Tenants
                </h4>


                <div id="tenantHistoryList"></div>


                <button
                    class="add-history-btn"
                    onclick="showTenantHistoryForm()"
                >
                    ➕ Add Previous Tenant
                </button>

            </div>

        </div>

    `;


    document.body.appendChild(box);


    renderTenantHistory(flatName);

}

// ==========================================
// END - TENANT HISTORY SYSTEM
// ==========================================


// ==========================================
// START - SHOW TENANT HISTORY
// ==========================================

function renderTenantHistory(flatName) {

    const data =
        flatData[flatName];


    const list =
        document.getElementById(
            "tenantHistoryList"
        );


    if (!list) {

        return;

    }


    list.innerHTML =
        "";


    if (
        data.tenantHistory.length === 0
    ) {

        list.innerHTML = `

            <div class="empty-history">

                No previous tenant history

            </div>

        `;

        return;

    }


    data.tenantHistory.forEach(
        (tenant, index) => {

            const item =
                document.createElement("div");


            item.className =
                "history-item";


            item.innerHTML = `

                <div class="history-info">

                    <strong>
                        ${escapeHTML(
                            tenant.name
                        )}
                    </strong>


                    <span>
                        📱 ${escapeHTML(
                            tenant.phone || "—"
                        )}
                    </span>


                    <span>
                        🪪 ${escapeHTML(
                            tenant.identity || "—"
                        )}
                    </span>


                    <span>
                        📅 ${escapeHTML(
                            tenant.joinDate || "—"
                        )}

                        →

                        ${escapeHTML(
                            tenant.leaveDate || "—"
                        )}
                    </span>

                </div>


                <button
                    class="delete-history-btn"
                    onclick="deleteTenantHistory(${index})"
                >
                    🗑️
                </button>

            `;


            list.appendChild(item);

        }
    );

}

// ==========================================
// END - SHOW TENANT HISTORY
// ==========================================


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
        document
            .getElementById("detailsFlatName")
            .textContent;

    const data =
        flatData[flatName];

    const name =
        document
            .getElementById("historyName")
            .value
            .trim();

    const phone =
        document
            .getElementById("historyPhone")
            .value
            .trim();

    const identity =
        document
            .getElementById("historyIdentity")
            .value
            .trim();

    const joinDate =
        document
            .getElementById("historyJoinDate")
            .value;

    const leaveDate =
        document
            .getElementById("historyLeaveDate")
            .value;


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
        document
            .getElementById("detailsFlatName")
            .textContent;

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
// END TENANT HISTORY SYSTEM
// ==========================================



// ==========================================
// START RENT HISTORY SYSTEM
// ==========================================

function openRent() {

    const flatName =
        document
            .getElementById("detailsFlatName")
            .textContent;

    const data =
        flatData[flatName];


    if (!data) {

        alert("Flat data not found.");

        return;
    }


    if (!Array.isArray(data.rentHistory)) {

        data.rentHistory = [];

    }


    const box =
        document.createElement("div");

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


                <h3>
                    ${escapeHTML(data.flat)}
                </h3>


                <div class="current-rent-box">

                    <span>
                        Monthly Rent
                    </span>

                    <strong>
                        ৳${Number(
                            data.rent || 0
                        ).toLocaleString()}
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

    const data =
        flatData[flatName];

    const list =
        document.getElementById(
            "rentHistoryList"
        );


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


    data.rentHistory.forEach(
        (rent, index) => {

            const item =
                document.createElement("div");

            item.className =
                "rent-item";


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

                        ${escapeHTML(
                            rent.month
                        )}

                    </strong>


                    <span>

                        Rent:
                        ৳${Number(
                            rent.amount
                        ).toLocaleString()}

                    </span>


                    ${
                        rent.paidDate

                        ? `

                            <span>

                                Paid:
                                ${escapeHTML(
                                    rent.paidDate
                                )}

                            </span>

                        `

                        : ""
                    }

                </div>


                <div class="rent-right">

                    <span
                        class="${statusClass}">

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

        }
    );

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

            <h3>
                Add Rent
            </h3>


            <label>
                Month
            </label>


            <input
                type="month"
                id="rentMonth"
            >


            <label>
                Rent Amount
            </label>


            <input
                type="number"
                id="rentAmount"
                placeholder="Rent amount"
                inputmode="numeric"
            >


            <label>
                Status
            </label>


            <select id="rentStatus">

                <option value="DUE">
                    🔴 DUE
                </option>

                <option value="PAID">
                    🟢 PAID
                </option>

            </select>


            <label>
                Paid Date
            </label>


            <input
                type="date"
                id="rentPaidDate"
            >


            <div class="rent-form-buttons">

                <button
                    onclick="saveRentHistory()">

                    💾 Save

                </button>


                <button
                    onclick="closeRentForm()">

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
        document
            .getElementById("detailsFlatName")
            .textContent;

    const data =
        flatData[flatName];


    const month =
        document
            .getElementById("rentMonth")
            .value;


    const amount =
        Number(
            document
                .getElementById("rentAmount")
                .value
        ) || 0;


    const status =
        document
            .getElementById("rentStatus")
            .value;


    const paidDate =
        document
            .getElementById("rentPaidDate")
            .value;


    if (!month) {

        alert(
            "Please select month."
        );

        return;
    }


    if (amount <= 0) {

        alert(
            "Please enter rent amount."
        );

        return;
    }


    if (
        status === "PAID" &&
        !paidDate
    ) {

        alert(
            "Please select paid date."
        );

        return;
    }


    if (
        !Array.isArray(
            data.rentHistory
        )
    ) {

        data.rentHistory = [];

    }


    // একই মাস আগে আছে কিনা
    const existing =
        data.rentHistory.find(
            item =>
                item.month === month
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
            b.month.localeCompare(
                a.month
            )
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
        document
            .getElementById("detailsFlatName")
            .textContent;

    const data =
        flatData[flatName];


    if (
        !data ||
        !data.rentHistory[index]
    ) {

        return;
    }


    const month =
        data.rentHistory[index].month;


    if (!confirm(
        `Delete rent for ${month}?`
    )) {

        return;
    }


    data.rentHistory.splice(
        index,
        1
    );


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
        document.getElementById(
            "rentHistoryBox"
        );


    if (box) {

        box.remove();

    }

}


// ==========================================
// CLOSE RENT FORM
// ==========================================

function closeRentForm() {

    const form =
        document.getElementById(
            "rentForm"
        );


    if (form) {

        form.remove();

    }

}


// ==========================================
// END RENT HISTORY SYSTEM
// ==========================================



// ==========================================
// START RECEIPT SYSTEM
// ==========================================

function openReceipt() {

    const flatName =
        document
            .getElementById("detailsFlatName")
            .textContent;

    const data =
        flatData[flatName];


    if (!data) {

        alert("Flat data not found.");

        return;
    }


    if (!Array.isArray(data.otherBills)) {

        data.otherBills = [];

    }


    const otherTotal =
        data.otherBills.reduce(
            (sum, bill) =>
                sum +
                (
                    Number(
                        bill.amount
                    ) || 0
                ),
            0
        );


    const rent =
        Number(data.rent) || 0;


    const total =
        rent + otherTotal;


    const receiptDate =
        new Date()
            .toLocaleDateString(
                "en-GB"
            );


    const box =
        document.createElement("div");

    box.id = "receiptBox";


    box.innerHTML = `

        <div class="receipt-overlay">

            <div class="receipt-panel">

                <div class="receipt-top">

                    <button
                        onclick="closeReceipt()">

                        ← Back

                    </button>


                    <h2>
                        Receipt
                    </h2>


                    <span></span>

                </div>


                <div id="receiptContent">

                    <div class="receipt-paper">

                        <h1>
                            JAMILA BHAVAN
                        </h1>


                        <h3>
                            RENT & BILL RECEIPT
                        </h3>


                        <div
                            class="receipt-line">
                        </div>


                        <div class="receipt-row">

                            <span>
                                Flat
                            </span>


                            <strong>
                                ${escapeHTML(
                                    data.flat
                                )}
                            </strong>

                        </div>


                        <div class="receipt-row">

                            <span>
                                Tenant
                            </span>


                            <strong>
                                ${escapeHTML(
                                    data.tenant ||
                                    "No Tenant"
                                )}
                            </strong>

                        </div>


                        <div class="receipt-row">

                            <span>
                                Date
                            </span>


                            <strong>
                                ${receiptDate}
                            </strong>

                        </div>


                        <div
                            class="receipt-line">
                        </div>


                        <div class="receipt-row">

                            <span>
                                Rent
                            </span>


                            <strong>
                                ৳${rent.toLocaleString()}
                            </strong>

                        </div>


                        <h4
                            class="receipt-subtitle">

                            Other Bills

                        </h4>


                        ${
                            data.otherBills.length > 0

                            ?

                            data.otherBills
                                .map(
                                    bill => `

                                        <div
                                            class="receipt-row">

                                            <span>
                                                ${escapeHTML(
                                                    bill.name
                                                )}
                                            </span>


                                            <strong>
                                                ৳${Number(
                                                    bill.amount
                                                ).toLocaleString()}
                                            </strong>

                                        </div>

                                    `
                                )
                                .join("")

                            :

                            `

                                <div
                                    class="receipt-empty">

                                    No Other Bills

                                </div>

                            `
                        }


                        <div
                            class="receipt-line">
                        </div>


                        <div
                            class="receipt-total">

                            <span>
                                TOTAL
                            </span>


                            <strong>
                                ৳${total.toLocaleString()}
                            </strong>

                        </div>


                        <div
                            class="receipt-status">

                            ${
                                data.status === "PAID"

                                    ? "🟢 PAID"

                                    : data.status === "DUE"

                                    ? "🔴 DUE"

                                    : "⚪ VACANT"
                            }

                        </div>


                        <div
                            class="receipt-footer">

                            Thank you

                        </div>

                    </div>

                </div>


                <div
                    class="receipt-actions">

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
// CLOSE RECEIPT
// ==========================================

function closeReceipt() {

    const receiptBox =
        document.getElementById(
            "receiptBox"
        );


    if (receiptBox) {

        receiptBox.remove();

    }


    const detailsScreen =
        document.getElementById(
            "flatDetailsScreen"
        );


    if (detailsScreen) {

        detailsScreen.classList.remove(
            "hidden"
        );

    }


    const listScreen =
        document.getElementById(
            "flatListScreen"
        );


    if (listScreen) {

        listScreen.classList.add(
            "hidden"
        );

    }

}


// ==========================================
// END RECEIPT SYSTEM
// ==========================================

// ==========================================
// START WHATSAPP RECEIPT SYSTEM
// ==========================================

function sendReceiptWhatsApp() {

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


    // ======================================
    // GET PHONE NUMBER
    // ======================================

    let phone =
        String(
            data.tenantPhone || ""
        )
        .replace(/\D/g, "");


    if (!phone) {

        alert(
            "This flat has no WhatsApp number.\n\n" +
            "Please add the tenant mobile number first."
        );

        return;
    }


    // ======================================
    // BANGLADESH NUMBER FORMAT
    // ======================================

    if (phone.startsWith("01")) {

        phone =
            "88" + phone;

    }

    else if (
        phone.startsWith("880")
    ) {

        // Already correct

    }

    else if (
        phone.startsWith("88")
    ) {

        // Keep as it is

    }

    else {

        alert(
            "Invalid Bangladesh mobile number."
        );

        return;
    }


    // ======================================
    // RENT
    // ======================================

    const rent =
        Number(data.rent) || 0;


    // ======================================
    // OTHER BILLS
    // ======================================

    const otherTotal =
        Array.isArray(data.otherBills)
            ?
            data.otherBills.reduce(
                (sum, bill) =>
                    sum +
                    (
                        Number(
                            bill.amount
                        ) || 0
                    ),
                0
            )
            :
            0;


    // ======================================
    // TOTAL
    // ======================================

    const total =
        rent + otherTotal;


    const date =
        new Date()
            .toLocaleDateString(
                "en-GB"
            );


    // ======================================
    // MESSAGE
    // ======================================

    let message = "";


    message +=
        "🏢 *JAMILA BHAVAN*\n";

    message +=
        "🧾 *RENT & BILL RECEIPT*\n";

    message +=
        "--------------------------\n";


    message +=
        "Flat: " +
        (data.flat || "") +
        "\n";


    message +=
        "Tenant: " +
        (data.tenant || "No Tenant") +
        "\n";


    message +=
        "Date: " +
        date +
        "\n";


    message +=
        "--------------------------\n";


    message +=
        "Rent: ৳" +
        rent.toLocaleString() +
        "\n";


    // ======================================
    // OTHER BILLS
    // ======================================

    if (
        Array.isArray(data.otherBills) &&
        data.otherBills.length > 0
    ) {

        message +=
            "\n*Other Bills*\n";


        data.otherBills.forEach(
            bill => {

                message +=
                    (bill.name || "Other") +
                    ": ৳" +
                    Number(
                        bill.amount || 0
                    )
                    .toLocaleString() +
                    "\n";

            }
        );

    }


    message +=
        "--------------------------\n";


    message +=
        "*TOTAL: ৳" +
        total.toLocaleString() +
        "*\n";


    // ======================================
    // STATUS
    // ======================================

    if (data.status === "PAID") {

        message +=
            "🟢 *PAID*\n";

    }

    else if (data.status === "DUE") {

        message +=
            "🔴 *DUE*\n";

    }


    message +=
        "--------------------------\n";


    message +=
        "Thank you.";


    // ======================================
    // OPEN WHATSAPP
    // ======================================

    const whatsappURL =
        "https://wa.me/" +
        phone +
        "?text=" +
        encodeURIComponent(message);


    window.location.href =
        whatsappURL;

}


// ==========================================
// END WHATSAPP RECEIPT SYSTEM
// ==========================================



// ==========================================
// START BACKUP SYSTEM
// ==========================================

function backupData() {

    const backupData = {

        version: 1,

        backupDate:
            new Date().toISOString(),

        data: flatData

    };


    const json =
        JSON.stringify(
            backupData,
            null,
            2
        );


    const blob =
        new Blob(
            [json],
            {
                type:
                    "application/json"
            }
        );


    const url =
        URL.createObjectURL(blob);


    const link =
        document.createElement("a");


    link.href =
        url;


    link.download =
        "Jamila_Bhavan_Flat_Backup.json";


    document.body.appendChild(link);


    link.click();


    document.body.removeChild(link);


    URL.revokeObjectURL(url);

}


// ==========================================
// END BACKUP SYSTEM
// ==========================================



// ==========================================
// START RESTORE SYSTEM
// ==========================================

function restoreData(event) {

    const file =
        event.target.files[0];


    if (!file) {

        return;
    }


    const reader =
        new FileReader();


    reader.onload =
        function(e) {

            try {

                const backup =
                    JSON.parse(
                        e.target.result
                    );


                if (
                    !backup ||
                    !backup.data ||
                    typeof backup.data !==
                        "object"
                ) {

                    alert(
                        "Invalid backup file."
                    );

                    return;
                }


                const confirmRestore =
                    confirm(
                        "Restore backup?\n\n" +
                        "Current data will be replaced."
                    );


                if (!confirmRestore) {

                    return;
                }


                flatData =
                    backup.data;


                localStorage.setItem(
                    "flatRegisterData",
                    JSON.stringify(
                        flatData
                    )
                );


                alert(
                    "Backup restored successfully."
                );


                location.reload();

            }

            catch (error) {

                alert(
                    "Could not restore backup."
                );


                console.error(error);

            }

        };


    reader.readAsText(file);

}


// ==========================================
// END RESTORE SYSTEM
// ==========================================



// ==========================================
// START BILL + PAID + PDF SYSTEM
// ==========================================

let currentBillFlat = null;


// ==========================================
// GET CURRENT FLAT FOR BILL
// ==========================================

function getCurrentBillFlat() {

    const element =
        document.getElementById(
            "detailsFlatName"
        );


    if (!element) {

        alert(
            "Flat details not found."
        );

        return null;
    }


    const flatName =
        element
            .textContent
            .trim();


    if (
        !flatName ||
        flatName === "Flat"
    ) {

        alert(
            "Please select a flat first."
        );

        return null;
    }


    // ======================================
    // FIND EXACT FLAT
    // ======================================

    const flatKey =
        FLATS.find(
            flat =>
                flat.trim() === flatName
        );


    if (!flatKey) {

        alert(
            "Flat not found: " +
            flatName
        );

        return null;
    }


    // ======================================
    // CHECK FLAT DATA
    // ======================================

    if (!flatData[flatKey]) {

        alert(
            "Data not found for " +
            flatKey
        );

        return null;
    }


    return flatKey;

}


// ==========================================
// CREATE BILL
// ==========================================

function createBill() {

    const flatName =
        getCurrentBillFlat();


    if (!flatName) {

        return;
    }


    const data =
        flatData[flatName];


    currentBillFlat =
        flatName;


    const month =
        new Date()
            .toISOString()
            .slice(0, 7);


    if (
        !Array.isArray(
            data.rentHistory
        )
    ) {

        data.rentHistory = [];

    }


    // ======================================
    // CHECK CURRENT MONTH BILL
    // ======================================

    let bill =
        data.rentHistory.find(
            item =>
                item.month === month
        );


    // ======================================
    // CREATE NEW BILL
    // ======================================

    if (!bill) {

        bill = {

            month: month,

            rent:
                Number(data.rent) || 0,

            other:
                Number(data.other) || 0,

            total:
                (
                    Number(data.rent) || 0
                ) +
                (
                    Number(data.other) || 0
                ),

            paid: 0,

            due:
                (
                    Number(data.rent) || 0
                ) +
                (
                    Number(data.other) || 0
                ),

            status: "DUE",

            created:
                new Date().toISOString()

        };


        data.rentHistory.push(
            bill
        );

    }


    // ======================================
    // CURRENT STATUS
    // ======================================

    if (
        bill.paid >= bill.total
    ) {

        bill.status =
            "PAID";

        bill.due = 0;

    }

    else {

        bill.status =
            "DUE";

        bill.due =
            bill.total -
            bill.paid;

    }


    // ======================================
    // SAVE BILL DATA
    // ======================================

    localStorage.setItem(
        "flatRegisterData",
        JSON.stringify(
            flatData
        )
    );


    // ======================================
    // SHOW BILL
    // ======================================

    showBillScreen(
        flatName,
        bill
    );

}


// ==========================================
// SHOW BILL SCREEN
// ==========================================

function showBillScreen(
    flatName,
    bill
) {

    const data =
        flatData[flatName];


    let oldBox =
        document.getElementById(
            "billScreenBox"
        );


    if (oldBox) {

        oldBox.remove();

    }


    const box =
        document.createElement("div");


    box.id =
        "billScreenBox";


    box.innerHTML = `

        <div class="bill-overlay">

            <div class="bill-panel">

                <div class="bill-header">

                    <button
                        onclick="closeBillScreen()">

                        ← Back

                    </button>


                    <h2>
                        Monthly Bill
                    </h2>


                    <span></span>

                </div>


                <div
                    id="billContent"
                    class="bill-paper">

                    <h1>
                        JAMILA BHAVAN
                    </h1>


                    <h3>
                        MONTHLY RENT BILL
                    </h3>


                    <div
                        class="bill-line">
                    </div>


                    <div
                        class="bill-row">

                        <span>
                            Flat
                        </span>

                        <strong>
                            ${escapeHTML(
                                data.flat
                            )}
                        </strong>

                    </div>


                    <div
                        class="bill-row">

                        <span>
                            Tenant
                        </span>

                        <strong>
                            ${escapeHTML(
                                data.tenant ||
                                "No Tenant"
                            )}
                        </strong>

                    </div>


                    <div
                        class="bill-row">

                        <span>
                            Month
                        </span>

                        <strong>
                            ${escapeHTML(
                                bill.month
                            )}
                        </strong>

                    </div>


                    <div
                        class="bill-line">
                    </div>


                    <div
                        class="bill-row">

                        <span>
                            Rent
                        </span>

                        <strong>
                            ৳${Number(
                                bill.rent
                            ).toLocaleString()}
                        </strong>

                    </div>


                    <div
                        class="bill-row">

                        <span>
                            Other
                        </span>

                        <strong>
                            ৳${Number(
                                bill.other
                            ).toLocaleString()}
                        </strong>

                    </div>


                    <div
                        class="bill-line">
                    </div>


                    <div
                        class="bill-row bill-total">

                        <span>
                            TOTAL
                        </span>

                        <strong>
                            ৳${Number(
                                bill.total
                            ).toLocaleString()}
                        </strong>

                    </div>


                    <div
                        class="bill-row">

                        <span>
                            Paid
                        </span>

                        <strong>
                            ৳${Number(
                                bill.paid
                            ).toLocaleString()}
                        </strong>

                    </div>


                    <div
                        class="bill-row bill-due">

                        <span>
                            Due
                        </span>

                        <strong>
                            ৳${Number(
                                bill.due
                            ).toLocaleString()}
                        </strong>

                    </div>


                    <div
                        class="bill-status">

                        ${
                            bill.status === "PAID"
                            ? "🟢 PAID"
                            : "🔴 DUE"
                        }

                    </div>

                </div>


                <div
                    class="bill-actions">

                    <button
                        onclick="openPaymentForm()">

                        💰 Paid

                    </button>


                    <button
                        onclick="downloadBillPDF()">

                        📄 PDF

                    </button>


                    <button
                        onclick="sendBillWhatsApp()">

                        📱 WhatsApp

                    </button>

                </div>

            </div>

        </div>
    `;


    document.body.appendChild(
        box
    );

}


// ==========================================
// CLOSE BILL SCREEN
// ==========================================

function closeBillScreen() {

    const box =
        document.getElementById(
            "billScreenBox"
        );


    if (box) {

        box.remove();

    }

}


// ==========================================
// END BILL + PAID + PDF SYSTEM - PART 4
// ==========================================

// ============================================================
// 🟢 START PAID + PDF SYSTEM - PART 5
// ============================================================


// ============================================================
// 💰 PAY BILL
// ============================================================

function payBill() {

    if (!currentBillFlat) {
        alert("Flat not selected!");
        return;
    }

    const data = flatData[currentBillFlat];

    if (!data) {
        alert("Flat data not found!");
        return;
    }

    const month =
        document.getElementById("billMonth")?.value ||
        new Date().toISOString().slice(0, 7);

    const rent =
        Number(data.rent) || 0;

    const other =
        Number(data.other) || 0;

    const total =
        rent + other;

    if (total <= 0) {
        alert("There is no bill amount to pay.");
        return;
    }


    // --------------------------------------------------------
    // Get existing rent history
    // --------------------------------------------------------

    if (!data.rentHistory) {
        data.rentHistory = [];
    }


    // --------------------------------------------------------
    // Check whether this month's payment already exists
    // --------------------------------------------------------

    const existingIndex =
        data.rentHistory.findIndex(
            item => item.month === month
        );


    const paymentData = {

        month: month,

        amount: total,

        rent: rent,

        other: other,

        status: "PAID",

        paymentDate:
            new Date().toISOString()

    };


    // --------------------------------------------------------
    // Update existing payment
    // --------------------------------------------------------

    if (existingIndex !== -1) {

        data.rentHistory[existingIndex] =
            paymentData;

    }

    // --------------------------------------------------------
    // Create new payment
    // --------------------------------------------------------

    else {

        data.rentHistory.push(
            paymentData
        );

    }


    // --------------------------------------------------------
    // Update flat status
    // --------------------------------------------------------

    data.status = "PAID";


    // --------------------------------------------------------
    // Save data
    // --------------------------------------------------------

    localStorage.setItem(
        "flatRegisterData",
        JSON.stringify(flatData)
    );


    // --------------------------------------------------------
    // Refresh system
    // --------------------------------------------------------

    updateFlatDetailsStatus(
        currentBillFlat
    );

    renderFlatTable();

    updateDashboard();


    // --------------------------------------------------------
    // Close bill screen
    // --------------------------------------------------------

    closeBillScreen();


    alert(
        "Payment saved successfully!"
    );
}



// ============================================================
// 🟢 UPDATE FLAT STATUS
// ============================================================

function updateFlatDetailsStatus(flatName) {

    const data =
        flatData[flatName];

    if (!data) {
        return;
    }


    // --------------------------------------------------------
    // Find current month
    // --------------------------------------------------------

    const currentMonth =
        new Date().toISOString().slice(0, 7);


    // --------------------------------------------------------
    // Check rent history
    // --------------------------------------------------------

    let currentPayment = null;


    if (data.rentHistory) {

        currentPayment =
            data.rentHistory.find(
                item =>
                    item.month === currentMonth
            );

    }


    // --------------------------------------------------------
    // Update status
    // --------------------------------------------------------

    if (currentPayment) {

        if (
            currentPayment.status === "PAID"
        ) {

            data.status = "PAID";

        }

        else {

            data.status = "DUE";

        }

    }

    else {

        if (data.tenant && data.tenant.trim() !== "") {

            data.status = "DUE";

        }

        else {

            data.status = "VACANT";

        }

    }


    // --------------------------------------------------------
    // Save
    // --------------------------------------------------------

    localStorage.setItem(
        "flatRegisterData",
        JSON.stringify(flatData)
    );
}



// ============================================================
// 🟢 DOWNLOAD BILL PDF
// ============================================================

function downloadBillPDF() {

    if (!currentBillFlat) {
        alert("Flat not selected!");
        return;
    }


    const data =
        flatData[currentBillFlat];

    if (!data) {
        alert("Flat data not found!");
        return;
    }


    // --------------------------------------------------------
    // Get jsPDF
    // --------------------------------------------------------

    if (
        typeof window.jspdf === "undefined"
    ) {

        alert(
            "PDF library is not loaded!"
        );

        return;
    }


    const { jsPDF } =
        window.jspdf;


    // --------------------------------------------------------
    // Create PDF
    // --------------------------------------------------------

    const doc =
        new jsPDF({

            orientation: "portrait",

            unit: "mm",

            format: "a4"

        });


    // --------------------------------------------------------
    // Bill information
    // --------------------------------------------------------

    const flatName =
        data.flat || currentBillFlat;

    const tenant =
        data.tenant || "N/A";

    const month =
        document.getElementById("billMonth")?.value ||
        new Date().toISOString().slice(0, 7);

    const rent =
        Number(data.rent) || 0;

    const other =
        Number(data.other) || 0;

    const total =
        rent + other;


    // --------------------------------------------------------
    // PDF HEADER
    // --------------------------------------------------------

    doc.setFontSize(20);

    doc.text(
        "JAMILA BHAVAN",
        105,
        25,
        {
            align: "center"
        }
    );


    doc.setFontSize(14);

    doc.text(
        "TENANT & RENT BILL",
        105,
        34,
        {
            align: "center"
        }
    );


    // --------------------------------------------------------
    // Line
    // --------------------------------------------------------

    doc.line(
        20,
        40,
        190,
        40
    );


    // --------------------------------------------------------
    // Tenant Information
    // --------------------------------------------------------

    doc.setFontSize(11);


    doc.text(
        "Flat No",
        25,
        52
    );

    doc.text(
        ": " + flatName,
        65,
        52
    );


    doc.text(
        "Tenant",
        25,
        62
    );

    doc.text(
        ": " + tenant,
        65,
        62
    );


    doc.text(
        "Billing Month",
        25,
        72
    );

    doc.text(
        ": " + month,
        65,
        72
    );


    // --------------------------------------------------------
    // Bill Details
    // --------------------------------------------------------

    doc.line(
        20,
        82,
        190,
        82
    );


    doc.text(
        "Monthly Rent",
        25,
        95
    );

    doc.text(
        rent.toFixed(2) + " Tk",
        145,
        95
    );


    doc.text(
        "Other Bills",
        25,
        107
    );

    doc.text(
        other.toFixed(2) + " Tk",
        145,
        107
    );


    // --------------------------------------------------------
    // TOTAL
    // --------------------------------------------------------

    doc.line(
        20,
        116,
        190,
        116
    );


    doc.setFontSize(13);

    doc.text(
        "TOTAL",
        25,
        130
    );

    doc.text(
        total.toFixed(2) + " Tk",
        145,
        130
    );


    // --------------------------------------------------------
    // Payment Status
    // --------------------------------------------------------

    doc.setFontSize(11);


    doc.text(
        "Paid",
        25,
        145
    );

    doc.text(
        total.toFixed(2) + " Tk",
        145,
        145
    );


    doc.text(
        "Due",
        25,
        157
    );

    doc.text(
        "0.00 Tk",
        145,
        157
    );


    doc.text(
        "Payment Status",
        25,
        169
    );

    doc.text(
        "PAID",
        145,
        169
    );


    // --------------------------------------------------------
    // Footer
    // --------------------------------------------------------

    doc.line(
        20,
        180,
        190,
        180
    );


    doc.setFontSize(9);

    doc.text(
        "Jamila Bhavan-1",
        105,
        190,
        {
            align: "center"
        }
    );


    doc.text(
        "Tenant & Rent Management System",
        105,
        197,
        {
            align: "center"
        }
    );


    // --------------------------------------------------------
    // SAVE PDF
    // --------------------------------------------------------

    doc.save(

        "Jamila-Bhavan-" +
        flatName +
        "-" +
        month +
        ".pdf"

    );

}


// ============================================================
// 🔴 END PAID + PDF SYSTEM - PART 5
// ============================================================
// ============================================================
// 🟢 START PAYMENT FORM + BILL WHATSAPP - PART 6
// ============================================================


// ============================================================
// 💰 OPEN PAYMENT FORM
// ============================================================

function openPaymentForm() {

    if (!currentBillFlat) {

        alert("Flat not selected!");

        return;
    }


    const data =
        flatData[currentBillFlat];


    if (!data) {

        alert("Flat data not found!");

        return;
    }


    const rent =
        Number(data.rent) || 0;


    const other =
        Number(data.other) || 0;


    const total =
        rent + other;


    if (total <= 0) {

        alert(
            "There is no bill amount to pay."
        );

        return;
    }


    const payment =
        prompt(
            "Enter Payment Amount\n\n" +
            "Flat: " +
            currentBillFlat +
            "\n" +
            "Total Bill: ৳" +
            total.toFixed(2)
        );


    if (payment === null) {

        return;
    }


    const amount =
        Number(payment);


    if (
        isNaN(amount) ||
        amount <= 0
    ) {

        alert(
            "Please enter a valid payment amount."
        );

        return;
    }


    // --------------------------------------------------------
    // Part 5-এর payBill() ব্যবহার করবে
    // --------------------------------------------------------

    payBill();

}


// ============================================================
// 📱 SEND BILL BY WHATSAPP
// ============================================================

function sendBillWhatsApp() {

    if (!currentBillFlat) {

        alert("Flat not selected!");

        return;
    }


    const data =
        flatData[currentBillFlat];


    if (!data) {

        alert("Flat data not found!");

        return;
    }


    const tenant =
        data.tenant || "Tenant";


    const phone =
        data.tenantPhone || "";


    if (!phone) {

        alert(
            "Tenant mobile number not found."
        );

        return;
    }


    const month =
        document.getElementById("billMonth")?.value ||
        new Date().toISOString().slice(0, 7);


    const rent =
        Number(data.rent) || 0;


    const other =
        Number(data.other) || 0;


    const total =
        rent + other;


    const message =
        "JAMILA BHAVAN-1\n" +
        "Tenant & Rent Bill\n\n" +

        "Dear " +
        tenant +
        ",\n\n" +

        "Flat No      : " +
        currentBillFlat +
        "\n" +

        "Billing Month: " +
        month +
        "\n" +

        "Monthly Rent : ৳" +
        rent.toFixed(2) +
        "\n" +

        "Other Bills  : ৳" +
        other.toFixed(2) +
        "\n" +

        "Total Bill   : ৳" +
        total.toFixed(2) +
        " Tk";


    let whatsappNumber =
        phone.replace(
            /\D/g,
            ""
        );


    // --------------------------------------------------------
    // Bangladesh number হলে 0 → 88
    // --------------------------------------------------------

    if (
        whatsappNumber.startsWith("0")
    ) {

        whatsappNumber =
            "88" +
            whatsappNumber;

    }


    const whatsappURL =
        "https://wa.me/" +
        whatsappNumber +
        "?text=" +
        encodeURIComponent(
            message
        );


    window.open(
        whatsappURL,
        "_blank"
    );

}


// ============================================================
// 🔴 END PAYMENT FORM + BILL WHATSAPP - PART 6
// ============================================================

// ============================================================
// 🟢 START PAYMENT CALCULATION + STATUS FIX - PART 7
// ============================================================


// ============================================================
// 💰 GET CURRENT MONTH PAYMENT
// ============================================================

function getCurrentMonthPayment(flatName) {

    const data =
        flatData[flatName];

    if (!data) {
        return null;
    }


    const month =
        document.getElementById("billMonth")?.value ||
        new Date().toISOString().slice(0, 7);


    if (
        !Array.isArray(data.rentHistory)
    ) {
        data.rentHistory = [];
    }


    return data.rentHistory.find(
        item =>
            item.month === month
    ) || null;

}



// ============================================================
// 💰 GET BILL SUMMARY
// ============================================================

function getBillSummary(flatName) {

    const data =
        flatData[flatName];


    if (!data) {
        return null;
    }


    const rent =
        Number(data.rent) || 0;


    const other =
        Number(data.other) || 0;


    const total =
        rent + other;


    const payment =
        getCurrentMonthPayment(
            flatName
        );


    const paid =
        payment
            ? Number(payment.paid || 0)
            : 0;


    const due =
        Math.max(
            total - paid,
            0
        );


    return {

        rent: rent,

        other: other,

        total: total,

        paid: paid,

        due: due

    };

}



// ============================================================
// 🔄 REFRESH BILL + DASHBOARD
// ============================================================

function refreshBillSystem(flatName) {

    if (!flatName) {
        return;
    }


    updateFlatDetailsStatus(
        flatName
    );


    renderFlatTable();


    updateDashboard();


    localStorage.setItem(
        "flatRegisterData",
        JSON.stringify(flatData)
    );

}



// ============================================================
// 🔴 END PAYMENT CALCULATION + STATUS FIX - PART 7
// ============================================================

// ============================================================
// 🟢 START BILL SUMMARY + PAYMENT DISPLAY - PART 8
// ============================================================


// ============================================================
// 🧾 GET BILL PAYMENT DETAILS
// ============================================================

function getBillPaymentDetails(flatName) {

    const data =
        flatData[flatName];

    if (!data) {
        return null;
    }


    const rent =
        Number(data.rent) || 0;

    const other =
        Number(data.other) || 0;

    const total =
        rent + other;


    const month =
        document.getElementById("billMonth")?.value ||
        new Date().toISOString().slice(0, 7);


    let payment =
        null;


    if (
        Array.isArray(data.rentHistory)
    ) {

        payment =
            data.rentHistory.find(
                item =>
                    item.month === month
            );

    }


    const paid =
        payment
            ? Number(payment.paid || 0)
            : 0;


    const due =
        Math.max(
            total - paid,
            0
        );


    let status =
        "DUE";


    if (total <= 0) {

        status = "NO BILL";

    }

    else if (due <= 0) {

        status = "PAID";

    }


    return {

        month: month,

        rent: rent,

        other: other,

        total: total,

        paid: paid,

        due: due,

        status: status

    };

}



// ============================================================
// 🧾 SHOW BILL SUMMARY
// ============================================================

function showBillSummary(flatName) {

    const summary =
        getBillPaymentDetails(
            flatName
        );


    if (!summary) {
        return;
    }


    // --------------------------------------------------------
    // Optional elements
    // --------------------------------------------------------

    const totalElement =
        document.getElementById(
            "billTotal"
        );


    const paidElement =
        document.getElementById(
            "billPaid"
        );


    const dueElement =
        document.getElementById(
            "billDue"
        );


    const statusElement =
        document.getElementById(
            "billStatus"
        );


    if (totalElement) {

        totalElement.textContent =
            "৳" +
            summary.total.toFixed(2);

    }


    if (paidElement) {

        paidElement.textContent =
            "৳" +
            summary.paid.toFixed(2);

    }


    if (dueElement) {

        dueElement.textContent =
            "৳" +
            summary.due.toFixed(2);

    }


    if (statusElement) {

        statusElement.textContent =
            summary.status;

    }

}



// ============================================================
// 💰 UPDATE PAYMENT STATUS
// ============================================================

function updatePaymentStatus(flatName) {

    const summary =
        getBillPaymentDetails(
            flatName
        );


    if (!summary) {
        return;
    }


    const data =
        flatData[flatName];


    if (
        summary.status === "PAID"
    ) {

        data.status =
            "PAID";

    }

    else if (
        data.tenant &&
        data.tenant.trim() !== ""
    ) {

        data.status =
            "DUE";

    }

    else {

        data.status =
            "VACANT";

    }


    localStorage.setItem(
        "flatRegisterData",
        JSON.stringify(flatData)
    );

}



// ============================================================
// 🔄 REFRESH EVERYTHING
// ============================================================

function refreshAllBillData(flatName) {

    if (!flatName) {
        return;
    }


    updatePaymentStatus(
        flatName
    );


    updateFlatDetailsStatus(
        flatName
    );


    showBillSummary(
        flatName
    );


    renderFlatTable();


    updateDashboard();


    localStorage.setItem(
        "flatRegisterData",
        JSON.stringify(flatData)
    );

}



// ============================================================
// 🔴 END BILL SUMMARY + PAYMENT DISPLAY - PART 8
// ============================================================

// ==========================================
// START - APP INITIALIZATION
// ==========================================

initializeFlatData();
updateDashboard();

// ==========================================
// END - APP INITIALIZATION
// ==========================================













