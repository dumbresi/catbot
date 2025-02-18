"use client";

import { useEffect } from "react";

{/* <script type="text/javascript">
  (function(d, t) {
      var v = d.createElement(t), s = d.getElementsByTagName(t)[0];
      v.onload = function() {
        window.voiceflow.chat.load({
          verify: { projectID: '67abb5455a29ee892ec19a97' },
          url: 'https://general-runtime.voiceflow.com',
          versionID: 'production'
        });
      }
      v.src = "https://cdn.voiceflow.com/widget-next/bundle.mjs"; v.type = "text/javascript"; s.parentNode.insertBefore(v, s);
  })(document, 'script');
</script> */}

// Extend the Window interface to recognize `voiceflow`
declare global {
  interface Window {
    voiceflow: {
      chat: {
        load: (config: { verify: { projectID: string }; url: string; versionID: string }) => void;
      };
    };
  }
}
export default function Home() {
  useEffect(() => {
    // Check if the script is already added
    if (document.getElementById("voiceflow-chatbot")) return;

    // Create the script element
    const script = document.createElement("script");
    script.id = "voiceflow-chatbot";
    script.src = "https://cdn.voiceflow.com/widget-next/bundle.mjs";
    script.type = "text/javascript";
    script.async = true;

    // On script load, initialize Voiceflow chat
    script.onload = () => {
      if (window.voiceflow) {
        window.voiceflow.chat.load({
          verify: { projectID: '67abb5455a29ee892ec19a97'}, // Replace with your actual Voiceflow Project ID
          url: "https://general-runtime.voiceflow.com",
          versionID: "production",
        });
      }
    };

    // Append to document
    document.body.appendChild(script);
  }, []);

  // ... existing code ...

  return (
    <div className="min-h-screen bg-white">
      {/* Navbar */}
      <nav className="bg-[#f56c6c] p-4">
        <div className="container mx-auto">
          <h1 className="text-white text-2xl font-bold">CatConnection</h1>
        </div>
      </nav>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-12">
        <div className="text-center">
          <h2 className="text-4xl font-bold text-gray-800 mb-8">
            Help Cats Find Their Forever Home
          </h2>
          
          

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <div className="rounded-lg overflow-hidden shadow-lg">
              <img 
                src="/res/cat1.jpg" 
                alt="Adoptable cat" 
                className="w-full h-84 object-cover"
              />
              <div className="p-4 bg-gray-50">
                <h3 className="text-lg font-semibold">Looking for Home</h3>
              </div>
            </div>
            <div className="rounded-lg overflow-hidden shadow-lg">
              <img 
                src="/res/cat2.jpg" 
                alt="Foster cat" 
                className="w-full h-84 object-cover"
              />
              <div className="p-4 bg-gray-50">
                <h3 className="text-lg font-semibold">Need Fostering</h3>
              </div>
            </div>
            <div className="rounded-lg overflow-hidden shadow-lg">
              <img 
                src="/res/cat3.jpg" 
                alt="Shelter cat" 
                className="w-full h-84 object-cover"
              />
              <div className="p-4 bg-gray-50">
                <h3 className="text-lg font-semibold">Adopt a Cat</h3>
              </div>
            </div>
          </div>
          <div className="flex justify-center mt-8">
          <p className="text-gray-600 mb-8">Click on the cat connection bot icon to use the chatbot</p>
          </div>
          
        </div>
      </main>
    </div>
  );
}
