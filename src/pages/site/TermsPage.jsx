"use client";

import React from "react";

const TermsPage = () => {
  return (
    <div className="min-h-screen text-white p-8 max-w-7xl pt-20 mx-auto">
      <h1 className="text-4xl font-bold text-[#00ba0f] mb-6">
        Terms & Conditions
      </h1>
      <p className="text-gray-300 leading-relaxed mb-4">
        By using this site, you agree to the following terms and conditions.
      </p>
      <ul className="list-disc list-inside text-gray-400 space-y-2">
        <li>Use of Service</li>
        <li>User Responsibilities</li>
        <li>Limitation of Liability</li>
        <li>Intellectual Property</li>
      </ul>
    </div>
  );
};

export default TermsPage;
