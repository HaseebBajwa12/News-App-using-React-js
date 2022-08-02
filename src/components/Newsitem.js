import React, { Component } from 'react'
export class Newsitem extends Component {
    
  render() {
      let {title,description,urlToImage,newsUrl,author,date,source}=this.props;
    return (
      <div className='my-3'>
        <div className="card">
            <img src={!urlToImage?"https://www.washingtonpost.com/wp-apps/imrs.php?src=https://arc-anglerfish-washpost-prod-washpost.s3.amazonaws.com/public/BHPYYCQNGQI63CHIYWG4HW5O4I.jpg&w=1440":urlToImage} className="card-img-top" alt="..."/>
            <div className="card-body">
                <h5 className="card-title">{title}<span class="position-absolute top-0  translate-middle badge rounded-pill bg-danger" style={{left:"90%", zIndex:"1"}}>
    {source}
    <span class="visually-hidden">unread messages</span>
  </span></h5>
                <p className="card-text">{description}...</p>
                <p className='card-text'><small className='text-muted'>By {!author?'Unknown':author} on  {new Date(date).toUTCString()}</small></p>
                <a  rel="noreferrer"  href={newsUrl} target="_blank" className="btn btn-sm btn-dark">Read More</a>
            </div>
            </div>
      </div>
    )
  }
}

export default Newsitem
