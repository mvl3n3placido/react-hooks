import React, { Component, useState, useEffect } from 'react';

const App = () => {
  // state
  const [news, setNews] = useState([]);
  const [searchQuery, setSearchQuery] = useState('react');
  const [url, setUrl] = useState('https://hn.algolia.com/api/v1/search?query=react');
  const [loading, setLoading] = useState(false);
  // fetch news
  const fecthNews = () => {
    /* set loading to true */
    setLoading(true);
    fetch(url)
      .then(res => res.json())
      .then(data => (setNews(data.hits), setLoading(false)))
      .catch(e => console.log(e))
  }
   // Similar to componentDidMount and componentDidUpdate:
  useEffect(() => {
    fecthNews();
  }, [url])

  const handleChange = e => {
    setSearchQuery(e.target.value)
  }
  const handleSubmit = e => {
    e.preventDefault();
    setUrl(`https://hn.algolia.com/api/v1/search?query=${searchQuery}`)
  }

  const showLoading = () => loading ? <h2>Loading...</h2> : '' ;
  const searchForm = () => (
    <form onSubmit={handleSubmit}>
      <input type="text" value={searchQuery} onChange={handleChange} />
      <button>Search</button>
    </form>
  );

  const showNews = () => (
    news.map((n, i) => (
      <p key={i}>{n.title}</p>))
  );

  return (
    <div>
      <h2>News</h2>
      {showLoading()}
      {searchForm()}
      {showNews()}
    </div>
  )
};

// const App = () => {
//   const [count, setCount] = useState(0);

//   const increment = () => {
//     setCount(count + 1)
//   }
//    /*runs everytime the state changes*/
//   useEffect(()=>{
//     document.title = `Clicked ${count} times`;
//   })

//   return ( 
//     <div>
//       <h2>counter app</h2>
//       <button onClick={increment}>Clicked {count} times</button>
//     </div>
//   );
// }

/*without using useState and useEffect hooks */
// class App extends Component {
//   state = {
//     count: 0
//   };
//   increment = () => {
//     this.setState({
//       count: this.state.count + 1
//     })
//   }
//   componentDidMount() {
//     document.title = `Clicked ${this.state.count} times`;
//   }
//   componentDidUpdate() {
//     document.title = `Clicked ${this.state.count} times`;
//   }
//   render() {
//     return (
//       <div>
//         <h2>counter app</h2>
//         <button onClick={this.increment}>Clicked {this.state.count} times</button>
//       </div>
//     );
//   }
// }

export default App; 
