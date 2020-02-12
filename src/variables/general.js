import React from "react";

// ##############################
// // // data for datatables.net in DataTables view
// #############################
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
  roleList
};
