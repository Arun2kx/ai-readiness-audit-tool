import React, { useState } from "react";

function App() {
  const [websiteUrl, setWebsiteUrl] = useState("");
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [issues, setIssues] = useState([]);

  const auditSets = [
    [
      "Missing FAQ section for common user questions",
      "Weak heading structure makes content harder to understand",
      "No proper metadata for search engines",
      "Low visibility in AI-based search results",
      "Content is not easy for AI tools to understand clearly"
    ],
    [
      "No clear product explanation for users",
      "Missing structured content sections",
      "Poor heading hierarchy across pages",
      "Search engines cannot understand the content easily",
      "Limited visibility in AI-generated search answers"
    ],
    [
      "No FAQ or help section available",
      "Important content is not properly organized",
      "Weak semantic structure in headings",
      "Metadata is missing on important pages",
      "Low discoverability in AI-powered search tools"
    ]
  ];

  const handleAudit = () => {
    if (websiteUrl.trim() === "") {
      alert("Please enter a website URL");
      return;
    }

    const randomScore = Math.floor(Math.random() * 31) + 60;
    const randomIssues =
      auditSets[Math.floor(Math.random() * auditSets.length)];

    setScore(randomScore);
    setIssues(randomIssues);
    setShowResult(true);
  };

  const handleReset = () => {
    setWebsiteUrl("");
    setShowResult(false);
    setScore(0);
    setIssues([]);
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#f5f7fa",
        padding: "40px",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <div
        style={{
          maxWidth: "850px",
          margin: "0 auto",
          backgroundColor: "white",
          padding: "40px",
          borderRadius: "12px",
          boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
        }}
      >
        <h1 style={{ textAlign: "center" }}>
          AI Readiness Audit Tool
        </h1>

        <p
          style={{
            textAlign: "center",
            color: "#555",
            marginBottom: "30px",
          }}
        >
          Check how well your website is visible and understandable
          for AI-based search systems.
        </p>

        <div
          style={{
            display: "flex",
            gap: "10px",
            marginBottom: "30px",
          }}
        >
          <input
            type="text"
            placeholder="Enter website URL"
            value={websiteUrl}
            onChange={(e) => {
              setWebsiteUrl(e.target.value);
              setShowResult(false);
            }}
            style={{
              flex: 1,
              padding: "14px",
              border: "1px solid #ccc",
              borderRadius: "8px",
              fontSize: "16px",
            }}
          />

          <button
            onClick={handleAudit}
            style={{
              padding: "14px 24px",
              border: "none",
              borderRadius: "8px",
              cursor: "pointer",
              fontSize: "16px",
            }}
          >
            Audit Website
          </button>
        </div>

        {showResult && (
          <div
            style={{
              marginTop: "20px",
              padding: "30px",
              borderRadius: "10px",
              backgroundColor: "#fafafa",
              border: "1px solid #eee",
            }}
          >
            <h2>Audit Result</h2>

            <h3>Website: {websiteUrl}</h3>

            <h2>AI Readiness Score: {score}/100</h2>

            <p>
              <strong>Main Issues Found:</strong>
            </p>

            <ul>
              {issues.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>

            <p>
              <strong>Suggestion:</strong> Adding FAQs, better headings,
              and proper metadata can improve visibility in AI-based
              search results.
            </p>

            <button
              onClick={handleReset}
              style={{
                marginTop: "20px",
                padding: "12px 20px",
                border: "none",
                borderRadius: "8px",
                cursor: "pointer",
                fontSize: "15px",
              }}
            >
              Start New Audit
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;