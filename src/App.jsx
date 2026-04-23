import React, { useState } from "react";

function App() {
  const [websiteUrl, setWebsiteUrl] = useState("");
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [issues, setIssues] = useState([]);
  const [suggestion, setSuggestion] = useState("");
  const [loading, setLoading] = useState(false);

  const auditSets = [
    {
      issues: [
        "Missing FAQ section for common user questions",
        "Weak heading structure makes content harder to understand",
        "No proper metadata for search engines",
        "Low visibility in AI-based search results",
        "Content is not easy for AI tools to understand clearly"
      ],
      suggestion:
        "Adding FAQs, better headings, and proper metadata can improve visibility in AI-based search results."
    },
    {
      issues: [
        "No clear product explanation for users",
        "Missing structured content sections",
        "Poor heading hierarchy across pages",
        "Search engines cannot understand the content easily",
        "Limited visibility in AI-generated search answers"
      ],
      suggestion:
        "Use clear headings, proper product descriptions, and better structured content for improved AI understanding."
    },
    {
      issues: [
        "No FAQ or help section available",
        "Important content is not properly organized",
        "Weak semantic structure in headings",
        "Metadata is missing on important pages",
        "Low discoverability in AI-powered search tools"
      ],
      suggestion:
        "Improve content organization, add FAQ sections, and use proper metadata for better discoverability."
    }
  ];

  const isValidUrl = (url) => {
    const cleanUrl = url.trim().toLowerCase();

    const urlPattern =
      /^(https?:\/\/)?(www\.)?[a-zA-Z0-9-]+\.(com|in|org|io|net)$/;

    return urlPattern.test(cleanUrl);
  };

  const generateScore = (url) => {
    let finalScore = 0;
    const cleanUrl = url.toLowerCase().trim();

    for (let i = 0; i < cleanUrl.length; i++) {
      finalScore += cleanUrl.charCodeAt(i);
    }

    finalScore = (finalScore % 36) + 60;

    if (cleanUrl.includes(".com")) {
      finalScore += 4;
    } else if (cleanUrl.includes(".in")) {
      finalScore += 3;
    } else if (cleanUrl.includes(".org")) {
      finalScore += 2;
    } else if (cleanUrl.includes(".io")) {
      finalScore += 2;
    }

    if (
      cleanUrl.includes("tech") ||
      cleanUrl.includes("ai") ||
      cleanUrl.includes("cloud")
    ) {
      finalScore += 3;
    }

    if (finalScore > 95) {
      finalScore = 95;
    }

    return finalScore;
  };

  const handleAudit = () => {
    if (websiteUrl.trim() === "") {
      alert("Please enter a website URL");
      return;
    }

    if (!isValidUrl(websiteUrl)) {
      alert("Please enter a valid website URL");
      return;
    }

    setLoading(true);
    setShowResult(false);

    setTimeout(() => {
      const calculatedScore = generateScore(websiteUrl);

      const selectedAudit =
        auditSets[Math.floor(Math.random() * auditSets.length)];

      setScore(calculatedScore);
      setIssues(selectedAudit.issues);
      setSuggestion(selectedAudit.suggestion);

      setLoading(false);
      setShowResult(true);
    }, 2000);
  };

  const handleReset = () => {
    setWebsiteUrl("");
    setShowResult(false);
    setScore(0);
    setIssues([]);
    setSuggestion("");
    setLoading(false);
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#f5f7fa",
        padding: "40px",
        fontFamily: "Arial, sans-serif"
      }}
    >
      <div
        style={{
          maxWidth: "850px",
          margin: "0 auto",
          backgroundColor: "white",
          padding: "40px",
          borderRadius: "12px",
          boxShadow: "0 4px 12px rgba(0,0,0,0.08)"
        }}
      >
        <h1 style={{ textAlign: "center" }}>
          AI Readiness Audit Tool
        </h1>

        <p
          style={{
            textAlign: "center",
            color: "#555",
            marginBottom: "30px"
          }}
        >
          Check how well your website is visible and understandable
          for AI-based search systems.
        </p>

        <div
          style={{
            display: "flex",
            gap: "10px",
            marginBottom: "30px"
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
              fontSize: "16px"
            }}
          />

          <button
            onClick={handleAudit}
            style={{
              padding: "14px 24px",
              border: "none",
              borderRadius: "8px",
              cursor: "pointer",
              fontSize: "16px"
            }}
          >
            Audit Website
          </button>
        </div>

        {loading && (
          <div
            style={{
              marginTop: "20px",
              padding: "20px",
              textAlign: "center",
              fontSize: "18px"
            }}
          >
            Analyzing website...
          </div>
        )}

        {showResult && (
          <div
            style={{
              marginTop: "20px",
              padding: "30px",
              borderRadius: "10px",
              backgroundColor: "#fafafa",
              border: "1px solid #eee"
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
              <strong>Suggestion:</strong> {suggestion}
            </p>

            <button
              onClick={handleReset}
              style={{
                marginTop: "20px",
                padding: "12px 20px",
                border: "none",
                borderRadius: "8px",
                cursor: "pointer",
                fontSize: "15px"
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