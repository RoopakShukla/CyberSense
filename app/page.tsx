import Hero from "@/components/Hero";
import TextBar from "@/components/TextBar";

const App = () => {
  return (
    <main className="flex flex-col items-center flex-1 justify-between">
      <div className="flex flex-col flex-1">
        <div className="flex flex-col flex-1 justify-center">
          <Hero />
        </div>
      </div>
      <div className="w-full flex flex-col items-center">
        <TextBar />
        <p className="pb-4 text-xs text-gray-300 font-inter">
          Powered by Gemini. It may display inaccurate info, so double-check its
          responses.
        </p>
      </div>
    </main>
  );
};

export default App;
