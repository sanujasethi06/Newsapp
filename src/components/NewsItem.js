import React, { Component } from 'react'

export class NewsItem extends Component {
  render() {
    let {title,description,imageUrl,newsUrl}= this.props
    return (
        <div className='my-3'>
        <div className="card" >
        <img src={!imageUrl?"https://www.insidesport.in/wp-content/uploads/2022/07/JUL.jpg":imageUrl} className="card-img-top"  alt="Card cap"/>
        <div className="card-body">
          <h5 className="card-title">{title}</h5>
          <p className="card-text">{description}</p>
          <a rel="noreferrer" href={newsUrl} target="_blank"className="btn btn-sm btn-primary btn-dark">Read more</a>
        </div>
      </div>
      </div>
    )
  }
}

export default NewsItem