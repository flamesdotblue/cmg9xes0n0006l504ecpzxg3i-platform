import React, { useMemo, useState } from 'react';
import { Network, Wrench, Monitor, Code, Play, Save, Shield, AlertTriangle, Plus, Search, ChevronRight, Clock } from 'lucide-react';

function SectionHeader({ title, subtitle, icon: Icon }) {
  return (
    <div className="flex items-center justify-between mb-4">
      <div className="flex items-center gap-3">
        <div className="h-9 w-9 rounded-md bg-white/5 flex items-center justify-center">
          <Icon className="h-5 w-5 text-blue-400" />
        </div>
        <div>
          <h2 className="text-lg font-semibold text-white">{title}</h2>
          {subtitle && <p className="text-sm text-gray-400">{subtitle}</p>}
        </div>
      </div>
      <div className="text-xs text-gray-500">Dark-native • Minimal • Responsive</div>
    </div>
  );
}

export default function ModuleTabs() {
  const tabs = [
    { key: 'studio', label: 'Agent Studio', icon: Wrench },
    { key: 'weaver', label: 'Team Weaver', icon: Network },
    { key: 'tools', label: 'Tool Chest', icon: Shield },
    { key: 'ops', label: 'Operations Center', icon: Monitor },
    { key: 'ahl', label: 'AHL Workbench', icon: Code },
  ];
  const [active, setActive] = useState('studio');

  return (
    <div className="w-full">
      <div className="flex items-center gap-2 overflow-x-auto no-scrollbar border-b border-white/10">
        {tabs.map(({ key, label, icon: Icon }) => (
          <button
            key={key}
            onClick={() => setActive(key)}
            className={`relative whitespace-nowrap px-4 py-3 text-sm transition border-b-2 -mb-[1px] ${
              active === key
                ? 'text-white border-blue-500'
                : 'text-gray-400 hover:text-gray-200 border-transparent hover:border-white/20'
            }`}
          >
            <span className="inline-flex items-center gap-2">
              <Icon className="h-4 w-4" />
              {label}
            </span>
          </button>
        ))}
      </div>

      <div className="mt-6 grid grid-cols-1 lg:grid-cols-12 gap-6">
        {active === 'studio' && <AgentStudio />}
        {active === 'weaver' && <TeamWeaver />}
        {active === 'tools' && <ToolChest />}
        {active === 'ops' && <OperationsCenter />}
        {active === 'ahl' && <AHLWorkbench />}
      </div>
    </div>
  );
}

