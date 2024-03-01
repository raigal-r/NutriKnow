import Header from "./llama/header";
import ChatSection from "./llama/chat-section";

export default function LLamaChatPage() {
  return (
    <main className="flex min-h-screen flex-col items-center gap-10 p-24 background-gradient">
      <Header />
      <ChatSection />
    </main>
  );
}
