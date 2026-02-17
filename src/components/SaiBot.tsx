import { useState, useRef, useEffect } from 'react';
import { MessageSquare, X, Send, Loader2, Bot } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';

type Message = { role: 'user' | 'assistant'; text: string };

const SaiBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: 'assistant', text: "Yo! 🚀 I'm SaiBot. Ask me anything about Saiprasath's skills or PSG iTech journey! ✨" },
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;
    const userMessage = input.trim();
    setInput('');
    setMessages((prev) => [...prev, { role: 'user', text: userMessage }]);
    setIsLoading(true);

    try {
      const { data, error } = await supabase.functions.invoke('saibot-chat', {
        body: {
          messages: [...messages, { role: 'user', text: userMessage }].map((m) => ({
            role: m.role,
            content: m.text,
          })),
          mode: 'chat',
        },
      });
      if (error) throw error;
      setMessages((prev) => [...prev, { role: 'assistant', text: data?.reply || 'Thinking... try again! ⚡' }]);
    } catch {
      setMessages((prev) => [...prev, { role: 'assistant', text: 'Lag spike! 🔌 Try again? ⚡' }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Chat window */}
      <div
        className={`absolute bottom-20 right-0 w-80 sm:w-96 glass rounded-3xl overflow-hidden transition-all duration-300 ${
          isOpen ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-90 translate-y-4 pointer-events-none'
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-border/50 bg-primary/5">
          <div className="flex items-center gap-3">
            <Bot className="text-primary" size={20} />
            <span className="font-bold text-foreground text-sm">SaiBot</span>
          </div>
          <button onClick={() => setIsOpen(false)} className="text-muted-foreground hover:text-foreground hover:scale-110 transition-all p-1">
            <X size={18} />
          </button>
        </div>

        {/* Messages */}
        <div className="h-72 overflow-y-auto p-4 space-y-3">
          {messages.map((m, i) => (
            <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div
                className={`max-w-[80%] px-4 py-2.5 rounded-2xl text-sm ${
                  m.role === 'user'
                    ? 'bg-primary text-primary-foreground rounded-br-sm'
                    : 'bg-secondary text-foreground rounded-bl-sm'
                }`}
              >
                {m.text}
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex justify-start">
              <div className="bg-secondary rounded-2xl rounded-bl-sm px-4 py-3">
                <Loader2 size={16} className="animate-spin text-primary" />
              </div>
            </div>
          )}
          <div ref={chatEndRef} />
        </div>

        {/* Input */}
        <div className="p-3 border-t border-border/50 flex gap-2">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder="What's up?"
            className="flex-1 bg-secondary border border-border rounded-xl px-4 py-2 text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-primary placeholder:text-muted-foreground"
          />
          <button onClick={handleSend} disabled={isLoading} className="p-2.5 bg-primary text-primary-foreground rounded-xl hover:scale-105 transition-transform disabled:opacity-50">
            <Send size={16} />
          </button>
        </div>
      </div>

      {/* Floating button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-14 h-14 bg-primary text-primary-foreground rounded-full shadow-lg flex items-center justify-center hover:scale-110 transition-transform animate-pulse-glow"
      >
        {isOpen ? <X size={22} /> : <MessageSquare size={22} />}
      </button>
    </div>
  );
};

export default SaiBot;