function AgentStudio() {
  const [form, setForm] = useState({
    name: 'Planner_Agent',
    capabilities: ['planning', 'analysis'],
    model: 'gpt-4',
    max_tokens: 1024,
    system_prompt: 'You are a precise, methodical planner that decomposes tasks.'
  });
  const [allTools] = useState([
    { name: 'web_search', desc: 'Search the web for up-to-date information.' },
    { name: 'code_exec', desc: 'Execute Python code in a sandboxed environment.' },
    { name: 'db_query', desc: 'Run read-only SQL queries against the project DB.' },
  ]);
  const [selectedTools, setSelectedTools] = useState(['web_search']);

  function toggleTool(toolName) {
    setSelectedTools(prev => prev.includes(toolName) ? prev.filter(t => t !== toolName) : [...prev, toolName]);
  }

  return (
    <div className="lg:col-span-12 grid grid-cols-1 lg:grid-cols-12 gap-6">
      <div className="lg:col-span-7 bg-white/5 border border-white/10 rounded-xl p-5">
        <SectionHeader title="Agent Studio" subtitle="Create and configure an IntelligentAgent" icon={Wrench} />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="text-xs text-gray-400">Name</label>
            <input
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="mt-1 w-full rounded-md bg-black/40 border border-white/10 px-3 py-2 text-sm text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="text-xs text-gray-400">Model</label>
            <select
              value={form.model}
              onChange={(e) => setForm({ ...form, model: e.target.value })}
              className="mt-1 w-full rounded-md bg-black/40 border border-white/10 px-3 py-2 text-sm text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="gpt-4">gpt-4</option>
              <option value="gpt-4o">gpt-4o</option>
              <option value="gpt-4-mini">gpt-4-mini</option>
            </select>
          </div>
          <div>
            <label className="text-xs text-gray-400">Capabilities (comma-separated)</label>
            <input
              value={form.capabilities.join(', ')}
              onChange={(e) => setForm({ ...form, capabilities: e.target.value.split(',').map(s => s.trim()).filter(Boolean) })}
              className="mt-1 w-full rounded-md bg-black/40 border border-white/10 px-3 py-2 text-sm text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="text-xs text-gray-400">Max Tokens</label>
            <input
              type="number"
              value={form.max_tokens}
              onChange={(e) => setForm({ ...form, max_tokens: Number(e.target.value || 0) })}
              className="mt-1 w-full rounded-md bg-black/40 border border-white/10 px-3 py-2 text-sm text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="sm:col-span-2">
            <label className="text-xs text-gray-400">System Prompt</label>
            <textarea
              rows={5}
              value={form.system_prompt}
              onChange={(e) => setForm({ ...form, system_prompt: e.target.value })}
              className="mt-1 w-full rounded-md bg-black/40 border border-white/10 px-3 py-2 text-sm text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
        <div className="mt-4">
          <div className="flex items-center justify-between">
            <label className="text-xs text-gray-400">Tool Integration (from Tool Chest)</label>
            <span className="text-xs text-gray-500">{selectedTools.length} selected</span>
          </div>
          <div className="mt-2 grid grid-cols-1 sm:grid-cols-2 gap-2">
            {allTools.map(t => (
              <label key={t.name} className="flex items-start gap-3 rounded-md border border-white/10 bg-black/30 p-3 hover:bg-black/40 cursor-pointer">
                <input
                  type="checkbox"
                  checked={selectedTools.includes(t.name)}
                  onChange={() => toggleTool(t.name)}
                  className="mt-1 h-4 w-4 rounded border-white/20 bg-transparent"
                />
                <div>
                  <div className="text-sm text-white">{t.name}</div>
                  <div className="text-xs text-gray-400">{t.desc}</div>
                </div>
              </label>
            ))}
          </div>
        </div>
        <div className="mt-4 flex items-center gap-3">
          <button className="inline-flex items-center gap-2 rounded-md bg-blue-600 px-4 py-2 text-sm text-white hover:bg-blue-500">
            <Save className="h-4 w-4" /> Save Agent
          </button>
          <button className="inline-flex items-center gap-2 rounded-md bg-white/5 px-4 py-2 text-sm text-gray-200 hover:bg-white/10">
            <Play className="h-4 w-4" /> Test Prompt
          </button>
        </div>
      </div>

      <div className="lg:col-span-5 bg-white/5 border border-white/10 rounded-xl p-5">
        <SectionHeader title="Constructed IntelligentAgent" subtitle="Preview of the object passed to the backend" icon={Wrench} />
        <pre className="text-xs leading-relaxed overflow-auto max-h-[420px] bg-black/40 rounded-md p-4 border border-white/5">
{JSON.stringify({
  name: form.name,
  capabilities: form.capabilities,
  model: form.model,
  max_tokens: form.max_tokens,
  system_prompt: form.system_prompt,
  tools: selectedTools,
}, null, 2)}
        </pre>
      </div>
    </div>
  );
}

