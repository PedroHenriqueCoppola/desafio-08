export class Router {
    routes = {};

    add(routeName, page) {
        this.routes[routeName] = page;
    }

    route(event) {
        event = event || window.event;
        event.preventDefault();

        window.history.pushState({}, "", event.target.href);

        this.handle();
    }

    handle() {
        const { pathname } = window.location;
        const route = this.routes[pathname] || this.routes[404];

        const activeHeaders = document.querySelectorAll(".active");
        activeHeaders.forEach((element) => {
            element.classList.remove("active");
        });

        fetch(route)
            .then((data) => data.text())
            .then((html) => {
                document.querySelector("#app").innerHTML = html;

                if (pathname === "/") {
                    const home = document.querySelector("#home");
                    home.classList.add("active");
                } else if (pathname === "/universe") {
                    const universe = document.querySelector("#universe");
                    universe.classList.add("active");
                } else if (pathname === "/exploration") {
                    const exploration = document.querySelector("#exploration");
                    exploration.classList.add("active");
                }
            });
    }
}

window.addEventListener("load", () => {
    router.handle();
});
