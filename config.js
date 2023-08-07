const config = {
  title: 'Sacramento campaign cash',
  bodies: [
    {
      body: "sac-city",
      name: "City Council",
      legislators: [{
        name: "Darrell Steinberg",
        title: "Mayor",
        committees: ["1396270", "1380886", "1388020", "1426136", "1237420"],
      }, {
        name: "Lisa Kaplin",
        title: "City Council, District 1",
        committees: ["1442529"],
      },
      {
        name: "Sean Loloee",
        title: "City Council, District 2",
        committees: ["1419806", "1441736"],
      }, {
        name: "Karina Talamantes",
        title: "City Council, District 3",
        committees: ["1443537"],
      },
      {
        name: "Katie Valenzuela",
        title: "City Council, District 4",
        committees: ["1416339", "1426389"],
      }, {
        name: "Caity Maple",
        title: "City Council, District 5",
        committees: ["1435034"],
      },
      {
        name: "Eric Guerra",
        title: "City Council, District 6",
        committees: ["1374232", "1368754", "1376768", "1396274", "1431012"],
      }, {
        name: "Rick Jennings",
        title: "City Council, District 7",
        committees: ["1359899", "1367862", "1443348"],
      }, {
        name: "Mai Vang",
        title: "City Council, District 8",
        committees: ["1381818", "1435334", "1420665"],
      }],
      vendorId: "SAC",
    },
    {    
      body: "sac-county",
      legislators: [{
        name: "Phil Sterna",
        title: "Supervisor, District 1",
        committees: ["1334082", "1374881", "1422227"],
      }, {
        name: "Patrick Kennedy",
        title: "Supervisor, District 2",
        committees: ["1369509", "1409487", "1456505"],
      }, {
        name: "Rich Desmond",
        title: "Supervisor, District 3",
        committees: ["1419486"],
      }, {
        name: "Sue Frost",
        title: "Supervisor, District 4",
        committees: ["1380596"],
      }, {
        name: "Pat Hume",
        title: "Supervisor, District 5",
        committees: ["1438939"],
      }],
      name: "Board of Supervisors",
      vendorId: "SCO", 
    },
  ],
};

export default config