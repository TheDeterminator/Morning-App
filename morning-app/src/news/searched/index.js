 import React from 'react'
 import './searched.css'

 function Searched(props) {
     if (props.searchLoaded)
     {
        return (
            <div>
                <form onSubmit={props.handleSearch}>
                 <input type="search" id="search-bar" placeholder="Search for news" name="searchQuery" onChange={props.handleChange}/>
                </form>
                <div className="breaking-news-container">
                {props.searchData.articles.map(story => {
                    return (
                        <div className="story-card">
                            <a href={story.url} className="title"  target="_blank" rel="noopener noreferrer"><h3>{story.title}</h3></a>
                            <h4 className="author">{story.author}</h4>
                            <img src={story.urlToImage} alt="" width="500px" className="breaking-image"></img>
                            <strong><p>{story.description}</p></strong>
                            <a className="breaking-content" target="_blank" rel="noopener noreferrer" href={story.url}><em><p>{story.content}</p></em></a>
                            <h6>{story.publishedAt}</h6>
                            <h6>Source {story.source.name}</h6>
                        </div>
                    )
                    
                })}
                </div>
            </div>
            )
     } else
     {
         return (
            <form onSubmit={props.handleSearch}>
                <input type="text" placeholder="Search for news" name="searchQuery" onChange={props.handleChange}/>
            </form>
         )
         
     }
     
 }

 export default Searched