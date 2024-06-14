import { useEffect, useState } from "react"

class TrieNode {
  constructor() {
    this.children = {}
    this.isword = false
  }
}

class Trie {
  constructor() {
    this.root = new TrieNode();
  }
  insert(word) {
    let node = this.root;
    for (let i = 0; i< word.length; i++) {
      const c = word[i];
      if (!node.children[c]) {
        node.children[c] = new TrieNode();
      }
      node = node.children[c];
    }
    node.isword = true;
  }
  search(word) {
    let node = this.root;
    for (let i = 0;i < word.length; i++) {
      const c = word[i];
      if (!node.children[c]) {
        return false;
      }
      node = node.children[c];
    }
    return node.isword;
  }
  startsWith(prefix) {
    let node = this.root;

    for (let i = 0; i < prefix.length ; i++) {
      const c = prefix[i];
      if (!node.children[c]) {
        return false;
      }
      node = node.children[c];
    }
    return true;
  }
  getwordswithPrefix(prefix){
    let node = this.root;
    for (let i = 0; i< prefix.length ; i++){
      const c = prefix[i];
      if (!node.children[c]){
        return [];
      }

      node = node.children[c];
    }
    return this._getwordsfromNode(node, prefix);
  }

  _getwordsfromNode(node, prefix){
    let words = []

    if (node.isword){
      words.push(prefix)
    }
    for (let char in node.children){
      words = words.concat(this._getwordsfromNode(node.children[char], prefix + char))
    }
    return words;
  }
}

export default function Search(props) {
  const { wordList } = props;

  const [query, setQuery] = useState("")
  const [trie, setTrie] = useState(new Trie());
  const [results, setResults] = useState([])


  useEffect(() => {
    const newTrie = new Trie();
    if (wordList){
      for (let word of wordList){
        newTrie.insert(word.toLowerCase());
      }
    }
    setTrie(newTrie);
  }, [wordList])
  const search = () => {
   
    return trie.search(query.toLowerCase());
  }
  const handleSearch = () => {
    console.log("searching for", query);
    const results = trie.getwordswithPrefix(query.toLowerCase());
    setResults(results);
  }
  return (
    <div>
      <input
        type="text"
        placeholder="Search"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <button
        onClick={handleSearch}
      >
        Search
      </button>

      {results?.map((item,index) => (
        <div key={index}>
          {item}
        </div>
      ))}
    </div>
  )
}