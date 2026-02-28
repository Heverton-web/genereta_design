import React, { useState, useRef, useEffect } from 'react';
import { Palette, Image as ImageIcon, Type, LayoutGrid, Lightbulb, Download, Code, Sparkles, ChevronRight, Sliders, Layers, MonitorPlay } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

type Tab = 'branding' | 'elementos' | 'informacoes' | 'diagramacao' | 'referencias';

interface DesignState {
  primaryColor: string;
  secondaryColor: string;
  fontFamily: string;
  implantImage: string;
  sharpness: number;
  blur: number;
  title: string;
  subtitle: string;
  ctaText: string;
  leftMargin: number;
  rightWidth: number;
  rimLight: boolean;
  coldBalance: boolean;
}

export default function App() {
  const [activeTab, setActiveTab] = useState<Tab>('branding');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedLog, setGeneratedLog] = useState<string | null>(null);
  
  const [design, setDesign] = useState<DesignState>({
    primaryColor: '#0a192f', // Azul Marinho
    secondaryColor: '#d4af37', // Dourado
    fontFamily: 'Montserrat',
    implantImage: '', // Placeholder
    sharpness: 60,
    blur: 15,
    title: 'PRECISÃO EM CADA DETALHE',
    subtitle: 'A evolução da implantodontia com a tecnologia Conexão Implantes.',
    ctaText: 'CONHEÇA A LINHA',
    leftMargin: 15,
    rightWidth: 60,
    rimLight: true,
    coldBalance: true,
  });

  const handleGenerate = () => {
    setIsGenerating(true);
    setGeneratedLog(null);
    
    setTimeout(() => {
      const width = 1080;
      const height = 1080;
      const leftMarginPx = Math.round((design.leftMargin / 100) * width);
      const rightWidthPx = Math.round((design.rightWidth / 100) * width);
      
      const log = `[SISTEMA INICIADO] Renderização Paramétrica - Conexão Implantes
================================================================
Resolução do Canvas: ${width}x${height}px (1:1)
Grid: 12 Colunas (Gutter: 20px)

[CAMADA 1: BACKGROUND]
- Tipo: Solid Fill
- Cor: ${design.primaryColor}
- Efeito: ${design.coldBalance ? 'Color Balance (Cold) - Cyan +10, Blue +15' : 'Nenhum'}
- Posição: x: 0, y: 0, w: ${width}, h: ${height}

[CAMADA 2: PRODUTO (IMPLANTE)]
- Source: ${design.implantImage.substring(0, 30)}...
- Filtros Aplicados: 
  * High Pass (Nitidez): ${design.sharpness}%
  * Field Blur (Profundidade): ${design.blur}px
  * Rim Light: ${design.rimLight ? 'Ativo (Angle: 135°, Opacity: 80%)' : 'Inativo'}
- Posição Matemática: 
  * x: ${width - rightWidthPx} (Alinhado à direita, ocupando ${design.rightWidth}%)
  * y: ${Math.round(height * 0.1)}
  * w: ${rightWidthPx}
  * h: ${Math.round(height * 0.8)}
  * Z-Index: 10

[CAMADA 3: INFORMAÇÕES (TEXTO)]
- Fonte Primária: ${design.fontFamily}
- Margem de Segurança: ${design.leftMargin}% (${leftMarginPx}px)
- Bloco de Texto:
  * Título: "${design.title}" (Weight: Bold, Size: 64px, Color: #FFFFFF)
    > Posição: x: ${leftMarginPx}, y: ${Math.round(height * 0.4)}
  * Subtítulo: "${design.subtitle}" (Weight: Light, Size: 32px, Color: rgba(255,255,255,0.8))
    > Posição: x: ${leftMarginPx}, y: ${Math.round(height * 0.4 + 80)}
  * CTA: "${design.ctaText}" (Style: Outline, Border: 2px solid ${design.secondaryColor})
    > Posição: x: ${leftMarginPx}, y: ${Math.round(height * 0.4 + 200)}, w: 280, h: 60
  * Z-Index: 20

[RENDERIZAÇÃO CONCLUÍDA] Tempo: 245ms`;
      setGeneratedLog(log);
      setIsGenerating(false);
    }, 1500);
  };

  const updateDesign = (key: keyof DesignState, value: any) => {
    setDesign(prev => ({ ...prev, [key]: value }));
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white font-sans flex flex-col overflow-hidden">
      {/* Header */}
      <header className="h-16 border-b border-white/10 flex items-center justify-between px-6 bg-[#0a0a0a] z-20">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded bg-gradient-to-br from-[#d4af37] to-[#997a15] flex items-center justify-center">
            <Layers className="w-4 h-4 text-black" />
          </div>
          <h1 className="font-semibold tracking-wide text-sm uppercase text-white/90">
            Conexão Implantes <span className="text-white/40 font-normal">| Automator</span>
          </h1>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 text-xs font-mono text-white/50">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            API CONECTADA
          </div>
          <button 
            onClick={handleGenerate}
            disabled={isGenerating}
            className="flex items-center gap-2 bg-[#d4af37] hover:bg-[#e5c158] text-black px-4 py-2 rounded text-xs font-bold tracking-wider uppercase transition-colors disabled:opacity-50"
          >
            {isGenerating ? (
              <span className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 animate-spin" /> Processando...
              </span>
            ) : (
              <span className="flex items-center gap-2">
                <MonitorPlay className="w-4 h-4" /> Gerar Arte
              </span>
            )}
          </button>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar Controls */}
        <aside className="w-80 border-r border-white/10 bg-[#0a0a0a] flex flex-col z-10">
          <div className="flex flex-col p-4 gap-2 border-b border-white/10">
            <TabButton active={activeTab === 'branding'} onClick={() => setActiveTab('branding')} icon={<Palette className="w-4 h-4" />} label="1. Branding" />
            <TabButton active={activeTab === 'elementos'} onClick={() => setActiveTab('elementos')} icon={<ImageIcon className="w-4 h-4" />} label="2. Elementos" />
            <TabButton active={activeTab === 'informacoes'} onClick={() => setActiveTab('informacoes')} icon={<Type className="w-4 h-4" />} label="3. Informações" />
            <TabButton active={activeTab === 'diagramacao'} onClick={() => setActiveTab('diagramacao')} icon={<LayoutGrid className="w-4 h-4" />} label="4. Diagramação" />
            <TabButton active={activeTab === 'referencias'} onClick={() => setActiveTab('referencias')} icon={<Lightbulb className="w-4 h-4" />} label="5. Referências" />
          </div>

          <div className="flex-1 overflow-y-auto p-6 custom-scrollbar">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="flex flex-col gap-6"
              >
                {activeTab === 'branding' && (
                  <div className="space-y-6">
                    <ControlGroup label="Cores Institucionais">
                      <div className="space-y-4">
                        <div>
                          <label className="text-xs text-white/50 uppercase tracking-wider mb-2 block">Primária (Azul Marinho)</label>
                          <div className="flex gap-3">
                            <input 
                              type="color" 
                              value={design.primaryColor} 
                              onChange={(e) => updateDesign('primaryColor', e.target.value)}
                              className="w-10 h-10 rounded cursor-pointer bg-transparent border-0 p-0"
                            />
                            <input 
                              type="text" 
                              value={design.primaryColor}
                              onChange={(e) => updateDesign('primaryColor', e.target.value)}
                              className="flex-1 bg-white/5 border border-white/10 rounded px-3 text-sm font-mono"
                            />
                          </div>
                        </div>
                        <div>
                          <label className="text-xs text-white/50 uppercase tracking-wider mb-2 block">Secundária (Dourado)</label>
                          <div className="flex gap-3">
                            <input 
                              type="color" 
                              value={design.secondaryColor} 
                              onChange={(e) => updateDesign('secondaryColor', e.target.value)}
                              className="w-10 h-10 rounded cursor-pointer bg-transparent border-0 p-0"
                            />
                            <input 
                              type="text" 
                              value={design.secondaryColor}
                              onChange={(e) => updateDesign('secondaryColor', e.target.value)}
                              className="flex-1 bg-white/5 border border-white/10 rounded px-3 text-sm font-mono"
                            />
                          </div>
                        </div>
                      </div>
                    </ControlGroup>
                    <ControlGroup label="Tipografia">
                      <select 
                        value={design.fontFamily}
                        onChange={(e) => updateDesign('fontFamily', e.target.value)}
                        className="w-full bg-white/5 border border-white/10 rounded px-3 py-2 text-sm appearance-none"
                      >
                        <option value="Montserrat">Montserrat (Padrão)</option>
                        <option value="Gotham">Gotham</option>
                        <option value="Inter">Inter</option>
                      </select>
                    </ControlGroup>
                  </div>
                )}

                {activeTab === 'elementos' && (
                  <div className="space-y-6">
                    <ControlGroup label="Produto (Implante PNG)">
                      <label className="p-4 border border-dashed border-white/20 rounded bg-white/5 text-center cursor-pointer hover:bg-white/10 transition-colors block">
                        <input 
                          type="file" 
                          accept="image/png, image/jpeg, image/webp" 
                          className="hidden" 
                          onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (file) {
                              const url = URL.createObjectURL(file);
                              updateDesign('implantImage', url);
                            }
                          }}
                        />
                        <ImageIcon className="w-6 h-6 text-white/40 mx-auto mb-2" />
                        <p className="text-xs text-white/60">Clique para fazer upload da imagem</p>
                        <p className="text-[10px] text-white/40 mt-1 font-mono">PNG com fundo transparente</p>
                      </label>
                    </ControlGroup>
                    <ControlGroup label="Filtros de Pós-Produção">
                      <div className="space-y-4">
                        <div>
                          <div className="flex justify-between mb-2">
                            <label className="text-xs text-white/50 uppercase tracking-wider">High Pass (Nitidez)</label>
                            <span className="text-xs font-mono text-[#d4af37]">{design.sharpness}%</span>
                          </div>
                          <input 
                            type="range" min="0" max="100" 
                            value={design.sharpness}
                            onChange={(e) => updateDesign('sharpness', parseInt(e.target.value))}
                            className="w-full accent-[#d4af37]"
                          />
                        </div>
                        <div>
                          <div className="flex justify-between mb-2">
                            <label className="text-xs text-white/50 uppercase tracking-wider">Field Blur (Foco)</label>
                            <span className="text-xs font-mono text-[#d4af37]">{design.blur}px</span>
                          </div>
                          <input 
                            type="range" min="0" max="50" 
                            value={design.blur}
                            onChange={(e) => updateDesign('blur', parseInt(e.target.value))}
                            className="w-full accent-[#d4af37]"
                          />
                        </div>
                      </div>
                    </ControlGroup>
                  </div>
                )}

                {activeTab === 'informacoes' && (
                  <div className="space-y-6">
                    <ControlGroup label="Conteúdo Textual">
                      <div className="space-y-4">
                        <div>
                          <label className="text-xs text-white/50 uppercase tracking-wider mb-2 block">Título (Bold)</label>
                          <textarea 
                            value={design.title}
                            onChange={(e) => updateDesign('title', e.target.value)}
                            className="w-full bg-white/5 border border-white/10 rounded px-3 py-2 text-sm min-h-[80px]"
                          />
                        </div>
                        <div>
                          <label className="text-xs text-white/50 uppercase tracking-wider mb-2 block">Subtítulo (Light)</label>
                          <textarea 
                            value={design.subtitle}
                            onChange={(e) => updateDesign('subtitle', e.target.value)}
                            className="w-full bg-white/5 border border-white/10 rounded px-3 py-2 text-sm min-h-[80px]"
                          />
                        </div>
                        <div>
                          <label className="text-xs text-white/50 uppercase tracking-wider mb-2 block">Call to Action</label>
                          <input 
                            type="text"
                            value={design.ctaText}
                            onChange={(e) => updateDesign('ctaText', e.target.value)}
                            className="w-full bg-white/5 border border-white/10 rounded px-3 py-2 text-sm"
                          />
                        </div>
                      </div>
                    </ControlGroup>
                  </div>
                )}

                {activeTab === 'diagramacao' && (
                  <div className="space-y-6">
                    <ControlGroup label="Grid de 12 Colunas">
                      <div className="space-y-4">
                        <div>
                          <div className="flex justify-between mb-2">
                            <label className="text-xs text-white/50 uppercase tracking-wider">Margem Esquerda (Info)</label>
                            <span className="text-xs font-mono text-[#d4af37]">{design.leftMargin}%</span>
                          </div>
                          <input 
                            type="range" min="5" max="30" 
                            value={design.leftMargin}
                            onChange={(e) => updateDesign('leftMargin', parseInt(e.target.value))}
                            className="w-full accent-[#d4af37]"
                          />
                        </div>
                        <div>
                          <div className="flex justify-between mb-2">
                            <label className="text-xs text-white/50 uppercase tracking-wider">Área do Produto (Direita)</label>
                            <span className="text-xs font-mono text-[#d4af37]">{design.rightWidth}%</span>
                          </div>
                          <input 
                            type="range" min="40" max="80" 
                            value={design.rightWidth}
                            onChange={(e) => updateDesign('rightWidth', parseInt(e.target.value))}
                            className="w-full accent-[#d4af37]"
                          />
                        </div>
                      </div>
                    </ControlGroup>
                    
                    <div className="p-4 bg-white/5 rounded border border-white/10">
                      <div className="flex h-8 w-full gap-1">
                        {Array.from({length: 12}).map((_, i) => (
                          <div key={i} className="flex-1 bg-white/10 rounded-sm" />
                        ))}
                      </div>
                      <p className="text-[10px] text-center text-white/40 mt-2 uppercase tracking-widest">Visualização do Grid</p>
                    </div>
                  </div>
                )}

                {activeTab === 'referencias' && (
                  <div className="space-y-6">
                    <ControlGroup label="Iluminação e Cor">
                      <div className="space-y-4">
                        <label className="flex items-center gap-3 cursor-pointer group">
                          <div className={`w-10 h-6 rounded-full transition-colors relative ${design.rimLight ? 'bg-[#d4af37]' : 'bg-white/20'}`}>
                            <div className={`absolute top-1 left-1 w-4 h-4 rounded-full bg-white transition-transform ${design.rimLight ? 'translate-x-4' : ''}`} />
                          </div>
                          <span className="text-sm text-white/80 group-hover:text-white">Rim Light (Luz de Recorte)</span>
                        </label>
                        
                        <label className="flex items-center gap-3 cursor-pointer group">
                          <div className={`w-10 h-6 rounded-full transition-colors relative ${design.coldBalance ? 'bg-[#d4af37]' : 'bg-white/20'}`}>
                            <div className={`absolute top-1 left-1 w-4 h-4 rounded-full bg-white transition-transform ${design.coldBalance ? 'translate-x-4' : ''}`} />
                          </div>
                          <span className="text-sm text-white/80 group-hover:text-white">Balanço de Branco Frio (Golden Standard)</span>
                        </label>
                      </div>
                    </ControlGroup>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </div>
        </aside>

        {/* Main Preview Area */}
        <main className="flex-1 bg-[#111] relative flex items-center justify-center p-8 overflow-hidden">
          {/* Background Grid Pattern */}
          <div className="absolute inset-0 pointer-events-none opacity-20" 
               style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
          
          <div className="w-full max-w-5xl flex gap-8 h-full">
            {/* Live Preview Canvas */}
            <div className="flex-1 flex flex-col">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-sm font-semibold uppercase tracking-widest text-white/60 flex items-center gap-2">
                  <MonitorPlay className="w-4 h-4" /> Live Preview
                </h2>
                <div className="text-xs font-mono text-white/40">1080 x 1080px</div>
              </div>
              
              <div className="flex-1 relative rounded-xl overflow-hidden shadow-2xl border border-white/10 bg-black flex items-center justify-center">
                {/* The actual generated art representation */}
                <div 
                  className="relative w-full aspect-square max-h-full max-w-full shadow-2xl overflow-hidden transition-all duration-500"
                  style={{ 
                    backgroundColor: design.primaryColor,
                    fontFamily: design.fontFamily,
                    filter: design.coldBalance ? 'contrast(1.05) saturate(0.9) hue-rotate(-5deg)' : 'none'
                  }}
                >
                  {/* Background effects */}
                  <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent mix-blend-overlay" />
                  
                  {/* Product Image Area */}
                  <div 
                    className="absolute top-0 bottom-0 right-0 flex items-center justify-center transition-all duration-500"
                    style={{ width: `${design.rightWidth}%` }}
                  >
                    <div className="relative w-full h-[80%] flex items-center justify-center">
                      {/* Rim Light Effect */}
                      {design.rimLight && (
                        <div className="absolute inset-0 bg-gradient-to-l from-white/20 to-transparent mix-blend-screen rounded-full blur-3xl opacity-50 transform translate-x-10" />
                      )}
                      
                      {/* Product Image */}
                      {design.implantImage ? (
                        <img 
                          src={design.implantImage} 
                          alt="Produto" 
                          className="max-h-full max-w-full object-contain relative z-10"
                          style={{
                            filter: `drop-shadow(0 20px 30px rgba(0,0,0,0.5)) contrast(${100 + design.sharpness * 0.5}%) blur(${design.blur * 0.1}px)`
                          }}
                          referrerPolicy="no-referrer"
                        />
                      ) : (
                        <div 
                          className="w-32 h-96 bg-gradient-to-b from-gray-300 via-gray-400 to-gray-600 rounded-full shadow-2xl relative z-10"
                          style={{
                            filter: `drop-shadow(0 20px 30px rgba(0,0,0,0.5)) contrast(${100 + design.sharpness * 0.5}%) blur(${design.blur * 0.1}px)`
                          }}
                        >
                          {/* Metallic details */}
                          <div className="absolute inset-x-0 top-10 bottom-10 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0IiBoZWlnaHQ9IjQiPgo8cmVjdCB3aWR0aD0iNCIgaGVpZ2h0PSI0IiBmaWxsPSIjZmZmIiBmaWxsLW9wYWNpdHk9IjAuMSIvPgo8L3N2Zz4=')] opacity-30 mix-blend-overlay" />
                          {Array.from({length: 15}).map((_, i) => (
                            <div key={i} className="absolute left-0 right-0 h-1 bg-black/20" style={{ top: `${15 + i * 5}%` }} />
                          ))}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Information Area */}
                  <div 
                    className="absolute top-0 bottom-0 left-0 flex flex-col justify-center z-20 transition-all duration-500"
                    style={{ 
                      paddingLeft: `${design.leftMargin}%`,
                      width: `${100 - design.rightWidth + 20}%` // Overlap slightly
                    }}
                  >
                    <motion.h1 
                      layout
                      className="text-5xl lg:text-6xl font-bold leading-tight text-white mb-6"
                      style={{ textShadow: '0 10px 30px rgba(0,0,0,0.5)' }}
                    >
                      {design.title}
                    </motion.h1>
                    <motion.p 
                      layout
                      className="text-xl lg:text-2xl font-light text-white/80 mb-10 max-w-md leading-relaxed"
                    >
                      {design.subtitle}
                    </motion.p>
                    <motion.button 
                      layout
                      className="self-start px-8 py-4 uppercase tracking-widest text-sm font-semibold transition-all hover:bg-white/5"
                      style={{ 
                        border: `2px solid ${design.secondaryColor}`,
                        color: design.secondaryColor
                      }}
                    >
                      {design.ctaText}
                    </motion.button>
                  </div>
                </div>
              </div>
            </div>

            {/* Output Log Area */}
            <div className="w-80 flex flex-col">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-sm font-semibold uppercase tracking-widest text-white/60 flex items-center gap-2">
                  <Code className="w-4 h-4" /> Output Matemático
                </h2>
              </div>
              <div className="flex-1 bg-[#0a0a0a] border border-white/10 rounded-xl p-4 overflow-y-auto custom-scrollbar relative">
                {!generatedLog && !isGenerating && (
                  <div className="absolute inset-0 flex flex-col items-center justify-center text-white/30 p-6 text-center">
                    <Code className="w-8 h-8 mb-3 opacity-50" />
                    <p className="text-sm">Clique em "Gerar Arte" para calcular as posições e renderizar o output matemático.</p>
                  </div>
                )}
                {isGenerating && (
                  <div className="absolute inset-0 flex flex-col items-center justify-center text-[#d4af37] p-6 text-center">
                    <Sparkles className="w-8 h-8 mb-3 animate-pulse" />
                    <p className="text-sm font-mono animate-pulse">Calculando matrizes e filtros...</p>
                  </div>
                )}
                {generatedLog && !isGenerating && (
                  <pre className="text-[10px] font-mono text-emerald-400 whitespace-pre-wrap leading-relaxed">
                    {generatedLog}
                  </pre>
                )}
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

function TabButton({ active, onClick, icon, label }: { active: boolean, onClick: () => void, icon: React.ReactNode, label: string }) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all ${
        active 
          ? 'bg-white/10 text-white border border-white/10 shadow-lg' 
          : 'text-white/50 hover:bg-white/5 hover:text-white/80'
      }`}
    >
      {icon}
      {label}
      {active && <ChevronRight className="w-4 h-4 ml-auto opacity-50" />}
    </button>
  );
}

function ControlGroup({ label, children }: { label: string, children: React.ReactNode }) {
  return (
    <div className="space-y-4">
      <h3 className="text-sm font-semibold text-white/90 flex items-center gap-2 border-b border-white/10 pb-2">
        <Sliders className="w-4 h-4 text-[#d4af37]" />
        {label}
      </h3>
      {children}
    </div>
  );
}
