import { useState, useEffect } from "react";
import {
  LayoutDashboard, Zap, Gift, Trophy, Star, Shield, Map, BarChart2,
  Settings, Search, Bell, MessageSquare, Moon, Sun, Flame, Crown,
  Rocket, ChevronUp, ChevronDown, Lock, Check, Plus, Play, Timer,
  Coins, Users, ArrowRight, Sparkles, Target, Calendar, RefreshCw,
  Heart, Cookie, Gamepad2, TrendingUp, X, ChevronRight
} from "lucide-react";
import {
  LineChart, Line, BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, CartesianGrid
} from "recharts";

// ─── Data ─────────────────────────────────────────────────────────────────────

const xpData = [
  { day: "Mon", xp: 240 }, { day: "Tue", xp: 380 }, { day: "Wed", xp: 310 },
  { day: "Thu", xp: 520 }, { day: "Fri", xp: 410 }, { day: "Sat", xp: 680 },
  { day: "Sun", xp: 590 },
];
const weeklyActivity = [
  { week: "W1", challenges: 4, quests: 2 }, { week: "W2", challenges: 7, quests: 5 },
  { week: "W3", challenges: 5, quests: 3 }, { week: "W4", challenges: 9, quests: 7 },
];
const achievementDist = [
  { name: "Combat", value: 34, color: "#7c3aed" },
  { name: "Social", value: 22, color: "#3b82f6" },
  { name: "Exploration", value: 28, color: "#10b981" },
  { name: "Creativity", value: 16, color: "#f59e0b" },
];
const leaderboard = [
  { rank: 1, name: "Aria Chen", xp: 48200, avatar: "AC", change: 0, prev: 1 },
  { rank: 2, name: "Kai Reyes", xp: 43750, avatar: "KR", change: 1, prev: 3 },
  { rank: 3, name: "Luna Park", xp: 41100, avatar: "LP", change: -1, prev: 2 },
  { rank: 4, name: "Zara Osei", xp: 38900, avatar: "ZO", change: 2, prev: 6 },
  { rank: 5, name: "Felix Wu", xp: 35400, avatar: "FW", change: 0, prev: 5 },
  { rank: 6, name: "Nova Singh", xp: 32600, avatar: "NS", change: -2, prev: 4 },
  { rank: 7, name: "Eli Russo", xp: 29800, avatar: "ER", change: 1, prev: 8 },
  { rank: 8, name: "Sage Kim", xp: 27300, avatar: "SK", change: -1, prev: 7 },
  { rank: 9, name: "Juno Patel", xp: 24100, avatar: "JP", change: 3, prev: 12 },
  { rank: 10, name: "You", xp: 21750, avatar: "ME", change: 2, prev: 12 },
];
const badges = [
  { id: 1, name: "Speed Demon", icon: "⚡", color: "#7c3aed", rarity: "Epic", unlocked: true },
  { id: 2, name: "First Blood", icon: "🎯", color: "#ef4444", rarity: "Rare", unlocked: true },
  { id: 3, name: "Socialite", icon: "🤝", color: "#3b82f6", rarity: "Common", unlocked: true },
  { id: 4, name: "Night Owl", icon: "🦉", color: "#6366f1", rarity: "Uncommon", unlocked: true },
  { id: 5, name: "Centurion", icon: "🛡️", color: "#10b981", rarity: "Epic", unlocked: true },
  { id: 6, name: "Legend", icon: "👑", color: "#f59e0b", rarity: "Legendary", unlocked: false },
  { id: 7, name: "Innovator", icon: "🚀", color: "#ec4899", rarity: "Rare", unlocked: false },
  { id: 8, name: "Titan", icon: "⚔️", color: "#64748b", rarity: "Mythic", unlocked: false },
];
const challenges = [
  { id: 1, type: "Daily", title: "Complete 3 Quests", desc: "Finish any 3 active quests today", xp: 150, coins: 50, progress: 2, total: 3, time: "18:24:00", active: true },
  { id: 2, type: "Daily", title: "Invite a Friend", desc: "Send an invite to a new player", xp: 100, coins: 30, progress: 0, total: 1, time: "18:24:00", active: false },
  { id: 3, type: "Weekly", title: "XP Sprint", desc: "Earn 2,000 XP this week", xp: 500, coins: 150, progress: 1240, total: 2000, time: "3d 06:00", active: true },
  { id: 4, type: "Weekly", title: "Social Butterfly", desc: "Interact with 10 community members", xp: 300, coins: 100, progress: 7, total: 10, time: "3d 06:00", active: true },
  { id: 5, type: "Monthly", title: "Badge Collector", desc: "Unlock 5 new badges this month", xp: 1500, coins: 500, progress: 3, total: 5, time: "21d", active: true },
];
const rewards = [
  { id: 1, name: "Exclusive Avatar Frame", desc: "Rare animated border", coins: 800, featured: true, emoji: "🖼️", color: "#7c3aed" },
  { id: 2, name: "Double XP Boost", desc: "2× XP for 24 hours", coins: 400, featured: false, emoji: "⚡", color: "#3b82f6" },
  { id: 3, name: "Mystery Pet Egg", desc: "Hatch a random companion", coins: 1200, featured: true, emoji: "🥚", color: "#10b981" },
  { id: 4, name: "Custom Banner", desc: "Design your profile banner", coins: 600, featured: false, emoji: "🎨", color: "#f59e0b" },
  { id: 5, name: "Crown Title", desc: "Display the Crown prefix", coins: 2000, featured: false, emoji: "👑", color: "#ec4899" },
  { id: 6, name: "Confetti Burst", desc: "Celebration animation pack", coins: 300, featured: false, emoji: "🎉", color: "#6366f1" },
];
const navItems = [
  { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
  { id: "challenges", label: "Challenges", icon: Target },
  { id: "rewards", label: "Rewards", icon: Gift },
  { id: "leaderboard", label: "Leaderboard", icon: Trophy },
  { id: "achievements", label: "Achievements", icon: Star },
  { id: "badges", label: "Badges", icon: Shield },
  { id: "quests", label: "Quests", icon: Map },
  { id: "analytics", label: "Analytics", icon: BarChart2 },
  { id: "settings", label: "Settings", icon: Settings },
];
const rarityColors: Record<string, string> = {
  Common: "#6b7280", Uncommon: "#10b981", Rare: "#3b82f6",
  Epic: "#7c3aed", Legendary: "#f59e0b", Mythic: "#ec4899",
};
const streakDays = Array.from({ length: 28 }, (_, i) => ({
  day: i + 1,
  active: [1,2,3,5,6,7,8,10,11,12,14,15,16,17,19,20,21,22,24,25,26,27].includes(i + 1),
}));

// ─── Sub-components ────────────────────────────────────────────────────────────

function GlassCard({ children, className = "", onClick }: { children: React.ReactNode; className?: string; onClick?: () => void }) {
  return (
    <div
      onClick={onClick}
      className={`bg-white/80 backdrop-blur-md border border-white/60 shadow-[0_8px_32px_rgba(124,58,237,0.08)] rounded-2xl ${onClick ? "cursor-pointer" : ""} ${className}`}
    >
      {children}
    </div>
  );
}

function XPBar({ value, max, color = "#7c3aed" }: { value: number; max: number; color?: string }) {
  const pct = Math.min((value / max) * 100, 100);
  return (
    <div className="w-full h-2.5 bg-violet-100 rounded-full overflow-hidden">
      <div
        className="h-full rounded-full transition-all duration-700"
        style={{ width: `${pct}%`, background: `linear-gradient(90deg, ${color}, #3b82f6)` }}
      />
    </div>
  );
}

function CircularProgress({ value, max, size = 80, stroke = 8, color = "#7c3aed", children }: {
  value: number; max: number; size?: number; stroke?: number; color?: string; children?: React.ReactNode;
}) {
  const r = (size - stroke) / 2;
  const circ = 2 * Math.PI * r;
  const pct = Math.min(value / max, 1);
  return (
    <div className="relative flex items-center justify-center" style={{ width: size, height: size }}>
      <svg width={size} height={size} style={{ transform: "rotate(-90deg)" }}>
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="#ede9fe" strokeWidth={stroke} />
        <circle
          cx={size / 2} cy={size / 2} r={r} fill="none"
          stroke={color} strokeWidth={stroke} strokeLinecap="round"
          strokeDasharray={circ} strokeDashoffset={circ * (1 - pct)}
          style={{ transition: "stroke-dashoffset 0.7s ease" }}
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">{children}</div>
    </div>
  );
}

function Badge({ rarity, label }: { rarity: string; label?: string }) {
  const color = rarityColors[rarity] || "#6b7280";
  return (
    <span className="text-xs font-semibold px-2 py-0.5 rounded-full" style={{ color, background: `${color}18` }}>
      {label || rarity}
    </span>
  );
}

function Notification({ msg, onClose }: { msg: string; onClose: () => void }) {
  return (
    <div className="fixed top-6 right-6 z-50 flex items-center gap-3 bg-white/95 backdrop-blur border border-violet-200 shadow-xl rounded-2xl px-5 py-4 animate-in slide-in-from-right-8 duration-300">
      <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-500 to-blue-500 flex items-center justify-center text-white">
        <Sparkles size={18} />
      </div>
      <div>
        <p className="text-sm font-semibold text-gray-900">{msg}</p>
        <p className="text-xs text-gray-500">Achievement unlocked!</p>
      </div>
      <button onClick={onClose} className="ml-2 text-gray-400 hover:text-gray-600 transition-colors"><X size={16} /></button>
    </div>
  );
}

// ─── Pet component ─────────────────────────────────────────────────────────────

function VirtualPet({ coins, setCoins }: { coins: number; setCoins: (fn: (c: number) => number) => void }) {
  const [petMood, setPetMood] = useState<"happy" | "playing" | "eating">("happy");
  const [treats, setTreats] = useState(5);
  const [petXP, setPetXP] = useState(340);
  const [lastTreat, setLastTreat] = useState<number | null>(null);

  const feedTreat = () => {
    if (treats <= 0 || coins < 50) return;
    setTreats(t => t - 1);
    setCoins(c => c - 50);
    setPetXP(p => p + 20);
    setPetMood("eating");
    setLastTreat(Date.now());
    setTimeout(() => setPetMood("happy"), 1500);
  };
  const playGame = () => {
    if (coins < 30) return;
    setCoins(c => c - 30);
    setPetXP(p => p + 40);
    setPetMood("playing");
    setTimeout(() => setPetMood("happy"), 2000);
  };

  const petEmoji = petMood === "eating" ? "😋" : petMood === "playing" ? "🎮" : "🐣";
  return (
    <GlassCard className="p-5">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold text-gray-800 text-sm">Virtual Pet</h3>
        <span className="text-xs font-medium text-violet-600 bg-violet-50 px-2 py-1 rounded-lg">Lv. {Math.floor(petXP / 100)}</span>
      </div>
      <div className="flex flex-col items-center gap-4">
        <div
          className={`w-24 h-24 rounded-3xl flex items-center justify-center text-5xl shadow-inner transition-all duration-300 ${petMood === "playing" ? "bg-blue-50 scale-110" : petMood === "eating" ? "bg-amber-50 scale-105" : "bg-violet-50"}`}
          style={{ boxShadow: "inset 0 4px 12px rgba(124,58,237,0.1)" }}
        >
          <span style={{ filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.15))" }}>{petEmoji}</span>
        </div>
        <div className="w-full">
          <div className="flex justify-between text-xs text-gray-500 mb-1">
            <span>Pet XP</span><span>{petXP}/500</span>
          </div>
          <XPBar value={petXP} max={500} color="#10b981" />
        </div>
        <div className="grid grid-cols-2 gap-2 w-full">
          <button
            onClick={feedTreat}
            disabled={treats <= 0 || coins < 50}
            className="flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold bg-amber-50 text-amber-700 hover:bg-amber-100 transition-all disabled:opacity-40 disabled:cursor-not-allowed"
          >
            <Cookie size={14} /> Feed (50🪙)
          </button>
          <button
            onClick={playGame}
            disabled={coins < 30}
            className="flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold bg-blue-50 text-blue-700 hover:bg-blue-100 transition-all disabled:opacity-40 disabled:cursor-not-allowed"
          >
            <Gamepad2 size={14} /> Play (30🪙)
          </button>
        </div>
        <div className="flex items-center gap-1 text-xs text-gray-500">
          <Cookie size={12} className="text-amber-500" />
          <span>{treats} treats remaining</span>
        </div>
      </div>
    </GlassCard>
  );
}

// ─── Section components ────────────────────────────────────────────────────────

function DashboardSection({ coins, setCoins, setNotif }: { coins: number; setCoins: (fn: (c: number) => number) => void; setNotif: (m: string) => void }) {
  const userXP = 21750;
  const levelXP = 20000;
  const nextLevelXP = 25000;
  const level = 24;

  return (
    <div className="space-y-6">
      {/* Hero */}
      <GlassCard className="p-6 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10" style={{ background: "linear-gradient(135deg, #7c3aed 0%, #3b82f6 50%, #10b981 100%)" }} />
        <div className="relative flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-2xl">👋</span>
              <h1 className="text-2xl font-bold text-gray-900">Welcome back, Alex!</h1>
            </div>
            <p className="text-sm text-gray-500 italic mb-4">"Every expert was once a beginner. Keep going."</p>
            <div className="flex items-center gap-4 mb-4">
              <div className="flex items-center gap-2">
                <Crown size={18} className="text-amber-500" />
                <span className="text-sm font-semibold text-gray-700">Level {level} · Arcane Knight</span>
              </div>
              <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-orange-50 border border-orange-200">
                <Flame size={14} className="text-orange-500" />
                <span className="text-sm font-bold text-orange-600">27 day streak</span>
              </div>
            </div>
            <div className="mb-2">
              <div className="flex justify-between text-xs text-gray-500 mb-1.5">
                <span>Level {level}</span>
                <span>{userXP.toLocaleString()} / {nextLevelXP.toLocaleString()} XP</span>
              </div>
              <XPBar value={userXP - levelXP} max={nextLevelXP - levelXP} />
              <p className="text-xs text-gray-400 mt-1">{(nextLevelXP - userXP).toLocaleString()} XP to Level {level + 1}</p>
            </div>
          </div>
          <div className="flex flex-col gap-3 shrink-0">
            <button
              onClick={() => setNotif("Challenge continued! +50 XP")}
              className="flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold text-white shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all"
              style={{ background: "linear-gradient(135deg, #7c3aed, #3b82f6)" }}
            >
              <Play size={16} /> Continue Challenge
            </button>
            <button
              onClick={() => setNotif("Daily check-in! +100 XP")}
              className="flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold text-emerald-700 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 transition-all"
            >
              <Check size={16} /> Daily Check-in
            </button>
          </div>
        </div>
      </GlassCard>

      {/* Stats grid */}
      <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        {[
          { label: "Total XP", value: "21,750", icon: Zap, color: "#7c3aed", bg: "#f5f3ff", sub: "+580 today" },
          { label: "Current Rank", value: "#10", icon: Trophy, color: "#f59e0b", bg: "#fffbeb", sub: "↑2 this week" },
          { label: "Coins", value: coins.toLocaleString(), icon: Coins, color: "#10b981", bg: "#ecfdf5", sub: "Spendable" },
          { label: "Badges", value: "17", icon: Shield, color: "#3b82f6", bg: "#eff6ff", sub: "3 this month" },
          { label: "Completed", value: "94", icon: Check, color: "#ec4899", bg: "#fdf2f8", sub: "Challenges" },
          { label: "Weekly", value: "68%", icon: TrendingUp, color: "#6366f1", bg: "#eef2ff", sub: "Progress" },
        ].map(s => (
          <GlassCard key={s.label} className="p-4 hover:-translate-y-1 transition-transform duration-200">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-medium text-gray-500">{s.label}</span>
              <div className="w-8 h-8 rounded-xl flex items-center justify-center" style={{ background: s.bg }}>
                <s.icon size={16} style={{ color: s.color }} />
              </div>
            </div>
            <p className="text-2xl font-bold text-gray-900">{s.value}</p>
            <p className="text-xs text-gray-400 mt-1">{s.sub}</p>
          </GlassCard>
        ))}
      </div>

      {/* Main content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Challenges preview */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="font-semibold text-gray-800">Active Challenges</h2>
            <button className="text-xs font-medium text-violet-600 hover:text-violet-700 flex items-center gap-1">View all <ChevronRight size={14} /></button>
          </div>
          {challenges.filter(c => c.active).slice(0, 3).map(c => (
            <GlassCard key={c.id} className="p-4 hover:-translate-y-0.5 transition-transform duration-200">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <Badge rarity="Rare" label={c.type} />
                    <h4 className="font-semibold text-gray-900 text-sm">{c.title}</h4>
                  </div>
                  <p className="text-xs text-gray-500 mb-3">{c.desc}</p>
                  <XPBar value={c.progress} max={c.total} />
                  <div className="flex justify-between text-xs text-gray-400 mt-1">
                    <span>{typeof c.progress === "number" && c.total > 10 ? `${c.progress.toLocaleString()} / ${c.total.toLocaleString()}` : `${c.progress} / ${c.total}`}</span>
                    <span className="flex items-center gap-1"><Timer size={11} /> {c.time}</span>
                  </div>
                </div>
                <div className="text-right shrink-0">
                  <p className="text-sm font-bold text-violet-600">+{c.xp} XP</p>
                  <p className="text-xs text-amber-600">+{c.coins}🪙</p>
                  <button
                    onClick={() => setNotif(`Challenge started! ${c.title}`)}
                    className="mt-2 px-3 py-1.5 rounded-lg text-xs font-semibold text-white transition-all hover:shadow-md"
                    style={{ background: "linear-gradient(135deg, #7c3aed, #6d28d9)" }}
                  >
                    {c.progress > 0 ? "Continue" : "Start"}
                  </button>
                </div>
              </div>
            </GlassCard>
          ))}
        </div>

        {/* Right column */}
        <div className="space-y-4">
          <VirtualPet coins={coins} setCoins={setCoins} />
          {/* Quick actions */}
          <GlassCard className="p-5">
            <h3 className="font-semibold text-gray-800 text-sm mb-4">Quick Actions</h3>
            <div className="grid grid-cols-2 gap-2">
              {[
                { label: "Claim Reward", icon: Gift, color: "#7c3aed", bg: "#f5f3ff" },
                { label: "Join Challenge", icon: Target, color: "#3b82f6", bg: "#eff6ff" },
                { label: "Invite Friends", icon: Users, color: "#10b981", bg: "#ecfdf5" },
                { label: "Spin Wheel", icon: RefreshCw, color: "#f59e0b", bg: "#fffbeb" },
              ].map(a => (
                <button
                  key={a.label}
                  onClick={() => setNotif(`${a.label} activated!`)}
                  className="flex flex-col items-center gap-2 p-3 rounded-xl border border-transparent hover:border-violet-200 hover:bg-violet-50/50 transition-all text-center group"
                >
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform" style={{ background: a.bg }}>
                    <a.icon size={18} style={{ color: a.color }} />
                  </div>
                  <span className="text-xs font-medium text-gray-600">{a.label}</span>
                </button>
              ))}
            </div>
          </GlassCard>
        </div>
      </div>

      {/* Leaderboard + Badges mini */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <GlassCard className="p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-gray-800">Top Leaderboard</h3>
            <Trophy size={16} className="text-amber-500" />
          </div>
          <div className="space-y-2">
            {leaderboard.slice(0, 5).map(u => (
              <div key={u.rank} className={`flex items-center gap-3 p-2 rounded-xl transition-colors ${u.name === "You" ? "bg-violet-50 border border-violet-200" : "hover:bg-gray-50"}`}>
                <div className="w-7 text-center">
                  {u.rank === 1 ? <span className="text-lg">🥇</span> : u.rank === 2 ? <span className="text-lg">🥈</span> : u.rank === 3 ? <span className="text-lg">🥉</span> : <span className="text-sm font-bold text-gray-400">#{u.rank}</span>}
                </div>
                <div className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold text-white" style={{ background: u.name === "You" ? "linear-gradient(135deg,#7c3aed,#3b82f6)" : "linear-gradient(135deg,#6b7280,#9ca3af)" }}>
                  {u.avatar}
                </div>
                <span className="flex-1 text-sm font-medium text-gray-800">{u.name}</span>
                <span className="text-sm font-bold text-gray-700">{u.xp.toLocaleString()}</span>
                <span className={`text-xs font-semibold ${u.change > 0 ? "text-emerald-500" : u.change < 0 ? "text-red-400" : "text-gray-400"}`}>
                  {u.change > 0 ? <ChevronUp size={14} /> : u.change < 0 ? <ChevronDown size={14} /> : "—"}
                </span>
              </div>
            ))}
          </div>
        </GlassCard>

        <GlassCard className="p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-gray-800">Recent Badges</h3>
            <Shield size={16} className="text-blue-500" />
          </div>
          <div className="grid grid-cols-4 gap-3">
            {badges.filter(b => b.unlocked).map(b => (
              <div key={b.id} className="flex flex-col items-center gap-2 group cursor-pointer">
                <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl shadow-md group-hover:scale-110 transition-transform" style={{ background: `linear-gradient(135deg, ${b.color}22, ${b.color}44)`, border: `2px solid ${b.color}33` }}>
                  {b.icon}
                </div>
                <span className="text-xs font-medium text-gray-600 text-center leading-tight">{b.name}</span>
                <Badge rarity={b.rarity} />
              </div>
            ))}
          </div>
        </GlassCard>
      </div>
    </div>
  );
}

function LeaderboardSection() {
  return (
    <div className="space-y-6">
      <GlassCard className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2"><Trophy className="text-amber-500" size={22} /> Global Leaderboard</h2>
          <select className="text-sm border border-violet-200 rounded-xl px-3 py-2 bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-violet-300">
            <option>All Time</option><option>This Week</option><option>This Month</option>
          </select>
        </div>
        {/* Top 3 podium */}
        <div className="flex items-end justify-center gap-4 mb-8 pt-4">
          {[leaderboard[1], leaderboard[0], leaderboard[2]].map((u, i) => {
            const heights = ["h-28", "h-36", "h-24"];
            const crowns = ["🥈", "🥇", "🥉"];
            return (
              <div key={u.rank} className="flex flex-col items-center gap-2">
                <span className="text-2xl">{crowns[i]}</span>
                <div className="w-14 h-14 rounded-full flex items-center justify-center font-bold text-white text-sm shadow-lg" style={{ background: "linear-gradient(135deg, #7c3aed, #3b82f6)" }}>{u.avatar}</div>
                <span className="text-xs font-semibold text-gray-700">{u.name.split(" ")[0]}</span>
                <div className={`w-20 ${heights[i]} rounded-t-2xl flex items-end justify-center pb-3 text-white font-bold text-sm`} style={{ background: i === 1 ? "linear-gradient(180deg,#f59e0b,#d97706)" : i === 0 ? "linear-gradient(180deg,#9ca3af,#6b7280)" : "linear-gradient(180deg,#b45309,#92400e)" }}>
                  #{u.rank}
                </div>
              </div>
            );
          })}
        </div>
        {/* Full list */}
        <div className="space-y-2">
          {leaderboard.map(u => (
            <div key={u.rank} className={`flex items-center gap-4 p-3 rounded-2xl transition-colors ${u.name === "You" ? "bg-gradient-to-r from-violet-50 to-blue-50 border border-violet-200" : "hover:bg-gray-50/80"}`}>
              <div className="w-8 text-center font-bold text-gray-400 text-sm">#{u.rank}</div>
              <div className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold text-white shadow" style={{ background: u.name === "You" ? "linear-gradient(135deg,#7c3aed,#3b82f6)" : "linear-gradient(135deg,#9ca3af,#6b7280)" }}>{u.avatar}</div>
              <span className="flex-1 font-semibold text-gray-800">{u.name}</span>
              <div className="text-right">
                <p className="font-bold text-gray-900">{u.xp.toLocaleString()} XP</p>
              </div>
              <div className={`flex items-center text-xs font-semibold w-10 justify-end ${u.change > 0 ? "text-emerald-500" : u.change < 0 ? "text-red-400" : "text-gray-300"}`}>
                {u.change > 0 ? <><ChevronUp size={14} />{u.change}</> : u.change < 0 ? <><ChevronDown size={14} />{Math.abs(u.change)}</> : "—"}
              </div>
            </div>
          ))}
        </div>
      </GlassCard>
    </div>
  );
}

function AchievementsSection() {
  return (
    <div className="space-y-6">
      <GlassCard className="p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2"><Star className="text-amber-500" size={22} /> Achievements & Badges</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5">
          {badges.map(b => (
            <div key={b.id} className={`relative flex flex-col items-center gap-3 p-5 rounded-2xl border-2 transition-all hover:-translate-y-1 ${b.unlocked ? "bg-white border-transparent shadow-md hover:shadow-lg" : "bg-gray-50 border-dashed border-gray-200 opacity-60"}`}>
              {!b.unlocked && <div className="absolute top-3 right-3"><Lock size={14} className="text-gray-400" /></div>}
              <div className="w-16 h-16 rounded-2xl flex items-center justify-center text-3xl" style={{ background: b.unlocked ? `linear-gradient(135deg, ${b.color}22, ${b.color}44)` : "#f3f4f6", border: `2px solid ${b.unlocked ? b.color + "44" : "#e5e7eb"}` }}>
                {b.unlocked ? b.icon : "🔒"}
              </div>
              <div className="text-center">
                <p className="font-semibold text-gray-800 text-sm">{b.name}</p>
                <Badge rarity={b.rarity} />
              </div>
              {b.unlocked && <div className="flex items-center gap-1 text-xs text-emerald-600"><Check size={12} /> Unlocked</div>}
            </div>
          ))}
        </div>
      </GlassCard>
    </div>
  );
}

function ChallengesSection({ setNotif }: { setNotif: (m: string) => void }) {
  const [tab, setTab] = useState<"Daily" | "Weekly" | "Monthly">("Daily");
  const filtered = challenges.filter(c => c.type === tab);
  return (
    <div className="space-y-6">
      <GlassCard className="p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2"><Target size={22} className="text-violet-500" /> Challenges</h2>
        <div className="flex gap-2 mb-6 p-1 bg-gray-100 rounded-2xl w-fit">
          {(["Daily", "Weekly", "Monthly"] as const).map(t => (
            <button key={t} onClick={() => setTab(t)} className={`px-6 py-2 rounded-xl text-sm font-semibold transition-all ${tab === t ? "bg-white text-violet-700 shadow-sm" : "text-gray-500 hover:text-gray-700"}`}>{t}</button>
          ))}
        </div>
        <div className="space-y-4">
          {filtered.map(c => (
            <GlassCard key={c.id} className="p-5">
              <div className="flex items-start justify-between gap-6">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <h4 className="font-bold text-gray-900">{c.title}</h4>
                  </div>
                  <p className="text-sm text-gray-500 mb-4">{c.desc}</p>
                  <XPBar value={c.progress} max={c.total} />
                  <div className="flex justify-between text-xs text-gray-400 mt-1.5">
                    <span>{c.progress.toLocaleString()} / {c.total.toLocaleString()}</span>
                    <span className="flex items-center gap-1"><Timer size={11} /> {c.time} left</span>
                  </div>
                </div>
                <div className="flex flex-col items-end gap-2 shrink-0">
                  <div className="text-right">
                    <p className="font-bold text-violet-600">+{c.xp} XP</p>
                    <p className="text-sm text-amber-600">+{c.coins} 🪙</p>
                  </div>
                  <button
                    onClick={() => setNotif(`${c.title} — good luck!`)}
                    className="px-5 py-2 rounded-xl text-sm font-semibold text-white transition-all hover:shadow-lg hover:-translate-y-0.5"
                    style={{ background: "linear-gradient(135deg, #7c3aed, #6d28d9)" }}
                  >
                    {c.progress > 0 ? "Continue" : "Start"}
                  </button>
                </div>
              </div>
            </GlassCard>
          ))}
        </div>
      </GlassCard>
    </div>
  );
}

function RewardsSection({ coins, setCoins, setNotif }: { coins: number; setCoins: (fn: (c: number) => number) => void; setNotif: (m: string) => void }) {
  return (
    <div className="space-y-6">
      <GlassCard className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2"><Gift size={22} className="text-violet-500" /> Rewards Store</h2>
          <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-amber-50 border border-amber-200">
            <Coins size={16} className="text-amber-500" />
            <span className="font-bold text-amber-700">{coins.toLocaleString()} coins</span>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {rewards.map(r => (
            <GlassCard key={r.id} className={`p-5 hover:-translate-y-1 transition-transform duration-200 ${r.featured ? "ring-2 ring-violet-400 ring-offset-2" : ""}`}>
              {r.featured && <div className="flex items-center gap-1 text-xs font-bold text-violet-600 mb-3"><Sparkles size={12} /> Featured</div>}
              <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-3xl mb-4" style={{ background: `${r.color}18` }}>
                {r.emoji}
              </div>
              <h4 className="font-bold text-gray-900 mb-1">{r.name}</h4>
              <p className="text-sm text-gray-500 mb-4">{r.desc}</p>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1 font-bold text-amber-600">
                  <Coins size={15} /> {r.coins}
                </div>
                <button
                  onClick={() => { if (coins >= r.coins) { setCoins(c => c - r.coins); setNotif(`${r.name} redeemed!`); } else { setNotif("Not enough coins!"); } }}
                  className={`px-4 py-1.5 rounded-xl text-sm font-semibold transition-all ${coins >= r.coins ? "text-white hover:shadow-md hover:-translate-y-0.5" : "bg-gray-100 text-gray-400 cursor-not-allowed"}`}
                  style={coins >= r.coins ? { background: "linear-gradient(135deg, #7c3aed, #6d28d9)" } : {}}
                >
                  Redeem
                </button>
              </div>
            </GlassCard>
          ))}
        </div>
      </GlassCard>
    </div>
  );
}

function AnalyticsSection() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <GlassCard className="p-6">
          <h3 className="font-semibold text-gray-800 mb-6">XP Earned This Week</h3>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={xpData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="day" tick={{ fontSize: 12, fill: "#9ca3af" }} />
              <YAxis tick={{ fontSize: 12, fill: "#9ca3af" }} />
              <Tooltip contentStyle={{ borderRadius: 12, border: "none", boxShadow: "0 8px 32px rgba(0,0,0,0.12)" }} />
              <Line type="monotone" dataKey="xp" stroke="#7c3aed" strokeWidth={2.5} dot={{ fill: "#7c3aed", r: 5 }} activeDot={{ r: 7 }} />
            </LineChart>
          </ResponsiveContainer>
        </GlassCard>
        <GlassCard className="p-6">
          <h3 className="font-semibold text-gray-800 mb-6">Weekly Activity</h3>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={weeklyActivity}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="week" tick={{ fontSize: 12, fill: "#9ca3af" }} />
              <YAxis tick={{ fontSize: 12, fill: "#9ca3af" }} />
              <Tooltip contentStyle={{ borderRadius: 12, border: "none", boxShadow: "0 8px 32px rgba(0,0,0,0.12)" }} />
              <Bar dataKey="challenges" fill="#7c3aed" radius={[4, 4, 0, 0]} />
              <Bar dataKey="quests" fill="#3b82f6" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </GlassCard>
        <GlassCard className="p-6">
          <h3 className="font-semibold text-gray-800 mb-6">Achievement Distribution</h3>
          <div className="flex items-center gap-6">
            <ResponsiveContainer width={180} height={180}>
              <PieChart>
                <Pie data={achievementDist} cx="50%" cy="50%" innerRadius={50} outerRadius={80} dataKey="value" paddingAngle={4}>
                  {achievementDist.map((d, i) => <Cell key={i} fill={d.color} />)}
                </Pie>
                <Tooltip contentStyle={{ borderRadius: 12, border: "none" }} />
              </PieChart>
            </ResponsiveContainer>
            <div className="space-y-2 flex-1">
              {achievementDist.map(d => (
                <div key={d.name} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full" style={{ background: d.color }} />
                    <span className="text-sm text-gray-600">{d.name}</span>
                  </div>
                  <span className="font-semibold text-gray-800 text-sm">{d.value}%</span>
                </div>
              ))}
            </div>
          </div>
        </GlassCard>
        <GlassCard className="p-6">
          <h3 className="font-semibold text-gray-800 mb-6">Streak Calendar</h3>
          <div className="grid grid-cols-7 gap-1.5">
            {["M", "T", "W", "T", "F", "S", "S"].map((d, i) => (
              <div key={i} className="text-center text-xs font-semibold text-gray-400 pb-1">{d}</div>
            ))}
            {streakDays.map(d => (
              <div key={d.day} className={`aspect-square rounded-lg flex items-center justify-center text-xs font-medium transition-all ${d.active ? "text-white shadow-sm" : "bg-gray-100 text-gray-400"}`} style={d.active ? { background: "linear-gradient(135deg, #7c3aed, #6d28d9)" } : {}}>
                {d.day}
              </div>
            ))}
          </div>
        </GlassCard>
      </div>
    </div>
  );
}

// ─── Main App ──────────────────────────────────────────────────────────────────

export default function App() {
  const [activeNav, setActiveNav] = useState("dashboard");
  const [darkMode, setDarkMode] = useState(false);
  const [notif, setNotif] = useState<string | null>(null);
  const [coins, setCoins] = useState(3840);
  const [sidebarOpen, setSidebarOpen] = useState(true);

  useEffect(() => {
    if (notif) {
      const t = setTimeout(() => setNotif(null), 3000);
      return () => clearTimeout(t);
    }
  }, [notif]);

  const renderSection = () => {
    switch (activeNav) {
      case "dashboard": return <DashboardSection coins={coins} setCoins={setCoins} setNotif={setNotif} />;
      case "challenges": return <ChallengesSection setNotif={setNotif} />;
      case "rewards": return <RewardsSection coins={coins} setCoins={setCoins} setNotif={setNotif} />;
      case "leaderboard": return <LeaderboardSection />;
      case "achievements": case "badges": return <AchievementsSection />;
      case "analytics": return <AnalyticsSection />;
      default:
        return (
          <GlassCard className="p-12 flex flex-col items-center justify-center text-center">
            <div className="text-5xl mb-4">🚧</div>
            <h3 className="font-bold text-gray-800 text-lg mb-2">Coming Soon</h3>
            <p className="text-gray-500 text-sm">This section is under construction.</p>
          </GlassCard>
        );
    }
  };

  return (
    <div
      className="flex h-screen overflow-hidden font-sans"
      style={{ fontFamily: "'Inter', system-ui, sans-serif", background: "linear-gradient(135deg, #f3f2ff 0%, #eef2ff 50%, #f0fdf4 100%)" }}
    >
      {notif && <Notification msg={notif} onClose={() => setNotif(null)} />}

      {/* Sidebar */}
      <aside className={`${sidebarOpen ? "w-60" : "w-16"} flex-shrink-0 flex flex-col bg-white/70 backdrop-blur-xl border-r border-violet-100 transition-all duration-300 ease-in-out z-20`}>
        {/* Logo */}
        <div className="flex items-center gap-3 px-5 py-5 border-b border-violet-100">
          <div className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0" style={{ background: "linear-gradient(135deg, #7c3aed, #3b82f6)" }}>
            <Rocket size={18} className="text-white" />
          </div>
          {sidebarOpen && <span className="font-bold text-gray-900 text-base tracking-tight">LevelUp</span>}
        </div>

        {/* Nav */}
        <nav className="flex-1 py-4 px-2 space-y-1 overflow-y-auto">
          {navItems.map(item => {
            const active = activeNav === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveNav(item.id)}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all group ${active ? "text-violet-700 shadow-sm" : "text-gray-500 hover:text-gray-800 hover:bg-gray-50"}`}
                style={active ? { background: "linear-gradient(135deg, #ede9fe, #dbeafe)" } : {}}
                title={!sidebarOpen ? item.label : undefined}
              >
                <item.icon size={18} className={active ? "text-violet-600" : "text-gray-400 group-hover:text-gray-600"} />
                {sidebarOpen && <span>{item.label}</span>}
                {active && sidebarOpen && <div className="ml-auto w-1.5 h-1.5 rounded-full bg-violet-500" />}
              </button>
            );
          })}
        </nav>

        {/* User profile */}
        <div className={`px-3 py-4 border-t border-violet-100 flex items-center gap-3 ${!sidebarOpen ? "justify-center" : ""}`}>
          <div className="w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold text-white shrink-0" style={{ background: "linear-gradient(135deg, #7c3aed, #3b82f6)" }}>
            AJ
          </div>
          {sidebarOpen && (
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-gray-800 truncate">Alex Johnson</p>
              <p className="text-xs text-gray-400 truncate">Level 24 · Arcane Knight</p>
            </div>
          )}
        </div>
      </aside>

      {/* Main */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top nav */}
        <header className="flex items-center gap-4 px-6 py-4 bg-white/60 backdrop-blur-xl border-b border-violet-100 shrink-0">
          <button onClick={() => setSidebarOpen(o => !o)} className="w-9 h-9 rounded-xl flex items-center justify-center text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors">
            <LayoutDashboard size={18} />
          </button>

          {/* Search */}
          <div className="flex-1 max-w-md relative">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text" placeholder="Search challenges, rewards, players..."
              className="w-full pl-9 pr-4 py-2.5 rounded-xl bg-white/80 border border-violet-100 text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-violet-300 transition-all"
            />
          </div>

          <div className="flex items-center gap-2 ml-auto">
            {/* XP chip */}
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-violet-50 border border-violet-200">
              <Zap size={14} className="text-violet-500" />
              <span className="text-xs font-bold text-violet-700">21,750 XP</span>
            </div>

            <button className="relative w-9 h-9 rounded-xl flex items-center justify-center text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors">
              <Bell size={18} />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-red-500 border-2 border-white" />
            </button>
            <button className="w-9 h-9 rounded-xl flex items-center justify-center text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors">
              <MessageSquare size={18} />
            </button>
            <button onClick={() => setDarkMode(d => !d)} className="w-9 h-9 rounded-xl flex items-center justify-center text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors">
              {darkMode ? <Sun size={18} /> : <Moon size={18} />}
            </button>
            <div className="w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold text-white cursor-pointer hover:opacity-90 transition-opacity" style={{ background: "linear-gradient(135deg, #7c3aed, #3b82f6)" }}>
              AJ
            </div>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 overflow-y-auto p-6 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          <div className="max-w-[1200px] mx-auto">
            {renderSection()}
          </div>
        </main>
      </div>
    </div>
  );
}
