<script>
    import { IconBuildingSkyscraper, IconWorld } from "@tabler/icons-svelte";
    import { writable } from "svelte/store";

    const langs = [
        {
            id: "en",
            label: "English",
        },
        {
            id: "es",
            label: "Español",
        },
    ];
    const lang = writable("en");
</script>

<nav>
    <h1 class="nav-logo">Sacramento Campaign Cash</h1>
    <ul>
        <li>
            <a href="/">Home</a>
        </li>
        <li>
            <a href="/elections">Elections</a>
        </li>
        <li>
            <a href="/body/sac-city" target="_self">City Council</a>
        </li>
        <li>
            <a href="/body/sac-county" target="_self">Board of Supervisors</a>
        </li>
    </ul>
    <div class="dropdown-container">
        <!-- location toggle -->
        <div class="dropdown">
            <a href="#" class="btn dropdown-toggle" data-bs-toggle="dropdown"
                ><IconBuildingSkyscraper /> Sacramento, CA</a
            >
            <div class="dropdown-menu">
                <a class="dropdown-item" href="#">Sacramento, CA</a>
                <a class="dropdown-item disabled" href="#">Fresno, CA</a>
            </div>
        </div>
        <!-- language toggle -->
        <div class="dropdown">
            <a href="#" class="btn dropdown-toggle" data-bs-toggle="dropdown"
                ><IconWorld /> English</a
            >
            <div class="dropdown-menu">
                <a class="dropdown-item disabled" href="#">Spanish</a>
                <a class="dropdown-item" href="#">English</a>
            </div>
        </div>
    </div>
    <div class="select-container">
        <!-- <select bind:value={$lang}>
      {#each langs as l}
        <option value={l.id}>{l.label}</option>
      {/each}
    </select> -->
    </div>
</nav>

<style lang="scss">
    nav {
        // display: grid;
        // grid-template-columns: 150px 1fr 40%;
        display: flex;
        align-items: center;
        background: #fff;
        padding: 10px 40px 10px 40px;
        color: #1e1e1e;
        font-family: Inter;
        font-size: 14px;
        font-style: normal;
        font-weight: 500;
        line-height: normal;
    }
    .nav-logo {
        color: #1e1e1e;
        font-family: Inter;
        font-size: 16px;
        font-style: normal;
        font-weight: 700;
        line-height: normal;
    }
    .dropdown-container {
        display: flex;
        justify-content: center;
        align-items: center;
    }
    h1 {
        grid-column: 1 / 2;
        font-size: 1rem;
        line-height: 1.2rem;
        max-width: 150px;
        width: 150px;
    }
    ul {
        display: flex;
        // grid-column: 2/3;
        justify-content: left;
        align-items: center;
        list-style-type: none;
        padding: 10;
        width: 100%;
        gap: 30px;
    }
    // ideas for getting underline to appear
    // li {
    //     // padding-bottom: px;
    // }
    // li:hover {
    //     border-bottom: #1e1e1e;
    // }
    // a {
    //     padding-bottom: 10px;
    //     text-decoration: none;
    // }
    // a:hover {
    //     border-color: black;
    //     border-bottom: 5px;
    // }
    a:hover {
        color: #0054a6;
    }

    .select-container {
        display: flex;
        justify-content: flex-end;
        grid-column: 3;
    }
</style>
