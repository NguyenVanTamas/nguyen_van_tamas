import _ from "lodash";
import dayjs from "dayjs";

let products = [
    { id: 1, name: "Kenyér", category: "Kenyerek", price: 850, stock: 40, available: true },
    { id: 2, name: "Virslis rácsos", category: "Sós pékáruk", price: 450, stock: 20, available: false },
    { id: 3, name: "Kakaós Csiga", category: "Édes pékáruk", price: 400, stock: 30, available: true },
    { id: 4, name: "Eszterházy-torta", category: "Cukrászat", price: 1000, stock: 10, available: true },
    { id: 5, name: "Tigris Cipó", category: "Kenyerek", price: 1000, stock: 20, available: false }
];

let nextId = 6;

document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("productForm");
    const app = document.getElementById("app");
    const sort = document.getElementById("sortSelect");

    document.getElementById("currentDate").textContent =
        dayjs().format("YYYY. MM. DD.");

    function render() {
        app.replaceChildren();

        let [field, direction] = sort.value.split("-");
        let list = _.orderBy(_.uniqBy(products, "id"), [field], [direction]);

        let table = document.createElement("table");
        table.className = "table table-striped table-bordered";

        let head = document.createElement("thead");
        head.className = "table-dark";
        head.innerHTML = `
            <tr>
                <th>Név</th><th>Kategória</th><th>Ár</th>
                <th>Napi elérhetőség</th><th>Kapható</th><th>Művelet</th>
            </tr>`;
        table.appendChild(head);

        let body = document.createElement("tbody");

        list.forEach(p => {
            let row = document.createElement("tr");

            [p.name, p.category, p.price + " Ft", p.stock].forEach(value => {
                let cell = document.createElement("td");
                cell.textContent = value;
                row.appendChild(cell);
            });

        let availableCell = document.createElement("td");

        let wrapper = document.createElement("div");
        wrapper.className = "form-check form-switch";

        let checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.className = "form-check-input";
        checkbox.checked = p.available;
        checkbox.role = "switch";

        checkbox.addEventListener("change", () => {
            p.available = checkbox.checked;
        });

        wrapper.appendChild(checkbox);
        availableCell.appendChild(wrapper);
        row.appendChild(availableCell);

            let actionCell = document.createElement("td");
            let button = document.createElement("button");
            button.textContent = "Törlés";
            button.className = "btn btn-danger btn-sm";

            button.addEventListener("click", () => {
                products = products.filter(item => item.id !== p.id);
                render();
            });

            actionCell.appendChild(button);
            row.appendChild(actionCell);
            body.appendChild(row);
        });

        table.appendChild(body);
        app.appendChild(table);
    }

    form.addEventListener("submit", e => {
        e.preventDefault();

        products.push({
            id: nextId++,
            name: document.getElementById("inputName").value.trim(),
            category: document.getElementById("inputCategory").value.trim(),
            price: Number(document.getElementById("inputPrice").value),
            stock: Number(document.getElementById("inputStock").value),
            available: document.getElementById("inputAvailability").checked
        });

        form.reset();
        render();
    });

    sort.addEventListener("change", render);

    render();
});