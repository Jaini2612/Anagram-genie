import React from "react";
import Layout from "./components/Layout";
import AnagramChecker from "./pages/Anagramchecker";
import History from "./pages/History";

function App() {
  return (
    <Layout>
      <h1>🔤 Anagram Genie</h1>
      <AnagramChecker />
      <History />
    </Layout>
  );
}

export default App;
