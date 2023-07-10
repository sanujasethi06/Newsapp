import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types'

export class News extends Component {
  static defaultProps = {
    country:'in',
    pageSize: 6,
    category:'general'
    
  }
  static propTypes = {
    country: PropTypes.string,
    pageSize:PropTypes.number,
    category:PropTypes.string
  }
 
constructor(){
  super()
    this.state={articles:[],
    loading: false,
    page:1
}
  
}
async componentDidMount(){    /* it will run after render method  */
        let url=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=e31f1d7537374cc088dd81a33b74aa28&page=1&pageSize=${this.props.pageSize}`;
        this.setState({loading:true})
        let data= await fetch (url)
        let parseData= await data.json()
        this.setState({articles:parseData.articles,totalResults:parseData.totalResults,
          loading:false})
        
}
handlePrevClick= async()=>{
    let url=`https://newsapi.org/v2/top-headlines?countrt=${this.props.country}&category=${this.props.category}&apiKey=e31f1d7537374cc088dd81a33b74aa28&page=${this.state.page - 1}&pageSize=${this.props.pageSize}`;
    this.setState({loading:true})
    let data= await fetch (url)
    let parseData= await data.json()
    this.setState({page:this.state.page - 1,
    articles:parseData.articles,
    loading:false
})
}
handleNextClick= async()=>{
    if (!(this.state.page +1 >Math.ceil(this.state.totalResults/this.props.pageSize))){
        console.log("results not found")

    let url=`https://newsapi.org/v2/top-headlines?countrt=${this.props.country}&category=${this.props.category}&apiKey=e31f1d7537374cc088dd81a33b74aa28&page=${this.state.page + 1}&pageSize=${this.props.pageSize}`;
    this.setState({loading:true})
    let data= await fetch (url)
    let parseData= await data.json()
    this.setState({page:this.state.page + 1,
    articles:parseData.articles,
    loading:false
})
}
}
  render() {
    return (
      <>
    <div className='container my-3'>
    <h2 className='text-center'>News A Day-Top headlines</h2>
   {this.state.loading && <Spinner/>}
    <div className='row' >
      {!this.state.loading && this.state.articles.map ((element)=>{
        return <div className='col-md-4' key={element.url}>
              <NewsItem title={element.title?element.title:""} description={element.description?element.description:""} imageUrl={element.urlToImage?element.urlToImage:""} newsUrl={element.url} />
              </div>
      })}
      
      
    </div>
      </div>
      <div className='container d-flex justify-content-between'>
      <button disabled={this.state.page<=1}type="button" className="btn btn-dark" onClick={this.handlePrevClick}>&laquo;Previous</button>
      <button disabled={this.state.page +1 >Math.ceil(this.state.totalResults/this.props.pageSize)}type="button" className="btn btn-dark"onClick={this.handleNextClick}>Next &raquo;</button>

      </div>
      </>
    )
  }
}

export default News
