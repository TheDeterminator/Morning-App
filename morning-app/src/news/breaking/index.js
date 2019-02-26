import React from 'react'
import './breaking.css'

function BreakingNews(props) {
    if (props.breakingLoaded)
    {
        return (
            <div className="breaking-news-container">
                {props.b_newsData.articles.map(story => {
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
        )
    } else
    {
        return (
            <div>Loading...</div>
        )
        
    }
    
}

export default BreakingNews 