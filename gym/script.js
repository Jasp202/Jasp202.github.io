
/*
============================================================
LOCAL STORAGE
============================================================
*/

const STORAGE_KEY = "myAccordionItems";


/*
============================================================
LOAD
============================================================
*/

function loadItems() {

    const stored =
        localStorage.getItem(STORAGE_KEY);


    if (!stored) {
        return [];
    }


    try {

        return JSON.parse(stored);

    }

    catch (error) {

        console.error(
            "Could not parse stored items:",
            error
        );

        return [];

    }

}


/*
============================================================
SAVE
============================================================
*/

function saveItems(items) {

    localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(items)
    );

}


/*
============================================================
GLOBAL DATA
============================================================
*/

let items = loadItems();


/*
============================================================
ELEMENTS
============================================================
*/

const accordion =
    document.getElementById("accordion");


const addItemForm =
    document.getElementById("addItemForm");


const message =
    document.getElementById("message");


/*
============================================================
ADD ITEM FORM
============================================================
*/

addItemForm.addEventListener(
    "submit",
    event => {

        event.preventDefault();


        /*
        --------------------------------------------
        Get form values
        --------------------------------------------
        */

        const title =
            document
                .getElementById("itemTitle")
                .value
                .trim();


        const pointMode =
            document
                .getElementById("itemPointMode")
                .value;


        /*
        --------------------------------------------
        Create item
        --------------------------------------------
        */

        const newItem = {

            id: crypto.randomUUID(),

            title: title,

            pointMode: pointMode,

            points: []

        };


        /*
        --------------------------------------------
        Add to array
        --------------------------------------------
        */

        items.push(newItem);


        /*
        --------------------------------------------
        Save to localStorage
        --------------------------------------------
        */

        saveItems(items);


        /*
        --------------------------------------------
        Reset form
        --------------------------------------------
        */

        addItemForm.reset();


        /*
        --------------------------------------------
        Update interface
        --------------------------------------------
        */

        renderItems();


        /*
        --------------------------------------------
        Message
        --------------------------------------------
        */

        message.textContent =
            "Item added successfully.";

    }
);


/*
============================================================
RENDER ITEMS
============================================================
*/

