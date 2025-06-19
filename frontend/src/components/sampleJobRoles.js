import React from "react";
import sampleJobRolesData from "../data/sampleJobRolesData";

const SampleJobRoles = ({ setJobDesc }) => {
  return (
    <div className="p-6 border-t md:border-t-0 md:border-l border-cyan-800">
      <h3 className="text-lg font-semibold text-white mb-4 text-center">
        Or Select a Sample Job Role
      </h3>
      <ul className="text-sm text-gray-300 space-y-3 list-disc pl-5">
        {sampleJobRolesData.map((role) => (
          <li
            key={role.title}
            className="cursor-pointer hover:text-yellow-400 transition"
            onClick={() => setJobDesc(role.description)}
          >
            {role.title}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SampleJobRoles;
