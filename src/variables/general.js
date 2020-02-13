import React from "react";

// ##############################
// // // data for datatables.net in DataTables view
// #############################
const searchResults = {
  successful: true,
  count: 5,
  hits: [
    {
      jobid: "00805050",
      title: "Software Engineer",
      description:
        "8 Years of IT experience Pega Robotics/Open Span Experience",
      location: "Brisbane",
      startdate: "28 Jan 2020",
      enddate: "13 Jul 2020",
      status: "open",
      careerLevelFrom: 12,
      careerLevelTo: 11,
      quadrant1: "intellection",
      quadrant2: "analytical"
    },
    {
      jobid: "00842040",
      title: "Accenture Operations - Energy Account Associate Manager",
      description:
        "Provide expertise in the planning, constructing and execution of test scripts. Apply business and functional knowledge including testing standards, guidelines, and testing methodology to meet the team's overall test objectives. Ensure all testing results are easily accessible and understandable. Track defects to closure and keep defect repository up-to-date.",
      location: "Melbourne",
      startdate: "15 Feb 2020",
      enddate: "13 Jul 2020",
      status: "open",
      careerLevelFrom: 12,
      careerLevelTo: 11,
      quadrant1: "responsibility",
      quadrant2: "communication"
    },
    {
      jobid: "00306200",
      title: "Cyber Threat Intelligence Analyst ",
      description:
        "Apply deep Cloud security skills to provide the following Security Services: design, build and protect enterprise systems, applications, data, assets and people for Accenture and our clients across multiple Cloud environments. In addition, the role may include providing services to help clients protect their information infrastructures, applications and business processes against cyber threats. ",
      location: "Sydney",
      startdate: "14 March 2020",
      enddate: "30 Aug 2021",
      status: "open",
      careerLevelFrom: 10,
      careerLevelTo: 11,
      quadrant1: "analytical",
      quadrant2: "focus"
    },
    {
      jobid: "00463960",
      title: "SuccessFactors Consultant ",
      description:
        "Analyze and design new business processes. Identify and define detailed product requirements and use cases. Serve as a liaison to the business community and participate in user and task analysis to maintain the business community's perspective.The description has been defaulted based on the Assigned Role selected; modify as needed to indicate any project specific details ",
      location: "Adelaide",
      startdate: "24 Feb 2020",
      enddate: "23 Jun 2021",
      status: "open",
      careerLevelFrom: 9,
      careerLevelTo: 10,
      quadrant1: "communication",
      quadrant2: "adaptability"
    },
    {
      jobid: "00264007",
      title: "Senior Salesforce Developer",
      description:
        "Design, build and configure applications to meet business process and application requirements.",
      location: "Melbourne",
      startdate: "3 March 2020",
      enddate: "20 Dec 2021",
      status: "open",
      careerLevelFrom: 8,
      careerLevelTo: 10,
      quadrant1: "strategic",
      quadrant2: "consistency"
    }
  ]
};

const roleList = [
  {
    title: "Software Engineer",
    location: "Brisbane",
    department: "Technology",
    requested_start_date: "28 Jan 2020",
    summary: (
      <p>
        Develop software solutions by studying information needs, conferring
        with users, and studying systems flow, data usage, and work processes.
        Handles the analysis of Robotic Process Automation opportunity within
        business processes, and develop solutions using Pega Robotics / Open
        Span to automate business tasks and processes.
      </p>
    ),
    details: (
      <div>
        <p>
          <h5>Qualifications</h5>
          <ol>
            <li>8 Years of IT experience Pega Robotics/Open Span Experience</li>
            <li>
              6 years with exposure to .Net Good to have Pega Robotics/Open Span
              Certification
            </li>
            <li>.net certification is a plus</li>
          </ol>
        </p>
      </div>
    )
  },
  {
    title: "Energy Account Associate Manager",
    location: "Brisbane",
    department: "Operation",
    requested_start_date: "15 Feb 2020",
    summary: (
      <p>
        The primary purpose of the role is to manage the delivery of the
        Accenture Energy Practise service to our customers thereby ensuring the
        retention and renewal of the customer contracts. Additionally, the role
        also requires the ability to upsell additional services where there is a
        genuine benefit for the client and the company in doing so. You will be
        required to be a “solutions provider” working closely with your
        allocated client portfolio in order to identify requirements and deliver
        appropriate solutions.
      </p>
    ),
    details: (
      <div>
        <p>
          <h5>Qualifications</h5>
          <ol>
            <li>Degree level education</li>
            <li>
              Good GCSE’s and A levels ideally including Maths and English
            </li>
            <li>A current driving license</li>
          </ol>
        </p>
      </div>
    )
  }
];

export {
  // data for StatsCard
  roleList,
  searchResults
};