function TeamWeaver() {
  const [agents] = useState(['Planner_Agent', 'Researcher_Agent', 'DevOps_Agent']);
  const [edges, setEdges] = useState([
    {
      from: 'Planner_Agent',
      to: 'Researcher_Agent',
      new_directive: 'Investigate prerequisites and gather sources.',
      required_tools: ['web_search'],
      priority: 'high',
    },
  ]);

  const workflow = useMemo(() => {
    const map = {};
    edges.forEach((e) => {
      map[e.from] = map[e.from] || {};
      map[e.from][e.to] = {
        new_directive: e.new_directive,
        required_tools: e.required_tools,
        priority: e.priority,
      };
    });
    return map;
  }, [edges]);

  const ahl = useMemo(() => {
    const lines = ['@WORKFLOW'];
    Object.entries(workflow).forEach(([from, toMap]) => {
      Object.entries(toMap).forEach(([to, cfg]) => {
        lines.push(`@HANDOFF from:${from} to:${to}`);
        lines.push(`@PRIORITY ${cfg.priority}`);
        if (cfg.required_tools?.length) lines.push(`@TOOLS ${cfg.required_tools.join(', ')}`);
        lines.push('@DIRECTIVE');
        lines.push(cfg.new_directive);
        lines.push('@END');
        lines.push('');
      });
    });
    return lines.join('\n');
  }, [workflow]);

  function addEdge() {
    setEdges((prev) => [
      ...prev,
      {
        from: agents[0],
        to: agents[1],
        new_directive: '',
        required_tools: [],
        priority: 'medium',
      },
    ]);
  }

  function updateEdge(i, patch) {
    setEdges((prev) => prev.map((e, idx) => (idx === i ? { ...e, ...patch } : e)));
  }

  return (
    <>
      <div className="lg:col-span-7 bg-white/5 border border-white/10 rounded-xl p-5">
        <SectionHeader title="Team Weaver" subtitle="Design workflows with drag-and-connect semantics" icon={Network} />
        <div className="flex items-center justify-between mb-3">
          <button onClick={addEdge} className="inline-flex items-center gap-2 rounded-md bg-white/5 px-3 py-2 text-sm text-gray-200 hover:bg-white/10">
            <Plus className="h-4 w-4" /> New Connection
          </button>
          <div className="text-xs text-gray-400">Agents available: {agents.length}</div>
        </div>
        <div className="space-y-3">
          {edges.map((e, i) => (
            <div key={i} className="rounded-lg border border-white/10 bg-black/30 p-3">
              <div className="flex flex-wrap items-center gap-2 text-sm mb-3">
                <select
                  value={e.from}
                  onChange={(ev) => updateEdge(i, { from: ev.target.value })}
                  className="rounded-md bg-black/40 border border-white/10 px-2 py-1"
                >
                  {agents.map(a => <option key={a} value={a}>{a}</option>)}
                </select>
                <ChevronRight className="h-4 w-4 text-gray-500" />
                <select
                  value={e.to}
                  onChange={(ev) => updateEdge(i, { to: ev.target.value })}
                  className="rounded-md bg-black/40 border border-white/10 px-2 py-1"
                >
                  {agents.map(a => <option key={a} value={a}>{a}</option>)}
                </select>
                <span className="ml-auto" />
                <select
                  value={e.priority}
                  onChange={(ev) => updateEdge(i, { priority: ev.target.value })}
                  className="rounded-md bg-black/40 border border-white/10 px-2 py-1"
                >
                  <option value="low">low</option>
                  <option value="medium">medium</option>
                  <option value="high">high</option>
                </select>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div>
                  <label className="text-xs text-gray-400">New Directive</label>
                  <textarea
                    rows={3}
                    value={e.new_directive}
                    onChange={(ev) => updateEdge(i, { new_directive: ev.target.value })}
                    className="mt-1 w-full rounded-md bg-black/40 border border-white/10 px-3 py-2 text-sm"
                  />
                </div>
                <div>
                  <label className="text-xs text-gray-400">Required Tools (comma-separated)</label>
                  <input
                    value={e.required_tools.join(', ')}
                    onChange={(ev) => updateEdge(i, { required_tools: ev.target.value.split(',').map(s => s.trim()).filter(Boolean) })}
                    className="mt-1 w-full rounded-md bg-black/40 border border-white/10 px-3 py-2 text-sm"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="lg:col-span-5 space-y-6">
        <div className="bg-white/5 border border-white/10 rounded-xl p-5">
          <SectionHeader title="Workflow Map" subtitle="Dictionary consumed by Orchestrator.execute_workflow()" icon={Network} />
          <pre className="text-xs leading-relaxed overflow-auto max-h-[240px] bg-black/40 rounded-md p-4 border border-white/5">{JSON.stringify(workflow, null, 2)}</pre>
        </div>
        <div className="bg-white/5 border border-white/10 rounded-xl p-5">
          <SectionHeader title="Live AHL" subtitle="Generated by create_ahl_handoff equivalent" icon={Code} />
          <pre className="text-xs leading-relaxed overflow-auto max-h-[240px] bg-black/40 rounded-md p-4 border border-white/5 whitespace-pre-wrap">{ahl}</pre>
        </div>
      </div>
    </>
  );
}

function ToolChest() {
  const [query, setQuery] = useState('');
  const [tools, setTools] = useState([
    { name: 'web_search', desc: 'Search the web for up-to-date information.', warnings: [] },
    { name: 'code_exec', desc: 'Execute Python code in a sandboxed environment.', warnings: ['Potentially dangerous: ensure sandboxing'] },
    { name: 'db_query', desc: 'Run read-only SQL queries against the project DB.', warnings: ['Watch for DROP TABLE or destructive clauses'] },
  ]);
  const [newTool, setNewTool] = useState('');

  const filtered = tools.filter(t => t.name.includes(query) || t.desc.toLowerCase().includes(query.toLowerCase()));

  function registerTool() {
    const name = newTool.trim();
    if (!name) return;
    if (tools.some(t => t.name === name)) return;
    const warnings = [];
    const lower = name.toLowerCase();
    if (/(rm\s+-rf|drop\s+table|exec\(|subprocess|os\.system)/i.test(lower)) {
      warnings.push('Safety risk: contains potentially dangerous patterns');
    }
    setTools(prev => [...prev, { name, desc: 'Custom registered tool.', warnings }]);
    setNewTool('');
  }

  return (
    <>
      <div className="lg:col-span-12 bg-white/5 border border-white/10 rounded-xl p-5">
        <SectionHeader title="Tool Chest" subtitle="Register Python functions for agents" icon={Shield} />
        <div className="flex flex-col md:flex-row md:items-center gap-3 mb-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search tools"
              className="w-full rounded-md bg-black/40 border border-white/10 pl-9 pr-3 py-2 text-sm text-gray-200"
            />
          </div>
          <div className="flex items-center gap-2">
            <input
              value={newTool}
              onChange={(e) => setNewTool(e.target.value)}
              placeholder="Function name (e.g., fetch_logs)"
              className="rounded-md bg-black/40 border border-white/10 px-3 py-2 text-sm text-gray-200"
            />
            <button onClick={registerTool} className="inline-flex items-center gap-2 rounded-md bg-blue-600 px-3 py-2 text-sm text-white hover:bg-blue-500">
              <Plus className="h-4 w-4" /> Register
            </button>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {filtered.map(t => (
            <div key={t.name} className="rounded-lg border border-white/10 bg-black/30 p-4">
              <div className="flex items-start justify-between">
                <div>
                  <div className="text-sm font-medium text-white">{t.name}</div>
                  <div className="text-xs text-gray-400">{t.desc}</div>
                </div>
                {t.warnings.length ? (
                  <AlertTriangle className="h-4 w-4 text-yellow-400" />
                ) : (
                  <Shield className="h-4 w-4 text-emerald-400" />
                )}
              </div>
              {t.warnings.length > 0 && (
                <ul className="mt-2 list-disc list-inside text-xs text-yellow-300/90 space-y-1">
                  {t.warnings.map((w, idx) => (
                    <li key={idx}>{w}</li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

function OperationsCenter() {
  const [logs] = useState([
    { ts: '00:00', entry: '@HANDOFF from:Planner_Agent to:Researcher_Agent', details: 'Planner passes research directive.' },
    { ts: '00:02', entry: '@ACK Researcher_Agent', details: 'Researcher acknowledges and begins web_search.' },
  ]);
  const [status] = useState({
    status: 'completed',
    agents_executed: 3,
    execution_time_seconds: 14,
  });

  return (
    <>
      <div className="lg:col-span-7 bg-white/5 border border-white/10 rounded-xl p-5">
        <SectionHeader title="Operations Center" subtitle="Monitor active workflows" icon={Monitor} />
        <div className="space-y-2">
          {logs.map((l, i) => (
            <details key={i} className="rounded-md border border-white/10 bg-black/30 p-3">
              <summary className="text-sm text-white cursor-pointer">[{l.ts}] {l.entry}</summary>
              <div className="mt-2 text-xs text-gray-300">{l.details}</div>
            </details>
          ))}
        </div>
      </div>
      <div className="lg:col-span-5 bg-white/5 border border-white/10 rounded-xl p-5">
        <SectionHeader title="Final Metrics" subtitle="Reported by orchestrator.execute_workflow()" icon={Clock} />
        <div className="grid grid-cols-3 gap-3 text-center">
          <div className="rounded-md bg-black/30 border border-white/10 p-4">
            <div className="text-xs text-gray-400">Status</div>
            <div className="text-base text-white font-medium">{status.status}</div>
          </div>
          <div className="rounded-md bg-black/30 border border-white/10 p-4">
            <div className="text-xs text-gray-400">Agents Executed</div>
            <div className="text-base text-white font-medium">{status.agents_executed}</div>
          </div>
          <div className="rounded-md bg-black/30 border border-white/10 p-4">
            <div className="text-xs text-gray-400">Execution Time</div>
            <div className="text-base text-white font-medium">{status.execution_time_seconds}s</div>
          </div>
        </div>
      </div>
    </>
  );
}

function AHLWorkbench() {
  const [content, setContent] = useState(`@AGENT Planner_Agent\n@TASK Decompose the problem\n@END`);

  const validation = useMemo(() => {
    const warnings = [];
    const lines = content.split('\n');
    if (!lines.some(l => l.startsWith('@AGENT'))) warnings.push('Missing @AGENT directive');
    if (!lines.some(l => l.startsWith('@TASK'))) warnings.push('Missing @TASK directive');
    if (!lines.some(l => l.startsWith('@END'))) warnings.push('Missing @END terminator');
    return { warnings, ok: warnings.length === 0 };
  }, [content]);

  return (
    <>
      <div className="lg:col-span-12 grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-7 bg-white/5 border border-white/10 rounded-xl p-5">
          <SectionHeader title="AHL Workbench" subtitle="Write and validate AHL manually" icon={Code} />
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            rows={14}
            spellCheck={false}
            className="w-full rounded-md bg-black/50 border border-white/10 px-3 py-2 text-sm text-gray-200 font-mono"
          />
          <div className="mt-3 flex items-center gap-2">
            <button className="inline-flex items-center gap-2 rounded-md bg-blue-600 px-3 py-2 text-sm text-white hover:bg-blue-500">
              <Play className="h-4 w-4" /> Validate
            </button>
            <button className="inline-flex items-center gap-2 rounded-md bg-white/5 px-3 py-2 text-sm text-gray-200 hover:bg-white/10">
              <Save className="h-4 w-4" /> Save Template
            </button>
          </div>
        </div>
        <div className="lg:col-span-5 bg-white/5 border border-white/10 rounded-xl p-5">
          <SectionHeader title="Validation" subtitle="advanced_ahl_validation() output" icon={Code} />
          {validation.ok ? (
            <div className="rounded-md border border-emerald-500/30 bg-emerald-500/10 text-emerald-200 text-sm p-3">AHL is valid.</div>
          ) : (
            <ul className="rounded-md border border-yellow-500/30 bg-yellow-500/10 text-yellow-200 text-sm p-3 list-disc list-inside">
              {validation.warnings.map((w, i) => (
                <li key={i}>{w}</li>
              ))}
            </ul>
          )}
          <div className="mt-4">
            <h3 className="text-sm font-medium text-white mb-2">Templates</h3>
            <div className="grid grid-cols-1 gap-2">
              {[
                { name: 'Planner → Researcher', tpl: '@WORKFLOW\n@HANDOFF from:Planner_Agent to:Researcher_Agent\n@PRIORITY high\n@TOOLS web_search\n@DIRECTIVE\nInvestigate topic X and summarize.\n@END' },
                { name: 'DevOps Deploy', tpl: '@AGENT DevOps_Agent\n@TASK Prepare deployment plan for service Y\n@END' },
              ].map(t => (
                <button
                  key={t.name}
                  onClick={() => setContent(t.tpl)}
                  className="text-left rounded-md border border-white/10 bg-black/30 p-3 text-sm hover:bg-black/40"
                >
                  <div className="text-white">{t.name}</div>
                  <div className="text-xs text-gray-400 line-clamp-2">{t.tpl}</div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
