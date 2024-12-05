/** @type {Config} */
const config = {
  title: "Sacramento campaign cash",
  bodies: [
    {
      body: "sac-city",
      name: "City Council",
      legislators: [
        {
          name: "Kevin McCarty",
          title: "Mayor",
          committees: [{
            id: "1460934",
            name: "MC CARTY FOR MAYOR 2024",
          }],
          // name: "Darrell Steinberg",

          // committees: [
          //   {
          //     id: "1380886",
          //     name: "STEINBERG FOR SACRAMENTO MAYOR 2016",
          //   },
          //   {
          //     id: "1388020",
          //     name: "STEINBERG FOR SACRAMENTO MAYOR 2020",
          //   },
          //   {
          //     id: "1426136",
          //     name: "STEINBERG FOR SACRAMENTO MAYOR 2024",
          //   },
          //   {
          //     id: '1396270',
          //     name: 'MAYOR DARRELL STEINBERG COMMITTEE FOR SACRAMENTO\'S FUTURE'
          //   }
          // ],
        },
        {
          name: "Lisa Kaplan",
          title: "City Council, District 1",
          committees: [{
            id: "1442529",
            name: "LISA KAPLAN FOR CITY COUNCIL 2022",
          }, {
            id: "1462636",
            name: "LISA KAPLAN FOR CITY COUNCIL 2026",
          }],
        },
        {
          name: "Roger Dickinson",
          committees: [{
            id: "1461133",
            name: "ROGER DICKINSON FOR CITY COUNCIL 2024",
          }],
          title: "City Council, District 2",
          // name: "Sean Loloee",
          // committees: [
          //   {
          //     id: "1419806",
          //     name: "SEAN LOLOEE FOR CITY COUNCIL 2020",
          //   },
          //   {
          //     id: "1441736",
          //     name: "SEAN LOLOEE FOR CITY COUNCIL 2024",
          //   },
          // ],
        },
        {
          name: "Karina Talamantes",
          title: "City Council, District 3",
          committees: [
            {
              id: "1443537",
              name: "KARINA TALAMANTES FOR CITY COUNCIL 2022",
            },
          ],
        },
        {
          name: "Phil Pluckebaum",
          title: "City Council, District 4",
          committees: [
            {
              id: "1457535",
              name: "PLUCKEBAUM FOR CITY COUNCIL 2024",
            },
            {
              id: "1468558",
              name: "PLUCKEBAUM FOR CITY COUNCIL 2028",
            },
          ],
          // name: "Katie Valenzuela",
          // title: "City Council, District 4",
          // committees: [
          //   {
          //     id: "1416339",
          //     name: "KATIE VALENZUELA FOR SACRAMENTO CITY COUNCIL 2020",
          //   },
          //   {
          //     id: "1426389",
          //     name: "KATIE VALENZUELA FOR SACRAMENTO CITY COUNCIL 2024",
          //   },
          // ],
        },
        {
          name: "Caity Maple",
          title: "City Council, District 5",
          committees: [
            {
              id: "1435034",
              name: "CAITY MAPLE FOR CITY COUNCIL 2022",
            },
            {
              id: "1458316",
              name: "CAITY MAPLE FOR CITY COUNCIL 2026",
            },
          ],
        },
        {
          name: "Eric Guerra",
          title: "City Council, District 6",
          committees: [
            {
              id: "1374232",
              name: "ERIC GUERRA FOR CITY COUNCIL 2015",
            },
            {
              id: "1368754",
              name: "ERIC GUERRA FOR CITY COUNCIL 2016",
            },
            {
              id: "1376768",
              name: "ERIC GUERRA FOR CITY COUNCIL 2016",
            },
            {
              id: "1396274",
              name: "ERIC GUERRA FOR CITY COUNCIL 2020",
            },
            {
              id: "1431012",
              name: "ERIC GUERRA FOR CITY COUNCIL 2024",
            },
          ],
        },
        {
          name: "Rick Jennings",
          title: "City Council, District 7",
          committees: [
            {
              id: "1359899",
              name: "RICK JENNINGS FOR CITY COUNCIL 2014",
            },
            {
              id: "1367862",
              name: "RICK JENNINGS FOR CITY COUNCIL 2018",
            },
            {
              id: "1443348",
              name: "RICK JENNINGS FOR CITY COUNCIL 2022",
            },
          ],
        },
        {
          name: "Mai Vang",
          title: "City Council, District 8",
          committees: [
            {
              id: "1381818",
              name: "MAI VANG FOR SCHOOL BOARD 2016",
            },
            {
              id: "1420665",
              name: "MAI VANG FOR CITY COUNCIL 2020",
            },
            {
              id: "1435334",
              name: "MAI VANG FOR CITY COUNCIL 2024",
            },
          ],
        },
      ],
      vendorId: "SAC",
    },
    {
      body: "sac-county",
      legislators: [{
        name: "Phil Sterna",
        title: "Supervisor, District 1",
        committees: [
          {
            id: "1334082",
            name: "SERNA FOR SUPERVISOR 2014",
          },
          {
            id: "1374881",
            name: "SERNA FOR SUPERVISOR 2018",
          },
          {
            id: "1422227",
            name: "SERNA FOR SUPERVISOR 2022",
          },
        ],
      }, {
        name: "Patrick Kennedy",
        title: "Supervisor, District 2",
        committees: [
          {
            id: "1369509",
            name: "PATRICK KENNEDY FOR SUPERVISOR 2018",
          },
          {
            id: "1409487",
            name: "PATRICK KENNEDY FOR SUPERVISOR 2022",
          },
          {
            id: "1456505",
            name: "PATRICK KENNEDY FOR SUPERVISOR 2026",
          },
        ],
      }, {
        name: "Rich Desmond",
        title: "Supervisor, District 3",
        committees: [{
          id: "1419486",
          name: "RICH DESMOND FOR SUPERVISOR 2020, 2024",
        }],
      }, {
        name: "Sue Frost",
        title: "Supervisor, District 4",
        committees: [{
          id: "1380596",
          name: "SUE FROST FOR SUPERVISOR 2016, 2020, 2024",
        }],
      }, {
        name: "Pat Hume",
        title: "Supervisor, District 5",
        committees: [{ id: "1438939", name: "HUME FOR SUPERVISOR 2022" }],
      }],
      name: "Board of Supervisors",
      vendorId: "SCO",
    },
  ],
  elections: [
    {
      year: 2024,
      contests: [
        {
          body: "City Council",
          district: null,
          title: "Mayor",
          candidates: [
            {
              name: "Flojuane Cofer",
              committee: {
                id: "1459882",
                name: "FLOJAUNE COFER FOR MAYOR 2024",
              },
            },
            {
              name: "Kevin McCarty",
              committee: {
                id: "1460934",
                name: "MC CARTY FOR MAYOR 2024",
              },
            },
          ],
        },
        {
          body: "City Council",
          district: 2,
          title: "City Council",
          candidates: [
            {
              name: "Roger Dickinson",
              committee: {
                id: "1461133",
                name: "ROGER DICKINSON FOR CITY COUNCIL 2024",
              },
            },
            {
              name: `Stephen Walton`,
              committee: {
                id: "1465059",
                name: `STEPHEN WALTON FOR CITY COUNCIL 2024`,
              },
            },
          ],
        },
      ],
    },
  ],
};

export default config;

/**
 * @typedef Body
 * @prop {string} body Body's ID
 * @prop {string} name Body's name
 * @prop {Legislator[]} legislators Legislators in body
 * @prop {Committee[]} committees The candidate committees controlled by the person
 */

/**
 * @typedef Candidate
 * @prop {string} name
 * @prop {Committee} committee Committee for election
 */

/**
 * @typedef Committee
 * @prop {string} id Committee FPPC ID
 * @prop {string} name Committee Name
 */

/**
 * @typedef Config
 * @prop {string} title
 * @prop {Body[]} bodies
 * @prop {Election[]} elections
 */

/**
 * @typedef Contest
 * @prop {string} body
 * @prop {number} district
 * @prop {string} title
 * @prop {Candiate[]} candidates
 */

/**
 * @typedef Election
 * @prop {number} year
 * @prop {Contest[]} contests
 */

/**
 * @typedef Legislator
 * @prop {string} name Person's name
 * @prop {string} title Person's office
 * @prop {Committee[]} committees The candidate committees controlled by the person
 */
