import React, { useState, useEffect } from 'react';
import { AreaChart, Area, XAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';
import { Thermometer, Activity, Gauge, Wifi } from 'lucide-react';

// --- TIPAGEM (TypeScript) ---
interface TelemetryData {
  time: string;
  temp: number;
  pot: number;
}

const App: React.FC = () => {
  // --- ESTADOS ---
  const [data, setData] = useState<TelemetryData[]>([]);
  const [currentPot, setCurrentPot] = useState<number>(0);
  const [currentTemp, setCurrentTemp] = useState<number>(0);
  const [isOnline, setIsOnline] = useState<boolean>(true);

  // --- SIMULAÇÃO DE DADOS ---
  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      const timeStr = now.toLocaleTimeString('pt-BR', { minute: '2-digit', second: '2-digit' });
      
      // Simulação (Aqui entraria a leitura do WebSocket/MQTT do ESP32)
      const simPot = Math.floor(Math.random() * 11); // 0 a 10
      const simTemp = parseFloat((28 + Math.random() * 7).toFixed(1)); // 28°C a 35°C

      setCurrentPot(simPot);
      setCurrentTemp(simTemp);
      setIsOnline(Math.random() > 0.05); // Simula oscilação de rede

      setData(prevData => {
        const newData = [...prevData, { time: timeStr, temp: simTemp, pot: simPot }];
        // Mantém histórico de 30 pontos
        if (newData.length > 30) return newData.slice(newData.length - 30);
        return newData;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  // Cores do tema
  const COLORS = {
    cyan: '#06b6d4', 
    orange: '#f97316', 
  };

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 p-4 md:p-8 font-sans flex flex-col items-center">
      
      {/* HEADER */}
      <header className="w-full max-w-5xl mb-8 flex flex-col md:flex-row justify-between items-center border-b border-slate-800 pb-6">
        <div className="mb-4 md:mb-0 text-center md:text-left">
          <h1 className="text-3xl md:text-4xl font-black tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-teal-400 uppercase">
            Poente Solares
          </h1>
          <p className="text-slate-500 text-xs font-mono uppercase tracking-[0.3em] mt-1 flex items-center gap-2 justify-center md:justify-start">
            <Activity size={14} /> Telemetria TSX v2.0
          </p>
        </div>

        {/* STATUS BADGE */}
        <div className="flex items-center gap-3 bg-slate-800/50 px-4 py-2 rounded-full border border-slate-700/50 backdrop-blur-sm">
          <div className="relative flex h-3 w-3">
            {isOnline && <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>}
            <span className={`relative inline-flex rounded-full h-3 w-3 ${isOnline ? 'bg-green-500' : 'bg-red-500'}`}></span>
          </div>
          <span className={`text-xs font-mono font-bold ${isOnline ? 'text-green-500' : 'text-red-500'}`}>
            {isOnline ? 'ONLINE' : 'OFFLINE'}
          </span>
          <Wifi size={16} className={isOnline ? 'text-green-500' : 'text-slate-600'} />
        </div>
      </header>

      {/* DASHBOARD GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-5xl">
        
        {/* === COLUNA 1: ACELERAÇÃO === */}
        <div className="flex flex-col gap-6">
          <div className="bg-slate-800 border border-slate-700 rounded-2xl p-6 shadow-2xl relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/10 rounded-full blur-3xl -mr-16 -mt-16 group-hover:bg-cyan-500/20 transition-all"></div>

            <div className="flex justify-between items-start mb-2 relative z-10">
              <div className="flex items-center gap-2 text-cyan-400">
                <Gauge size={20} />
                <h2 className="uppercase font-bold tracking-widest text-xs">Aceleração</h2>
              </div>
              <span className="text-[10px] text-slate-500 font-mono border border-slate-700 px-2 py-0.5 rounded">INPUT 0-10</span>
            </div>

            <div className="flex items-baseline gap-2 relative z-10 mt-2">
              <span className="text-7xl font-black text-white font-mono tracking-tighter drop-shadow-[0_0_15px_rgba(6,182,212,0.5)]">
                {currentPot}
              </span>
              <span className="text-xl text-slate-500 font-medium">/ 10</span>
            </div>

            <div className="w-full bg-slate-900/50 h-3 rounded-full mt-6 overflow-hidden border border-slate-700/50">
              <div 
                className="h-full bg-gradient-to-r from-cyan-700 to-cyan-400 shadow-[0_0_10px_rgba(6,182,212,0.5)] transition-all duration-300 ease-out"
                style={{ width: `${(currentPot / 10) * 100}%` }}
              />
            </div>
          </div>

          <div className="bg-slate-800/50 border border-slate-700/50 rounded-2xl p-4 h-64 shadow-lg backdrop-blur-sm">
             <div className="w-full h-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={data}>
                  <defs>
                    <linearGradient id="colorPot" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor={COLORS.cyan} stopOpacity={0.4}/>
                      <stop offset="95%" stopColor={COLORS.cyan} stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false} opacity={0.3} />
                  <XAxis dataKey="time" stroke="#64748b" fontSize={10} tickLine={false} axisLine={false} minTickGap={20} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', color: '#f1f5f9' }}
                    itemStyle={{ color: COLORS.cyan }}
                  />
                  <Area type="monotone" dataKey="pot" stroke={COLORS.cyan} strokeWidth={3} fillOpacity={1} fill="url(#colorPot)" />
                </AreaChart>
              </ResponsiveContainer>
             </div>
          </div>
        </div>

        {/* === COLUNA 2: TEMPERATURA === */}
        <div className="flex flex-col gap-6">
          <div className="bg-slate-800 border border-slate-700 rounded-2xl p-6 shadow-2xl relative overflow-hidden group">
            <div className={`absolute top-0 right-0 w-32 h-32 rounded-full blur-3xl -mr-16 -mt-16 transition-all duration-500 ${currentTemp > 32 ? 'bg-red-500/20' : 'bg-orange-500/10'}`}></div>

            <div className="flex justify-between items-start mb-2 relative z-10">
              <div className="flex items-center gap-2 text-orange-400">
                <Thermometer size={20} />
                <h2 className="uppercase font-bold tracking-widest text-xs">Temperatura</h2>
              </div>
              <span className="text-[10px] text-slate-500 font-mono border border-slate-700 px-2 py-0.5 rounded">DHT11</span>
            </div>

            <div className="flex items-baseline gap-2 relative z-10 mt-2">
              <span className={`text-7xl font-black font-mono tracking-tighter drop-shadow-[0_0_15px_rgba(249,115,22,0.5)] transition-colors duration-500 ${currentTemp > 32 ? 'text-red-500' : 'text-white'}`}>
                {currentTemp}
              </span>
              <span className="text-xl text-orange-400 font-medium">°C</span>
            </div>

             <div className="mt-6 flex items-center gap-2">
                <div className="w-full bg-slate-900/50 h-3 rounded-full overflow-hidden border border-slate-700/50 relative">
                   <div className="absolute left-[70%] top-0 bottom-0 w-0.5 bg-red-500/30 z-20"></div>
                   <div 
                    className={`h-full transition-all duration-500 ease-out shadow-[0_0_10px_rgba(249,115,22,0.5)] ${currentTemp > 32 ? 'bg-gradient-to-r from-orange-600 to-red-500' : 'bg-gradient-to-r from-orange-700 to-orange-400'}`}
                    style={{ width: `${((currentTemp - 20) / 30) * 100}%` }}
                  />
                </div>
             </div>
          </div>

          <div className="bg-slate-800/50 border border-slate-700/50 rounded-2xl p-4 h-64 shadow-lg backdrop-blur-sm">
             <div className="w-full h-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={data}>
                  <defs>
                    <linearGradient id="colorTemp" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor={COLORS.orange} stopOpacity={0.4}/>
                      <stop offset="95%" stopColor={COLORS.orange} stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false} opacity={0.3} />
                  <XAxis dataKey="time" stroke="#64748b" fontSize={10} tickLine={false} axisLine={false} minTickGap={20} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', color: '#f1f5f9' }}
                    itemStyle={{ color: COLORS.orange }}
                  />
                  <Area type="monotone" dataKey="temp" stroke={currentTemp > 32 ? '#ef4444' : COLORS.orange} strokeWidth={3} fillOpacity={1} fill="url(#colorTemp)" />
                </AreaChart>
              </ResponsiveContainer>
             </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default App;