function renderItems() {

    accordion.innerHTML = "";


    /*
    --------------------------------------------
    Empty state
    --------------------------------------------
    */

    if (items.length === 0) {

        accordion.innerHTML = `

            <div class="empty">
                No items have been created yet.
            </div>

        `;

        return;

    }


    /*
    --------------------------------------------
    Render every item
    --------------------------------------------
    */

    items.forEach(item => {


        /*
        Make sure older data has points.
        */

        if (!Array.isArray(item.points)) {

            item.points = [];

        }


        /*
        Create wrapper
        */

        const wrapper =
            document.createElement("div");


        wrapper.className =
            "accordion-item";


        /*
        ============================================
        ITEM HTML
        ============================================
        */

        wrapper.innerHTML = `

            <button
                type="button"
                class="accordion-button"
            >
                ${escapeHTML(item.title)}
            </button>
            <div class="accordion-content">
             
                <div class="points-section">

                    <form class="point-form">

                        <div class="point-field">

                            <label>
                                Reps
                            </label>

                            <input
                                class="x-input"
                                type="number"
                                step="any"
                                required
                            >

                        </div>


                        <div class="point-field y-field">

                            <label>
                                Weight
                            </label>

                            <input
                                class="y-input"
                                type="number"
                                step="any"
                            >

                        </div>


                        <button
                            type="submit"
                            class="point-submit"
                        >
                            Add Reps
                        </button>

                    </form>


                    <div class="points-list"></div>

                </div>


               


            </div>
        `;


        /*
        ============================================
        GET ELEMENTS
        ============================================
        */

        const button =
            wrapper.querySelector(
                ".accordion-button"
            );


        const content =
            wrapper.querySelector(
                ".accordion-content"
            );


        const titleInput =
            wrapper.querySelector(
                ".title-input"
            );


        const descriptionInput =
            wrapper.querySelector(
                ".description-input"
            );


        const statusInput =
            wrapper.querySelector(
                ".status-input"
            );


        const pointForm =
            wrapper.querySelector(
                ".point-form"
            );


        const xInput =
            wrapper.querySelector(
                ".x-input"
            );


        const yInput =
            wrapper.querySelector(
                ".y-input"
            );


        const yField =
            wrapper.querySelector(
                ".y-field"
            );


        const pointsList =
            wrapper.querySelector(
                ".points-list"
            );


     


        /*
        ============================================
        POINT MODE
        ============================================
        */

        if (item.pointMode === "one") {

            yField.style.display = "none";

        }


        /*
        ============================================
        ACCORDION
        ============================================
        */

        button.addEventListener(
            "click",
            () => {

                const isOpen =
                    content.classList.contains(
                        "open"
                    );


                /*
                Close all
                */

                document
                    .querySelectorAll(
                        ".accordion-content"
                    )
                    .forEach(
                        element => {

                            element.classList
                                .remove("open");

                        }
                    );


                document
                    .querySelectorAll(
                        ".accordion-button"
                    )
                    .forEach(
                        element => {

                            element.classList
                                .remove("active");

                        }
                    );


                /*
                Open clicked item
                */

                if (!isOpen) {

                    content.classList
                        .add("open");


                    button.classList
                        .add("active");

                }

            }
        );



        /*
        ============================================
        ADD POINT
        ============================================
        */

        pointForm.addEventListener(
            "submit",
            event => {

                event.preventDefault();


                const x =
                    Number(xInput.value);


                /*
                One-dimensional point
                */

                if (item.pointMode === "one") {

                    if (!Number.isFinite(x)) {
                        return;
                    }


                    item.points.push({
                        x: x
                    });

                }


                /*
                Normal X/Y point
                */

                else {

                    const y =
                        Number(yInput.value);


                    if (
                        !Number.isFinite(x) ||
                        !Number.isFinite(y)
                    ) {

                        return;

                    }


                    item.points.push({

                        x: x,

                        y: y

                    });

                }


                /*
                Save
                */

                saveItems(items);


                /*
                Refresh points
                */

                renderPoints();


                /*
                Clear inputs
                */


                xInput.focus();

            }
        );


        /*
        ============================================
        RENDER POINTS
        ============================================
        */

        function renderPoints() {

            pointsList.innerHTML = "";


            [...item.points].reverse().forEach(
                (point, index) => {

                    const element =
                        document.createElement(
                            "div"
                        );


                    element.className =
                        "point";


                    /*
                    One-dimensional
                    */

                    if (
                        item.pointMode === "one"
                    ) {

                        element.innerHTML = `

                            <span class="point-values">
                                ${point.x}
                            </span>

                            <button
                                type="button"
                                class="remove-point"
                            >
                                Remove
                            </button>

                        `;

                    }


                    /*
                    X/Y
                    */

                    else {

                        element.innerHTML = `

                            <span class="point-values">
                                ${point.x} Reps, ${point.y} kg
                            </span>

                            <button
                                type="button"
                                class="remove-point"
                            >
                                Remove
                            </button>

                        `;

                    }


                    element
                        .querySelector(
                            ".remove-point"
                        )
                        .addEventListener(
                            "click",
                            () => {

                                item.points.splice(
                                    index,
                                    1
                                );


                                saveItems(items);


                                renderPoints();

                            }
                        );


                    pointsList.appendChild(
                        element
                    );

                }
            );

        }



        /*
        ============================================
        INITIAL POINT RENDER
        ============================================
        */

        renderPoints();


        /*
        ============================================
        ADD TO DOM
        ============================================
        */

        accordion.appendChild(wrapper);

    });

}


/*
============================================================
HTML ESCAPING
============================================================
*/

function escapeHTML(value) {

    return String(value)
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll('"', "&quot;")
        .replaceAll("'", "&#039;");

}


function escapeAttribute(value) {

    return escapeHTML(value);

}


/*
============================================================
INITIAL LOAD
============================================================
*/

renderItems();


const button = document.getElementById("addnewbutton");
const container = document.getElementById("addnewcontainer");

button.addEventListener("click", () => {
    container.classList.toggle("visible");
});