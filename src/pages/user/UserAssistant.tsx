import { useState, useRef, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { MessageCircle, Send, Loader2, Sparkles, MapPin, Recycle, Trash2, Leaf } from "lucide-react";

type Message = { role: "user" | "assistant"; content: string };

const quickPrompts = [
  { icon: MapPin, label: "Find nearest toilet", prompt: "Where is the nearest public toilet from my location?" },
  { icon: Recycle, label: "Waste segregation tips", prompt: "How should I segregate household waste properly?" },
  { icon: Trash2, label: "E-waste disposal", prompt: "Where can I dispose of e-waste in Madurai?" },
  { icon: Leaf, label: "Composting guide", prompt: "How can I start composting at home?" },
];

const mockResponses: Record<string, string> = {
  toilet: "The nearest public toilet is at Meenakshi Temple entrance, approximately 0.3 km from your location. It's rated 4.2 stars and currently open. Facilities include accessible stalls and handwash stations.",
  segregate: "Here's how to segregate your household waste:\n\n🟢 **Green bin** - Wet waste (food scraps, vegetable peels)\n🔵 **Blue bin** - Dry recyclables (paper, plastic, metal)\n🔴 **Red bin** - Hazardous waste (batteries, medicines)\n\nRemember: Rinse containers before disposal and flatten cardboard boxes.",
  ewaste: "E-waste collection points in Madurai:\n\n1. **Municipal Collection Center** - KK Nagar, Monday-Saturday 9AM-5PM\n2. **Kabadiwala Connect** - Schedule pickup via their app\n3. **Corporate drop-off** - Various electronic stores accept old devices\n\nNever dispose of electronics in regular bins!",
  compost: "Starting home composting is easy:\n\n1. Get a compost bin or designate a corner in your garden\n2. Layer green waste (food scraps) with brown waste (dry leaves)\n3. Turn the pile weekly for aeration\n4. Keep it moist but not wet\n5. Ready compost in 2-3 months!\n\nAvoid: meat, dairy, and oily foods.",
};

const UserAssistant = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content: "Vanakkam! I'm your Clean Madurai AI assistant. I can help you find nearby facilities, learn about waste segregation, and get civic information. How can I assist you today?",
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const getResponse = (query: string): string => {
    const lower = query.toLowerCase();
    if (lower.includes("toilet") || lower.includes("restroom") || lower.includes("bathroom")) {
      return mockResponses.toilet;
    }
    if (lower.includes("segregat") || lower.includes("separate") || lower.includes("sort")) {
      return mockResponses.segregate;
    }
    if (lower.includes("e-waste") || lower.includes("electronic") || lower.includes("ewaste")) {
      return mockResponses.ewaste;
    }
    if (lower.includes("compost") || lower.includes("organic")) {
      return mockResponses.compost;
    }
    return "I can help you with:\n• Finding nearby toilets and bins\n• Waste segregation guidelines\n• E-waste disposal locations\n• Composting tips\n• Reporting civic issues\n\nPlease ask about any of these topics!";
  };

  const sendMessage = async (text: string) => {
    if (!text.trim() || isLoading) return;

    const userMsg: Message = { role: "user", content: text.trim() };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setIsLoading(true);

    // Simulate AI response delay
    await new Promise((resolve) => setTimeout(resolve, 1000));

    const response = getResponse(text);
    setMessages((prev) => [...prev, { role: "assistant", content: response }]);
    setIsLoading(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sendMessage(input);
  };

  return (
    <div className="p-6 lg:p-8">
      <div className="mx-auto max-w-3xl">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-foreground">AI Assistant</h1>
          <p className="text-muted-foreground">
            Get instant help with civic queries, waste management, and local facilities.
          </p>
        </div>

        {/* Quick Prompts */}
        <div className="mb-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {quickPrompts.map((item) => (
            <Button
              key={item.label}
              variant="outline"
              className="h-auto flex-col gap-2 p-4"
              onClick={() => sendMessage(item.prompt)}
              disabled={isLoading}
            >
              <item.icon className="h-5 w-5 text-primary" />
              <span className="text-xs">{item.label}</span>
            </Button>
          ))}
        </div>

        {/* Chat Card */}
        <Card>
          <CardHeader className="bg-primary/5 border-b">
            <div className="flex items-center gap-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary">
                <Sparkles className="h-5 w-5 text-primary-foreground" />
              </div>
              <div>
                <CardTitle className="text-base">Clean Madurai Assistant</CardTitle>
                <CardDescription>Powered by AI</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            {/* Messages */}
            <ScrollArea className="h-96 p-4" ref={scrollRef}>
              <div className="space-y-4">
                {messages.map((msg, i) => (
                  <div
                    key={i}
                    className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                  >
                    <div
                      className={`max-w-[85%] rounded-lg px-4 py-3 text-sm ${
                        msg.role === "user"
                          ? "bg-primary text-primary-foreground"
                          : "bg-muted text-foreground"
                      }`}
                    >
                      <div className="whitespace-pre-wrap">{msg.content}</div>
                    </div>
                  </div>
                ))}
                {isLoading && (
                  <div className="flex justify-start">
                    <div className="flex items-center gap-2 rounded-lg bg-muted px-4 py-3">
                      <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />
                      <span className="text-sm text-muted-foreground">Thinking...</span>
                    </div>
                  </div>
                )}
              </div>
            </ScrollArea>

            {/* Input */}
            <form onSubmit={handleSubmit} className="flex gap-2 border-t p-4">
              <Input
                placeholder="Ask about toilets, bins, waste segregation..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                disabled={isLoading}
              />
              <Button type="submit" size="icon" disabled={!input.trim() || isLoading}>
                <Send className="h-4 w-4" />
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default UserAssistant;
