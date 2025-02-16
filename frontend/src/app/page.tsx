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

  return (
    <div className="min-h-screen bg-white">
      {/* Navbar */}
      <nav className="bg-gray-600 p-4">
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
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
            <button className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors">
              Adopt a Cat
            </button>
            <button className="bg-green-600 text-white px-8 py-3 rounded-lg hover:bg-green-700 transition-colors">
              Foster a Cat
            </button>
            <button className="bg-purple-600 text-white px-8 py-3 rounded-lg hover:bg-purple-700 transition-colors">
              Volunteer
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
