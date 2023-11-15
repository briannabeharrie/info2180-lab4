document.addEventListener('DOMContentLoaded', function () {
    const h3 = document.getElementById("h3");
    const h4 = document.getElementById("h4");
    const para = document.getElementById("p");
    const result = document.getElementById("resultm");
    const search = document.getElementById("input");
    const list = document.getElementById('list');

    document.getElementById("search-button").addEventListener("click", function () {
        const sanitizedInput = sanitize(search.value);
        fetchData(sanitizedInput);
    });

    function fetchData(query) {
        fetch(`superheroes.php?search=${query}`)
            .then(response => response.json())
            .then(superhero => {
                if (query === "") {
                    displayData(superhero);
                    removeData(superhero);
                } else if (superhero !== null) {
                    h3.textContent = superhero.alias;
                    h4.textContent = `A.K.A ${superhero.name}`;
                    para.textContent = superhero.biography;
                    removeData(h3.textContent);
                } else {
                    result.textContent = "Superhero Not Found";
                    removeData(result.textContent);
                }
            });
    }

    function displayData(data) {
        data.forEach(hero => {
            const item = document.createElement('li');
            item.textContent = hero;
            list.appendChild(item);
        });
    }

    function removeData(data) {
        if (data === h3.textContent) {
            result.textContent = "";
            list.textContent = "";
        } else if (data === result.textContent) {
            h3.textContent = "";
            h4.textContent = "";
            para.textContent = "";
            list.textContent = "";
        } else {
            result.textContent = "";
            h3.textContent = "";
            h4.textContent = "";
            para.textContent = "";
        }
    }

    function sanitize(string) {
        const map = {
            '&': '&amp;',
            '<': '&lt;',
            '>': '&gt;',
            '"': '&quot;',
            "'": '&#x27;',
            "/": '&#x2F;',
        };
        const reg = /[&<>"'/]/ig;
        return string.replace(reg, match => map[match]);
    }
});