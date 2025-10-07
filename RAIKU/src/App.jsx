import React, { useState } from "react";
import "./App.css";

export default function App() {
  const [selectedPurpose, setSelectedPurpose] = useState(null);
  const [deployedAgents, setDeployedAgents] = useState([]);
  const [agentName, setAgentName] = useState("");
  const [visual, setVisual] = useState("placeholder");
  const [progress, setProgress] = useState(0);
  const [logs, setLogs] = useState([]);
  const [activity, setActivity] = useState(null);

  const purposeIcons = {
    trader: "📈",
    researcher: "🔍",
    helper: "🤝",
    creative: "🎨",
  };

    function sleep(ms) {
      return new Promise((r) => setTimeout(r, ms));
    }

    const handleDeploy = async () => {
      const name = agentName.trim();
      const purpose = selectedPurpose;
      if (!name || !purpose) return;

      const icon = purposeIcons[purpose];
      setVisual("deploying");
      setLogs([]);
      setProgress(0);

      const logSteps = [
        "> Initializing connection...",
        "> Authenticating with blockchain...",
        `> Creating identity for "${name}"...`,
        "> Allocating computational resources...",
        "> Enabling autonomy protocols...",
        `> Agent "${name}" is live on-chain! ✓`,
      ];

      for (let i = 0; i < logSteps.length; i++) {
        await sleep(800);
        setLogs((prev) => [...prev, logSteps[i]]);
        setProgress(((i + 1) / logSteps.length) * 100);
      }

      await sleep(1000);
      setVisual("active");
      const activities = [
        { text: "⚡ Fetching on-chain data...", detail: "Scanning blockchain..." },
        { text: "🔗 Collaborating with other agents...", detail: "Exchanging data..." },
        { text: "🧠 Processing and analyzing...", detail: "Running AI logic..." },
        { text: "✅ Sending verified result...", detail: "Task completed." },
      ];

      for (let a of activities) {
        setActivity(a);
        await sleep(1500);
      }

      setVisual("success");
      setDeployedAgents((prev) => [...prev, { name, purpose, icon }]);
      setAgentName("");
      setSelectedPurpose(null);
    };

    return (
      <div className="container">
        <div className="header">
          <div className="logo">⚡ RAIKU PLAYGROUND</div>
          <div className="tagline">
            Build & Deploy Autonomous AI Agents — Decentralized, Composable,
            Unstoppable
          </div>
        </div>

        <div className="playground-container">
          <div className="card">
            <div className="card-title">
              <span>🤖</span>
              <span>Create Your AI Agent</span>
            </div>

            <div className="form-group">
              <label className="label">Agent Name</label>
              <input
                type="text"
                value={agentName}
                onChange={(e) => setAgentName(e.target.value)}
                className="input"
                placeholder="e.g., Alpha, Nova, Sentinel"
                maxLength={20}
              />
            </div>

            <div className="form-group">
              <label className="label">Choose Purpose</label>
              <div className="purpose-grid">
                {Object.keys(purposeIcons).map((key) => (
                  <div
                    key={key}
                    className={`purpose-btn ${selectedPurpose === key ? "selected" : ""}`}
                    onClick={() => setSelectedPurpose(key)}
                  >
                    {purposeIcons[key]} {key.charAt(0).toUpperCase() + key.slice(1)}
                  </div>
                ))}
              </div>
            </div>

            <button
              className="deploy-btn"
              onClick={handleDeploy}
              disabled={!agentName || !selectedPurpose}
            >
              Deploy on Raiku
            </button>
          </div>

          <div className="card">
            <div className="card-title">
              <span>🌐</span>
              <span>Agent Deployment</span>
            </div>

            <div className="visualization">
              {visual === "placeholder" && (
                <div className="placeholder-text">
                  👆 Create an agent to see it come alive on the Raiku network
                </div>
              )}

              {visual === "deploying" && (
                <>
                  <div className="agent-avatar">{purposeIcons[selectedPurpose]}</div>
                  <div className="status-text">Connecting to Raiku Network...</div>
                  <div className="progress-bar">
                    <div className="progress-fill" style={{ width: `${progress}%` }} />
                  </div>
                  <div className="log-console">
                    {logs.map((line, i) => (
                      <div key={i} className="log-line">
                        {line}
                      </div>
                    ))}
                  </div>
                </>
              )}

              {visual === "active" && activity && (
                <>
                  <div className="agent-avatar">{purposeIcons[selectedPurpose]}</div>
                  <div className="status-text">Agent "{agentName || "New"}" is now active!</div>
                  <div className="agent-activity">
                    <div className="activity-text">{activity.text}</div>
                    <div className="activity-detail">{activity.detail}</div>
                  </div>
                </>
              )}

              {visual === "success" && (
                <div className="success-message">
                  <div className="success-title">🎉 Agent Live!</div>
                  <div className="success-desc">
                    Your agent <strong>"{agentName || "Unnamed"}"</strong> is now
                    live — decentralized, composable, and unstoppable.
                    <br />
                    <br />
                    <strong>This is the power of Raiku.</strong>
                  </div>
                </div>
              )}

              <div className="deployed-agents">
                {deployedAgents.length === 0 ? (
                  <div style={{ color: "#94a3b8" }}>No agents deployed yet.</div>
                ) : (
                  deployedAgents.map((a, idx) => (
                    <div className="agent-card" key={idx}>
                      <div className="agent-icon">{a.icon}</div>
                      <div className="agent-info">
                        <div className="agent-name">{a.name}</div>
                        <div className="agent-purpose">{a.purpose}</div>
                      </div>
                      <div className="agent-status">
                        <span className="status-dot" /> Active
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
