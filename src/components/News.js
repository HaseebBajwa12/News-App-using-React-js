import React, { Component } from 'react'
import Newsitem from './Newsitem'
import Spinner from './Spinner';
import PropTypes from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component";

export class News extends Component {
  static defaultProps ={
    country: 'us',
    pageSize:8,
    category:'general'
  }
  static propTypes ={
    country: PropTypes.string,
    pageSize:PropTypes.number,
    category:PropTypes.string,
  }
  capitalizeFirstLetter=(string)=>{
    return string.charAt(0).toUpperCase()+string.slice(1);

  }
    constructor(props){
        super(props);
        this.state={
           articles:[],
           loading:false,
           page:1,
           totalResults:0
        

            
        }
        document.title=`${this.capitalizeFirstLetter(this.props.category)} -NewsMOnkey`;
    }

    async UpdateNews(props){
      this.props.setprogress(10)
      const url=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=f0fb66908ef5448c8461505d89c07f1f&page=${this.state.page}&pageSize=${this.props.pageSize}`;

      this.setState({loading:true})
      let data= await fetch(url);
      this.props.setprogress(30)
      let parsedData=await data.json()
      this.props.setprogress(70)
      console.log(parsedData);
      this.setState({
        articles:parsedData.articles,
        totalResults:parsedData.totalResults,
        loading:false,

      })
      this.props.setprogress(100);
      



    }
    async componentDidMount(){
      // console.log('cdm')
      // let url=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=f0fb66908ef5448c8461505d89c07f1f&pageSize=${this.props.pageSize}`;
      // this.setState({loading:true})
      // let data= await fetch(url);
      // let parsedData=await data.json()
      // console.log(parsedData);
      // this.setState({
      //   articles:parsedData.articles,
      //   totalResults:parsedData.totalResults,
      //   loading:false
      // })
      this.UpdateNews();
    }
    handleNext=async()=>{
    //   if(!(this.state.page+1>Math.ceil(this.state.totalResults/this.props.pageSize))){
    //   let url=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=f0fb66908ef5448c8461505d89c07f1f&page=${this.state.page+1}&pageSize=${this.props.pageSize}`;
    //   this.setState({loading:true})
    //   let data= await fetch(url);
    //   let parsedData=await data.json()
     
    //   this.setState({
    //     page:this.state.page+1,
    //     articles:parsedData.articles,
    //     loading:false

    //   })
    // }
    this.setState({page:this.state.page+1});
    this.UpdateNews();

    }
    handlePrev= async()=>{
      // let url=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=f0fb66908ef5448c8461505d89c07f1f&page=${this.state.page-1}&pageSize=${this.props.pageSize}`;
      // this.setState({loading:true})
      // let data= await fetch(url);
      // let parsedData=await data.json()
      // console.log(parsedData);
      // this.setState({
      //   page:this.state.page-1,
      //   articles:parsedData.articles,
      //   loading:false

      // })
      this.setState({page:this.state.page-1});
      this.UpdateNews();

    }

    fetchMoreData = async() => {
      this.setState({page:this.state.page+1})
      const url=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=f0fb66908ef5448c8461505d89c07f1f&page=${this.state.page}&pageSize=${this.props.pageSize}`;
      
      let data= await fetch(url);
      let parsedData=await data.json()
      console.log(parsedData);
      this.setState({
        articles:this.state.articles.concat(parsedData.articles),
        totalResults:parsedData.totalResults,
        loading:false,

      })
    };

  render() {
    console.log('render')
    return (
      <>
          <h2 className='text-center'>News Monkey -Top   {this.capitalizeFirstLetter(this.props.category)} category Headlines</h2>
          {this.state.loading && <Spinner />}
          <InfiniteScroll
          dataLength={this.state.articles.length}
          next={this.fetchMoreData}
          hasMore={this.state.articles.length!==this.state.totalResults}
          loader={<Spinner/>}
        >
          <div className='container'>
          <div className='row'>
          {!this.state.loading && this .state.articles.map((element)=>{
                return <div className='col-md-4' key={element.url}>
                <Newsitem title={element.title?element.title.slice(0,45):""}description={element.description?element.description.slice(0,88):""}  urlToImage={element.urlToImage} newsUrl={element.url} author={element.author} date={element.publishedAt}source={element.source.name}/>
                </div>
          })}   
            </div>
            </div>
            </InfiniteScroll>
            {/* <div className='container d-flex justify-content-between'>
              <button disabled={this.state.page<=1} className='btn btn-dark' type='button' onClick={this.handlePrev}>&larr; Previous</button>
              <button disabled={this.state.page+1>Math.ceil(this.state.totalResults/this.props.pageSize)} className='btn btn-dark' type='button' onClick={this.handleNext}>Next &rarr;</button>
            </div> */}
        </>
    )
  }
}

export default News
