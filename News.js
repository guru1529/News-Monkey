import React, { Component } from "react";
import NewsItems from "./NewsItems";
import PropTypes from 'prop-types'

export class News extends Component {
  static defaultProps ={
    country: "in",
    pageSize: 8,
    category: "general",
  }
  static propTypes ={
    country: PropTypes.string,
    pageSize: PropTypes.number,  
    category: PropTypes.string,
  }

  constructor() {
    super();
    this.state = {
      articles: [],
      loading: false,
    };
  }
   async componentDidMount(){      
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=a387438233ff4f179e2d2fefbec169ff&pageSize=${this.props.pageSize}`;
    let data = await fetch(url);
    let parseData = await data.json()
    this.setState({articles: parseData.articles})

  }

  render() {
    return (
      <div className="container mt-5">
        <h1 className="text-center">NewsMonkey - Top headlines</h1>
        <div className="row my-5">
          {this.state.articles.map((element) => {
            return (
              <div className="col-md-4 py-3" key={element.url}>
                <NewsItems
                  title={element.title.slice(0,45)}
                  description={element.description}
                  imageUrl={element.urlToImage}
                  newsUrl={element.url}
                />
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}

export default News;
