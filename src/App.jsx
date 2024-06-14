import Search from "./components/TrieSearch";

export default function App(){

  const words = ["aditya", "ankur", "shweta", "arvind", "aman", "chandu", "amrita"]
  return (
    <div>
      <h1>search bar</h1>
      <Search wordList = {words}/>
    </div>
  )
}

