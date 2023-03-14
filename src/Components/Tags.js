import React from 'react'

export default function Tags(props) {
    let tags1 = props.tags.map(tag => {
       return <li className="question-tag">{tag.tag_Name}</li>
    })
    console.log(props.tags)
  return (
    <div className="question-tags">
              {tags1}
            </div>
  )
}
