class TrieNode {
    constructor(value) {
        this.value = value
        this.children = {}
        this.end = false
    }
}

export class Trie {
    constructor() {
        this.root = new TrieNode(true)
    }

    insertWord(string) {

        let current = this.root
        for (let i = 0; i < string.length; i++) {

            let character = string[i]
            if (!current.children[character]) {
                let newNode = new TrieNode(character)
                current.children[character] = newNode
            }
            current = current.children[character]
        }
        current.end = true
    }

    suggestions(prefix) {
        let wordArray = []
        let currentNode = this.root
        let word = ''
        for (let i = 0; i < prefix.length; i++) {
            if (currentNode.children[prefix[i]]) {
                currentNode = currentNode.children[prefix[i]]
                word = word + currentNode.value
            }
            else {
                break;
            }
        }
        if (word === prefix) {
            wordArray = this.dfs(currentNode)
        }
        return wordArray.map((element) => [prefix, element])
    }

    dfs(currentNode) {
        let suffixArray = []
        this.dfsHelper(currentNode, '', suffixArray)
        return suffixArray
    }
    dfsHelper(currentNode, word, suffixArray) {

        if (currentNode.end) {
            suffixArray.push(word)
        }

        for (let key in currentNode.children) {
            let newWord = word + currentNode.children[key].value
            this.dfsHelper(currentNode.children[key], newWord, suffixArray)
        }

    }
}

