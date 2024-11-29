import { Footer } from "./components/footer"
import { Header } from "./components/header"
import { Main } from "./components/main"



function App() {
  return (
    <div className="min-h-screen grid grid-rows-[auto_1fr_auto] grid-cols-1">
      <Header />
      <Main />

      <Footer />
    </div>
  )
}

export default App
