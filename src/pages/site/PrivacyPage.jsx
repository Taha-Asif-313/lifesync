"use client";

import React from "react";

const PrivacyPage = () => {
  return (
    <div className="min-h-screen text-white p-8 max-w-7xl pt-20 mx-auto">
      <h1 className="text-4xl font-bold text-[#00ba0f] mb-6">Privacy Policy</h1>
      <p className="text-gray-300 leading-relaxed mb-4">
        We value your privacy. This page explains how we collect, use, and
        protect your data.
      </p>
      <p className="text-gray-300 leading-relaxed mb-4">
        {/* Add actual privacy content */}
      </p>
      <ul className="list-disc list-inside text-gray-400 space-y-2">
        <li>Information Collection</li>
        <li>Usage of Data</li>
        <li>Third-party Services</li>
        <li>Security Measures</li>
      </ul>
    </div>
  );
};

export default PrivacyPage;
